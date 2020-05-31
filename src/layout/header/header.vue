<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffffff"
      text-color="#555555"
      active-text-color="#66ccff"
    >
      <el-menu-item v-for="item in navList" :key="item.name" :index="item.route" v-show="item.show">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
      </el-menu-item>
      <div class="item-header">
        <el-popover placement="top-start" width="200" trigger="hover">
          <el-avatar @click="$router.push('/login')" slot="reference" size="large" fit="contain">
            <img :src="header?header:'../../../public/header/header.jpg'" />
          </el-avatar>
          <div class="header-hover">
            <!-- {{islogin}} -->
            <p id="login" v-if="!islogin" @click="$router.push('/login')">登录</p>
            <p id="registered" v-if="!islogin" @click="$router.push('/signup')">注册</p>
            <p v-if="!isroot&&islogin" @click="$router.push('/homepage/1')" id="homepage">个人主页</p>
            <p @click="signOut" v-if="islogin">注销</p>
          </div>
        </el-popover>
      </div>
    </el-menu>
  </div>
</template>
<script>
const isroot = window.localStorage.getItem('root')
export default {
  data() {
    return {
      islogin: window.localStorage.getItem('isLogin'),
      header: window.localStorage.getItem('header'),
      isroot: isroot,
      activeIndex: "",
      navList: [
        {
          route: "home",
          name: "首页",
          show: !isroot
        },
        {
          route: "manage",
          name: '管理',
          show: isroot
        },
        {
          route: "userManage",
          name: '用户管理',
          show: isroot
        },
        {
          route: "commentManage",
          name: '评论管理',
          show: isroot
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
    if (isroot) {
      this.activeIndex = this.$route.name
    }
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
  height: 100%;
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