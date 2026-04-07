import request from "./fetchClient";

/* ================= AUTH ================= */

export const adminLogin = (username: string, password: string) => {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

/* ================= MOVIES ================= */

export const createMovie = (data: any) => {
  return request("/api/movies", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateMovie = (id: string, data: any) => {
  return request(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteMovie = (id: string) => {
  return request(`/api/movies/${id}`, {
    method: "DELETE",
  });
};

/* ================= PROMOS / ADS ================= */

export const createPromo = (data: any) => {
  return request("/api/promos", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePromo = (id: string, data: any) => {
  return request(`/api/promos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePromo = (id: string) => {
  return request(`/api/promos/${id}`, {
    method: "DELETE",
  });
};

/* ================= REVIEWS ================= */

export const deleteReview = (id: string) => {
  return request(`/api/reviews/${id}`, {
    method: "DELETE",
  });
};

/* ================= FAQ ================= */

export const createFaq = (data: any) => {
  return request("/api/faqs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateFaq = (id: string, data: any) => {
  return request(`/api/faqs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteFaq = (id: string) => {
  return request(`/api/faqs/${id}`, {
    method: "DELETE",
  });
};

/* ================= PASSES ================= */

export const createPass = (data: any) => {
  return request("/api/passes", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePass = (id: string, data: any) => {
  return request(`/api/passes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePass = (id: string) => {
  return request(`/api/passes/${id}`, {
    method: "DELETE",
  });
};

/* ================= CHATBOT ================= */

export const createChatbot = (data: any) => {
  return request("/api/chatbot", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateChatbot = (id: string, data: any) => {
  return request(`/api/chatbot/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteChatbot = (id: string) => {
  return request(`/api/chatbot/${id}`, {
    method: "DELETE",
  });
};

/* ================= EVENTS ================= */

export const createEvent = (data: any) => {
  return request("/api/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateEvent = (id: string, data: any) => {
  return request(`/api/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteEvent = (id: string) => {
  return request(`/api/events/${id}`, {
    method: "DELETE",
  });
};

/* ================= SERVICES ================= */

export const createService = (data: any) => {
  return request("/api/services", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateService = (id: string, data: any) => {
  return request(`/api/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteService = (id: string) => {
  return request(`/api/services/${id}`, {
    method: "DELETE",
  });
};
