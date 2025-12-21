import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import { NutritionGrade } from "../Components/NutritionGrade.jsx";
import { getProductByBarcode } from "../Service/api.js";

const NUTRITION_CONFIG = [
  { key: "energy_100g", label: "Energy", unit: "kJ" },
  { key: "energy-kcal_100g", label: "Energy", unit: "kcal" },
  { key: "fat_100g", label: "Fat", unit: "g" },
  { key: "saturated-fat_100g", label: "Saturated Fat", unit: "g" },
  { key: "carbohydrates_100g", label: "Carbohydrates", unit: "g" },
  { key: "sugars_100g", label: "Sugars", unit: "g" },
  { key: "fiber_100g", label: "Fiber", unit: "g" },
  { key: "proteins_100g", label: "Proteins", unit: "g" },
  { key: "salt_100g", label: "Salt", unit: "g" },
  { key: "sodium_100g", label: "Sodium", unit: "g" },
];

const ProductDetails = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(barcode);
        console.log("Fetched product:", data);
        setProduct(data || null);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );
  }

  const nutrition = product.nutrition || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow">
        {/* HEADER */}
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {product.name || "Product Details"}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />

          <div className="space-y-4 text-sm">
            <p>
              <b>Brand:</b> {product.brand || "N/A"}
            </p>
            <p>
              <b>Category:</b> {product.category || "N/A"}
            </p>
            <p>
              <b>Barcode:</b> {product.barcode}
            </p>

            <NutritionGrade grade={product.nutritionGrade} />

            {/* INGREDIENTS */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                Ingredients
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {Array.isArray(product.ingredients)
                  ? product.ingredients
                      .map((item) => item.text)
                      .filter(Boolean)
                      .join(", ")
                  : typeof product.ingredients === "string"
                  ? product.ingredients
                  : "No ingredient information available"}
              </p>
            </div>

            {product.labels && (
              <div className="flex flex-wrap gap-2 mt-2">
                {product.labels.split(",").map((label, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                  >
                    {label.replace("en:", "").trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* NUTRITION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {NUTRITION_CONFIG.map(({ key, label, unit }) => {
            const value = nutrition[key];

            if (value === undefined || value === null) return null;

            return <Box key={key} label={label} value={`${value} ${unit}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Box = ({ label, value }) => (
  <div className="bg-gray-100 p-3 rounded">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default ProductDetails;
