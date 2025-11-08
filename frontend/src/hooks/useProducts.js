import { useState, useEffect, useCallback } from "react";
import { productApi } from "../utils/productApi";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.getUserProducts();
      setProducts(response.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (productId, updates) => {
    try {
      const updatedProduct = await productApi.updateProduct(productId, updates);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );

      return updatedProduct;
    } catch (err) {
      console.error("Failed to update product:", err);
      setError(err.message || "Failed to update product");
      throw err;
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    try {
      const newProduct = await productApi.createProduct(productData);
      setProducts((prevProducts) => [newProduct, ...prevProducts]);

      return newProduct;
    } catch (err) {
      console.error("Failed to create product:", err);
      setError(err.message || "Failed to create product");
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (productId) => {
    try {
      await productApi.deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError(err.message || "Failed to delete product");
      throw err;
    }
  }, []);

  const batchUpdateProducts = useCallback(async (updates) => {
    try {
      const result = await productApi.batchUpdateProducts(updates);
      setProducts((prevProducts) => {
        const updatedMap = new Map(
          result.updated.map((product) => [product.id, product])
        );

        return prevProducts.map((product) =>
          updatedMap.has(product.id) ? updatedMap.get(product.id) : product
        );
      });

      return result;
    } catch (err) {
      console.error("Failed to batch update products:", err);
      setError(err.message || "Failed to batch update products");
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    updateProduct,
    createProduct,
    deleteProduct,
    batchUpdateProducts,
    refetch: fetchProducts,
  };
};
