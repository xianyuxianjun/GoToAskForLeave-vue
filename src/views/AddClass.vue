<script lang="ts" setup>
import { useApi } from '@/utils/api';
import {onMounted, ref, toRefs} from "vue";
const isDialogVisible = ref(false)
const newClass =ref({
  classId:'',
  className:'',
  depId:'',
  major:'',
  grade:'',
  instId:'                                 '
})
const depList = ref([])
const gradel = ref([
  {title:'2024级',value:'2024级'},
  {title:'2023级',value:'2023级'},
  {title:'2022级',value:'2022级'},
  {title:'2021级',value:'2021级'},

])
const depId = ref('')
const tianjia = ()=>{
  newClass.value.depId=depId.value
  newClass.value.instId='2022001'
  useApi.post("/classes/addClasses",newClass.value)
    .then(res=>{
      if (res.data.code === 1){
        alert("添加成功")
        isDialogVisible.value=false
      }
    })
}
const getDep = ()=>{
  useApi.get("/dep/getDep").then(res=>{
    console.log("sdasds")
    console.log(res)
    depList.value = res.data.data
  }).catch(err=>{
    console.log(err)
  })
}
onMounted(()=>{
  getDep()
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
              v-model="newClass.className"
              label="班级名称"
              placeholder="班级名称"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VSelect :items="depList" label="二级学院" v-model="depId"></VSelect>
          </VCol>
          <VCol cols="12" md="4" sm="6">
            <VTextField
              v-model="newClass.major"
              label="专业"
              placeholder="专业"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VSelect :items="gradel" v-model="newClass.grade" label="年级"></VSelect>
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="isDialogVisible=true"
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
