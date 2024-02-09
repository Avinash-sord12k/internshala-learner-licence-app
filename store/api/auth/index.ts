import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInAPI, SignInDto, SessionUser, SignOutAPI, ChangePassword, response } from "@/types/Auth.types";
import { UserInput } from "@/types/User.types";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInAPI, SignInDto>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Session"],
    }),
    getSession: builder.query<SessionUser, void>({
      query: () => '/auth/session',
      providesTags: ["Session"],
    }),
    register: builder.mutation<response, UserInput>({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Session"],
    }),
    signOut: builder.mutation<SignOutAPI, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),
    changePassword: builder.mutation<response, ChangePassword>({
      query: (data) => ({
        url: `/auth/changePassword`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Session"],
    }),
  }),
})

export const {
  useSignInMutation,
  useGetSessionQuery,
  useSignOutMutation,
  useChangePasswordMutation,
  useRegisterMutation,
} = authApi

// export const {getSession} = authApi.endpoints