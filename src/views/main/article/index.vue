<template>
  <div class="main">
    <div class="position">
      <div class="page-left">
        <articleLeft></articleLeft>
        <comment></comment>
      </div>
      <div class="page-right">
        <articleRight></articleRight>
      </div>
    </div>
  </div>
</template>
<script>
import articleLeft from "./article_left";
import articleRight from "./article_right";
import comment from "./comment";
export default {
  components: {
    articleLeft,
    articleRight,
    comment
  },
  data() {
    return {
      textarea: ""
    };
  },
  mounted() {
    console.log(this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.main {
  .position {
    width: 1100px;
    padding: 10px;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    .page-left {
      float: left;
    }
    .page-right {
      float: right;
      position: fixed;
      right: 6%;
      top: 100px;
    }
  }
}
</style>