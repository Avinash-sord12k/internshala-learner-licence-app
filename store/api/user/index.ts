import { UserType } from "@/types/User.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Response = {
  status: number;
  message: string;
}

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<Response & { user: UserType }, string>({
      query: (id) => `/user?id=${id}`,
      providesTags: ["User"],
    }),
    getAllUsers: builder.query<Response & { users: UserType[] }, string>({
      query: () => `/users`,
      providesTags: ["User"],
    }),
  }),
})

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
} = userApi;