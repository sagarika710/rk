import request from "./fetchClient";

export const getServices = async () => {
  return request("/api/services");
};
