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
  console.log(res)
  if (res.code === 1){
    alert("删除成功")
    getData()
    deleteDialog.value = false
  }else {
    console.log(res)
    alert(res.message)
  }
}
const user = ref({})
//添加
async function tianjia(){
  if (!isObjectEmpty(user.value)){
    alert("请填写完整信息")
    return
  }
  const res = await addUser(user.value)
  if (res.code === 1){
    alert("添加成功")
    getData()
    userDig.value = false
  }
}
//修改
async function xiugai(){
  const res = await updateUser(editInst.value)
  if (res.code === 1){
    alert("修改成功")
    getData()
    editDig.value = false
    return
  }
  alert(res.message)
}
async function getData(){
    const res = await getAllUser()
  console.log(res)
    userData.value = res.data
    userList.value = userData.value
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
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchUser"></VTextField>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="addUserDig">添加管理员</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VDataTable :headers="headers" :items="userList">
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

</template>


<style scoped lang="scss">

</style>
