import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard.jsx";

export const ProductGrid = ({ products, onProductClick, loading }) => {
  //   console.log("ProductGrid render ", products);
  const uniqueProducts = Array.from(
    new Map(
      products.map((product) => [product.id || product.barcode, product])
    ).values()
  );

  if (loading && uniqueProducts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (uniqueProducts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl">No products found</p>
        <p className="text-sm mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {uniqueProducts.map((product) => (
        <ProductCard
          key={product.id || product.barcode}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};
