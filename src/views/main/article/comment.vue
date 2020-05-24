<template>
  <div class="main">
    <div class="write">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
      <el-button type="primary" size="small" @click="addComment">评论</el-button>
    </div>
    <div class="content">
      <div class="title">
        <span>评论{{ '('+comments.length+')'}}</span>
      </div>
      <hr />
      <div class="comments">
        <div class="single" v-for="(comment,index) in comments" :key="index">
          <el-row>
            <el-col :span="2" :offset="1">
              <el-avatar
                class="single-header"
                size="large"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
            </el-col>
            <el-col :span="21">
              <div class="single-content">
                <div class="single-author">
                  <span>{{comment.userName}}</span>
                  <!-- <i class="el-icon-star-off single-zan">{{comment.like}}</i> -->
                </div>
                <p class="single-time">{{ formatDate(comment.create_time)}}</p>
                <div class="single-text">{{comment.content}}</div>
                <!-- <div class="singel-other">
                  <hr />其他内容
                </div>-->
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatSqlDate } from '@/utils/formatter'
export default {
  data() {
    return {
      textarea: "",
      count: 13,
      comments: []
    };
  },
  methods: {
    addComment() {
      // console.log(this.$route.params.id)
      if (this.textarea) {
        const params = {
          userName: window.localStorage.getItem('userName'),
          userId: window.localStorage.getItem('userId'),
          articleId: this.$route.params.id,
          content: this.textarea
        }
        const url = 'api/part/add_comment'
        this.$axios.post(url, params, {}).then(res => {
          if (res.status == 200) {
            this.getComment()
            this.textarea = ""
          }
        })
      } else {
        this.$notify({
          title: '提示',
          message: '请填写评论内容',
          type: 'warning'
        });
      }

    },
    getComment() {
      const params = {
        id: this.$route.params.id,
      }
      // console.log(params)
      const url = 'api/part/get_comment'
      this.$axios.post(url, params, {}).then(res => {
        this.comments = res.data.list
      })
    },
    formatDate(val, fmt) {
      return formatSqlDate(val, fmt)
    }
  },
  mounted() {
    this.getComment()
  }
};
</script>
<style lang="scss" scoped>
.main {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.24);
  padding: 20px 80px;
  width: 750px;
  margin: 20px 0px;
  .write {
    // padding: 10px 0;
    button {
      // float: right;
      margin: 10px 0px;
    }
  }
  .content {
    padding-top: 10px;
    .comments {
      .single {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        border-radius: 20px;
        padding: 8px;
        margin: 15px 0px;
        background: rgba(179, 216, 255, 0.2);
        &-header {
          position: relative;
          top: 8px;
        }
        &-content {
          p {
            margin: 0;
          }
          .single-author {
            padding-right: 20px;
            .single-zan {
              float: right;
              color: #ff9966;
              &:hover {
                cursor: pointer;
                color: #409eff;
              }
            }
          }
          .single-time {
            color: #999999;
            font-size: 14px;
            word-break: break-all;
            resize: none;
            margin: 0;
            padding: 0;
          }
          .single-text {
            font-size: 14px;
            white-space: pre-wrap;
            overflow: hidden;
            padding: 5px 0px;
          }
          .singel-other {
            width: 90%;
          }
        }
      }
    }
  }
}
@media screen and(max-width:1600px) {
  .main {
    width: 750px;
  }
}
</style>