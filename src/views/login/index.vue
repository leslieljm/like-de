<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForm">
      
      <img src="@/assets/common/logo.png" class="login-logo">

      <!-- 手机号框 -->
      <el-form-item prop="loginName">
        <span class="svg-container el-icon-mobile-phone"></span>
        <el-input v-model="loginForm.loginName"></el-input>
      </el-form-item>

      <!-- 密码框 -->
      <el-form-item prop="password">
        <span class="svg-container el-icon-lock"></span>
        <el-input :type="passwordType" v-model.trim="loginForm.password" ref="pwd"></el-input>
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password'? 'eye': 'eye-open'"></svg-icon>
        </span>
      </el-form-item>

      <!-- 验证码框 -->
      <el-form-item prop="code">
        <el-row>
          <el-col :span="17">
            <span class="svg-container el-icon-document-checked"></span>
            <el-input placeholder="请输入验证码" v-model.trim="loginForm.code"></el-input>
          </el-col>
          <el-col :span="7">
            <img :src="codeImgSrc" style="width:130px; height:50px" @click="getCodeImgSrc">
          </el-col>
        </el-row>
      </el-form-item>

      <el-button  class="loginBtn" @click="login" :loading="loading">登录</el-button>

    </el-form>
  </div>
</template>

<script>
// 
// 引入获取验证码api
import { getValiCodeAPI } from '@/api'
import {validPhone} from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const phoneValid = (rule, value, callback) => {
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    return {
      passwordType: 'password',
      randomNumber: Math.random(),
      loading: false,
      codeImgSrc: '',
      loginForm: {
        loginName: '',
        password: '',
        code: '',
        clientToken: '',
        loginType: 0
      },
      rules: {
        loginName: [
          {required: true, message: '手机号码必填', trigger: 'blur'},

          // {validator: phoneValid, trigger: 'blur'}
        ],
          password: [
          {required: true, message: '密码必填', trigger: 'blur'},
          {min: 5, max: 16, message: '密码格式不正确'}
        ],
        code: [
          {required: true, message: '验证码必填', trigger: 'blur'}
        ]
      }
          
    }
  },
  created() {
    this.getCodeImgSrc()
  },
  methods: {
    // 点击切换密码盒子图标和密码框类型
    showPwd() {
      this.passwordType = this.passwordType === 'password'? '': 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    // 获取验证码
    async getCodeImgSrc() {
      try {
        // blob数据转成url
      const data = await getValiCodeAPI(this.randomNumber)
      const blob = new Blob([data], {type: 'image/png'})
      const url = window.URL.createObjectURL(blob)
      this.codeImgSrc = url
      } catch (error) {
        throw error
      }
  },
  // 点击登录按钮登录
  async login() {
    try {
      // element-ui的 form表单的 validate 方法 可以 对整个表单进行校验
      // 如果校验通过 返回值为true
      // 校验不通过 promise rejected 会报错 被catch捕捉到
      await this.$refs.loginForm.validate()
      // 让按钮转圈。element-ui的按钮身上有一个loading属性可以让按钮转圈圈
      this.loading = true
      this.loginForm.clientToken = this.randomNumber
      // 接口请求
      await this.$store.dispatch('user/login', this.loginForm)
      // 跳转到主页
      this.$router.push('/')
      } finally {
        this.loading = false
      }
  }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png');
  background-size: cover;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    width: 446px;
    height: 52px;
    border: 1px solid #e2e2e2;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-logo {
    position: absolute;
    top: -46px;
    left: 50%;
    margin-left: -48px;
    width: 96px;
    height: 96px;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    width: 518px;
    height: 388px;
    max-width: 100%;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .loginBtn {
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    width: 448px;
    height: 52px;
    border: 1px solid #d8dde3;
    color: #fff;
    border-radius: 8px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 16px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
