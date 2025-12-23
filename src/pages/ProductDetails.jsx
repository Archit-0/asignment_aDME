"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Loader2, Package, Tag, Barcode, ArrowLeft } from "lucide-react";

import { NutritionGrade } from "../Components/NutritionGrade.jsx";
import { getProductByBarcode } from "../Service/api.js";

/* ---------------- CONFIG ---------------- */

const NUTRITION_CONFIG = [
  { key: "energy_100g", label: "Energy", unit: "kJ" },
  { key: "energy-kcal_100g", label: "Energy", unit: "kcal" },
  { key: "fat_100g", label: "Fat", unit: "g" },
  { key: "saturated-fat_100g", label: "Sat. Fat", unit: "g" },
  { key: "carbohydrates_100g", label: "Carbs", unit: "g" },
  { key: "sugars_100g", label: "Sugars", unit: "g" },
  { key: "fiber_100g", label: "Fiber", unit: "g" },
  { key: "proteins_100g", label: "Protein", unit: "g" },
  { key: "salt_100g", label: "Salt", unit: "g" },
];

/* ---------------- PAGE ---------------- */

const ProductDetails = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(barcode);
        setProduct(data || null);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [barcode]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-emerald-50">
        <Loader2 className="animate-spin text-orange-600" size={48} />
      </div>
    );
  }

  /* ---------------- NOT FOUND ---------------- */

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-emerald-50">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const nutrition = product.nutrition || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50">
      <div className="bg-white border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-lg font-semibold text-slate-900">
              Product Details
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN - IMAGE & NUTRITION GRADE */}
          <div className="lg:col-span-5 space-y-6">
            {/* Product Image */}
            <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-sm">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full max-h-[400px] object-contain"
              />
            </div>

            {/* Nutrition Grade */}
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-900 mb-4 uppercase tracking-wide">
                Nutrition Grade
              </h3>
              <div className="flex justify-center">
                <NutritionGrade grade={product.nutritionGrade} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - PRODUCT INFO */}
          <div className="lg:col-span-7 space-y-6">
            {/* Product Name */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {product.name || "Product Information"}
              </h2>
              <p className="text-orange-700 font-medium">
                {product.brand || "Brand unavailable"}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard
                icon={<Tag size={20} />}
                title="Brand"
                value={product.brand || "N/A"}
              />
              <InfoCard
                icon={<Package size={20} />}
                title="Category"
                value={product.category || "N/A"}
              />
              <InfoCard
                icon={<Barcode size={20} />}
                title="Barcode"
                value={product.barcode}
                mono
                fullWidth
              />
            </div>

            <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                Nutrition Facts{" "}
                <span className="text-gray-500 normal-case tracking-normal">
                  (per 100g)
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {NUTRITION_CONFIG.map(({ key, label, unit }) => {
                  const value = nutrition[key];
                  if (!value) return null;
                  return (
                    <NutritionBox
                      key={key}
                      label={label}
                      value={`${value} ${unit}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Product Labels */}
            {product.labels && (
              <div className="bg-white rounded-xl border border-emerald-100 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                  Product Labels
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.labels.split(",").map((label, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium"
                    >
                      {label.replace("en:", "").trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-amber-100 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Package size={18} className="text-amber-600" />
                Ingredients
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {Array.isArray(product.ingredients)
                  ? product.ingredients
                      .map((i) => i.text)
                      .filter(Boolean)
                      .join(", ")
                  : product.ingredients ||
                    "No ingredient information available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const InfoCard = ({ icon, title, value, mono, fullWidth }) => (
  <div
    className={`bg-white rounded-xl border border-orange-100 p-5 hover:border-orange-300 hover:shadow-md transition-all ${
      fullWidth ? "sm:col-span-2" : ""
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="text-orange-600 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
          {title}
        </p>
        <p
          className={`text-base font-semibold text-slate-900 break-words ${
            mono ? "font-mono text-sm" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </div>
);

const NutritionBox = ({ label, value }) => (
  <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-3 border border-orange-200">
    <p className="text-xs font-medium uppercase tracking-wide text-orange-700 mb-1">
      {label}
    </p>
    <p className="font-semibold text-slate-900">{value}</p>
  </div>
);

export default ProductDetails;
