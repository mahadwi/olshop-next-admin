import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!cookies().get(`adminAccessToken`)) {
    redirect(`/login`);
  }

  return (
    <>
        Dashboard
    </>
  );
}
