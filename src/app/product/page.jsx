"use client";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import BASE_URL from "@/lib/baseUrl";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.data);
      } else {
        console.error(data.error || "An error occurred while fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  const showProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold text-center mb-10">Product List</h1>
        <div>
          <AddProduct refreshProducts={refreshProducts} />
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full table-sm sm:table-md">
            <thead>
              <tr>
                <th className="hidden sm:block">No</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Color</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Image</th>
                <th>category</th>
                <th>Warehouse</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <Product
                    product={product}
                    index={index}
                    showProductDetail={showProductDetail}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedProduct && (
        <div className="modal">
          <div className="modal-box">
            <ProductDetail product={selectedProduct} />
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm sm:btn-md"
                onClick={closeProductDetail}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}