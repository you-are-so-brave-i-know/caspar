<template>
  <el-card class="article" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <el-button class="guanzhu" style="float: right" size="mini">关注</el-button>
    </div>
    <div class="article-img" @click="$router.push(`/article/${id}`)">
      <img :src="img" key="img" class="image" />
    </div>
    <div class="article-content" @click="$router.push(`/article/${id}`)">
      <div>{{content}}</div>
    </div>
    <div class="article-operate">
      <div class="article-operate-time">
        <span>{{time}}</span>
      </div>
      <div class="article-operate-icon">
        <i class="el-icon-s-comment" @click="$router.push(`/article/${id}`)"></i>
        <i class="el-icon-share"></i>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "article_part",
  props: {
    content: {
      default:
        "肥料掺了金坷垃，能吸收2米以下的氮磷钾，日本的粮食再也不用向美国进口啦!",
      type: String
    },
    title: {
      default: "TITLE",
      type: String
    },
    time: {
      type: String,
      default: "2020-01-01"
    },
    img: {
      type: String,
      default:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    },
    id: {
      type: String,
      default: "26"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.el-card {
  >>> .el-card__header {
    padding: 10px 15px;
  }
  >>> .el-card__body {
    padding: 10px 15px;
  }
}
.article {
  width: 400px;
  display: block;
  .clearfix {
    padding-bottom: 10px;
    .guanzhu {
    }
  }
  &-img {
    max-height: 472px;
    overflow: hidden;
    img {
      // height: 130px;
      width: 372px;
      border-radius: 5px;
      margin: 0 3px 0 0;
    }
  }
  &-content {
    margin: 10px 0px;
    div {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover{
        color: #F56C6C;
        cursor: pointer;
      }
    }
  }
  &-operate {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
    &-time {
      span {
        color: #617179;
        font-size: 10px;
      }
    }
    &-icon {
      i {
        padding-right: 5px;
        font-size: 30px;
        &:hover {
          cursor: pointer;
          color: #66ccff;
        }
      }
    }
  }
}
</style>