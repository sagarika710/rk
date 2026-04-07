import request from "./fetchClient";

export const getChatbotOptions = async () => {
  return request("/api/chatbot/options");
};
