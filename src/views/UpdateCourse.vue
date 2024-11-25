<script setup>
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import { updateCourse } from "@/Api/instApi.js"
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"
const props = defineProps(['course']);
const emit = defineEmits(['close'])
//更新后的课程信息
const newCourse = ref({
  courseId:'',
  classId:'',
  courseName:'',
  year:'',
  term:'',
  hour:''
})

newCourse.value = props.course
console.log(newCourse.value)
//对话框是否开启
const isDialogVisible = ref(false)
//修改
const xiugai = async () => {
  newCourse.value.courseId = props.course.courseId
  if (!isObjectEmpty(newCourse.value)){
    ssale("修改成功")
    return
  }
  const res =  await updateCourse(newCourse.value)
  if (res.code === 1){
    ssale("修改成功")
    isDialogVisible.value = false
    emit('close')
  }else {
    ddale(res.message)
    isDialogVisible.value = false
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
</script>

<template>
  <VSnackbar v-model="sale"  location="top" color="success">
    {{ message }}
  </VSnackbar>
  <VSnackbar v-model="dale"  location="top" color="error">
    {{ message }}
  </VSnackbar>
  <VDialog v-model="isDialogVisible" max-width="600">
    <template #activator="{ props }">
      <IconBtn
        size="small"
        v-bind="props"
      >
        <VIcon icon="ri-pencil-line" />
      </IconBtn>
    </template>

    <VCard title="修改课程">
      <DialogCloseBtn variant="text" size="default" @click="isDialogVisible=false">
      </DialogCloseBtn>
      <VCardText>
        <VRow class="mb-4">
          <VCol cols="12" md="4">
            <VTextField label="课程名称" v-model="newCourse.courseName" :placeholder="course.courseName"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="班级" v-model="newCourse.classId" :placeholder="course.className"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学年" v-model="newCourse.year" :placeholder="course.year"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学期" v-model="newCourse.term" :placeholder="course.term"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学时" v-model="newCourse.hour" :placeholder="course.hour"/>
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
