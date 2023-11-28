const Warehouse = ({ warehouse, index }) => {
    return (
      <>
        <td className="hidden sm:block">{index + 1} </td>
        <td>{warehouse.warehouse_name} </td>
        <td>{warehouse.address} </td>
        <td className="flex">
          Edit
        </td>
      </>
    );
  };
  
  export default Warehouse;
  