<script lang="ts" setup>
import { onMounted, ref, toRefs } from "vue"
import DialogCloseBtn from "../@core/components/DialogCloseBtn.vue"
import { addClasses, getDep } from "../Api/instApi.js"
import {useInstStore} from "@/store/inst.js"
const instStore = useInstStore();

const emit = defineEmits(['close'])

//是否展示对话框
const isDialogVisible = ref(false)

//添加的班级数据
const newClass = ref({
  classId: '',
  className: '',
  depId: '',
  major: '',
  grade: '',
  instId: '',
})

//二级学院数据
const depList = ref([])

//年级
const gradel = ref([
  { title: '2024级', value: '2024级' },
  { title: '2023级', value: '2023级' },
  { title: '2022级', value: '2022级' },
  { title: '2021级', value: '2021级' },

])

//二级学院Id
const depId = ref('')

//添加班级
const tianjia = async () => {
  console.log("添加班级")
  newClass.value.depId = depId.value
  newClass.value.instId = instStore.instId
  if (newClass.value.className == '' && newClass.value.major == '' && newClass.value.grade == '') {
    alert('请输入完整信息')
  } else {
    const res = await addClasses(newClass.value)
    isDialogVisible.value=false
    emit('close')
  }
}

//获取二级学院列表
const getDepList = async () => {
  const res = await getDep()

  depList.value = res.data
}

onMounted(() => {
  getDepList()
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
        添加班级
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard title="添加班级">
      <DialogCloseBtn
        size="default"
        variant="text"
        @click="isDialogVisible = false"
      />
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VTextField
              v-model="newClass.className"
              label="班级名称"
              placeholder="班级名称"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VSelect
              v-model="depId"
              :items="depList"
              label="二级学院"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            sm="6"
          > 
            <VTextField
              v-model="newClass.major"
              label="专业"
              placeholder="专业"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VSelect
              v-model="newClass.grade"
              :items="gradel"
              label="年级"
            />
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
