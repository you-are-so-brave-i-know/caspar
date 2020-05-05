<template>
  <div class="main">
    <div class="mypage">
      <div class="info-container">个人信息+背景图</div>
    </div>
    <div class="content">
      <div class="left">
        <div class="title">关注列表</div>
        <div class="list-item" v-for="(item,index) in list" :key="index">
          <i class="el-icon-user header"></i>
          <span class="name">{{item.parentName}}</span>
          <el-button type="danger" size="mini" class="attetion">取消关注</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="right">
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
  </div>
</template>
<script>
// import card from "../../components/article_card"
export default {
  // components: { card },
  data() {
    return {
      activeName: "1",
      list: [
        {
          userId: '',
          parentName: '吃瓜群众',
          parentId: '5',
        }
      ]
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
.main {
  height: 100%;
  .mypage {
    height: 300px;
    width: 100%;
    // border: 1px solid;
  }
  .content {
    display: flex;

    .left {
      width: 450px;
      background-color: #ededef;
      padding-bottom: 20px;
      min-height: 600px;
      .title{
        text-align: center;
        padding: 10px 5px;
        font-size: 20px;
      }
      .list-item {
        width: 400px;
        height: 50px;
        margin: 10px auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.24);
        border-radius: 5px;
        padding: 8px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: nowrap;
        background: #fff;
        align-items: center;
        &:hover{
           box-shadow: 0 2px 4px rgba(46, 140, 156, 0.31), 0 0 6px rgba(46, 140, 156, 0.24);
        }
        .header {
          font-size: 35px;
        }
        .name {
          width: 245px;
          padding-left: 15px;
        }
      }
    }
    .right {
      width: calc(100% - 450px);
      border: 1px solid;
      margin-left: 30px;
    }
  }
}
</style>