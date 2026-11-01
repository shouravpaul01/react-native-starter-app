import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/auth/authSlice";
import type { RootState } from "../features/rootReducer";

// Use Expo public environment variable or fallback to standard URL
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  process.env.EXPO_PUBLIC_BASE_URL ??
  "https://api.example.com/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", token.startsWith("Bearer ") ? token : `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Re-authentication wrapper:
 * Automatically attempts to refresh the access token when receiving a 401 Unauthorized response.
 */
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth?.refresh_token;

    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data && typeof refreshResult.data === "object") {
        const data = refreshResult.data as {
          token?: string;
          accessToken?: string;
          refresh_token?: string;
        };

        const newToken = data.token ?? data.accessToken;
        if (newToken) {
          api.dispatch(
            setUser({
              token: newToken,
              refresh_token: data.refresh_token ?? refreshToken,
            })
          );

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Project", "Analytics", "AssignedEmployee", "Expenses", "Notifications"],
  endpoints: () => ({}),
});
