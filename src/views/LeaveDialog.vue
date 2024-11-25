<script lang="ts" setup>
import {ref, toRefs, watch} from "vue";
import { updateLeave } from '../Api/instApi.js'
const isDialogVisible = ref(false)
const {leave} = defineProps(['leave'])
const data = ref({
  leaveId:leave.leaveId,
  courseName:leave.courseName,
  className:leave.className,
  stuId:leave.stuId,
  stuName:leave.stuName,
  reason:leave.reason,
  daynum:leave.daynum,
  status:leave.status,
  audittime:leave.audittime,
  opinion:leave.opinion
})
//拒绝
const jujue = async ()=>{
  data.value.status = '未通过'
  const res = await updateLeave(data.value)
  isDialogVisible.value=false
}
//同意
const tongyi =async ()=>{
  alert("同i")
  data.value.status = '已通过'
  const res = await updateLeave(data.value)
  isDialogVisible.value = false
}
const isture = ref(false)
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props" :disabled="data.status === '未审批' ? false : true ">
        批复
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard title="请假条">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="isDialogVisible = false"
      />
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="data.stuName"
              label="请假人"
              placeholder="请假人"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="data.daynum"
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
              v-model="data.courseName"
              label="请假课程"
              persistent-hint
              placeholder="Doe"
              readonly
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="data.audittime"
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
              v-model="data.reason"
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
              v-model="data.opinion"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="jujue"
        >
          拒绝
        </VBtn>
        <VBtn
          color="success"
          @click="tongyi"
        >
          同意
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
