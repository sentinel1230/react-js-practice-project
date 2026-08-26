import { useState, useMemo, useEffect } from "react";

export function usePagination(items, pageSize = 30) {
    const [visibleCount, setVisibleCount] = useState(pageSize);

    useEffect(() => {
        setVisibleCount(pageSize);
    }, [items]);

    const visibleItems = useMemo(
        () => items.slice(0, visibleCount),
        [items, visibleCount]
    );

    const hasMore = visibleCount < items.length;
    const loadMore = () => setVisibleCount((v) => v + pageSize);

    return { visibleItems, hasMore, loadMore };
}