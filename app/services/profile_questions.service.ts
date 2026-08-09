import api from "@/app/lib/axios";


export const  getProfileQuestions=(setNumber: Number)=>{
    return api.get(`/user/profile-questions/${setNumber}`)
}


export const submitProfileAnswer = (
  setNumber: number,
  answers: {
    question: string;
    answer: string;
  }[]
) => {
  return api.post(`/user/profile-questions/${setNumber}`, {
    answers,
  });
};