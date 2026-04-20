import request from "./fetchClient";

export const getFaqs = async () => {
  return request("/api/faqs");
};
