<script setup lang="ts">
import { useApi } from "@/utils/api";
import LeaveDialog from "@/views/LeaveDialog.vue";
import {onMounted, ref} from "vue";
import { getLeaveList } from '../Api/instApi'
const leaveList = ref([
  {
    leaveId:'1',
    courseName:'操作系统',
    className:'22软件2班',
    stuId:'202209512245',
    stuName:'陈咸鱼',
    reason:'参加校运会',
    daynum:'1',
    status:'未审批',
    audittime:'2024-11-14',
    opinion:''
  }
])
const getData = async ()=>{
  const res = await getLeaveList({instId:'2022001'})
  leaveList.value =res.data
}
onMounted(() => {
  getData()
});
</script>

<template>
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
      </td>
    </tr>
    </tbody>
  </VTable>
</template>
