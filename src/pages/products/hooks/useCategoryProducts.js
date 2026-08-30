import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../../../features/products/productsApi";

const PAGE_LIMIT = 30

export function useCategoryProducts(categorySlug) {
    const [skip, setSkip] = useState(0)
    const [accumulated, setAccumulated] = useState([])

    const previousCategorySlug = useRef(categorySlug)

    useEffect(() => {
        if (previousCategorySlug.current !== categorySlug) {
            setSkip(0)
            setAccumulated([])
            previousCategorySlug.current = categorySlug
        }
    }, [categorySlug])

    const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({
        category: categorySlug || undefined,
        skip,
        limit: PAGE_LIMIT,
    })

    useEffect(() => {
        if (!data) return;
        setAccumulated((prev) => (skip === 0 ? data.products : [...prev, ...data.products]));
    }, [data, skip]);

    const total = data?.total ?? 0
    const hasMore = accumulated.length < total

    const loadMore = () => {
        if (hasMore && !isFetching) {
            setSkip((s) => s + PAGE_LIMIT)
        }
    }

    return { products: accumulated, isLoading, isFetching, isError, error, hasMore, loadMore }
}