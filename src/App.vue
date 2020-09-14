<template>
  <div id="app">
   
     <router-view/>
      <van-tabbar v-model="active" v-show="this.$route.meta.isShow" active-color="#DD001B" route>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="bag-o" to="/shop">商城</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/cars">购物车</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/use">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:"0"
    }
  }
}
</script>
<style lang="scss" lang="scss">

</style>
