"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export default function AddProduct() {
  // State variables to store form data
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // State variables to manage category and warehouse data
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  // Get token from cookies for authorization
  const token = getCookie("adminAccessToken");

  // Next.js useRouter hook
  const router = useRouter();

  // Fetch categories and warehouses data on component mount
  useEffect(() => {
    const fetchCategoriesAndWarehouses = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(`${BASE_URL}/category`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch warehouses
        const warehousesResponse = await fetch(`${BASE_URL}/warehouse`);
        const warehousesData = await warehousesResponse.json();
        setWarehouses(warehousesData);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetch function
    fetchCategoriesAndWarehouses();
  }, []);

  // Toggle modal open/close
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create form data for product creation
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("color", color);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("weight", weight);
      formData.append("photo", imageFile);
      formData.append("category_id", category);
      formData.append("warehouse_id", warehouse);

      // Send a POST request to create a new product
      const responseData = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        cache: "no-store",
      });

      // Parse the response JSON
      const response = await responseData.json();

      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Create Product Success",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });

      // Close the modal
      setIsOpen(false);

      // Refresh the page using router.push
      router.push(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center sm:justify-end">
        <button
          className="btn btn-sm btn-outline btn-orange-600 mb-5 sm:btn-md"
          onClick={handleModal}
        >
          Add New Product
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-5 text-orange-600">Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full space-y-4">
                <label className="label font-bold text-orange-600">Product Name</label>
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
                  required
                  type="file"
                  accept="image/*"
                  className="input input-sm input-bordered sm:input-md"
                  onChange={handleImageChange}
                />
                <label className="label font-bold">Category</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Categories Available</option>
                  )}
                </select>
                <label className="label font-bold">Warehouse</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                >
                  <option value="">Select Warehouse</option>
                  {Array.isArray(warehouses) && warehouses.length > 0 ? (
                    warehouses.map((wh) => (
                      <option key={wh.id} value={wh.id}>
                        {wh.warehouse_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Warehouses Available</option>
                  )}
                </select>
              </div>
              <div className="modal-action flex justify-end mt-6">
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
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
