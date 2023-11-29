"use client";

const ProductDetail = ({ product }) => {
  return (
    <>
      <h2>{product.name} Detail</h2>
      <p>Description: {product.description}</p>
      <p>Color: {product.color}</p>
      <p>Stock: {product.stock}</p>
      <p>Price: {product.price}</p>
      <p>Weight: {product.weight}</p>
      {/* Add more product details */}
    </>
  );
};

export default ProductDetail;