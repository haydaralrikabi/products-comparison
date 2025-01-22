// src/tests/ComparisonTable.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTable } from "../components/ComparisonTable";

const mockProducts = [
  {
    id: 1,
    title: "Test Product 1",
    price: 99.99,
    description: "Test description 1",
    category: "electronics", // Changed from "test"
    image: "test1.jpg",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 149.99,
    description: "Test description 2",
    category: "clothing", // Changed from "test"
    image: "test2.jpg",
    rating: { rate: 3.5, count: 80 },
  },
];

describe("ComparisonTable", () => {
  it("renders comparison table with correct headers", () => {
    render(<ComparisonTable products={mockProducts} />);

    expect(screen.getByText("Feature")).toBeInTheDocument();
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it("displays all product features", () => {
    render(<ComparisonTable products={mockProducts} />);

    // Check for feature rows
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();

    // Check for product values
    mockProducts.forEach((product) => {
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      expect(
        screen.getByText(
          `${product.rating.rate} (${product.rating.count} reviews)`
        )
      ).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  it("has sticky header column", () => {
    render(<ComparisonTable products={mockProducts} />);

    const headerColumn = screen.getByText("Feature").closest("th");
    expect(headerColumn).toHaveClass("sticky");
  });
});
