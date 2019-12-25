<template>
  <div>
    <el-menu
      default-active="home"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="item in navList" :key="item.name" :index="item.route">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
      </el-menu-item>
      <div class="item-header">
        <el-image
          @click="$router.push('/login')"
          class="user-header"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="fill"
        ></el-image>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 'home',
      navList: [
        {
          route: 'photography', name: '摄影'
        },
        {
          route: 'topic', name: '话题'
        },
        {
          route: 'news', name: '资讯'
        }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.$router.push(`/${key}`)
    }
  },
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-main {
  color: #333;
}
.el-footer {
  background-color: #b3c0d1;
  height: 60px;
}
.item-header {
  float: right;

  .user-header {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
</style>