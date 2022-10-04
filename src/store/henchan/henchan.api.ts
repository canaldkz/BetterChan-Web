import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  DiscoveryResponse,
  ApiResponse,
  IManga,
  ApiRequest,
} from '../../models/models'

export const henchanApi = createApi({
  reducerPath: 'henchan/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000', // Dev Enviroment
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getMangasFiltered: build.query<ApiResponse, ApiRequest>({
      query: (request:ApiRequest) => ({
        url: '/mangas',
        params: {offset:request.offset},
        method: 'POST',
        body: request.filter,
      }),
    }),
    discovery: build.query<DiscoveryResponse, any>({
      query: () => ({
        url: '/',
      }),
    }),
    getMangas: build.query<ApiResponse, number>({
      query: (offset: number) => ({
        url: '/mangas',
        params: {
          offset: offset,
        },
      }),
    }),
    getManga: build.query<IManga, string>({
      query: (id: string) => ({
        url: '/manga',
        params: {
          id: id,
        },
      }),
      transformResponse: (response: {item:IManga}) => response.item,
    }),
    searchManga: build.query<IManga[], string>({
      query: (query: string) => ({
        url: '/search',
        params: {
          query: query,
        },
      }),
      transformResponse: (response: ApiResponse) => response.items,
    }),
  }),
})

export const {
  useGetMangasQuery,
  useGetMangaQuery,
  useSearchMangaQuery,
  useDiscoveryQuery,
  useGetMangasFilteredQuery
} = henchanApi
