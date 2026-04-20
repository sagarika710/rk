import request from "./fetchClient";

export const apiGet = (url) =>
  request(url, {
    method: "GET",
  });

export const apiPost = (url, data) =>
  request(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const apiPut = (url, data) =>
  request(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const apiDelete = (url) =>
  request(url, {
    method: "DELETE",
  });
