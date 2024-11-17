import {useApi} from "@/utils/api.js";

export const  getStudentList =  async (data) => {
    const res = await useApi.post("inst/getClassStudent",data)
    return res.data;
}

export const addClasses = async (data) =>{
    const res = await useApi.post("inst/addClassStudent",data)
    return res.data;
}

export const getDep = async () =>{
    const res = await useApi.get("/dep/getDep")
    return res.data;
}

export const updateLeave = async (data) =>{
    const res = await useApi.post("leave/updateLeave",data)
    return res.data;
}

export const getLeaveList = async (data) =>{
    const res = await useApi.post("/inst/getLeaveList",data)
}
