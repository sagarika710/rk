import request from "./fetchClient";

export const getReviews = async () => {
  return request("/api/reviews");
};
