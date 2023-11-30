// src/app/product/components/Product.js
const Product = ({ product, index, showProductDetail }) => {
  return (
    <>
      <div>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <button
          type="button"
          className="btn btn-sm sm:btn-md btn-outline btn-orange-600"
          onClick={() => showProductDetail(product)}
        >
          View Detail
        </button>
      </div>
    </>
  );
};

export default Product;

