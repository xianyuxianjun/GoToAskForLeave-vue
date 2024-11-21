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

const classData = ref([{
}])
async function getData(){
  const res = await getClassData(userStore.userId)
  classData.value = res.data
}

async function detectClass(classId){
  const res = await delectClasses(classId)
  if (res.code === 1){
    alert("删除成功")
    getData()
  }else{
    alert(res.message)
  }
}

function searchClasses(){

}

onMounted(()=>{
  getData()
})
</script>
<template>
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
      :items="classData"
    >
      <template #item.className="{ item }">
        <RouterLink to="/ClassStudent">{{ item.className }}</RouterLink>
      </template>
    <template #item.cao="{ item }">
      <VBtn color="error" @click="detectClass(item.classId)">删除</VBtn>
      <UpdateClass :classes="item"/>
    </template>
    </VDataTable>
  </VCard>

</template>
