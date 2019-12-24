<template>
  <el-card class="article" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <el-button style="float: right; padding: 3px 0" type="text">+</el-button>
    </div>
    <div class="article-img">
      <img :src="img" class="image" />
    </div>
    <div class="article-content">
      <div>{{content}}</div>
    </div>
    <div class="article-operate">
      <div class="article-operate-time">
        <span>{{time}}</span>
      </div>
      <div class="article-operate-icon">
        <i class="el-icon-s-comment"></i>
        <i class="el-icon-share"></i>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'article_part',
  props: {
    content: {
      default: '肥料掺了金坷垃，能吸收2米以下的氮磷钾，日本的粮食再也不用向美国进口啦!',
      type: String
    },
    title: {
      default: 'TITLE',
      type: String,
    },
    time: {
      type: String,
      default: '2020-01-01'
    },
    img: {
      type: String,
      default: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  data() {
    return {
    }
  }
}
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
  }
  &-img {
    max-height: 402px;
    overflow: hidden;
    img {
      // height: 130px;
      width: 400px;
      border-radius: 5px;
      margin: 0 3px 0 0;
    }
  }
  &-content {
    div {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
        &:hover {
          cursor: pointer;
          color: #66ccff;
        }
      }
    }
  }
}
</style>