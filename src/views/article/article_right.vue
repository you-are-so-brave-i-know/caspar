<template>
  <div class="main">
    <div class="header">
      <el-avatar size="medium" :src="header"></el-avatar>
    </div>
    <p class="name">{{username}}</p>
    <p class="labs">关注&nbsp;{{attention}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;粉丝&nbsp;{{fans}}</p>
    <div class="operate">
      <el-button size="small" plain>关注</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username: "用户名称",
      attention: 45,
      fans: 5
    };
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 240px;
  text-align: center;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  .header {
  }
  .name {
    color: #5678a0;
    &:hover {
      direction: all 0.5s;
      cursor: pointer;
      color: #ff6699;
    }
  }
  .labs{
    color: #555555;
    font-size: 14px;
  }
}
</style>
