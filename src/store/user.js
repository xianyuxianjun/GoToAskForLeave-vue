import {defineStore} from "pinia";

export const useUserStore = defineStore('user',{
    //公共数据
    state(){
        return{
            userId:'',//用户id
            role:'',//角色
        }
    }
})
