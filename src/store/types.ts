export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface SortConfig {
  key: "price" | "rating";
  direction: "asc" | "desc";
}

export interface ProductState {
  products: Product[];
  selectedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  sortConfig: SortConfig | null;
}

export interface ProductStore extends ProductState {
  fetchProducts: () => Promise<void>;
  toggleProductSelection: (product: Product) => void;
  setSortConfig: (config: SortConfig | null) => void;
  clearSelection: () => void;
}
