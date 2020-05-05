<template>
  <div class="details">
    <p class="title">{{form.title}}</p>
    <div>
      <span class="time">{{ formatDate(form.create_time)}}</span>
      <!-- &nbsp;&nbsp;|&nbsp;&nbsp; -->
      <!-- <span>
        共<span>{{sumImg}}</span>张图
      </span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span>
        共<span>{{sumComment}}</span>条评论
      </span>-->
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
</template>
<script>
import { formatSqlDate } from '@/utils/formatter'
export default {
  data() {
    return {
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
</style>