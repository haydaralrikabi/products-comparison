import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductModal } from "../components/ProductModal";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "Test description",
  category: "test",
  image: "test.jpg",
  rating: { rate: 4.5, count: 100 },
};

describe("ProductModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal content correctly", () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(mockProduct.rating.rate.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(`(${mockProduct.rating.count} reviews)`)
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("has proper accessibility attributes", () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });
});
