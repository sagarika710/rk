import request from "./fetchClient";

export const getEvents = async () => {
  return request("/api/events");
};
