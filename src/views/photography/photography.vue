<template>
  <div class="homepage">
    <div class="waterfall" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <div class="px-waterfall" v-for="(el,i) in newWaterfallData" :key="i">
        <div class="waterfallcol" v-for="(item,index) in newWaterfallData[i]" :key="index">
          <articlePart
            class="part"
            :title="item.title"
            :img="item.img"
            :content="item.content"
            :time="item.time"
            :id="item.id"
          ></articlePart>
        </div>
      </div>
      <p v-show="loading">加载中...</p>
      <p v-show="noMore">没有更多了</p>
    </div>
    <div class="last"></div>
  </div>
</template>
<script>
import articlePart from '../../components/article_card'
export default {
  components: { articlePart },
  data() {
    return {
      defalutfallData: [
        {
          title: 'a',
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          content: '肥料掺了金坷垃，一袋能顶两袋撒！日本的粮食再也不用向美国进口啦！',
          time: '2019-04-09',
          id:'ajgeiu3957'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
      ],
      waterfallData: [],
      newWaterfallData: [[], [], []],
      count: 8,
      loading: false,
      maxcount: 36,
      addnumber: 3,
    }
  },
  computed: {
    noMore() {
      return this.waterfallData.length == 0
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    setNewPart(num) {
      let [...allData] = this.waterfallData.splice(0, num)
      let [...newData] = this.newWaterfallData.concat([])
      allData.forEach((el, i) => {
        switch (i % 3) {
          case 0: newData[0].push(el)
            break
          case 1: newData[1].push(el)
            break
          case 2: newData[2].push(el)
            break
        }
      })
      this.newWaterfallData = newData
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.setNewPart(3)
        this.loading = false
      }, 1000)
    },
    getmore() {
      let obj = [
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
        {
          title: 'a',
          img: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          content: '',
          time: '2019-04-09'
        },
      ]
      this.waterfallData.concat(obj);
    }
  },
  created() {
    this.waterfallData = this.defalutfallData
    this.setNewPart(this.count)
  },
}
</script>
<style lang="scss" scoped>
.homepage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  .waterfall {
    // border: 1px solid black;
          margin: 0 auto;
    min-width: 1270px;
    max-width: 1420px;
    height: 700px;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    .px-waterfall {
      width: calc(100% / 3);
      display: flex;
      flex-direction: column;
      .part {
        margin-bottom: 25px;
      }
    }
  }
}
</style>