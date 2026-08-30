import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ category, limit = 30, skip = 0 } = {}) => {
                const path = category ? `/products/category/${category}` : "/products"
                return `${path}?limit=${limit}&skip=${skip}`
            },
            transformResponse: (response) => ({
                products: response.products,
                total: response.total,
            }),
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
        getCategoryList: builder.query({
            query: () => `/products/category-list`,
        }),
        searchProducts: builder.query({
            query: (q) => `/products/search?q=${encodeURIComponent(q)}`,
            transformResponse: (response) => ({
                products: response.products,
                total: response.total,
            })
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoryListQuery,
    useSearchProductsQuery,
} = productsApi;