import BASE_URL from "@/lib/baseUrl";

export const getAllWarehouse = async () => {
    try {
      const res = await fetch(`${BASE_URL}/warehouse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbjIiLCJpYXQiOjE3MDExMjY0MzcsImV4cCI6MTcwMTEzMDAzN30.5hlADWalHGJbXc_QEJznAj6SMDqULYabtxBTDKeO0Rc`}`,
        },
        cache: "no-store",
      });
      const warehouse = await res.json();
      return warehouse;
    } catch (error) {
      console.log(error);
    }
  };
  