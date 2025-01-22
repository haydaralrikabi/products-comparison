// src/components/ComparisonTable.tsx
import React from "react";
import { Product } from "../store/types";

interface ComparisonTableProps {
  products: Product[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  products,
}) => {
  return (
    <div className="mt-8" id="comparison-table">
      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Fixed Feature column header */}
              <th
                className="sticky left-0 z-20 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                style={{ minWidth: "200px" }}
              >
                Feature
              </th>
              {/* Product headers - fixed at top when scrolling horizontally */}
              {products.map((product) => (
                <th
                  key={product.id}
                  className="sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  style={{ minWidth: "250px" }}
                >
                  {product.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              {
                key: "price",
                label: "Price",
                format: (p: Product) => `$${p.price}`,
              },
              {
                key: "rating",
                label: "Rating",
                format: (p: Product) =>
                  `${p.rating.rate} (${p.rating.count} reviews)`,
              },
              {
                key: "category",
                label: "Category",
                format: (p: Product) => p.category,
              },
              {
                key: "description",
                label: "Description",
                format: (p: Product) => p.description,
              },
            ].map(({ label, format }) => (
              <tr key={label}>
                {/* Fixed Feature column */}
                <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap font-medium border-r border-gray-200">
                  {label}
                </td>
                {/* Product data cells */}
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {format(product)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
