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

export async function getAllUser(){
    const res = await useApi.post("/user/getAllUser")
    return res.data
}

export async function delectUser(userId){
    const res = await useApi.post("/user/delectUser",{userId:userId})
    return res.data
}

export async function addUser(user){
    const res = await useApi.post("/user/addUser",user)
    return res.data
}

export async function updateUser(user){
    const res = await useApi.post("/user/updateUser",user)
    return res.data
}

export async function getAllCourse(){
    const res = await useApi.post("/course/getAllCourse")
    return res.data
}

export async function getAllClassList(){
    const res = await useApi.post("/classes/getAllClassItem")
    return res.data
}

export async function delectDep(depId){
    const res = await useApi.post("/dep/delectDep",{depId:depId})
    return res.data
}

export async function addDep(dep){
    const res = await useApi.post("/dep/addDep",dep)
    return res.data
}

export async function updateDep(dep){
    const res = await useApi.post("/dep/updateDep",dep)
    return res.data
}

export async function getAllDep(){
    const res = await useApi.post("/dep/getAllDep")
    return  res.data
}
