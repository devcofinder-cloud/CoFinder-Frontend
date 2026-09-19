import api from "../lib/axios";

export const chatWithAI = async (data: {
  message: string;
  history?: {
    role: "user" | "assistant";
    content: string;
  }[];
}) => {
  const response = await api.post("/ai/chat", data);

  return response.data;
};