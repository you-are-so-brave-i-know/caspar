<template>
  <div class="box">
    <el-button @click="login">login</el-button>
  </div>
</template>
<script>
export default {
  name: "Imgpart",
  data() {
    return {
      img1: "",
      img2: "",
      output: ""
    };
  },
  methods: {
    login() {
      // 触发motation事件
      this.$store.commit("newlogin");
      // this.$store.commit("setUserType", "admin");
      // 触发action事件
      this.$store.dispatch({ type: "newlogin", time: 1000 }); //隔一秒再点击显示为3
      this.$store.dispatch("actionA", "改变user").then(() => {
        setTimeout(() => {
          // 等待触发后1s在显示
          // console.log(this.$store.state.userType);
        }, 1000);
      });
      // console.log(this.$store);
      // console.log(this.$store.state.count);
      // console.log(this.$store.getters.getListName);
      // console.log("getlist length:" + this.$store.getters.getListlength);
      // console.log(this.$store.getters.getNamebyId(2));
      // // module-a的属性
      // console.log(this.$store.state.a.age);
    }
  }
};
</script>
<style scoped>
.box {
  width: 500px;
}
</style>