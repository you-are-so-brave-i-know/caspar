<template>
  <div>
    <div class="mypage">
      <div class="info-container">
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0">
        <!-- <waterfall v-if="activeName=='photo'" :type="1"></waterfall> -->
      </el-tab-pane>
      <el-tab-pane label="摄影" name="1">
        <!-- <waterfall v-if="activeName=='photo'" :type="1"></waterfall> -->
      </el-tab-pane>
      <el-tab-pane label="话题" name="2">
        <!-- <waterfall v-if="activeName=='tips'" :type="2"></waterfall> -->
      </el-tab-pane>
      <el-tab-pane label="资讯" name="3">
        <!-- <waterfall v-if="activeName=='news'" :type="3"></waterfall> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import card from "../../components/article_card"
export default {
  components: { card },
  data() {
    return {
      activeName: "1"
    };
  },
  mounted() {
    this.getDate()
  },
  methods: {
    handleClick(tab, event) {
      this.getDate()
    },
    getDate() {
    }
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
.mypage {
  height: 300px;
  width: 100%;
}
</style>