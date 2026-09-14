import api from "../lib/axios"


export const createPost = (data: FormData) => {
  return api.post("/posts", data);
};
export const getMyPosts = ()=>{
    return api.get('/posts/my-post')
}


export const updatePost = (
  postId: string,
  data: { content: string }
) => {
  return api.patch(`/posts/${postId}`, data);
};

export const deletePost = (id:String)=>{
    return api.delete(`/posts/${id}`)
}


export const getPostById = (id:String)=>{
    return api.get(`/posts/${id}`)
}


export const toggleSavePost = async (postId: string) => {
  const response = await api.post(
    `/posts/${postId}/save`
  );

  return response.data;
};

export const getSavedPosts = async () => {
  const response = await api.get("/posts/saved");

  return response.data;
};