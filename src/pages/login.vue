<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import { loginApi } from "@/Api/sysApi.js"
import { isObjectEmpty } from "@/utils/isObjectEmpty"
import authV1LoginMaskDark from '@images/pages/auth-v1-login-mask-dark.png'
import authV1LoginMaskLight from '@images/pages/auth-v1-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { VTabs } from 'vuetify/components'

definePage({ meta: { layout: 'blank' } })

const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
  role: '',
  remember: false,
})

const login =  async () => {
  if (!isObjectEmpty(loginForm)){
    ssale("请输入完整信息")

    return
  }
  const res = await loginApi(loginForm.value)
  if (res.data === null){
    ddale(res.message)
  }else{
    localStorage.setItem('userId', res.data.userId)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem("username", res.data.username)
    ssale('登录成功')
    await router.push("/")
  }
}

const roleItems = ref([
  { title: '学生', value: '学生' },
  { title: '辅导员', value: '辅导员' },
  { title: '管理员', value: '管理员' },

])

function ToSegister(){
  router.push('/Register')
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
const tab = ref('学生')
</script>

<template>
  <VSnackbar
    v-model="sale"
    location="top"
    color="success"
  >
    {{ message }}
  </VSnackbar>
  <VSnackbar
    v-model="dale"
    location="top"
    color="error"
  >
    {{ message }}
  </VSnackbar>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-1 pa-sm-7"
      max-width="448"
      title=""
    >
      <VCardItem class="justify-center pb-6">
        <VCardTitle>
          <div class="app-logo">
            <VNodeRenderer :nodes="themeConfig.app.logo" />
            <h1 class="app-logo-title">
              登录
            </h1>
          </div>
        </VCardTitle>
      </VCardItem>
      <VCardText>
        <VRow class="mb-4">
          <VCol cols="12" />
          <VCol cols="12">
            <VTextField
              v-model="loginForm.username"
              label="邮箱"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="loginForm.password"
              label="密码"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="loginForm.role"
              :items="roleItems"
              label="身份"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="success"
          @click="login"
        >
          登录
        </VBtn>
        <VBtn @click="ToSegister">
          注册
        </VBtn>
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
