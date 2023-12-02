// src/app/product/components/EditDeleteProduct.jsx
"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "@/lib/baseUrl";

export default function EditDeleteProduct({ product, refreshProducts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [color, setColor] = useState(product.product_detail[0].color);
  const [stock, setStock] = useState(product.product_detail[0].stock);
  const [price, setPrice] = useState(product.product_detail[0].price);
  const [weight, setWeight] = useState(product.product_detail[0].weight);
  const [imagePreview, setImagePreview] = useState(
    product.product_detail[0].photo
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productFormData = new FormData();
      productFormData.append("name", productName);
      productFormData.append("description", description);

      const productResponse = await fetch(
        `${BASE_URL}/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: productFormData,
          cache: "no-store",
        }
      );

      const productData = await productResponse.json();
      const productId = productData.data.id;

      const updatedProductDetail = {
        color: color,
        stock: stock,
        price: price,
        weight: weight,
      };

      const productDetailFormData = new FormData();
      productDetailFormData.append("photo", e.target.files[0]);
      productDetailFormData.append(
        "data",
        JSON.stringify(updatedProductDetail)
      );

      const productDetailResponse = await fetch(
        `${BASE_URL}/products/details/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: productDetailFormData,
          cache: "no-store",
        }
      );

      const productDetailResponseData = await productDetailResponse.json();

      Swal.fire({
        icon: "success",
        title: "Update Product Success",
        text: productDetailResponseData.message,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsOpen(false);
      refreshProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Delete Product Success",
          text: "The product has been deleted successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        refreshProducts();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Delete Product Failed",
          text:
            errorData.error ||
            "Failed to delete the product. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-center items-center sm:justify-end">
        <button
          className="btn btn-sm btn-outline btn-orange-600 mb-5 sm:btn-md"
          onClick={handleModal}
        >
          Edit/Delete
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-xl font-bold mb-5 text-orange-600">
              Edit/Delete Product
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control w-full space-y-4">
                <label className="label font-bold">Product Name</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <label className="label font-bold">Description</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className="label font-bold">Color</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label className="label font-bold">Stock</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value))}
                />
                <label className="label font-bold">Price</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <label className="label font-bold">Weight</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                />
                <label className="label font-bold">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input input-sm input-bordered sm:input-md mb-2"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview w-full h-auto"
                    />
                  </div>
                )}
              </div>
              <div className="modal-action flex justify-center sm:justify-end w-full mt-6">
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md btn-outline btn-orange-600 mr-2"
                  onClick={handleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-sm sm:btn-md btn-orange-600"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md btn-outline btn-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
