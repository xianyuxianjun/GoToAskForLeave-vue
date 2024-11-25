<script setup lang="ts">
import { useUserStore } from "@/store/user.js"
import * as XLSX from 'xlsx';
const userStore = useUserStore();
import LeaveDialog from "@/views/LeaveDialog.vue";
import {onMounted, ref} from "vue";
import {delectLeave, getLeaveList,getClassList} from "@/Api/instApi"
const leaveList = ref([
])
const leaveData = ref([])
const getData = async ()=>{
  const res = await getLeaveList({instId:userStore.userId})
  leaveData.value =res.data
  leaveList.value = leaveData.value
}
const getClass = async ()=>{
  const res = await getClassList({instId:userStore.userId})
  classList.value = res.data
}
const search = ref('')
function searchStudent(){
  leaveList.value = leaveData.value.filter(item => item.stuName === search.value)
  search.value = ''
}
const classes = ref('')
const classList = ref([])
async function select(){
  leaveList.value = leaveData.value.filter(item => item.className = classes.value)
}
async function deleteItem(){
  const res = await delectLeave(delectIndex.value)
  if (res.code === 1){
    ssale("删除成功")
     await getData()
    delectDig.value =false
    return
  }
  ddale(res.message)
}
onMounted(() => {
  getData()
  getClass()
});
const delectIndex = ref('')
const delectDig = ref(false)
function delect(item){
  delectIndex.value = item.leaveId
  delectDig.value=false
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
const exportToExcel = () => {
  // 自定义表头
  const headers = [
    { header: '审核时间', key: 'audittime' },
    { header: '班级名称', key: 'className' },
    { header: '课程名称', key: 'courseName' },
    { header: '请假天数', key: 'daynum' },
    { header: '请假ID', key: 'leaveId' },
    { header: '意见', key: 'opinion' },
    { header: '理由', key: 'reason' },
    { header: '状态', key: 'status' },
    { header: '学生ID', key: 'stuId' },
    { header: '学生姓名', key: 'stuName' }
  ];

  // 创建一个空的工作表
  const worksheet = XLSX.utils.json_to_sheet([]);

  // 添加自定义表头
  XLSX.utils.sheet_add_aoa(worksheet, [headers.map(h => h.header)]);

  // 将数据添加到工作表中
  leaveList.value.forEach(row => {
    const rowData = headers.map(header => row[header.key]);
    XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: -1 });
  });

  // 创建工作簿
  const workbook = XLSX.utils.book_new();

  // 将工作表添加到工作簿中
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 生成并下载 Excel 文件
  XLSX.writeFile(workbook, 'leave.xlsx');
};
</script>

<template>
  <VSnackbar v-model="sale"  location="top" color="success">
    {{ message }}
  </VSnackbar>
  <VSnackbar v-model="dale"  location="top" color="error">
    {{ message }}
  </VSnackbar>
  <VCard title="请假审批">
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchStudent"/>
        </VCol>
        <VCol cols="12" md="2">
          <VSelect label="班级" :items="classList" v-model="classes" @change="select"/>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="exportToExcel">导出请假名单</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VTable
      height="80vh"
      fixed-header
    >
      <thead>
      <tr>
        <th class="text-uppercase">
          学号
        </th>
        <th class="text-uppercase">
          姓名
        </th>
        <th class="text-uppercase">
          班级
        </th>
        <th class="text-uppercase">
          请假课程
        </th>
        <th class="text-uppercase">
          请假天数
        </th>
        <th class="text-uppercase">
          请假时间
        </th>
        <th class="text-uppercase">
          审批状态
        </th>
        <th class="text-uppercase">
          操作
        </th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="item in leaveList"
        :key="item.leaveId"
      >
        <td>
          {{ item.stuId }}
        </td>
        <td>
          {{ item.stuName }}
        </td>
        <td>
          {{ item.className }}
        </td>
        <td>
          {{ item.courseName }}
        </td>
        <td>
          {{ item.daynum }}
        </td>
        <td>
          {{ item.audittime }}
        </td>
        <td>
          <VChip v-if="item.status === '未通过'" color="error">
            {{ item.status }}
          </VChip>
          <VChip v-if="item.status === '已通过'" color="success">
            {{ item.status }}
          </VChip>
          <VChip v-if="item.status === '未审批'" color="secondary">
            {{ item.status }}
          </VChip>
        </td>
        <td>
          <LeaveDialog :leave="item"></LeaveDialog>
          <IconBtn
            size="small"
            @click="delect(item)"
          >
            <VIcon icon="ri-delete-bin-line" />
          </IconBtn>
        </td>
      </tr>
      </tbody>
    </VTable>
    <VDialog
      v-model="delectDig"
      max-width="500px"
    >
      <VCard>
        <VCardTitle>
          你是否要删除该请假记录
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
            @click="deleteItem"
          >
            删除
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
  </VCard>
</template>
