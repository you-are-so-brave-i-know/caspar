<template>
  <div class="main">
    <div class="mypage">
      <div class="tranparent">
        <div class="info-container">
          <img
            :src="header"
            style="object-fit: cover;"
          />
          <div class="username">{{userName}}</div>
          <div>
            <p>
              关注&nbsp;
              <span style="color:#0066CC">1</span>&nbsp;|&nbsp;&nbsp;粉丝&nbsp;
              <span style="color:#6633CC">2</span>
            </p>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="$router.push({path:'/newArticle'})"
            >写文章</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="title">关注列表</div>
        <div class="list-item" v-for="(item,index) in list" :key="index">
          <i class="el-icon-user header"></i>
          <span class="name">{{item.parentName}}</span>
          <el-button
            type="danger"
            size="mini"
            class="attetion"
            @click="unsubscribe(item.parentId)"
          >取消关注</el-button>
        </div>
        <div class="noattention" v-show="list.length==0">没有任何关注的人</div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="right">
        <el-tab-pane label="摄影" name="photography">
          <waterfall v-if="activeName=='photography'" :data="photographyList"></waterfall>
        </el-tab-pane>
        <el-tab-pane label="话题" name="tips">
          <waterfall v-if="activeName=='tips'" :data="tipsList"></waterfall>
        </el-tab-pane>
        <el-tab-pane label="资讯" name="news">
          <waterfall v-if="activeName=='news'" :data="newsList"></waterfall>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import waterfall from "@/components/water"
export default {
  components: { waterfall },
  data() {
    return {
      header:window.localStorage.getItem('header'),
      userName: window.localStorage.getItem('userName'),
      userId: window.localStorage.getItem('userId'),
      activeName: "photography",
      photographyList: [],
      tipsList: [],
      newsList: [],
      list: []
    };
  },
  mounted() {
    this.getAttentionList()
    this.handleClick()
  },
  methods: {
    handleClick() {
      let type = 1
      if (this.activeName == 'photography') {
        type = 1
      } else if (this.activeName == "tips") {
        type = 2
      } else if (this.activeName == "news") {
        type = 3
      }
      const params = {
        userId: this.userId,
        type: type
      }
      this.$axios.post(`/api/part/my_article`, params, {}).then(res => {
        if (res.status == 200) {
          this[`${this.activeName}List`] = res.data.list
        }
      }).catch(err => {
        this.$message.error(err.data.msg)
      })
    },
    getAttentionList() {
      const params = {
        userId: this.userId
      }
      const url = 'api/part/getAttentionList'
      this.$axios.post(url, params, {}).then(res => {
        this.list = res.data.list
      })
    },
    unsubscribe(parentId) {
      const params = {
        userId: this.userId,
        parentId: parentId
      }
      const url = 'api/part/unsubscribe'
      this.$confirm('是否取消关注？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(url, params, {}).then(res => {
          this.$message.success(res.data.msg)
        }).catch().finally(() => {
          this.getAttentionList()
        })
      }).catch(() => {
      });

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
  background: #ededef;
  .mypage {
    height: 300px;
    width: 100%;
    background-image: url("../../../assets/background.jpg");
    background-position: 0 0;
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: cover;
    // border: 1px solid;
    .tranparent {
      width: 100%;
      height: 100%;
      .info-container {
        height: 220px;
        width: 250px;
        margin: 0 auto;
        position: relative;
        top: 50px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 10px 0px;
        &:hover {
          background-color: rgba(255, 255, 255, 0.6);
        }
        .username {
          margin-top: 10px;
          color: #000066;
          font-size: 20px;
          font-weight: bolder;
          color: #000066;
        }
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
    }
  }
  .content {
    display: flex;
    padding: 20px;
    .left {
      width: 450px;
      background-color: #fff;
      padding-bottom: 20px;
      height: 100%;
      border: 1px solid gray;
      border-radius: 5px;
      // margin: 0 30px;
      .title {
        text-align: center;
        padding: 10px 5px;
        font-size: 22px;
        border-bottom: 1px solid gray;
        font-weight: 600;
      }
      .list-item {
        width: 380px;
        height: 50px;
        margin: 15px auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.24);
        border-radius: 5px;
        padding: 8px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: nowrap;
        background: #fff;
        align-items: center;
        &:hover {
          box-shadow: 0 2px 4px rgba(46, 140, 156, 0.31),
            0 0 6px rgba(46, 140, 156, 0.24);
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
      border: 1px solid gray;
      border-radius: 5px;
      margin-left: 30px;
      background: #fff;
      padding: 1px;
    }
  }
}
.noattention {
  text-align: center;
  color: rgb(140, 197, 255);
  padding-top: 10px;
}

@media screen and(max-width: 1500px) {
  .mypage {
    height: 600;
  }
}
</style>