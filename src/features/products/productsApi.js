import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products?limit=0",
            transformResponse: (response) => response.products,
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;