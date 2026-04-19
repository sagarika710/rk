const BASE_URL = import.meta.env.VITE_BASE_URL || '';

const request = async (url: string, options: any = {}) => {
  const token = localStorage.getItem("admin_token");
  const headers: any = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";
    try {
      const err = await response.json();
      errorMessage = err.message || errorMessage;
    } catch (_) {}

    throw new Error(errorMessage);
  }

  return response.json();
};

export default request;
