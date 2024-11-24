import {useApi} from "@/utils/api.js";

export async function getAllInst(){
    const res = await useApi.post("/inst/getAllInst")
    return res.data
}

export async function delectInst(instId){
    const res = await useApi.post("/inst/delectInst",{instId:instId})
    return res.data
}

export async function addInst(inst){
    const res = await useApi.post("/inst/addInst",inst)
    return res.data
}

export async function updateInst(inst){
    const res = await useApi.post("/inst/updateInst",inst)
    return res.data
}

export async function getAllClasses(){
    const res = await useApi.post("/classes/getAllClasses")
    return res.data
}

export async function getInstItem(){
    const res = await useApi.post("/inst/getInstItem")
    return res.data
}

export async function updateClassesAdmin(classes){
    const res = await useApi.post("/classes/updateClassesAdmin",classes)
    return res.data
}
