<script  setup>
import { ref,onMounted} from "vue";
import {addClasses, delectClasses, getClassData, getDep} from "@/Api/instApi.js"
import {getAllClasses, getInstItem, updateClassesAdmin} from "@/Api/userApi.js";
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js";
const search = ref('')
const headers = reactive([
  {title:'班级',key:'className'},
  {title:'学院',key:'depName'},
  {title:'年级',key:'grade'},
  {title:'专业',key:'major'},
  {title:'辅导员',key:'instName'},
  {title:'人数',key:'num'},
  {title:'操作',key:'cao'}
])
const classList = ref([])
const classData = ref([{
}])
async function getData(){
  const res = await getAllClasses()
  classData.value = res.data
  classList.value = classData.value
}
async function detectClass(){
  console.log(editValue.value.classId)
  const res = await delectClasses(editValue.value.classId)
  message.value = '删除成功'
  if (res.code === 1){
    sale.value = true
    getData()
    delectDig.value = false
  }else{
    message.value = res.message
    dale.value= true
  }
}
function toStudentList(item){
  localStorage.setItem('classId',item.classId)
}
function searchClasses(){
  if (search.value === ''){
    getData()
    return
  }
  classList.value = classData.value.filter(item => item.className===search.value)
}
const instItem = ref([])
//获取辅导员列表
async function getInstKV(){
  const res = await getInstItem()
  instItem.value = res.data
}
const banDig = ref(false)
const newClass = ref({
  className:'',
  depId:'',
  instId:'',
  grade:'',
  major:'',
})
//添加班级
function daddClasses(){
  banDig.value=true
}
async function tianjia(){
  if (!isObjectEmpty(newClass.value)){
    message.value = '请填写完整信息'
    sale.value = true
    return
  }
  const res = await addClasses(newClass.value)
  message.value = "添加成功"
  if (res.code === 1){
    sale.value = true
    getData()
    banDig.value=false
    newClass.value={
      className:'',
      depId:'',
      instId:'',
      grade:'',
      major:'',
    }
  }else {
    message.value = res.message
    dale.value = true
  }
}
//二级学院数据
const depList = ref([])
//获取二级学院列表
const getDepList = async () => {
  const res = await getDep()
  depList.value = res.data
}
//年级
const grade = ref([
  { title: '2024级', value: '2024级' },
  { title: '2023级', value: '2023级' },
  { title: '2022级', value: '2022级' },
  { title: '2021级', value: '2021级' },
])
onMounted(()=>{
  getData()
  getInstKV()
  getDepList()
})
const updateClassDig = ref(false)
const editValue = ref({})
function editItem(item){
  editValue.value = item
  updateClassDig.value=true
}
const delectDig = ref(false)
function deleteItem(item){
  editValue.value.classId = item.classId
  delectDig.value=true
}
async function xiugai(){
  if (!isObjectEmpty(editValue.value)){
    message.value = '请填写完整信息'
    sale.value = true
    return
  }
  const res = await updateClassesAdmin(editValue.value)
  message.value = res.message
  if (res.code === 1){
    ale.value = true
    updateClassDig.value=false
  }else {
    ale.value=true
  }
}
const page = ref(1)
const sale = ref(false)
const dale = ref(false)
const message = ref('')
const options = ref({ page: 1, itemsPerPage: 10, sortBy: [''], sortDesc: [false] })
</script>
<template>
  <VCard >
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchClasses"></VTextField>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="daddClasses">添加班级</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VDataTable
      :headers="headers"
      :items="classList"
      :items-per-page="options.itemsPerPage"
      :page="options.page"
      :options="options"
      class="text-no-wrap"
    >
      <template #item.className="{ item }">
        <RouterLink to="/ClassStudent" @click="toStudentList(item)">{{ item.className }}</RouterLink>
      </template>
      <template #item.cao="{ item }">
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
          <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
            <VTextField
              v-model="options.itemsPerPage"
              label="每页的记录数"
              type="number"
              min="1"
              max="15"
              hide-details
              variant="underlined"
              style="max-inline-size: 8rem;min-inline-size: 5rem;"
            />

            <VPagination
              v-model="options.page"
              :total-visible="$vuetify.display.smAndDown ? 2 : 3"
              :length="Math.ceil(classList.length / options.itemsPerPage)"
            />
          </div>
        </VCardText>
      </template>
    </VDataTable>
  </VCard>
  <VDialog
    v-model="banDig"
    max-width="600"
  >
    <!-- Dialog Content -->
    <VCard title="添加班级">
      <DialogCloseBtn
        size="default"
        variant="text"
        @click="banDig = false"
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
              v-model="newClass.depId"
              :items="depList"
              label="二级学院"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VSelect
              v-model="newClass.instId"
              :items="instItem"
              label="辅导员"
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
              :items="grade"
              label="年级"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="banDig=false"
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
  <VDialog
    v-model="delectDig"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        你是否要删除该班级
      </VCardTitle>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="delectDig=false"
        >
          取消
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="detectClass"
        >
          删除
        </VBtn>

        <VSpacer />
      </VCardActions>
    </VCard>
  </VDialog>
  <VDialog v-model="updateClassDig" max-width="600px">
    <DialogCloseBtn
      variant="text"
      size="default"
      @click="updateClassDig = false"
    />
    <VCard title="修改班级信息">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="班级名称" v-model="editValue.className"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VSelect :items="depList" label="二级学院" v-model="editValue.depId"/>
          </VCol>
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VSelect
              v-model="newClass.instId"
              :items="instItem"
              label="辅导员"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="专业" v-model="editValue.major"></VTextField>
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
          @click="updateClassDig=false"
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
