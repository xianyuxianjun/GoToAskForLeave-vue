<script setup>
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
const props = defineProps(['course']);
//更新后的课程信息
const updateCourse = ref({
  classId:'',
  courseName:'',
  year:'',
  term:'',
  hour:''
})
//对话框是否开启
const isDialogVisible = ref(false)
//修改
const xiugai = () => {

}
</script>

<template>
  <VDialog v-model="isDialogVisible" max-width="600">
    <template #activator="{ props }">
      <VBtn color="success" v-bind="props">修改</VBtn>
    </template>

    <VCard title="修改课程">
      <DialogCloseBtn variant="text" size="default" @click="isDialogVisible=false">
      </DialogCloseBtn>
      <VCardText>
        <VRow class="mb-4">
          <VCol cols="12" md="4">
            <VTextField label="课程名称" v-model="updateCourse.courseName" :placeholder="course.courseName"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="班级" v-model="updateCourse.classId" :placeholder="course.className"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学年" v-model="updateCourse.year" :placeholder="course.year"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学期" v-model="updateCourse.term" :placeholder="course.term"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学时" v-model="updateCourse.hour" :placeholder="course.hour"/>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn color="error" @click="isDialogVisible=false">取消</VBtn>
        <VBtn color="success" @click="xiugai">修改</VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">

</style>
