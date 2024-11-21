<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import authV1LoginMaskDark from '@images/pages/auth-v1-login-mask-dark.png'
import authV1LoginMaskLight from '@images/pages/auth-v1-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRouter } from 'vue-router'
import {useUserStore} from "@/store/user.js"
import { loginApi} from "@/Api/sysApi.js";
import {isObjectEmpty} from "@/utils/isObjectEmpty.js"

const userStore = useUserStore();
definePage({ meta: { layout: 'blank' } })
const router = useRouter();
const loginForm = ref({
  username: '',
  password: '',
  role:'',
  remember: false,
})

const login =  async () => {
    if (!isObjectEmpty(loginForm)){
    alert("请输入完整信息")
    return
  }
  const res = await loginApi(loginForm.value)
  if (res.data === null){
    alert("登录失败")
  }else{
    userStore.userId = res.data.userId
    userStore.role = res.data.role
    alert('登陆成功')
    await router.push("/")
  }
}

const roleItems = ref([
  {title:'学生',value:'学生'},
  {title:'辅导员',value:'辅导员'},
  {title:'管理员',value:'管理员'},

])
function ToSegister(){
  router.push('/Register')
}
const authV1ThemeLoginMask = useGenerateImageVariant(authV1LoginMaskLight, authV1LoginMaskDark)
const isPasswordVisible = ref(false)
</script>

<template>
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
              <VCol cols="12"></VCol>
              <VCol cols="12" >
                <VTextField label="邮箱" v-model="loginForm.username"/>
              </VCol>
              <VCol cols="12">
                <VTextField label="密码" v-model="loginForm.password" />
              </VCol>
              <VCol cols="12" md="6">
                <VSelect :items="roleItems" label="身份" v-model="loginForm.role"/>
              </VCol>
            </VRow>
          </VCardText>
          <VCardText class="d-flex justify-end flex-wrap gap-4">
            <VBtn color="success" @click="login">登录</VBtn>
            <VBtn @click="ToSegister">注册</VBtn>
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
