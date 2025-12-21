import { NutritionGrade } from "./NutritionGrade.jsx";

export const ProductCard = ({ product, onClick }) => {
  //   console.log("NAME VALUE:", `"${product.name}"`);
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl active:shadow-2xl transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) =>
              (e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E')
            }
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 min-h-[3rem]">
          {product.name || "Unknown Product"}
        </h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {product.category || "No category"}
        </p>

        <NutritionGrade grade={product.nutritionGrade} />

        <p className="text-xs text-gray-500 line-clamp-2 mt-2">
          {product.ingredients?.substring(0, 80) || "No ingredients info"}
        </p>
      </div>
    </div>
  );
};
