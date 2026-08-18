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