<template>
  <div class="home">
    <div class="home-header">
      <Header></Header>
    </div>
    <div class="home-main">
      <router-view></router-view>
    </div>
    <!-- <div class="home-footer">
      <Footer></Footer>
    </div>-->
  </div>
</template>
<script>
import Header from './header/header'
import Footer from './footer'
export default {
  components: {
    Header, Footer
  },
  name: 'layout'
}
</script>
<style lang="scss" scoped>
.home {
  &-header {
  }
  &-main {
    width: 100%;
    // overflow: hidden;
    height: 100%;
    // background: #ededef;
    // position: relative;
  }
  &-footer {
    height: 60px;
    background-color: rgb(195, 187, 207);
  }
}
</style>