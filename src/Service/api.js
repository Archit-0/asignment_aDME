import { ProductForUI } from "../utils/productUi.js";
import axiosInstance from "./axiosInstance.js";
export const getAllProducts = async (page = 1, pageSize = 30) => {
  const response = await axiosInstance.get(
    `/api/v2/search?page=${page}&page_size=${pageSize}`
  );
  return (response.data.products || []).map(ProductForUI);
};
// get product by barcode

export const getProductByBarcode = async (barcode) => {
  const response = await axiosInstance.get(`/api/v0/product/${barcode}.json`);
  return ProductForUI(response.data.product);
};

//search product by name
export const searchProductsByName = async (
  searchTerm,
  page = 1,
  pageSize = 20
) => {
  const response = await axiosInstance.get(`/cgi/search.pl`, {
    params: {
      search_terms: searchTerm,
      search_simple: 1,
      action: "process",
      json: true,
      page,
      page_size: pageSize,
    },
  });
  return (response.data.products || []).map(ProductForUI);
};

// search products by category

export const getProductsByCategory = async (
  category = "snacks",
  page = 1,
  pageSize = 20
) => {
  const response = await axiosInstance.get(`/category/${category}.json`, {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return (response.data.products || []).map(ProductForUI);
};

export const getCategories = async () => {
  const response = await axiosInstance.get(`/categories.json`);
  return response.data.tags || [];
};
