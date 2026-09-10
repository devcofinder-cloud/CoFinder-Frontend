import api from "../lib/axios"

export const getOtherUsers=()=>{
    return api.get('/dashboard')
}


export const getOtherPosts=()=>{
    return api.get('/dashboard/explore')
}

export const getUserProfileById=(userId:String)=>{
    return api.get(`/dashboard/profile/${userId}`)
}

export const getPostsByUserId = (userId:string)=>{
    return api.get(`/dashboard/profile/posts/${userId}`)
}



export const getRecommendedUsers = async (limit = 10) => {
  const response = await api.get(
    `/dashboard/recommended?limit=${limit}`
  );

  return response.data;
};


export const getSameArchetypeUsers = async (limit = 10) => {
  const response = await api.get(
    `/dashboard/same-archetype?limit=${limit}`
  );

  return response.data;
};


export const getNearbyUsers = async (limit = 10) => {
  const response = await api.get(
    `/dashboard/nearby?limit=${limit}`
  );

  return response.data;
};


export const universalSearch = async (
    query = "",
    limit = 10
) => {
    const response = await api.get(
        `/dashboard/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );

    return response.data;
};



export const getPostById = (id:string)=>{
  return api.get(`/posts/${id}`)
}

export const recordProfileView = (profileId: string) => {
  return api.post(`/profile-count/${profileId}`);
};

export const getProfileViewCount = (profileId: string) => {
  return api.get(`/profile-count/${profileId}/count`);
};