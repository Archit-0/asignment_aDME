"use client";
import { NutritionGrade } from "./NutritionGrade.jsx";

export const ProductCard = ({ product, onClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-gray-100/50 hover:border-transparent"
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10 animate-pulse" />

      <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        {product.image ? (
          <>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-[1.15] group-hover:brightness-110 transition-all duration-700 ease-out"
              onError={(e) =>
                (e.currentTarget.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23DBEAFE;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23E0E7FF;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23bg)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" textAnchor="middle" dy=".3em" fill="%239CA3AF" fontSize="18" fontFamily="system-ui" fontWeight="600"%3ENo Image%3C/text%3E%3C/svg%3E')
              }
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/30 transition-all duration-1000 opacity-0 group-hover:opacity-100 translate-x-[-150%] group-hover:translate-x-[150%]" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-20 h-20 text-blue-200 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500"
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
              <span className="text-blue-300 text-sm font-semibold tracking-wide">
                No Image Available
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent opacity-95" />

        <div className="absolute top-5 right-5 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-2xl">
          <NutritionGrade grade={product.nutritionGrade} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-7 backdrop-blur-md bg-gradient-to-t from-gray-900/30 to-transparent">
        {product.brand && (
          <div className="mb-3 transform group-hover:translate-x-1 transition-transform duration-300">
            <span className="inline-block px-5 py-2 bg-white/25 backdrop-blur-xl text-white text-xs font-bold rounded-full border-2 border-white/40 shadow-2xl uppercase tracking-wider hover:bg-white/35 transition-colors duration-300">
              {product.brand}
            </span>
          </div>
        )}

        <h3 className="font-extrabold text-white text-xl sm:text-2xl line-clamp-2 leading-tight drop-shadow-2xl tracking-tight group-hover:text-cyan-100 transition-colors duration-300">
          {product.name || "Unknown Product"}
        </h3>
      </div>

      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-300/20 via-blue-400/20 to-purple-500/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
    </div>
  );
};
