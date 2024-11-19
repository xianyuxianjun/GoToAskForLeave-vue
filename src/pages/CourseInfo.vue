<script setup>
//搜索框的值
import AddCourse from "@/views/AddCourse.vue";
import UpdateClass from "@/views/UpdateCourse.vue";
import { getCourseList,delectCoursee } from "@/Api/instApi.js"
import { onMounted } from "vue";
import {useInstStore} from "@/store/inst.js"
const instStore = useInstStore();
const search = ref('')
//搜索的函数
const searchClass = () => {
}
//表格头
const headers = ref([
  {title:'课程名称',key:'courseName'},
  {title:'班级',key:'className'},
  {title:'学年',key:'year'},
  {title:'学期',key:'term'},
  {title:'学时',key:'hour'},
  {title: '操作',key: 'cao'}
])
//表格数据
const courseData = ref([
])
//获取表格数据
async function getData(){
  const res = await getCourseList({instId:instStore.instId})
  console.log("asdasd")
  console.log(res)
  courseData.value=[]
  for (let i =0; i<res.data.length; i++){
    courseData.value.push(res.data[i])
  }
}
//删除课程
 async function delectCourse(courseId) {
    await delectCoursee(courseId)
    await getData()
    alert("删除成功")
   console.log("aaa")
   console.log(courseData)
}
function closeDig(){
  getData()
}
onMounted(()=>{
  getData()
})
</script>

<template>
    <VCard title="班级信息">
      <VCardText>
        <VRow class="mb-4">
          <VCol cols="12" sm="6" md="2">
            <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchClass"></VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <AddCourse @close="closeDig"></AddCourse>
          </VCol>
        </VRow>
      </VCardText>
      <VDataTable :headers="headers" :items="courseData">
      <template #item.cao="{ item }">
        <VBtn color="error" @click="delectCourse(item.courseId)">删除</VBtn>
        <UpdateClass :course ="item" @close="closeDig"/>
      </template>
      </VDataTable>
    </VCard>
</template>

<style scoped lang="scss">

</style>
