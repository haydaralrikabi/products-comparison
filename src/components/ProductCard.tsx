import React from "react";
import { Product } from "../store/types";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, isSelected, onSelect }) => {
    return (
      <div
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          isSelected ? "border-blue-500 shadow-lg" : "border-gray-200"
        }`}
        onClick={onSelect}
      >
        <div className="aspect-square w-full mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="font-semibold truncate">{product.title}</h3>
        <p className="text-lg font-bold">${product.price}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{product.rating.rate}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({product.rating.count})
          </span>
        </div>
      </div>
    );
  }
);
