<script setup>
import { ref,onMounted } from "vue"
import {useUserStore} from "@/store/user.js";
import {addleave, getCourse, getLeaveData} from "@/Api/student.js"
import AppDateTimePicker from "@core/components/app-form-elements/AppDateTimePicker.vue";
import { isObjectEmpty } from "@/utils/isObjectEmpty.js"
import {delectLeave} from "@/Api/instApi.js";
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
const leave = ref({
  stuId:'',
  courseId:'',
  reason:'',
  daynum:'',
  audittime:''
})
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
async function getCourseList(){
  const res = await getCourse(userStore.userId)
  courseList.value = res.data
}
onMounted(()=>{
  getData()
  getCourseList()
})
//请假
function qingjia() {
  qj.value = true
}
//提交申请
async function shenqing(){
  leave.value.stuId = userStore.userId
  if (!isObjectEmpty(leave)){
    ssale("请输入完整数据")
    return
  }
  const res = await addleave(leave.value)
  if (res.code ===1){
    ssale("申请成功")
    await getData()
    leave.value = {
      stuId:'',
      courseId:'',
      reason:'',
      daynum:'',
      audittime:''
    }
    qj.value = false
  }
}
const ck = ref(false)
const ckData = ref({})
//查看请假条
function chakan(item) {
  ck.value = true
  ckData.value = item
}
//删除请假条
async function deleteItem(item){
  console.log(item.leaveId)
  const res = await delectLeave(item.leaveId)
  if (res.code === 1){
    ssale("删除成功")
    await getData()
  }
}
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
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchLeave"/>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="qingjia">请假</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VDataTable :headers="heards" :items="leaveList"  :items-per-page="options.itemsPerPage"
                :page="options.page"
                :options="options"
                height="70vh"
                class="text-no-wrap">
    <template #item.cao="{ item }">
      <VBtn @click="chakan(item)">查看</VBtn>
      <IconBtn
        size="small"
        @click="deleteItem(item)"
      >
        <VIcon icon="ri-delete-bin-line" />
      </IconBtn>
    </template>
      <template #item.status="{ item }">
        <VChip v-if="item.status === '未通过'" color="error">
          {{ item.status }}
        </VChip>
        <VChip v-if="item.status === '已通过'" color="success">
          {{ item.status }}
        </VChip>
        <VChip v-if="item.status === '未审批'" color="secondary">
          {{ item.status }}
        </VChip>
      </template>
      <template #bottom>
        <VCardText class="pt-2">
          <div class="d-flex flex-wrap justify-center gap-y-2 mt-2">
            <VPagination
              v-model="options.page"
              :total-visible="$vuetify.display.smAndDown ? 2 : 3"
              :length="Math.ceil(leaveList.length / options.itemsPerPage)"
            />
          </div>
        </VCardText>
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
  <VDialog v-model="ck" max-width="600">
    <VCard title="请假条">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="ck = false"
      />
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="ckData.daynum"
              label="请假天数"
              placeholder="请假天数"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="ckData.courseName"
              label="请假课程"
              persistent-hint
              placeholder="Doe"
              readonly
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="ckData.audittime"
              label="请假时间"
              placeholder="请假时间"
              readonly
            />
          </VCol>
          <VCol cols="12">

          </VCol>
          <VCol
            cols="12"
            sm="12"
          >
            <VTextarea
              v-model="ckData.reason"
              label="请假事由"
              placeholder="请假事由"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            sm="12"
          >
            <VTextarea
              label="批复"
              placeholder="批复"
              v-model="ckData.opinion"
              readonly
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="ck=false"
        >
          关闭
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
