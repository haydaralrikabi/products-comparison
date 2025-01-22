import create from "zustand";
import { Product, ProductStore, SortConfig } from "./types";

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  selectedProducts: [],
  isLoading: false,
  error: null,
  sortConfig: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  toggleProductSelection: (product: Product) => {
    set((state) => {
      const isSelected = state.selectedProducts.some(
        (p) => p.id === product.id
      );
      const selectedProducts = isSelected
        ? state.selectedProducts.filter((p) => p.id !== product.id)
        : [...state.selectedProducts, product];
      return { selectedProducts };
    });
  },

  setSortConfig: (config: SortConfig | null) => {
    set({ sortConfig: config });
  },

  clearSelection: () => {
    set({ selectedProducts: [] });
  },
}));

export default useProductStore;
