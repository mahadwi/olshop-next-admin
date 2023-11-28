// import Warehouse from "./components/Warehouse";
// import { getAllWarehouse } from "./components/fetch";
// // import { cookies } from "next/headers";
// import AddWarehouse from "./components/AddWarehouse";

// export default async function Page() {
//   const Warehouses = await getAllWarehouse();

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="w-3/4">
//         <h1 className="text-4xl font-bold text-center mb-10">List Warehouse First Step</h1>
//         <div>
//           <AddWarehouse />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table table-zebra w-full table-sm sm:table-md">
//             <thead>
//               <tr>
//                 <th className="hidden sm:block">No</th>
//                 <th>Warehouse Name</th>
//                 <th>Address</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Warehouses.data.map((warehouse, index) => (
//                 <tr key={warehouse.id}>
//                   <Warehouse warehouse={warehouse} index={index} />
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
