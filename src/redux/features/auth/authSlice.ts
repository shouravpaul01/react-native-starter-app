import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { RootState } from "../rootReducer";
import type { AuthState, DecodedToken, User } from "./authTypes";

const initialState: AuthState = {
  token: null,
  refresh_token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets auth credentials directly, decoding user profile from token if available.
     */
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        user?: User | null;
        refresh_token?: string;
      }>
    ) => {
      const { token, user, refresh_token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;

      if (refresh_token !== undefined) {
        state.refresh_token = refresh_token;
      }

      if (user) {
        state.user = user;
      } else if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          state.user = {
            id: String(decoded?.id ?? decoded?.sub ?? ""),
            name: String(decoded?.name ?? ""),
            email: String(decoded?.email ?? ""),
            role: decoded?.role ? String(decoded.role) : undefined,
            photo: decoded?.photo ? String(decoded.photo) : undefined,
            phone: decoded?.phone ? String(decoded.phone) : undefined,
          };
        } catch {
          // If token isn't a standard JWT or decoding fails, keep previous user
        }
      }
    },

    /**
     * Updates the refresh token.
     */
    setRefreshToken: (state, action: PayloadAction<{ refresh_token: string }>) => {
      state.refresh_token = action.payload.refresh_token;
    },

    /**
     * Clears all auth data on logout.
     */
    logout: (state) => {
      state.token = null;
      state.refresh_token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, setRefreshToken, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
