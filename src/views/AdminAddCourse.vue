<script lang="ts" setup>
import {onMounted, ref, toRefs} from "vue";
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import { addCourse } from '../Api/instApi.js'
import { getAllClassList } from "@/Api/userApi"
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"

const isDialogVisible = ref(false)
const emit = defineEmits(['close']);
//课程信息
const course = ref({
  classId:'',
  courseName:'',
  year:'',
  term:'',
  hour:''
})
const classList = ref([
  {title:'',value:''}
])

//获取辅导员的班级列表
const getData = async () => {
  const res = await getAllClassList()
  classList.value = res.data
}
//添加
const tianjia = async () => {
  if (!isObjectEmpty(course.value)){
    alert("请填写完整信息")
    return
  }
  const res = await addCourse(course.value)
  if(res.code == 1){
    alert('添加成功')
    course.value.courseName=''
    course.value.year=''
    course.value.term=''
    course.value.hour=''
    course.value.classId=''
    isDialogVisible.value=false
    emit('close')
  }else
    alert("添加失败")
  isDialogVisible.value = false
}
onMounted(()=>{

  getData()
})
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        添加课程
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard title="添加课程">
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
              v-model="course.courseName"
              label="课程名称"
              placeholder="课程名称"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VSelect :items="classList" label="班级" v-model="course.classId"></VSelect>
          </VCol>
          <VCol cols="12" md="4" sm="6">
            <VTextField
              v-model="course.year"
              label="学年"
              placeholder="学年"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField label="学期" v-model="course.term"></VTextField>
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VTextField label="学时" v-model="course.hour"></VTextField>
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="isDialogVisible=false"
        >
          取消
        </VBtn>
        <VBtn
          color="success"
          @click="tianjia"
        >
          添加
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
