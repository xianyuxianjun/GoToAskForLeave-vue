<script setup>
//搜索框的值
import AddCourse from "@/views/AddCourse.vue";
import UpdateClass from "@/views/UpdateCourse.vue";
import { getCourseList,delectCoursee } from "@/Api/instApi.js"
import { onMounted } from "vue";
import {useUserStore} from "@/store/user.js"
const userStore = useUserStore();
const search = ref('')
//搜索的函数
const searchClass = () => {
  if (search.value === ''){
    getData()
    return
  }
  courseList.value = courseData.value.filter(item => item.courseName === search.value)
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
const courseList = ref([])
//获取表格数据
async function getData(){
  const res = await getCourseList({instId:userStore.userId})
  courseData.value = res.data
  courseList.value = courseData.value
}
//删除课程
 async function delectCourse() {
    await delectCoursee(delectIndex.value)
    await getData()
    ssale("删除成功")
   delectDig.value = false
}
function closeDig(){
  getData()
}
onMounted(()=>{
  getData()
})
const delectIndex = ref('')
function deleteItem(item){
  delectIndex.value = item.courseId
  delectDig.value = true
}
const delectDig = ref(false)
const sale = ref(false)
const dale = ref(false)
const message = ref('')
function ssale(mes){
  message.value = mes
  sale.value = true
}
function ddale(mes){
  message.value = mes
  dale.value = true
}
const options = ref({ page: 1, itemsPerPage: 10, sortBy: [''], sortDesc: [false] })

</script>

<template>
  <VSnackbar v-model="sale"  location="top" color="success">
    {{ message }}
  </VSnackbar>
  <VSnackbar v-model="dale"  location="top" color="error">
    {{ message }}
  </VSnackbar>
    <VCard>
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
      <VDataTable :headers="headers" :items="courseList"  :items-per-page="options.itemsPerPage"
                  :page="options.page"
                  :options="options"
                  height="70vh"
                  class="text-no-wrap">
      <template #item.cao="{ item }">
        <IconBtn
          size="small"
          @click="deleteItem(item)"
        >
          <VIcon icon="ri-delete-bin-line" />
        </IconBtn>
        <UpdateClass :course ="item" @close="closeDig"/>
      </template>
        <template #bottom>
          <VCardText class="pt-2">
            <div class="d-flex flex-wrap justify-center  gap-y-2 mt-2">
              <VPagination
                v-model="options.page"
                :total-visible="$vuetify.display.smAndDown ? 2 : 3"
                :length="Math.ceil(courseList.length / options.itemsPerPage)"
              />
            </div>
          </VCardText>
        </template>
      </VDataTable>
      <VDialog
        v-model="delectDig"
        max-width="500px"
      >
        <VCard>
          <VCardTitle>
            你是否要删除该kec
          </VCardTitle>

          <VCardActions>
            <VSpacer />

            <VBtn
              color="error"
              variant="outlined"
              @click="delectDig=false"
            >
              取消
            </VBtn>

            <VBtn
              color="success"
              variant="elevated"
              @click="delectCourse"
            >
              删除
            </VBtn>

            <VSpacer />
          </VCardActions>
        </VCard>
      </VDialog>
    </VCard>
</template>

<style scoped lang="scss">

</style>
