<script setup>
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { postRegister, postLogin } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const iseye = ref(false)
const isshowpwd = ref('password')
const saveUserinfo = ref(false)
const userstore = useUserStore()
const router = useRouter()

const form = ref()
const modelForm = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    { min: 5, max: 10, message: '用户名为5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码为6-15位非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', tirgger: 'blur' },
    {
      validator: (rule, value, cellback) => {
        if (value !== modelForm.value.password) {
          cellback(new Error('两次输入密码不一致'))
        } else {
          cellback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  await form.value.validate()
  await postRegister(modelForm.value)
  ElMessage({
    message: '注册成功',
    type: 'success',
    offset: 200
  })
  isRegister.value = false
  saveUserinfo.value = true
}
watch(isRegister, () => {
  if (saveUserinfo.value) return
  modelForm.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
const Login = async () => {
  await form.value.validate()
  const {
    data: { token }
  } = await postLogin(modelForm.value)
  userstore.setToken(token)

  router.push('/')

  ElMessage({
    message: '登陆成功',
    type: 'success',
    offset: 200
  })
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        v-if="isRegister"
        ref="form"
        size="large"
        autocomplete="off"
        :model="modelForm"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="modelForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="modelForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
            v-model="modelForm.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = false"
            >← 返回</el-link
          >
        </el-form-item>
      </el-form>
      <!-- 登陆表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-else
        :model="modelForm"
        :rules="rules"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="modelForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            :type="isshowpwd"
            placeholder="请输入密码"
            v-model="modelForm.password"
          >
          </el-input>
          <div v-if="iseye">
            <el-icon
              class="eye"
              @click="(iseye = !iseye), (isshowpwd = 'password')"
              color="rgb(168, 171, 178)"
              ><View></View
            ></el-icon>
          </div>
          <div v-else>
            <el-icon
              class="eye"
              @click="(iseye = !iseye), (isshowpwd = 'text')"
              color="rgb(168, 171, 178)"
              ><Hide></Hide
            ></el-icon>
          </div>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="Login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 300px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .flex {
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .button {
      width: 100%;
    }

    .eye {
      top: 0;
      position: absolute;
      right: 10px;
      height: 100%;
      width: 30px;
    }
  }
}
</style>
