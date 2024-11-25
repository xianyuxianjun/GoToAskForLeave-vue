<script setup>
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import { ref,onMounted } from "vue"
import {addDep, delectDep, getAllDep, updateDep} from "@/Api/userApi.js";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"
const search = ref('')
const depData = ref([])
const depList = ref([])
const headers = ref([
  {title:'编号',key:'depId'},
  {title:'学院名称',key:'depName'},
  {title:'操作',key:'actions'},
])
function searchDep() {
  if (search.value === ''){
    depList.value = depData.value
    return
  }
  depList.value = depData.value.filter(dep => dep.depName === search.value)
}
const deleteDialog = ref(false)
const depDig = ref(false)
const editDig = ref(false)
const dep = ref({})
const editDep = ref({})
function editItem(item){
  editDep.value = item
  editDep.value.oldId = editDep.value.depId
  console.log(editDep.value)
  editDig.value = true
}
const delectIndex = ref('')
function deleteItem(item){
  delectIndex.value = item.depId
  deleteDialog.value = true
}
async function deleteItemConfirm(){
  const res = await delectDep(delectIndex.value)
  if (res.code === 1){
    alert("删除成功")
    getData()
    deleteDialog.value = false
    delectIndex.value = ''
    return
  }
  alert(res.message)
}
async function tianjia(){
  if (!isObjectEmpty(dep.value)){
    alert("请填写完整信息")
    return
  }
  const res = await addDep(dep.value)
  if (res.code===1){
    alert('添加成功')
    getData()
    dep.value = {}
    depDig.value = false
    return
  }
  alert(res.message)
}
async function xiugai(){
  if (!isObjectEmpty(editDep.value)){
    alert("请填写完整信息")
    return
  }
  const res = await updateDep(editDep.value)
  if (res.code===1){
    alert("修改成功")
    getData()
    editDep.value = {}
    editDig.value = false
    return
  }
  alert(res.message)
}
async function getData() {
  const res = await getAllDep()
  depData.value = res.data
  depList.value = depData.value
}
onMounted(()=>{
  getData()
})
</script>

<template>
  <VCard>
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchDep"></VTextField>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="depDig=true">添加二级学院</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VDataTable :headers="headers" :items="depList">
        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <IconBtn
              size="small"
              @click="editItem(item)"
            >
              <VIcon icon="ri-pencil-line" />
            </IconBtn>
            <IconBtn
              size="small"
              @click="deleteItem(item)"
            >
              <VIcon icon="ri-delete-bin-line" />
            </IconBtn>
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        你是否要删除该学院
      </VCardTitle>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="deleteDialog = false"
        >
          取消
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="deleteItemConfirm"
        >
          删除
        </VBtn>

        <VSpacer />
      </VCardActions>
    </VCard>
  </VDialog>
  <VDialog v-model="depDig" max-width="600px">
    <DialogCloseBtn
      variant="text"
      size="default"
      @click="depDig = false"
    />
    <VCard title="二级学院">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="学院名称" v-model="dep.depName"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学院编号" v-model="dep.depId"></VTextField>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="depDig=false"
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
  <VDialog v-model="editDig" max-width="600px">
    <DialogCloseBtn
      variant="text"
      size="default"
      @click="editDig = false"
    />
    <VCard title="修改二级学院信息">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="姓名" v-model="editDep.depName"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="编号" v-model="editDep.depId"></VTextField>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="editDig=false"
        >
          取消
        </VBtn>
        <VBtn
          color="success"
          @click="xiugai"
        >
          修改
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

</template>


<style scoped lang="scss">

</style>
