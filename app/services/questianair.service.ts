import api from "@/app/lib/axios";

export const getQuestions = async () => {
  const response = await api.get("/user/questions");

  return response.data;
};

export const submitQuestionnaire = async (data: any) => {
  const response = await api.post("/user/question/questionnaire", data);

  return response.data;
};