import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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

  // 🔹 SORT + FILTER HELPER
  const applySort = (data) => {
    const result = [...data];

    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortBy === "grade-asc") {
      result.sort((a, b) =>
        (a.nutritionGrade || "z").localeCompare(b.nutritionGrade || "z")
      );
    }
    if (sortBy === "grade-desc") {
      result.sort((a, b) =>
        (b.nutritionGrade || "z").localeCompare(a.nutritionGrade || "z")
      );
    }

    return result;
  };

  // 🔹 CORE FETCH LOGIC
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

  // 🔹 RESET & FETCH WHEN FILTERS CHANGE
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, false);
  }, [searchTerm, barcodeSearch, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Food Product Explorer</h1>

      {/* SEARCH */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        barcodeSearch={barcodeSearch}
        setBarcodeSearch={setBarcodeSearch}
        onBarcodeDetected={(code) => setBarcodeSearch(code)}
      />

      {/* FILTER + SORT */}
      <div className="mt-4">
        <FilterSort
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* PRODUCTS */}
      <div className="mt-8">
        <ProductGrid
          products={products}
          loading={loading}
          onProductClick={(product) => navigate(`/product/${product.barcode}`)}
        />
      </div>

      {/* LOAD MORE */}
      {!searchTerm && !barcodeSearch && hasMore && !loading && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setPage((p) => p + 1);
              fetchProducts(page + 1, true);
            }}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
