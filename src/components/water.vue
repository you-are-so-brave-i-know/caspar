<template>
  <div>
    <div>
      <!-- 测试功能用 -->
      <!-- <button @click="loadmore">loadmore</button> -->
      <!-- <button @click="mix">mix</button>
      <button @click="switchCol(2)">2列</button>
      <button @click="switchCol(4)">4列</button>
      <button @click="switchCol(3)">3列</button>-->
    </div>
    <waterfall
      :col="col"
      :width="itemWidth"
      :gutterWidth="gutterWidth"
      :data="showList"
      @loadmore="loadmore"
      @scroll="scroll"
      class="waterfall-container"
      ref="waterfall"
    >
      <template>
        <div class="cell-item" v-for="(item,index) in showList" :key="index" :lazy-src="item.url">
          <articleCard
            class="part"
            :title="item.title"
            :url="item.url"
            :content="item.content"
            :time="item.create_time"
            :id="item.id"
            :authorId="item.authorId"
            :authorName="item.userName"
          ></articleCard>
        </div>
      </template>
    </waterfall>
    <div class="maxtag" v-show="maxTag">到底了</div>
  </div>
</template>
<script>
import articleCard from "@/components/article_card";
export default {
  components: {
    articleCard
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      showList: [],
      col: Math.floor(document.body.clientWidth / 500),
      screenWidth: window.innerHeight,
      loadNum: 9,
      maxTag: false
    };
  },
  computed: {
    itemWidth() {
      return 400
    },
    gutterWidth() {
      return (document.body.clientWidth - this.col * 400 - 160) / (this.col - 1)
      // return 10
    },
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val
      this.col = Math.floor(this.screenWidth / 500)
    },
    data(list) {
      if (list.length > 0) {
        this.showList = this.data.slice(0, this.loadNum - 1)
      }
    }
  },
  methods: {
    scroll(scrollData) {
      // console.log(scrollData);
      // this.loadmore()
    },
    switchCol(col) {
      this.col = col;
      console.log(this.col);
    },
    loadmore() {
      this.showList = this.data.slice(0, this.showList.length + this.loadNum - 1)
      if (this.showList.length == this.data.length) {
        this.maxTag = true
      }
    }
  },
  created() {
    // console.log(document.body.clientWidth, document.documentElement.clientWidth)
    // console.log(Math.floor(document.body.clientWidth / 500))
    // this.col = Math.floor(document.body.clientHeight / 500)
  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped>
.waterfall-container {
  padding: 20px 80px;
  .cell-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }
}
.maxtag {
  font-size: 20px;
  text-align: center;
  color: #909399;
  margin-bottom: 10px;
  &:hover {
    color: #606266;
    cursor: pointer;
  }
}
</style>