<template>
  <div class="main">
    <div class="position">
      <div class="page-left">
        <articleLeft></articleLeft>
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
export default {
  components: {
    articleLeft,
    articleRight
  },
  data() {
    return {};
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
      left: 950px;
      top:100px;
    }
  }
}
</style>