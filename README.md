# Product Comparison App

A React-based product comparison tool that allows users to view, compare, and analyze products with features like lazy loading, responsive design, and optimised performance.

## Demo

Watch our [demo video](./demo.mp4) to see how the application works! The video demonstrates:

- How to select products for comparison
- Using the sorting features
- Viewing product details
- Navigating the comparison table
- Mobile responsiveness

## Features

- **Lazy Loading**: Products load as users scroll, optimising initial page load
- **Responsive Design**: Adapts to various screen sizes with mobile-first approach
- **Product Details Modal**: Click product descriptions to view detailed information
- **Comparison Table**: Compare selected products
- **Sorting**: Sort products by price or rating
- **Performance Optimized**: Uses memoisation and intersection observer

## Architecture

### Components

- `ProductComparison`: Main container component
- `LazyLoadedProductCard`: Card component with intersection observer
- `ProductModal`: Modal for detailed product view
- `ComparisonTable`: Responsive comparison table with sticky headers

### State Management

Uses Zustand for state management due to:

- Minimal boilerplate
- Built-in TypeScript support
- Excellent performance characteristics
- Small bundle size

### Performance Optimisations

#### React Profiler Findings:

- Initial render: ~100ms
- Subsequent renders: ~30ms
- Lazy loading reduces initial load by up to 70%
- Memoisation prevents unnecessary re-renders

#### Key Optimisations:

1. Intersection Observer for lazy loading
2. Memoised sorting logic
3. Efficient state updates with Zustand
4. Debounced scroll handlers
5. Optimized image loading

## Known Limitations

1. Image optimisation depends on the API
2. Mobile comparison limited by screen width
3. Maximum products comparison not enforced
4. Sort options limited to price and rating

## Usage

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Testing

```bash
# Run tests
npm test
```
