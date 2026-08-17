import api from "../lib/axios"

export const getOtherUsers=()=>{
    return api.get('/dashboard')
}


export const getOtherPosts=()=>{
    return api.get('/dashboard/explore')
}

