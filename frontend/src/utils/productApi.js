const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const handleApiError = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  return response.json();
};

export const productApi = {
  async getUserProducts() {
    const response = await fetch(`${API_BASE_URL}/products`, {
      credentials: "include",
    });
    return handleApiError(response);
  },

  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });
    return handleApiError(response);
  },

  async updateProduct(productId, updates) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updates),
    });
    return handleApiError(response);
  },

  async deleteProduct(productId) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleApiError(response);
  },

  async batchUpdateProducts(updates) {
    const response = await fetch(`${API_BASE_URL}/products/batch`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ updates }),
    });
    return handleApiError(response);
  },
};
