import api from "../lib/axios"

export const getOtherUsers=()=>{
    return api.get('/dashboard')
}



