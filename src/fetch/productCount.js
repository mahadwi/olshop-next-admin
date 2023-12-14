import BASE_URL from "@/lib/baseUrl";

export const getAllProduct = async (token) => {
    try {
      const res = await fetch(`${BASE_URL}/products/admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      const productsResponse = await res.json();
      // console.log(await res.json());
      return productsResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  