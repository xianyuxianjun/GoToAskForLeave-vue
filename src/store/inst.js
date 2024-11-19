import {defineStore} from "pinia";

export const useInstStore = defineStore('inst',{
    //公共数据
    state(){
        return{
            instId:'',
        }
    }
})
