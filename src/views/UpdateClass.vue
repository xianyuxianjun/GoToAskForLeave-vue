<script setup>
import { ref } from 'vue'
import { getDep,updateClasses } from "@/Api/instApi.js"
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"

const props = defineProps(['classes'])
const emit = defineEmits(['close'])
const dia = ref(false)
const newClass = ref({
})
newClass.value = props.classes
const depList = ref([])
async function getDepList(){
  const res = await getDep()
  depList.value = res.data
}
//修改班级
async function xiugai(){
  if (!isObjectEmpty(newClass.value)){
    alert("请填写完整信息")
    return
  }
  const res = await updateClasses(newClass.value)
  if (res.code === 1){
    alert("修改成功")
    emit('close')
    dia.value = false
  }else{
    alert(res.message)
    dia.value = false
  }
}
onMounted(()=>{
  getDepList()
})
</script>

<template>
<VDialog v-model="dia" max-width="600">
  <template #activator="{ props }">
      <IconBtn
        size="small"
        v-bind="props"
      >
        <VIcon icon="ri-pencil-line" />
      </IconBtn>
  </template>

  <VCard title="修改班级">
    <DialogCloseBtn variant="text" size="default" @click="dia=false"></DialogCloseBtn>
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="4">
          <VTextField label="班级名称" v-model="newClass.className"/>
        </VCol>
        <VCol cols="12" md="4">
          <VSelect :items="depList" label="学院" v-model="newClass.depId"/>
        </VCol>
        <VCol cols="12" md="4">
          <VTextField label="年级" v-model="newClass.grade"/>
        </VCol>
        <VCol cols="12" md="4">
          <VTextField label="专业" v-model="newClass.major"/>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText class="d-flex justify-end flex-wrap gap-4">
      <VBtn color="error" @click="dia=false">取消</VBtn>
      <VBtn color="success" @click="xiugai">修改</VBtn>
    </VCardText>
  </VCard>
</VDialog>
</template>

<style scoped lang="scss">

</style>
