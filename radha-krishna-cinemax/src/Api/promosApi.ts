import request from "./fetchClient";

export const getActivePromos = async () => {
  const data = await request("/api/promos");
  return data.filter((p: any) => p.isActive === true);
};
