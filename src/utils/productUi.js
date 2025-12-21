export const ProductForUI = (product) => {
  return {
    id: product.code || product._id,
    name: product.product_name || "No name",
    image: product.image_small_url || "",
    category: product.categories_tags?.[0]?.replace("en:", "") || "N/A",
    nutritionGrade: product.nutrition_grades || "N/A",
    ingredients: product.ingredients_text || "Not available",
    barcode: product.code,
    brand: product.brands || "N/A",
    labels: product.labels || "",
    nutrition: product.nutriments || {},
  };
};
