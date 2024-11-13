<script  setup>
import { useApi } from '@/utils/api';
import avatar8 from '@images/avatars/avatar-8.png';
import avatar2 from '@images/avatars/avatar-2.png';
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'


import { ref, onMounted } from 'vue';

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
    classId: '1'
  }
]);

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
];

const resolveStatusVariant = (status) => {
  if (status === 'Current') return { color: 'primary' };
  else if (status === 'Professional') return { color: 'success' };
  else if (status === 'Rejected') return { color: 'error' };
  else if (status === 'Resigned') return { color: 'warning' };
  else return { color: 'info' };
};

//男生头像
const manAvater = [avatar2,avatar5,avatar7]
//女生头像
const wmAvater = [avatar4,avatar6,avatar8]
// 分组的条件
const groupBy = [{ key: 'classId' }];

const getIcon = (props) => props.icon;

// 转换 classId 为具体的班级名称
const updateGroup = (data) => {
  return data.map(item => {
    if (item.classId === '1') {
      item.classId = '22软件一班';
    }
    if (item.classId === '2'){
      item.classId = '22软件工程二班'
    }
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
// 请求数据
const  getStudentList = () => {
  useApi.post("/inst/getClassStudent", { instId: '2022001' })
    .then(res => {
      console.log(res)
      studentList.value = res.data.data;
      studentList.value = updateGroup(studentList.value);
    })
    .catch(error => {
      console.error('Error fetching student list:', error);
    });
};

// 在组件挂载时请求数据
onMounted(() => {
  getStudentList();
});
</script>
<template>
  <VDataTable
    :headers="headers"
    :items="studentList"
    :items-per-page="10"
    :group-by="groupBy"
    class="text-no-wrap"
  >
    <!-- full name -->
    <template #item.stuName="{ item }">
      <div class="d-flex align-center">
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
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.stuName }}</span>
        </div>
      </div>
    </template>
    <template #data-table-group="{ props, item, count }">
      <td>
        <VBtn
          v-bind="props"
          variant="text"
          density="comfortable"
        >
          <VIcon
            class="flip-in-rtl"
            :icon="getIcon(props)"
          />
        </VBtn>

        <span>{{ item.value }}</span>
        <span>({{ count }})</span>
      </td>
    </template>
  </VDataTable>
</template>
