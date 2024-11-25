<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import authV1LoginMaskDark from '@images/pages/auth-v1-login-mask-dark.png'
import authV1LoginMaskLight from '@images/pages/auth-v1-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRouter } from 'vue-router'
import { registerApi} from "@/Api/sysApi.js";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"
definePage({ meta: { layout: 'blank' } })
const router = useRouter();
const user = ref({
  username: '',
  password: '',
  fullName:'',
  role:'',
  sex:'',
  remember: false,
})

const register =  async () => {
  if (!isObjectEmpty(user)){
    ssale("请输入完整信息")
    return
  }
  const res = await registerApi(user.value)
  if (res.code === 1){
    ssale("注册成功")
    await router.push("/login")
  }else {
    console.log(res.message)
    ddale('注册失败')
  }
}

const roleItems = ref([
  {title:'学生',value:'学生'},
  {title:'辅导员',value:'辅导员'},
  {title:'管理员',value:'管理员'},
])

const sexItems = ref([
  {title:'女',value:'女'},
  {title:'男',value:'男'},
])
function toLogin(){
  router.push('/login')
}
const authV1ThemeLoginMask = useGenerateImageVariant(authV1LoginMaskLight, authV1LoginMaskDark)
const isPasswordVisible = ref(false)
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
</script>

<template>
  <VSnackbar v-model="sale"  location="top" color="success">
    {{ message }}
  </VSnackbar>
  <VSnackbar v-model="dale"  location="top" color="error">
    {{ message }}
  </VSnackbar>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-1 pa-sm-7"
      max-width="448"
    >
      <VCardItem class="justify-center pb-6">
        <VCardTitle>
          <div class="app-logo">
            <VNodeRenderer :nodes="themeConfig.app.logo" />
            <h1 class="app-logo-title">
              注册
            </h1>
          </div>
        </VCardTitle>
      </VCardItem>
      <VCardText>
        <VRow class="mb-4">
          <VCol cols="12"></VCol>
          <VCol cols="12" >
            <VTextField label="邮箱" v-model="user.username"/>
          </VCol>
          <VCol cols="12">
            <VTextField label="密码" v-model="user.password" />
          </VCol>
          <VCol cols="12">
            <VTextField label="姓名" v-model="user.fullName" />
          </VCol>
          <VCol cols="12" md="6">
            <VSelect :items="sexItems" label="性别" v-model="user.sex"/>
          </VCol>
          <VCol cols="12" md="6">
            <VSelect :items="roleItems" label="身份" v-model="user.role"/>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn color="success" @click="register" >注册</VBtn>
        <VBtn @click="toLogin">登录</VBtn>
      </VCardText>
    </VCard>
    <VImg
      :src="authV1ThemeLoginMask"
      class="d-none d-md-block auth-footer-mask flip-in-rtl"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
