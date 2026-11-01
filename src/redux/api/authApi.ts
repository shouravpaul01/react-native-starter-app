import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, Record<string, unknown>>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    registerUser: builder.mutation<unknown, Record<string, unknown>>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    socialAuth: builder.mutation<unknown, Record<string, unknown>>({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    forgotPassword: builder.mutation<unknown, { email: string }>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),

    resendOtp: builder.mutation<unknown, { email: string }>({
      query: (email) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: email,
      }),
    }),

    verifyOtp: builder.mutation<unknown, { email: string; otp: string }>({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    updateUser: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logoutApi: builder.mutation<unknown, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
  useLogoutApiMutation,
} = authApi;
