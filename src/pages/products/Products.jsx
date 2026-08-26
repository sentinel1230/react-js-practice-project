import styles from "./Products.module.css";
import CategorySelector from "./components/categorySelector/CategorySelector";
import SideBar from "./components/sideBar/SideBar";
import ProductCard from "./components/productCard.jsx/ProductCard";
import Select from "./components/select/Select";

import { useGetProductsQuery } from "../../features/products/productsApi";

import { useProductFilters } from "./hooks/useProductFilters";
import { usePagination } from "./hooks/usePagination";

export default function Products() {
    const { data: products = [], isLoading } = useGetProductsQuery();
    const {
        topCategory, setTopCategory,
        sidebarCategory, setSidebarCategory,
        selectedBrand, setSelectedBrand,
        selectedPrice, setSelectedPrice,
        availableBrands,
        filteredProducts,
    } = useProductFilters(products);
    const { visibleItems, hasMore, loadMore } = usePagination(filteredProducts);

    return (
        <div className={styles.main}>
            <div className={styles.topBar}>
                <CategorySelector activeCat={topCategory} onChangeCat={setTopCategory} />
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.sideBar}>
                    <SideBar activeCat={sidebarCategory} onChangeCat={setSidebarCategory} />
                </div>

                <main className={styles.catalogContainer}>
                    <nav className={styles.breadcrumbs}>
                        <span>Products</span>
                        <span>{topCategory}</span>
                        <span>{sidebarCategory}</span>
                    </nav>

                    <div className={styles.filterToolbar}>
                        <div className={styles.dropdownsGroup}>
                            <Select title="Brand" options={availableBrands} value={selectedBrand} onChange={setSelectedBrand} />
                            <Select title="Price" options={["Under $50", "$50 - $100", "Over $100"]} value={selectedPrice} onChange={setSelectedPrice} />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No products found matching this filter.</p>
                            <p>Please, try another category.</p>
                        </div>
                    ) : (
                        <div className={styles.catalogWrapper}>
                            <div className={styles.catalogGrid}>
                                {visibleItems.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                            {hasMore && (
                                <div className={styles.pagination} onClick={loadMore}>
                                    Load more
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}