// src/app/product/components/Product.js
const Product = ({ product, index, showProductDetail }) => {
  return (
    <>
      <td className="hidden sm:block">{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.color}</td>
      <td>{product.stock}</td>
      <td>{product.price}</td>
      <td>{product.weight}</td>
      <td>
        {product.product_detail && product.product_detail.length > 0 ? (
          <img
            src={product.product_detail[0].photo}
            alt={`Product ${product.name}`}
            className="w-8 h-8 object-cover rounded"
          />
        ) : (
          "No Photo"
        )}
      </td>
      <td>{product.category ? product.category.category_name : "-"}</td>
      <td>{product.warehouse ? product.warehouse.warehouse_name : "-"}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm sm:btn-md btn-outline btn-orange-600"
          onClick={() => showProductDetail(product)}
        >
          View Detail
        </button>
      </td>
    </>
  );
};

export default Product;


