import React, { useEffect, useMemo, useState } from "react";
import { Product } from "@/store/types";
import useProductStore from "@/store/store";
import { LazyLoadedProductCard } from "./LazyLoadedProductCard";
import { ComparisonTable } from "./ComparisonTable";
import { ProductModal } from "./ProductModal";

const ProductComparison: React.FC = () => {
  const {
    products,
    selectedProducts,
    isLoading,
    error,
    sortConfig,
    fetchProducts,
    toggleProductSelection,
    setSortConfig,
    clearSelection,
  } = useProductStore();

  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = useMemo(() => {
    if (!sortConfig) return products;

    return [...products].sort((a: Product, b: Product) => {
      if (sortConfig.key === "rating") {
        return sortConfig.direction === "asc"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      }

      if (sortConfig.key === "price") {
        return sortConfig.direction === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }

      return 0;
    });
  }, [products, sortConfig]);

  const scrollToComparison = () => {
    document.getElementById("comparison-table")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 z-40 bg-white pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Products Comparison</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortConfig({ key: "price", direction: "asc" })}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Sort by Price
            </button>
            <button
              onClick={() =>
                setSortConfig({ key: "rating", direction: "desc" })
              }
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Sort by Rating
            </button>
            <button
              onClick={() => clearSelection()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear Selection
            </button>
            {selectedProducts.length >= 2 && (
              <button
                onClick={scrollToComparison}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Compare Selections ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((product: Product) => (
            <LazyLoadedProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.some((p) => p.id === product.id)}
              onSelect={() => toggleProductSelection(product)}
              onShowDetails={() => setModalProduct(product)}
            />
          ))}
        </div>
      )}

      {selectedProducts.length >= 2 && (
        <ComparisonTable products={selectedProducts} />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductComparison;
