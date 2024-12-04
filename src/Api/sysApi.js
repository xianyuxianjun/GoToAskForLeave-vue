import { useApi } from "@/utils/api"

export const loginApi = async user =>{
  const res = await useApi.post("/api/login", user)
  
  return res.data
}

export const registerApi = async user =>{
  const res = await useApi.post("/api/register", user)
  
  return res.data
}
