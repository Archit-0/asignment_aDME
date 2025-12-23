"use client";

import { Filter, SortAsc } from "lucide-react";
import { useState } from "react";

export const FilterSort = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* CATEGORY FILTER */}
      <div
        className="relative"
        onMouseEnter={() => setShowCategory(true)}
        onMouseLeave={() => setShowCategory(false)}
      >
        <div className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg bg-gradient-to-br from-white to-slate-50 cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all duration-300">
          <Filter size={18} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-700">
            {selectedCategory || "All Categories"}
          </span>
        </div>

        {showCategory && (
          <div className="absolute top-full mt-2 left-0 w-52 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => setSelectedCategory("")}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100"
            >
              <span className="text-slate-700">All Categories</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                  selectedCategory === cat
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SORT OPTIONS */}
      <div
        className="relative"
        onMouseEnter={() => setShowSort(true)}
        onMouseLeave={() => setShowSort(false)}
      >
        <div className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg bg-gradient-to-br from-white to-slate-50 cursor-pointer hover:border-teal-300 hover:shadow-md transition-all duration-300">
          <SortAsc size={18} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-700">
            {sortBy
              ? sortBy
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "Sort By"}
          </span>
        </div>

        {showSort && (
          <div className="absolute top-full mt-2 left-0 w-52 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
            {[
              ["name-asc", "Name A → Z"],
              ["name-desc", "Name Z → A"],
              ["grade-asc", "Best Grade First"],
              ["grade-desc", "Worst Grade First"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                  sortBy === value
                    ? "bg-teal-50 text-teal-700 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
