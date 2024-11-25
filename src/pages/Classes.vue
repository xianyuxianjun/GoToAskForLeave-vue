<script  setup>
import AddClass from "@/views/AddClass.vue";
import { ref,onMounted} from "vue";
import {delectClasses, getClassData} from "@/Api/instApi.js"
import UpdateClass from "@/views/UpdateClass.vue";
import {useUserStore} from "@/store/user.js"

const userStore = useUserStore();
const search = ref('')
const headers = reactive([
  {title:'班级',key:'className'},
  {title:'学院',key:'depName'},
  {title:'年级',key:'grade'},
  {title:'专业',key:'major'},
  {title:'人数',key:'num'},
  {title:'操作',key:'cao'}
])
const classList = ref([])
const classData = ref([{
}])
async function getData(){
  const res = await getClassData(userStore.userId)
  classData.value = res.data
  classList.value = classData.value
}

async function detectClass(){
  const res = await delectClasses(delectIndex.value)
  if (res.code === 1){
    ssale('删除成功')
    await getData()
    deleteDialog.value=false
  }else{
    alert(res.message)
  }
}
function toStudentList(item){
  localStorage.setItem('classId',item.classId)
}
async function searchClasses(){
  if (search.value === ''){
    await getData()
    return
  }
  classList.value = classData.value.filter(item => item.className===search.value)
}
const deleteDialog = ref(false)
const delectIndex = ref('')
function deleteItem(item){
  deleteDialog.value = true
  delectIndex.value = item.classId
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
  <VSnackbar v-model="sale"  location="top" color="success">
    {{ message }}
  </VSnackbar>
  <VSnackbar v-model="dale"  location="top" color="error">
    {{ message }}
  </VSnackbar>
  <VCard >
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchClasses"></VTextField>
        </VCol>
        <VCol cols="12" md="2">
          <AddClass @close="getData"></AddClass>
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
          <IconBtn
            size="small"
            @click="deleteItem(item)"
          >
            <VIcon icon="ri-delete-bin-line" />
          </IconBtn>
        <UpdateClass :classes="item"/>
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
    <VDialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <VCard>
        <VCardTitle>
          你是否要删除该学生
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
            @click="detectClass"
          >
            删除
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
  </VCard>

</template>
