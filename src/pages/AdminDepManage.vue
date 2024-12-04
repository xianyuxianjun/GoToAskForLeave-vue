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
const dep = ref({
  depId:'',
  depName:''
})
const editDep = ref({})
function editItem(item){
  editDep.value = item
  editDep.value.oldId = editDep.value.depId
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
    ssale("删除成功")
    getData()
    deleteDialog.value = false
    delectIndex.value = ''
    return
  }
  ddale(res.message)
}
async function tianjia(){
  if (!isObjectEmpty(dep.value)){
    ssale("请填写完整信息")
    return
  }
  const res = await addDep(dep.value)
  if (res.code===1){
    ssale("添加成功")
    await getData()
    dep.value = {
      depId:'',
      depName:''
    }
    depDig.value = false
    return
  }
  ddale(res.message)
}
async function xiugai(){
  const res = await updateDep(editDep.value)
  if (res.code===1){
    ssale("修改成功")
    await getData()
    editDep.value = {}
    editDig.value = false
    return
  }
  ddale(res.message)
}
async function getData() {
  const res = await getAllDep()
  depData.value = res.data
  depList.value = depData.value
}
onMounted(()=>{
  getData()
})
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
const options = ref({ page: 1, itemsPerPage: 10, sortBy: [''], sortDesc: [false] })

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
      <VDataTable :headers="headers" :items="depList"  :items-per-page="options.itemsPerPage"
                  :page="options.page"
                  :options="options"
                  height="70vh"
                  class="text-no-wrap">
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
        <template #bottom>
          <VCardText class="pt-2">
            <div class="d-flex flex-wrap justify-center  gap-y-2 mt-2">
              <VPagination
                v-model="options.page"
                :total-visible="$vuetify.display.smAndDown ? 2 : 3"
                :length="Math.ceil(depList.length / options.itemsPerPage)"
              />
            </div>
          </VCardText>
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
  <VSnackbar v-model="sale"  location="top" color="success">
    {{ message }}
  </VSnackbar>
  <VSnackbar v-model="dale"  location="top" color="error">
    {{ message }}
  </VSnackbar>
</template>


<style scoped lang="scss">

</style>
