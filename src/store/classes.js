import {defineStore} from "pinia";

export const useClassesStore = defineStore('classes',{
    //公共数据
    state(){
        return{
            classId:'',//班级id
        }
    }
})
