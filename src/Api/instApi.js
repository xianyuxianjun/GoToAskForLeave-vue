import {useApi} from "@/utils/api.js";

//根据辅导员id获取辅导员所负责的学生
export const  getStudentList =  async (instId) => {
    const res = await useApi.post("inst/getClassStudent",instId)
    return res.data;
}

export const addClasses = async (data) =>{
    const res = await useApi.post("classes/addClasses",data)
    return res.data;
}

//获取二级学院
export const getDep = async () =>{
    const res = await useApi.get("/dep/getDep")
    return res.data;
}

//更新请假条
export const updateLeave = async (leave) =>{
    const res = await useApi.post("leave/updateLeave",leave)
    return res.data;
}

//根据辅导员id获取请假条
export const getLeaveList = async (instId) =>{
    const res = await useApi.post("/inst/getLeaveList",instId)
    return res.data
}

//根据辅导员id获取所管理的班级
export const getClassList = async (instId) =>{
    const res = await useApi.post("/inst/classList",instId)
    return res.data
}

//辅导员添加学生
export const addCourse = async (course) =>{
    const res = await useApi.post("/course/addCourse",course)
    return res.data
}

//根据辅导员Id获取所管理的课程
export async function  getCourseList(instId){
    const res = await useApi.post("/course/getCourseList",instId)
    return res.data
}

//删除课程
export async function delectCoursee(courseId){
    const res = await useApi.post("/course/delectCourse",{courseId:courseId})
    if (res.data.code === 1){
        console.log(res)
    }else {
        console.log(res.data.message)
    }
}

//根据辅导员id获取所管理的班级
export async function  getClassData(instId){
    const res = await useApi.post("/classes/getClassByInstId",{instId:instId})
    return res.data
}
