<template>
  <div>
      <van-nav-bar
  title="设置"
  left-text="返回"
 
  left-arrow
  @click-left="onClickLeft"
 
/>
    <van-cell-group>
        <van-cell title=" 一致性 Consistency " >
            <template #default>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title="反馈 Feedback" >
            <template #default>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title=" 效率 Efficiency " >
            <template #default>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title=" 切换账号与注销登录的区别 " >
            <template #default>
                <van-icon name="arrow" />
            </template>
        </van-cell>
    </van-cell-group>
    <van-button type="primary" block>注销登录</van-button>
  </div>
</template>

<script>
export default {
methods:{
    onClickLeft(){
        this.$router.push({
            path:'/use'
        })
    }
}
}
</script>

<style>

</style>