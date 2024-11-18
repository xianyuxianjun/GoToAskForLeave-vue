<script  setup>
import AddClass from "@/views/AddClass.vue";
import { ref,onMounted} from "vue";
import { getClassData } from "@/Api/instApi.js"

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
  const res = await getClassData("2022001")
  classData.value = res.data
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
          <AddClass></AddClass>
        </VCol>
      </VRow>
    </VCardText>
    <VDataTable
      :headers="headers"
      :items="classData"
    >
    <template #item.cao="{ item }">
      <VBtn color="error+">删除</VBtn>
      <VBtn>修改</VBtn>
    </template>
    </VDataTable>
  </VCard>

</template>
