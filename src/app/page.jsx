import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllCustomer } from "@/fetch/customer";

export default async function Home() {
  const token = cookies().get("adminAccessToken");
  const Customers = await getAllCustomer(token.value);

  if (!token) {
    redirect(`/login`);
  }

  return (
    <>
      <div className="container mx-auto mt-20 justify-center text-center">
        <div className="mx-auto text-center mb-20 md:w-full lg:w-1/2 justify-center items-center">
          <p className="text-2xl mb-2 font-bold">Welcome back to</p>
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard First Step</h1>
        </div>
      </div>

      <div className="container mx-auto flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold mb-4">Last User Order</h1>
          <table className="table table-zebra table-sm md:w-3/4">
            <thead>
              <tr>
                <th className="hidden sm:block">No</th>
                <th>Username User</th>
                <th>Email User</th>
                <th>Phone User</th>
              </tr>
            </thead>
            <tbody>
              {Customers.data.map((customer, index) => (
                <tr key={customer.id}>
                  <td className="hidden sm:block">{index + 1}</td>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center">
          <Link href={"/order"}>
            <div className="bg-primary text-white hover:bg-orange-400 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-5xl leading-none pt-2 mt-2">100</h2>
              <p className="text-center text-lg">Total User</p>
            </div>
          </Link>
          <Link href={"/order"}>
            <div className="bg-primary text-white hover:bg-orange-400 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-5xl leading-none pt-2 mt-2">10</h2>
              <p className="text-center text-lg">Total Product Today</p>
            </div>
          </Link>
          <Link href={"/order"}>
            <div className="bg-primary text-white hover:bg-orange-400 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-5xl leading-none pt-2 mt-2">150</h2>
              <p className="text-center text-lg">Total Orders Today</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}