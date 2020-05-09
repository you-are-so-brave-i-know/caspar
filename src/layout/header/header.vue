<template>
  <div>
    <el-menu
      default-active="home"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffffff"
      text-color="#555555"
      active-text-color="#66ccff"
    >
      <el-menu-item v-for="item in navList" :key="item.name" :index="item.route">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
      </el-menu-item>
      <div class="item-header">
        <el-popover placement="top-start" width="200" trigger="hover">
          <el-avatar
            @click="$router.push('/login')"
            slot="reference"
            size="medium"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-avatar>
          <div class="header-hover">
            {{islogin}}
            <p id="login" v-if="!islogin" @click="$router.push('/login')">登录</p>
            <p id="registered" v-if="!islogin" @click="$router.push('/signup')">注册</p>
            <p v-if="islogin" @click="$router.push('/homepage/1')"  id="homepage">个人主页</p>
            <p @click="signOut" v-if="islogin">注销</p>
          </div>
        </el-popover>
      </div>
    </el-menu>
  </div>
</template>
<script>
// const islogin = window.localStorage.getItem('isLogin')
export default {
  data() {
    return {
      islogin: window.localStorage.getItem('isLogin'),
      activeIndex: "home",
      navList: [
        {
          route: "home",
          name: "首页"
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.$router.push(`/${key}`);
    },
    signOut() {
      window.localStorage.setItem('isLogin', false)
      this.$router.push({ path: '/login' })
    }
  },
  mounted() {
    // this.islogin = window.localStorage.getItem('isLogin')
  }
};
</script>
<style lang="scss" scoped>
// .el-header {
//   background-color: #b3c0d1;
//   color: #333;
// }

// .el-main {
//   color: #333;
// }
// .el-footer {
//   background-color: #b3c0d1;
//   height: 60px;
// }
.el-menu-demo {
}
.item-header {
  float: right;
  position: relative;
  top: 5px;
  right: 20px;
}
.header-hover {
  text-align: center;
  p {
    &:hover {
      cursor: pointer;
      color: #ffffff;
      background-color: #409eff;
      padding: 8px 0px;
      border-radius: 5px;
    }
  }
  #login {
  }
  #registered {
  }
}
</style>