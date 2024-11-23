<script setup>
import { ref,onMounted } from "vue"
import {useUserStore} from "@/store/user.js";
import {addleave, getCourse, getLeaveData} from "@/Api/student.js"
import AppDateTimePicker from "@core/components/app-form-elements/AppDateTimePicker.vue";
import { isObjectEmpty } from "@/utils/isObjectEmpty.js"
//用户公共数据
const userStore = useUserStore()
//表格头
const heards = ref([
  {title:'请假课程',key:'courseName'},
  {title:'请假天数',key:'daynum'},
  {title:'请假时间',key:'audittime'},
  {title:'状态',key:'status'},
  {title:'操作',key:'cao'},
])
//获取的请假条
const leaveDate = ref([])
//表格展示的数据
const leaveList = ref([])
//学生的课程列表
const courseList = ref([])
//请假条
const leave = ref({})
//请假框是否打开
const qj = ref(false)
//搜索框的值
const search = ref('')
//搜索
function searchLeave(){
  leaveList.value = leaveDate.value.filter(item => item.courseName === search.value)
  search.value = ''
}
//获取数据
async function getData(){
  const res = await getLeaveData(userStore.userId)
  leaveDate.value = res.data
  leaveList.value = leaveDate.value
}
//获取学生的课程列表
async function getcourseList(){
  const res = await getCourse(userStore.userId)
  console.log("aaa")
  console.log(res)
  courseList.value = res.data
}
onMounted(()=>{
  getData()
  getcourseList()
})
//请假
function qingjia() {
  qj.value = true
}
//提交申请
async function shenqing(){
  if (!isObjectEmpty(leave.value)){
    alert("请填写完整数据")
    return
  }
  leave.value.stuId = userStore.userId
  const res = await addleave(leave.value)
  console.log(res)
  if (res.code ===1){
    alert("申请成功")
    await getData()
  }
}
</script>
<template>
  <VCard title="请假条">
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchLeave"/>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="qingjia">请假</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VDataTable :headers="heards" :items="leaveList">
    <template #item.cao="{ item }">
      <VBtn>查看</VBtn>
    </template>
    </VDataTable>
  </VCard>
  <VDialog v-model="qj" max-width="600">
    <VCard title="请假条">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="qj = false"
      />
      <VCardText>
        <VRow class="md-5">
          <VCol cols="12" md="4">
            <VSelect label="请假课程" :items="courseList" v-model="leave.courseId"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="请假天数" v-model="leave.daynum"/>
          </VCol>
          <VCol cols="12" md="4">
            <AppDateTimePicker v-model="leave.audittime" label="请假时间" />
          </VCol>
          <VCol cols="12">
            <VTextarea label="请假事由" v-model="leave.reason"/>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="qj=false"
        >
          取消
        </VBtn>
        <VBtn
          color="success"
          @click="shenqing"
        >
          提交申请
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
