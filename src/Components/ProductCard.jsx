import { NutritionGrade } from "./NutritionGrade.jsx";

export const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
    >
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) =>
              (e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14" font-family="system-ui"%3ENo Image%3C/text%3E%3C/svg%3E')
            }
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-400 text-sm font-medium">No Image</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 min-h-[3rem] leading-tight">
          {product.name || "Unknown Product"}
        </h3>

        {product.category && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">
            {product.category}
          </span>
        )}

        <NutritionGrade grade={product.nutritionGrade} />

        {product.ingredients && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-3 pt-3 border-t border-gray-100">
            {product.ingredients.substring(0, 100)}
            {product.ingredients.length > 100 && "..."}
          </p>
        )}
      </div>
    </div>
  );
};
