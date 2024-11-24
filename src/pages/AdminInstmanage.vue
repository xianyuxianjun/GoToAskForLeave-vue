<script setup>
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import {ref} from "vue"
import {getDep} from "@/Api/instApi.js";
import {addInst, delectInst, getAllInst, updateInst} from "@/Api/userApi.js";

//表格表头
const headers = ref([
  {title:'工号',key:'instId'},
  {title:'姓名',key:'instName'},
  {title:'二级学院',key:'depName'},
  {title:'手机号',key:'telephone'},
  {title:'邮箱',key:'email'},
  {title:'操作',key:'actions'}
])
//表格数据
const instList = ref([])
//获取到的数据
const instData = ref([])
//辅导员
const inst = ref({})
//搜索框的值
const search = ref('')
//搜索
function searchInst() {

}
//添加辅导员
async function tianjia(){
  const res = await addInst(inst.value)
  if (res.code === 1){
    alert("添加成功")
    instDig.value = false
    getData()
    inst.value = {}
  }
}
const instDig = ref(false)
//打开添加辅导员的弹窗
function addinstDig() {
  instDig.value = true
}
const deleteDialog = ref(false)
//删除
function deleteItem(item){
    editInst.value = item
    deleteDialog.value=true
}
//关闭删除
function closeDelete(){
  deleteDialog.value = false
}
//执行删除
async function deleteItemConfirm(){
  const res = await delectInst(editInst.value.instId)
  if (res.code===1){
    alert("删除成功")
    await getData()
    deleteDialog.value = false
  }else {
    alert("删除失败")
  }
}
const depList = ref([])
//获取二级学院
async function getDepList(){
  const res = await getDep()
  depList.value = res.data
}
//获取数据
async function getData(){
  const res  = await getAllInst()
  instData.value = res.data
  instList.value = instData.value
}
onMounted(()=>{
  getDepList()
  getData()
})
//编辑辅导员
 function editItem(item){
  editInst.value = item
  editDig.value = true
}
const editInst = ref({})
const editDig = ref(false)
async function xiugai(){
  const res = await updateInst(editInst.value)
  if (res.code===1){
    alert("修改成功")
    getData();
    editDig.value=false
  }else{
    alert("修改失败")
  }
}
</script>

>
<template>
<VCard>
<VCardText>
  <VRow class="mb-4">
    <VCol cols="12" md="2">
      <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchInst"></VTextField>
    </VCol>
    <VCol cols="12" md="2">
      <VBtn @click="addinstDig">添加辅导员</VBtn>
    </VCol>
  </VRow>
</VCardText>
<VCardText>
  <VDataTable :headers="headers" :items="instList">
    <template #item.instName="{ item }">
      <div class="d-flex align-center">
        <!-- avatar -->
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span
            v-else
            class="text-sm"
          >{{ avatarText(item.instName) }}</span>
        </VAvatar>

        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.instName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

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
    你是否要删除该辅导员
  </VCardTitle>

  <VCardActions>
    <VSpacer />

    <VBtn
      color="error"
      variant="outlined"
      @click="closeDelete"
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
<VDialog v-model="instDig" max-width="600px">
<DialogCloseBtn
  variant="text"
  size="default"
  @click="instDig = false"
/>
<VCard title="辅导员">
  <VCardText class="mb-4">
    <VRow>
      <VCol cols="12" md="4">
        <VTextField label="姓名" v-model="inst.instName"></VTextField>
      </VCol>
      <VCol cols="12" md="4">
        <VTextField label="邮箱" v-model="inst.email"></VTextField>
      </VCol>
      <VCol cols="12" md="4">
        <VTextField label="电话" v-model="inst.telephone"></VTextField>
      </VCol>
      <VCol cols="12" md="4">
        <VSelect label="二级学院" v-model="inst.depId" :items="depList"/>
      </VCol>
    </VRow>
  </VCardText>
  <VCardText class="d-flex justify-end flex-wrap gap-4">
    <VBtn
      color="error"
      @click="instDig=false"
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
    <VCard title="修改辅导员信息">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="姓名" v-model="editInst.instName"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VSelect :items="depList" label="二级学院" v-model="editInst.depId"/>
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
