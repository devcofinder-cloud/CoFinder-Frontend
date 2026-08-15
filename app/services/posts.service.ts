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
