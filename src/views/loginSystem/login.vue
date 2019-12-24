<template>
  <div class="login-container">
    <div v-if="errorCount === 3 || errorCount >= 6" class="login-pwdLock">输错3次了</div>
    <div v-else>
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">demo</h3>
        </div>

        <el-form-item>
          <span class="svg-container">
            <!-- <svg-icon icon-class="user" /> -->
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd"></span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <div class="tips">
          <span class="forgetText">忘记密码</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      isResendEmail: false, // 是否手动重新发送邮件
      errorCount: null, // 输错密码次数
      loginForm: {},
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      modalTitle: '',
      isUpdatePassword: false
    }
  },
  watch: {
  },
  methods: {
    handleLogin() {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>