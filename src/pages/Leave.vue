<script setup lang="ts">
import LeaveDialog from "@/views/LeaveDialog.vue";

const desserts = [
  {
    stuId: '202209512245',
    stuName: '陈咸鱼',
    classId: '22软件工程2班',
    courseId: 'Vue',
    daynum: '1',
    applytime: '2022-11-12',
    audittime:'',
    status:'未通过'
  },
  {
    stuId: '202209512246',
    stuName: '陈咸鱼',
    classId: '22软件工程2班',
    courseId: 'Vue',
    daynum: '1',
    applytime: '2022-11-12',
    audittime:'',
    status:'已通过'
  },
  {
    stuId: '202209512246',
    stuName: '陈咸鱼',
    classId: '22软件工程2班',
    courseId: 'Vue',
    daynum: '1',
    applytime: '2022-11-12',
    audittime:'',
    status:'未审批'
  },
]
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
      v-for="item in desserts"
      :key="item.stuId"
    >
      <td>
        {{ item.stuId }}
      </td>
      <td>
        {{ item.stuName }}
      </td>
      <td>
        {{ item.classId }}
      </td>
      <td>
        {{ item.courseId }}
      </td>
      <td>
        {{ item.daynum }}
      </td>
      <td>
        {{ item.applytime }}
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
        <LeaveDialog></LeaveDialog>
      </td>
    </tr>
    </tbody>
  </VTable>
</template>
