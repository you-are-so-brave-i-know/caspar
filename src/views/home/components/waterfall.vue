<template>
  <div class="waterfall" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <div class="waterfallrow" v-for="(el,i) in newWaterfallData" v-loading="loading" :key="i">
      <div class="waterfallcol" v-for="(item,index) in newWaterfallData[i]" :key="index">
        <articleCard
          class="part"
          :title="item.title"
          :img="item.img"
          :content="item.content"
          :time="item.time"
          :id="item.id"
        ></articleCard>
      </div>
    </div>
    <div class="waterfallinfo">
      <p v-show="loading">加载中...</p>
      <p v-show="noMore">没有更多了</p>
    </div>
  </div>
</template>
<script>
import articleCard from "./article_card";
export default {
  components: {
    articleCard
  },
  props: {
    // 摄像 话题 咨询
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      defalutfallData: [
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
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          content: "",
          time: "2019-04-09"
        },
        {
          title: "a",
          img:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
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
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          content: "",
          time: "2019-04-09"
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
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          content: "",
          time: "2019-04-09"
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
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          content: "",
          time: "2019-04-09"
        }
      ], //模拟用初始数据
      waterfallData: [], //填充数据
      newWaterfallData: [[], [], []], //展示数据
      count: 8, //初始展示值
      loading: false,
      addnumber: 4, //每次下拉新增数量
      row: 3, //行数
      clietwidth: "" //浏览器宽
    };
  },
  computed: {
    noMore() {
      return this.waterfallData.length == 0;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {
    // clietwidth: function(val) {
    //   this.row = Math.floor(val / 420);
    // },
    // row: function(val) {
    //   this.sizeChange();
    // }
  },
  methods: {
    //   添加卡片
    setNewPart(num) {
      let [...allData] = this.waterfallData.splice(0, num);
      let [...newData] = this.newWaterfallData.concat([]);
      allData.forEach((el, i) => {
        switch (i % this.row) {
          case 0:
            newData[0].push(el);
            break;
          case 1:
            newData[1].push(el);
            break;
          case 2:
            newData[2].push(el);
            break;
          case 3:
            newData[3].push(el);
            break;
        }
      });
      this.newWaterfallData = newData;
    },
    // 浏览器rezise时切换数据格式
    // sizeChange() {
    //   let arr = [];
    //   let newarr = [];
    //   newarr.length = this.row;
    //   this.newWaterfallData.forEach((item, index) => {
    //     arr = arr.concat(item);
    //   });
    //   for (let i = 0; i < this.row; i++) {
    //     newarr[i] = [];
    //   }
    //   arr.forEach((el, i) => {
    //     switch (i % this.row) {
    //       case 0:
    //         newarr[0].push(el);
    //         break;
    //       case 1:
    //         newarr[1].push(el);
    //         break;
    //       case 2:
    //         newarr[2].push(el);
    //         break;
    //       case 3:
    //         newarr[3].push(el);
    //         break;
    //     }
    //   });
    //   this.newWaterfallData = newarr;
    // },
    //加载图片
    load() {
      this.loading = true;
      setTimeout(() => {
        this.getimg(this.type);
        this.setNewPart(this.row);
        this.loading = false;
      }, 1000);
    },
    // 获取图片接口
    getimg(type) {
      var obj = [
        {
          title: "a",
          img:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          content: "",
          time: "2019-04-09"
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
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          content: "",
          time: "2019-04-09"
        }
      ];
      if (type == 1) {
        this.waterfallData = this.waterfallData.concat(obj);
      }
    },
    // 获取初始展示图片
    getStartImg(type) {
      if (type == 1) {
        this.waterfallData = this.defalutfallData;
      } else if (type == 2) {
        this.waterfallData = [];
      } else if ((this.waterfallData = 3)) {
        this.waterfallData = this.defalutfallData;
      }
    }
  },
  mounted() {
    // const that = this;
    // window.onresize = () => {
    //   this.clietwidth = document.body.clientWidth;
    // };
  },
  created() {
    // this.sizeChange();
    this.getStartImg(this.type);
    this.setNewPart(this.count);
  }
};
</script>
<style lang="scss" scoped>
.homepage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
}
.waterfall {
  width: 100%;
  padding: 20px;
  height: 1200px;
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  transition: all 2s ease;
  .waterfallrow {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    .part {
      margin-bottom: 25px;
      //   border: 1px solid black;
      transition: all 1s ease;
    }
  }
  .waterfallinfo {
    width: 100%;
    height: 20px;
    text-align: center;
  }
}
</style>