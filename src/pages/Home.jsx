"use client";

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

import { SearchBar } from "../Components/SearchBar.jsx";
import { FilterSort } from "../Components/FilterSort.jsx";
import { ProductGrid } from "../Components/ProductGrid.jsx";

import {
  getAllProducts,
  searchProductsByName,
  getProductByBarcode,
  getProductsByCategory,
} from "../Service/api.js";

const PAGE_SIZE = 30;

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "beverages",
    "dairy",
    "snacks",
    "breakfast",
    "desserts",
    "meat",
    "seafood",
    "vegetables",
    "fruits",
    "pasta",
  ];

  const applySort = (data) => {
    const result = [...data];

    if (sortBy === "name-asc")
      result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc")
      result.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "grade-asc")
      result.sort((a, b) =>
        (a.nutritionGrade || "z").localeCompare(b.nutritionGrade || "z")
      );
    if (sortBy === "grade-desc")
      result.sort((a, b) =>
        (b.nutritionGrade || "z").localeCompare(a.nutritionGrade || "z")
      );

    return result;
  };

  const fetchProducts = useCallback(
    async (pageNum = 1, append = false) => {
      if (loading) return;

      setLoading(true);
      try {
        let data = [];

        if (barcodeSearch) {
          const product = await getProductByBarcode(barcodeSearch);
          setProducts(product ? [product] : []);
          setHasMore(false);
          return;
        }

        if (searchTerm) {
          data = await searchProductsByName(searchTerm);
          setProducts(applySort(data));
          setHasMore(false);
          return;
        }

        if (selectedCategory) {
          data = await getProductsByCategory(selectedCategory, pageNum);
        } else {
          data = await getAllProducts(pageNum, PAGE_SIZE);
        }

        if (data.length < PAGE_SIZE) setHasMore(false);

        setProducts((prev) =>
          append ? applySort([...prev, ...data]) : applySort(data)
        );
      } catch (err) {
        console.error("Fetch failed:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, barcodeSearch, selectedCategory, sortBy, loading]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, false);
  }, [searchTerm, barcodeSearch, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-3">
          <span className="text-white font-semibold text-lg mx-8">
            Welcome to FoodExplorer - Discover Quality Products
          </span>
          <span className="text-white/80 mx-8">|</span>
          <span className="text-white font-semibold text-lg mx-8">
            Fresh & Healthy Choices for You
          </span>
          <span className="text-white/80 mx-8">|</span>
          <span className="text-white font-semibold text-lg mx-8">
            Explore Thousands of Food Items
          </span>
          <span className="text-white/80 mx-8">|</span>
          <span className="text-white font-semibold text-lg mx-8">
            Welcome to FoodExplorer - Discover Quality Products
          </span>
          <span className="text-white/80 mx-8">|</span>
          <span className="text-white font-semibold text-lg mx-8">
            Fresh & Healthy Choices for You
          </span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hidden sm:block">
              FoodExplorer
            </h1>

            <div className="flex-1 max-w-3xl">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                barcodeSearch={barcodeSearch}
                setBarcodeSearch={setBarcodeSearch}
                onBarcodeDetected={setBarcodeSearch}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                <SlidersHorizontal size={20} />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {showFilters && (
                <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-4">
                  <FilterSort
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
          <div className="flex gap-6 animate-scroll w-max">
            {/* SET 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image2.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image3.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image4.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image1.png" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* SET 2 (EXACT DUPLICATE – THIS IS THE KEY) */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image2.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image3.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image4.png" className="w-full h-full object-cover" />
              </div>
              <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="/image1.png" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProductGrid
          products={products}
          loading={loading}
          onProductClick={(product) => navigate(`/product/${product.barcode}`)}
        />

        {!searchTerm && !barcodeSearch && hasMore && !loading && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setPage((p) => p + 1);
                fetchProducts(page + 1, true);
              }}
              className="px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Load More Products
            </button>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700">
              No products found
            </h3>
            <p className="text-slate-500 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 4 - 24px * 4));
          }
        }

        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Home;
