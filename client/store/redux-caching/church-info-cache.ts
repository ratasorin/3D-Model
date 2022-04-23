import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerResponse } from 'pages/types/server';
import type { ChurchInfo } from 'pages/types/server';
export const churchInfoApi = createApi({
  reducerPath: 'churchInfo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/church-info/' }),
  endpoints: (builder) => ({
    // cache the church information
    getChurchInfo: builder.query<ServerResponse<ChurchInfo>, string>({
      query: (churchName) => `${churchName}`,
    }),
    // post input from user and invalidate cache through mutation
    postChurchInfo: builder.mutation<void, ChurchInfo>({
      query: (churchInfo) => ({
        url: `${churchInfo.churchName}`,
        body: churchInfo,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetChurchInfoQuery, usePostChurchInfoMutation } =
  churchInfoApi;
