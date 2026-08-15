import api from "@/app/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}


export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  displayName: string;
  location: string;
  age: string;
  gender: string;
}

export const login = async (data: LoginPayload) => {
  const response = await api.post("/user/login", data);

  return response.data;
};



export const register = async (data: RegisterPayload) => {
  const response = await api.post("/user/register", data);
  return response.data;
};


export const getProfile = ()=>{
  return api.get('/user/me')
}