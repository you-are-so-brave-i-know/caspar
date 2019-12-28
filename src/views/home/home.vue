<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="摄影" name="photo">
      <waterfall v-if="activeName=='photo'" :type="1"></waterfall>
    </el-tab-pane>
    <el-tab-pane label="话题" name="tips">
      <waterfall v-if="activeName=='tips'" :type="2"></waterfall>
    </el-tab-pane>
    <el-tab-pane label="资讯" name="news">
      <waterfall v-if="activeName=='news'" :type="3"></waterfall>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import waterfall from "./components/waterfall";
export default {
  components: { waterfall },
  data() {
    return {
      activeName: "photo"
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style lang="scss" scoped>
.el-tabs {
  ::v-deep .el-tabs__header {
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
  }
}
</style>