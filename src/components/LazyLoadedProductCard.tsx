// src/components/LazyLoadedProductCard.tsx
import React, { useRef, useEffect, useState } from "react";
import { Product } from "../store/types";

interface LazyLoadedProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onShowDetails: () => void;
}

export const LazyLoadedProductCard: React.FC<LazyLoadedProductCardProps> = ({
  product,
  isSelected,
  onSelect,
  onShowDetails,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return <div ref={cardRef} className="h-96" />;
  }

  return (
    <div
      ref={cardRef}
      className={`border rounded-lg p-4 relative ${
        isSelected ? "border-blue-500 shadow-lg" : "border-gray-200"
      }`}
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
      <button
        onClick={onShowDetails}
        className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block mb-2 text-left w-full"
        aria-label={`View details for ${product.title}`}
      >
        {product.description}
      </button>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{product.rating.rate}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({product.rating.count})
          </span>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 cursor-pointer"
          aria-label={`Select ${product.title} for comparison`}
        />
      </div>
    </div>
  );
};
