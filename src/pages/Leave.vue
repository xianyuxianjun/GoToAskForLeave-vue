<script setup lang="ts">
import { useUserStore } from "@/store/user.js"
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
    alert("删除成功")
     await getData()
    delectDig.value =false
    return
  }
  alert("删除失败："+res.message)
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
</script>

<template>
  <VCard title="请假审批">
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchStudent"/>
        </VCol>
        <VCol cols="12" md="2">
          <VSelect label="班级" :items="classList" v-model="classes" @change="select"/>
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
