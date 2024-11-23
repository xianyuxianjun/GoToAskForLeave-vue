import {useApi} from "@/utils/api.js";

export async function getLeaveData(userId){
    const res = await useApi.post("/leave/getLeaveByStuId",{stuId:userId})
    return res.data
}

export async function addleave(leave){
    const res = await useApi.post("/leave/addLeave",leave)
}

export async function  getCourse(stuId){
    const res = await useApi.post("/course/getCourse",{stuId:stuId})
    return res.data
}
