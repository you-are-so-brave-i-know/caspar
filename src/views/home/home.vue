<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="摄影" name="photography">
      <waterfall v-if="activeName=='photography'" :type="1" :data="photographyList"></waterfall>
    </el-tab-pane>
    <el-tab-pane label="话题" name="tips">
      <waterfall v-if="activeName=='tips'" :type="2" :data="tipsList"></waterfall>
    </el-tab-pane>
    <el-tab-pane label="资讯" name="news">
      <waterfall v-if="activeName=='news'" :type="3" :data="newsList"></waterfall>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import waterfall from "./components/water"
export default {
  components: { waterfall },
  data() {
    return {
      activeName: "photography",
      photographyList: [],
      tipsList: [],
      newsList: []
    };
  },
  mounted() {
    this.handleClick()
  },
  methods: {
    handleClick() {
      let type = ''
      if (this.activeName == 'photography') {
        type = 'all_photography'
      } else if (this.activeName == "tips") {
        type = 'all_tips'
      } else if (this.activeName == "news") {
        type = 'all_news'
      }
      this.$axios.get(`/api/part/${type}`).then(res => {
        if (res.status == 200) {
          this[`${this.activeName}List`] = res.data.list
        }
      }).catch(err => {
        this.$message.error(err.data.msg)
      })
    },
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