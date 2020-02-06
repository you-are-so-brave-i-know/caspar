<template>
  <el-row class="footer">
    <el-col :span="4">
      <div class="null"></div>
    </el-col>
    <el-col :span="4">
      <div class="info">
        <span class="info-text">关于本项目</span>
        <span class="info-text">@</span>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.footer {
  .info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    .info-text {
      color: rgba(63, 105, 160, 0.8);
    }
  }
}
</style>