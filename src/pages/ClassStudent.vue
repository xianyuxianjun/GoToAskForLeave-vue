<script  setup>
import avatar8 from '@images/avatars/avatar-8.png';
import avatar2 from '@images/avatars/avatar-2.png';
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import {getStudentList, delectStudent, addStudent} from '../Api/instApi.js'
import { ref, onMounted } from 'vue';
import {useUserStore} from "@/store/user.js"
import {useRouter} from "vue-router";
import {useClassesStore} from "@/store/classes.js";
import DialogCloseBtn from "@core/components/DialogCloseBtn.vue";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js";
const classStore = useClassesStore();
const router = useRouter()
const classId = ref('')
const userStore = useUserStore();
//展示的学生
const studentList = ref([
  {
    stuId: '202209512245',
    avatar: avatar8,
    stuName: '陈咸鱼',
    sex: '男',
    email: 'kocrevy0@thetimes.co.uk',
    address: '广西梧州',
    stuTel: '13005976925',
    contact: "陈生",
    contactTel: '5554654',
    className: '1'
  }
]);
//请求的数据
const data = ref([])
// 表格头
const headers = [
  { title: '学号', key: 'stuId' },
  { title: '姓名', key: 'stuName' },
  { title: '性别', key: 'sex' },
  { title: '邮箱', key: 'email' },
  { title: '通讯地址', key: 'address' },
  { title: '学生电话', key: 'stuTel' },
  { title: '联系人', key: 'contact' },
  { title: '联系人电话', key: 'contactTel' },
  {
    title: '操作',
    key: 'actions',
  },
];
//男生头像
const manAvater = [avatar2,avatar5,avatar7]
//女生头像
const wmAvater = [avatar4,avatar6,avatar8]

// 转换头像
const updateGroup = (data) => {
  return data.map(item => {
    if (item.sex === '男'){
      item.avatar = getRandomElement(manAvater)
    }else {
      item.avatar = getRandomElement(wmAvater)
    }
    return item; // 返回修改后的对象
  });
};
//随机获取数组元素
const getRandomElement = (arr) =>{
  if (arr && arr.length) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
  return null;
}

const getData = async (classId) => {
  const res = await getStudentList(classId);
  data.value = res.data
  data.value = updateGroup(data.value)
  studentList.value=data.value
}
//搜索框的值
const search = ref('')
//搜索学生
const searchStudent = ()=>{
  if (search.value ===''){
    studentList.value = data.value
    return
  }
  studentList.value = studentList.value.filter(item => item.stuName === search.value)
}
const editDialog = ref(false)
const deleteDialog = ref(false)
const editedItem = ref()
const editedIndex = ref(-1)
function deleteItem(item){
  editedIndex.value = item.stuId
  editedItem.value = { ...item }
  deleteDialog.value = true
}
function closeDelete() {
  editedItem.value = ''
  editedIndex.value = -1
  deleteDialog.value = false
}
async function deleteItemConfirm(){
  //执行删除的逻辑
  const res =await delectStudent(editedIndex.value)
  //初始化操作数据
  await getData(classId.value)
  editedItem.value = ''
  editedIndex.value = -1
  //关闭选择框
  deleteDialog.value = false
}
// 在组件挂载时请求数据
onMounted(() => {
  classId.value = localStorage.getItem('classId')
  getData(classId.value)
});

const stuDig = ref(false)
function addStudentDig(){
  stuDig.value = true
}
const student = ref({})
async function tianjia(){
  if (!isObjectEmpty(student.value)){
    alert("请输入完整信息")
    return
  }
  student.value.classId=classId.value
  student.value.instId = userStore.userId
  student.value.role = "学生"
  const res = await addStudent(student.value)
  if (res.code === 1){
    alert("添加成功")
    student.value = {}
    stuDig.value = false
  }
}

</script>

<template>
  <VCard>
    <VCardText>
      <VRow class="mb-4">
        <VCol cols="12" md="2">
          <VTextField v-model="search" label="搜索" placeholder="搜索" prepend-inner-icon="ri-search-line" @keyup.enter="searchStudent"></VTextField>
        </VCol>
        <VCol cols="12" md="2">
          <VBtn @click="addStudentDig">添加学生</VBtn>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VDataTable :headers="headers" :items="studentList">
        <template #item.stuName="{ item }">
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
              >{{ avatarText(item.stuName) }}</span>
            </VAvatar>

            <div class="d-flex flex-column ms-3">
              <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.stuName }}</span>
              <small>{{ item.post }}</small>
            </div>
          </div>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
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
        你是否要删除该学生
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
  <VDialog v-model="stuDig" max-width="600px">
    <DialogCloseBtn
      variant="text"
      size="default"
      @click="stuDig = false"
    />
    <VCard title="添加学生">
      <VCardText class="mb-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField label="姓名" v-model="student.stuName"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VSelect  :items="[{title:'男',value:'男'},{title: '女',value: '女'}]" label="性别" v-model="student.sex"/>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="邮箱" v-model="student.email"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="学生电话" v-model="student.stuTel"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="联系人" v-model="student.contact"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField label="联系人电话" v-model="student.contactTel"></VTextField>
          </VCol>
          <VCol cols="12">
            <VTextField label="通讯地址" v-model="student.address"></VTextField>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="stuDig=false"
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
</template>

<style scoped lang="scss">

</style>
