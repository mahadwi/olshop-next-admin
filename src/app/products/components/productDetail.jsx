// src/app/product/components/ProductDetail.jsx
const ProductDetail = ({ product }) => {
  return (
    <>
      <h2>{product.name} Detail</h2>
      <p>Color: {product.color}</p>
      <p>Stock: {product.stock}</p>
      <p>Price: {product.price}</p>
      <p>Weight: {product.weight}</p>
      <img
        src={product.product_detail && product.product_detail.length > 0 ? product.product_detail[0].photo : ''}
        alt={`Product ${product.name}`}
        className="w-8 h-8 object-cover rounded"
      />
      {/* Add more product details */}
    </>
  );
};

export default ProductDetail;