<template>
  <div class="login">
    <vue-particles
        class="login-bg"
        color="#39AFFD"
        :particle-opacity="0.7"
        :particles-number="100"
        shape-type="circle"
        :particle-size="4"
        lines-color="#8DD1FE"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        hover-mode="grab"
        :click-effect="true"
        click-mode="push"
    />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <p class="title">
        后台管理系统
      </p>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" class="verifyCodeArea">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <i slot="prefix" class="el-input__icon el-icon-folder-checked"></i>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" alt="" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
<!--    &lt;!&ndash;  底部  &ndash;&gt;-->
<!--    <div v-if="$store.state.settings.showFooter" id="el-login-footer">-->
<!--      <span v-html="$store.state.settings.footerTxt" />-->
<!--      <span> ⋅ </span>-->
<!--      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>-->
<!--    </div>-->
  </div>
</template>

<script>
import { encrypt } from "@/js/utils/rsaEncrypt";     //密码加密
import { getCodeImg , login } from "@/api/Login/login";//登录、验证码接口
import Cookies from "js-cookie";//cookie 缓存
import {setToken} from "@/js/utils/CookieAuth"; // 设置权限 token
import Config from '@/js/settings'  //公共设置
export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',   //验证码
      cookiePass: '', //保存cookie里面的加密后的密码
      loginForm: {         //登录信息
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {    //验证
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,   //加载动画
    }
  },
  watch: {

  },
  created() {
    // 获取验证码
    this.getCode()
    // token 过期提示
    this.point()
  },
  methods: {
    //验证码
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = res.img
        this.loginForm.uuid = res.uuid
      })
    },

    handleLogin() {
      //cookie里加密密码
      this.cookiePass = Cookies.get('password') === undefined ? '' : Cookies.get('password')
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          //m密码加密
          user.password = encrypt(user.password)
        }

        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }

          login(user.username, user.password, user.code, user.uuid).then(res => {
            setToken(res.token)
            console.log(this.$store.dispatch('saveUserInfo',res))
            this.$router.push({
              path: '/index'
            })
          }).catch((err)=>{
            this.getCode()
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    point() {}

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  position: relative;
  background: #179DE3;
  .login-bg{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
  font-size: 28px;
}

.verifyCodeArea{
  .el-form-item__content{
    display: flex;
  }

}
.login-form {
  z-index: 1;
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
  .el-checkbox{
    display: flex;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img{
    cursor: pointer;
    vertical-align:middle
  }
}
</style>
