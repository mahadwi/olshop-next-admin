import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  if (!cookies().get(`adminAccessToken`)) {
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

      <div className="container mx-auto justify-between">
        <h1 className="text-3xl font-bold">Last User Order</h1>
        <div className="lg:flex-col lg:-right-3 lg:-top-12 lg:float-right lg:gap-0 md:flex-row md:gap-5 flex flex-col items-center mt-4">
          <Link href={"/order"}>
            <div className="bg-white hover:bg-gray-200 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-6xl leading-none pt-2">100</h2>
              <p className="text-center text-lg">Total User</p>
            </div>
          </Link>
          <Link href={"/order"}>
            <div className="bg-white hover:bg-gray-200 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-6xl leading-none pt-2">5</h2>
              <p className="text-center text-lg">Total Orders Today</p>
            </div>
          </Link>
          <Link href={"/order"}>
            <div className="bg-white hover:bg-gray-200 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-6xl leading-none pt-2">5</h2>
              <p className="text-center text-lg">Total Orders Today</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
