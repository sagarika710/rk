import request from "./fetchClient";

export const getPasses = async () => {
  return request("/api/passes");
};
