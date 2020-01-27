<template>
  <div class="details">
    <p class="title">标题</p>
    <div>
      <span class="time">{{time}}</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span>
        共<span>{{sumImg}}</span>张图
      </span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span>
        共<span>{{sumComment}}</span>条评论
      </span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span>
        共<span>{{sumLike}}</span>点赞
      </span>
    </div>
    <p class="content">老夫聊发少年狂</p>
    <div class="image">
      <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
    </div>
    <div class="operate">
      <el-button type="primary" class="el-icon-thumb">点赞</el-button>
      <el-button type="primary" class="el-icon-star-off">收藏</el-button>
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
export default {
  data() {
    return {
      title: "标题",
      time: "2019-12-17 11:18:26",
      sumImg: "0",
      sumComment: "0",
      sumLike: "75",
      talk: 9,
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.details {
  padding: 40px 80px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  width: 640px;
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
    font-size: 16px;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    margin-bottom: 30px;
    overflow: hidden;
    font-family: Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
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
      margin: 0 10px;
      &:hover {
        color: #66cc00;
        cursor: pointer;
      }
    }
  }
}
</style>