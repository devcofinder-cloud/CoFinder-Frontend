
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

export interface ProfessionalProfile {
  _id: string;
  user: string;
  headline?: string;
  about?: string;
  currentRole?: string;
  currentCompany?: string;
  industry?: string;
  experienceLevel?: string;
  skills?: {
    name: string;
    level: string;
  }[];
  experience?: {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    projectUrl?: string;
    githubUrl?: string;
  }[];
  certifications?: {
    name: string;
    issuingOrganization: string;
    issueDate: string;
    credentialId?: string;
    credentialUrl?: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdatePayload {
  name?: string;
  username?: string;
  displayName?: string;
  location?: string;
  age?: number;
  gender?: string;
  profileImage?: File | string;
  profileImageType?: "avatar" | "image";
}

export interface UpdateProfessionalProfilePayload {
  headline?: string;
  about?: string;
  currentRole?: string;
  currentCompany?: string;
  industry?: string;
  experienceLevel?: string;
  skills?: {
    name: string;
    level: string;
  }[];
  experience?: {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    projectUrl?: string;
    githubUrl?: string;
  }[];
  certifications?: {
    name: string;
    issuingOrganization: string;
    issueDate: string;
    credentialId?: string;
    credentialUrl?: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
}


export const googleLogin = async (firebaseToken: string) => {
  const response = await api.post("/user/google-login", {
    firebaseToken,
  });

  return response.data;
};



export const googleRegister = async (firebaseToken: string) => {
  const response = await api.post("/user/google-register", {
    firebaseToken,
  });

  return response.data;
};



export const login = async (data: LoginPayload) => {
  const response = await api.post("/user/login", data);
  return response.data;
};

export const register = async (data: RegisterPayload) => {
  const response = await api.post("/user/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const editProfile = async (data: UpdatePayload) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.username !== undefined) {
    formData.append("username", data.username);
  }

  if (data.displayName !== undefined) {
    formData.append("displayName", data.displayName);
  }

  if (data.location !== undefined) {
    formData.append("location", data.location);
  }

  if (data.age !== undefined) {
    formData.append("age", String(data.age));
  }

  if (data.gender !== undefined) {
    formData.append("gender", data.gender);
  }

  if (data.profileImage !== undefined) {
    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    } else {
      formData.append("profileImage", data.profileImage);
    }
  }

  if (data.profileImageType !== undefined) {
    formData.append("profileImageType", data.profileImageType);
  }

  const response = await api.put(
    "/user/edit-profile",
    formData
  );

  return response.data;
};

export const getProfessionalProfile = (userId: string) => {
  return api.get("/professional", {
    params: {
      userId,
    },
  });
};

export const updateProfessionalProfile = (
  userId: string,
  data: UpdateProfessionalProfilePayload,
) => {
  return api.put("/professional", {
    userId,
    ...data,
  });
};
