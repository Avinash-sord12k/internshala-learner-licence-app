import { MarriageDataType, updateMarriageDataDto } from "@/types/MarriageData.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Response = {
  status: number;
  message: string;
}

type MongoAttributs = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export const marriageDataApi = createApi({
  reducerPath: "marriageData",
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ["MarriageData"],
  endpoints: (builder) => ({
    getAllMarriageData: builder.query<Response & { data: (MarriageDataType & MongoAttributs)[] }, void>({
      query: () => `/marriageData`,
      providesTags: ["MarriageData"],
    }),
    getMarriageDataById: builder.query<Response & { data: MarriageDataType & MongoAttributs }, string>({
      query: (id) => `/marriageData?id=${id}`,
      providesTags: ["MarriageData"],
    }),
    updateMarriageData: builder.mutation<Response, FormData>({
      query: (data) => ({
        url: `/marriageData`,
        method: "PUT",
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        body: data,
      }),
      invalidatesTags: ["MarriageData"],
    }),
  }),
})

export const {
  useGetAllMarriageDataQuery,
  useGetMarriageDataByIdQuery,
  useUpdateMarriageDataMutation,
} = marriageDataApi;