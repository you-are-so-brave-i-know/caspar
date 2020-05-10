<template>
  <el-card class="article" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{authorName}}</span>
      <el-button
        class="guanzhu"
        @click="attention(authorId,authorName)"
        style="float: right"
        size="mini"
        plain
        :disabled="disabled"
        v-show="userId!=authorId"
      >关注</el-button>
    </div>
    <div class="article-img" @click="$router.push(`/article/${id}`)">
      <img :src="url" key="img" class="image" />
    </div>
    <div class="article-content" @click="$router.push(`/article/${id}`)">
      <div>{{title}}</div>
    </div>
    <div class="article-operate">
      <div class="article-operate-time">
        <span>{{formatter(time)}}</span>
      </div>
      <div class="article-operate-icon">
        <i class="el-icon-s-comment" @click="$router.push(`/article/${id}`)"></i>
        <i class="el-icon-share"></i>
      </div>
    </div>
  </el-card>
</template>
<script>
import { formatSqlDate } from '@/utils/formatter'
export default {
  name: "article_part",
  props: {
    content: {
      type: String
    },
    title: {
      default: "TITLE",
    },
    time: {
      type: String,
    },
    url: {
      type: String,
    },
    id: {
      type: [String, Number]
    },
    authorId: {
      type: [String, Number]
    },
    authorName: {
      type: [String]
    }
  },
  data() {
    return {
      disabled: false,
      userId: window.localStorage.getItem('userId')
    };
  },
  methods: {
    attention(parentId, parentName) {
      const params = {
        userId: this.userId,
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
    formatter(val) {
      return formatSqlDate(val)
    }
  },
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
      &:hover {
        color: #f56c6c;
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