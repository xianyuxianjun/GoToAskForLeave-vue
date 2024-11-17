<script setup>
//搜索框的值
import {he} from "vuetify/locale";
import AddCourse from "@/views/AddCourse.vue";
import UpdateClass from "@/views/UpdateClass.vue";

const search = ref('')
//搜索的函数
const searchClass = () => {
}
//表格头
const headers = ref([
  {title:'课程名称',key:'courseName'},
  {title:'班级',key:'className'},
  {title:'学年',key:'year'},
  {title:'学期',key:'term'},
  {title:'学时',key:'hour'},
  {title: '操作',key: 'cao'}
])
//表格数据
const classData = reactive([
  {
    courseName:'操作系统',
    className:'22软件工程2班',
    year:'2024',
    term:'2',
    hour:'40',
    cao:'sad'
  }
])
</script>

<template>
    <VCard title="班级信息">
      <VCardText>
        <VRow class="mb-4">
          <VCol cols="12" sm="6" md="2">
            <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchClass"></VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <AddCourse></AddCourse>
          </VCol>
        </VRow>
      </VCardText>
      <VDataTable :headers="headers" :items="classData">
      <template #item.cao="{ item }">
        <VBtn color="error">删除</VBtn>
        <UpdateClass :course ="item"/>
      </template>
      </VDataTable>
    </VCard>
</template>

<style scoped lang="scss">

</style>
