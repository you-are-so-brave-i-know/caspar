<template>
  <div class="login-container">
    <div class="login-part">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>

        <el-form-item prop="account">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="account"
            v-model="loginForm.account"
            placeholder="account"
            name="account"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <i class></i>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button
          class="loginbtn"
          :loading="loading"
          type="primary"
          plain
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登陆</el-button>

        <div class="tips">
          <span @click="$router.push('/signup')" style="margin-right:20px;">没有账号？</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { validaccount } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码需要大于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", type: 'email', message: '请输入正确的邮箱地址' }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$http.post('/api/user/signin', {
            email: this.loginForm.account,
            password: this.loginForm.password,
          }, {}).then(res => {
            if (res.data.result === 200) {
              this.$message.success(res.data.msg)
              this.$router.push({ path: '/home' });
              this.setlocal(res.data.data)
              // this.local
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(err => {
            this.$message.error(err.data.msg)
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    setlocal(data) {
      window.localStorage.setItem('userName', data.username)
      window.localStorage.setItem('state', data.state)
      window.localStorage.setItem('isLogin', true)
      window.localStorage.setItem('userId', data.id)
    }
  },
  mounted() {
    // console.log(window.localStorage)
  }

}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  height: 920px;
  background-image: url(https://pic.hanfugou.com/web/2019/8/30/15/edfd8d6a7e684902834fb9bf9cb95e64.jpeg_2000.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-origin: border-box;
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
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-part {
    .login-form {
      position: relative;
      top: 200px;
      left: -200px;
      width: 420px;
      max-width: 100%;
      padding: 35px;
      // margin: 0 auto;
      float: right;
      overflow: hidden;
      border-radius: 10px;
      transition: all 1s ease;
      &:hover {
        transition: all 1s ease;
        background-color: $bg;
      }
      .loginbtn {
        background: transparent;
        &:hover {
          background: #66ccff;
        }
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
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
