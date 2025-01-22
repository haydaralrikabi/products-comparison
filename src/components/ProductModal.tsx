import React from "react";
import { Product } from "@/store/types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 id="modal-title" className="text-2xl font-bold">
              {product.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-contain h-64"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-2xl font-bold mb-4">${product.price}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{product.rating.rate}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className="mt-4 capitalize text-gray-600">
                Category: {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
