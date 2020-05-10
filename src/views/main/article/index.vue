<template>
  <div class="main">
    <div class="position">
      <div class="page-left">
        <div class="details">
          <p class="title">{{form.title}}</p>
          <div>
            <span class="time">{{ formatDate(form.create_time)}}</span>
            &nbsp;&nbsp;|&nbsp;
            <span>
              <span>{{form.like}}</span> 喜欢
            </span>
          </div>
          <p class="content">{{form.content}}</p>
          <div class="image">
            <!-- <el-image v-for="url in urls" :key="url" :src="url" class="urlimgs" lazy></el-image> -->
          </div>
          <el-image :src="form.url" lazy class="urlimgs"></el-image>
          <div class="operate">
            <el-button type="primary" @click="likeit" :disabled="islike">喜欢</el-button>
            <!-- <el-button type="primary" class="el-icon-star-off">收藏</el-button> -->
          </div>
          <div class="share">
            <i class="el-icon-grape"></i>
            <i class="el-icon-watermelon"></i>
            <i class="el-icon-apple"></i>
            <i class="el-icon-orange"></i>
          </div>
        </div>
        <comment></comment>
      </div>
      <div class="page-right">
        <div class="right-main">
          <div class="header">
            <el-avatar size="medium" :src="header"></el-avatar>
          </div>
          <p class="name">{{username}}</p>
          <p class="labs">关注&nbsp;{{attention}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;粉丝&nbsp;{{fans}}</p>
          <div class="operate" v-show="authorId!=userId">
            <el-button size="small" plain @click="goattention(authorId,username)">关注</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import comment from "./comment";
import { formatSqlDate } from '@/utils/formatter'
export default {
  components: {
    comment
  },
  data() {
    return {
      textarea: "",
      header:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username: "用户名称",
      userId: window.localStorage.getItem('userId'),
      authorId: 0,
      attention: 0,
      fans: 0,
      form: {
        title: "标题",
        time: "2019-12-17 11:18:26",
        like: 0,
        url: ''
      },
      islike: false,
      urls: [
      ],
    };
  },
  methods: {
    getArticle() {
      const params = {
        id: this.$route.params.id
      }
      const url = '/api/part/article_detail'
      this.$axios.post(url, params, {}).then(res => {
        if (res.status == 200) {
          this.form = res.data.data
          this.authorId = res.data.data.authorId
          this.getAuthor(res.data.data.authorId)
        }
      })
    },
    getAuthor(id) {
      const url = "/api/user/getuser"
      const params = {
        id: id
      }
      this.$axios.post(url, params, {}).then(res => {
        this.attention = res.data.data.attention
        this.fans = res.data.data.fans
        this.username = res.data.data.username
      })
    },
    goattention(parentId, parentName) {
      const params = {
        userId: window.localStorage.getItem('userId'),
        parentId: parentId,
        parentName: parentName
      }
      const url = '/api/part/attention'
      this.$axios.post(url, params, {}).then(res => {
        if (res.status == 200) {
          this.$message.success(res.data.msg)
          this.disabled = true
        }
      })
    },
    formatDate(val, fmt) {
      return formatSqlDate(val, fmt)
    },
    likeit() {
      const params = {
        id: this.$route.params.id
      }
      const url = '/api/part/likeit'
      this.$axios.post(url, params, {}).then(res => {
        if (res.status == 200) {
          this.islike = true
          this.form.like += 1
        }
      })
    }
  },
  mounted() {
    this.getArticle()
  }
};
</script>
<style lang="scss" scoped>
.main {
  .position {
    width: 1100px;
    padding: 10px;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    .page-left {
      float: left;
      .details {
        padding: 40px 80px;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.24);
        width: 750px;
        .title {
          margin-bottom: 20px;
          // border-bottom: 1px solid gray;
          font-size: 24px;
          color: #555555;
          word-break: break-all;
        }
        .datetime {
          color: #999999;
          font-size: 14px;
          word-break: break-all;
          resize: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid grey;
        }
        .content {
          line-height: 28px;
          font-size: 20px;
          word-break: break-all;
          word-wrap: break-word;
          white-space: pre-wrap;
          margin-bottom: 30px;
          overflow: hidden;
          font-family: Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
        }
        .image {
        }
        .operate {
          margin: 50px 0;
          overflow: hidden;
          display: flex;
          justify-content: center;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
        }
        .share {
          display: flex;
          justify-content: center;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          i {
            font-size: 25px;
            margin: 0 10px;
            &:hover {
              color: #66cc00;
              cursor: pointer;
            }
          }
        }
      }
      .urlimgs {
        width: 100%;
        background-size: contain;
      }
    }
    .page-right {
      float: right;
      position: fixed;
      right: 6%;
      top: 100px;
      .right-main {
        width: 240px;
        text-align: center;
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.24);
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
        .labs {
          color: #555555;
          font-size: 14px;
        }
      }
    }
  }
}
</style>