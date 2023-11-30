// src/app/product/components/fetchProducts.js
import BASE_URL from "@/lib/baseUrl";

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      cache: "no-store",
    });

    const products = await res.json();
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "GET",
      cache: "no-store",
    });

    const product = await res.json();
    return product;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductById = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const deletedProduct = await res.json();
    return deletedProduct;
  } catch (error) {
    console.error(error);
  }
};
