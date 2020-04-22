<template>
  <div>
    <div>
      <button @click="loadmore">loadmore</button>
      <!-- <button @click="mix">mix</button> -->
      <button @click="switchCol(2)">2列</button>
      <button @click="switchCol(4)">4列</button>
      <button @click="switchCol(3)">3列</button>
    </div>
    <waterfall
      :col="col"
      :width="itemWidth"
      :gutterWidth="gutterWidth"
      :data="list"
      @loadmore="loadmore"
      @scroll="scroll"
      class="waterfall-container"
      ref="waterfall"
    >
      <template>
        <div class="cell-item" v-for="(item,index) in list" :key="index">
          <articleCard
            class="part"
            :title="item.title"
            :img="item.img"
            :content="item.content"
            :time="item.time"
            :id="item.id"
          ></articleCard>
        </div>
      </template>
    </waterfall>
  </div>
</template>
<script>
import articleCard from "./article_card";
export default {
  components: {
    articleCard
  },
  data() {
    return {
      list: [],
      data: [
        {
          title: "a",
          img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          content:
            "肥料掺了金坷垃，一袋能顶两袋撒！日本的粮食再也不用向美国进口啦！",
          time: "2019-04-09",
          id: "ajgeiu3957"
        },
        {
          title: "a",
          img:
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          content: "",
          time: "2019-04-09"
        },
        {
          title: "a",
          img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          content: "",
          time: "2019-04-09"
        },
        {
          title: "a",
          img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          content: "",
          time: "2019-04-09"
        },
        {
          title: "a",
          img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          content: "",
          time: "2019-04-09"
        },
      ],
      col: Math.floor(document.body.clientWidth / 600),
      screenWidth: window.innerHeight
    };
  },
  computed: {
    itemWidth() {
      return 500
    },
    gutterWidth() {
      return (document.body.clientWidth - this.col * 500 - 160) / (this.col - 1)
    },
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val
      this.col = Math.floor(this.screenWidth / 500)
    }
  },
  methods: {
    scroll(scrollData) {
      // console.log(scrollData);
    },
    switchCol(col) {
      this.col = col;
      console.log(this.col);
    },
    loadmore(index) {
      this.list = this.list.concat(this.data);
    }
  },
  created() {
    console.log(document.body.clientWidth, document.documentElement.clientWidth)
    console.log(Math.floor(document.body.clientWidth / 500))
    // this.col = Math.floor(document.body.clientHeight / 500)
  },
  mounted() {
    this.list = this.data
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
</style>