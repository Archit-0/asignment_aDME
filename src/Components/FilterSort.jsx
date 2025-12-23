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
    <div className="flex items-center gap-3">
      {/* CATEGORY */}
      <div
        className="relative"
        onMouseEnter={() => setShowCategory(true)}
        onMouseLeave={() => setShowCategory(false)}
      >
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700">
          <Filter size={16} />
          {selectedCategory || "Category"}
        </button>

        {showCategory && (
          <div className="absolute top-full mt-1 left-0 w-44 bg-white border border-gray-300 rounded-md shadow-sm z-50">
            <button
              onClick={() => setSelectedCategory("")}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                  selectedCategory === cat ? "font-medium bg-gray-100" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SORT */}
      <div
        className="relative"
        onMouseEnter={() => setShowSort(true)}
        onMouseLeave={() => setShowSort(false)}
      >
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700">
          <SortAsc size={16} />
          {sortBy ? sortBy.replace("-", " ") : "Sort"}
        </button>

        {showSort && (
          <div className="absolute top-full mt-1 left-0 w-44 bg-white border border-gray-300 rounded-md shadow-sm z-50">
            {[
              ["name-asc", "Name A–Z"],
              ["name-desc", "Name Z–A"],
              ["grade-asc", "Best Grade"],
              ["grade-desc", "Worst Grade"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                  sortBy === value ? "font-medium bg-gray-100" : ""
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
