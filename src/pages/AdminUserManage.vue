<script setup>
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import {ref,onMounted} from "vue"
import {addUser, delectUser, getAllUser, updateUser} from "@/Api/userApi.js";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"
//表头
const headers = ref([
  {title:'工号',key:'userId'},
  {title:'姓名',key:'fullname'},
  {title: '邮箱',key:'email'},
  {title: '手机号',key:'telephone'},
  {title:'操作',key:'actions'}
])
//搜索框的值
const search = ref('')
//搜索
function searchUser() {
  if (search.value === ''){
    userList.value = userData.value
    return
  }
  userList.value = userData.value.filter(item => item.fullname === search.value)
}
const userList = ref([])
const userData = ref([])
const deleteDialog = ref(false)
const userDig = ref(false)
const editDig = ref(false)
const editInst = ref({})
const delectIndex = ref('')
function addUserDig(){
  userDig.value = true
}
function editItem(item){
  editInst.value = item
  editDig.value = true
}
function deleteItem(item){
  delectIndex.value = item.userId
  deleteDialog.value = true
}
//删除
async function deleteItemConfirm(){
  const res = await delectUser(delectIndex.value)
  if (res.code === 1){
    ssale("删除成功")
    await getData()
    deleteDialog.value = false
  }else {
    ddale(res.message)
  }
}
const user = ref({
  fullname:'',
  email:'',
  telephone:''
})
//添加
async function tianjia(){
  if (!isObjectEmpty(user.value)){
    ssale("请填写完整信息")
    return
  }
  const res = await addUser(user.value)
  if (res.code === 1){
    ssale("添加成功")
    await getData()
    userDig.value = false
    user.value = {
      fullname:'',
      email:'',
      telephone:''
    }
  }
}
//修改
async function xiugai(){
  const res = await updateUser(editInst.value)
  if (res.code === 1){
    ssale("修改成功")
    await getData()
    editDig.value = false
    return
  }
  ddale(res.message)
}
async function getData(){
    const res = await getAllUser()
    userData.value = res.data
    userList.value = userData.value
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
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchUser"></VTextField>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="addUserDig">添加管理员</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VDataTable :headers="headers" :items="userList"  :items-per-page="options.itemsPerPage"
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
            <div class="d-flex flex-wrap justify-center gap-y-2 mt-2">
              <VPagination
                v-model="options.page"
                :total-visible="$vuetify.display.smAndDown ? 2 : 3"
                :length="Math.ceil(userList.length / options.itemsPerPage)"
              />
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <!--删除的弹窗  -->
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        你是否要删除该管理员
      </VCardTitle>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="deleteDialog=false"
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
  <!--添加辅导员的弹窗  -->
  <VDialog v-model="userDig" max-width="600px">
    <DialogCloseBtn
      variant="text"
      size="default"
      @click="userDig = false"
    />
    <VCard title="添加管理员">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="姓名" v-model="user.fullname"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="邮箱" v-model="user.email"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="电话" v-model="user.telephone"></VTextField>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="userDig=false"
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
  <!--  编辑辅导员的弹窗-->
  <VDialog v-model="editDig" max-width="600px">
    <DialogCloseBtn
      variant="text"
      size="default"
      @click="editDig = false"
    />
    <VCard title="修改管理员信息">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="姓名" v-model="editInst.fullname"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="电话" v-model="editInst.telephone"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="邮箱" v-model="editInst.email"></VTextField>
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
