<template>
  <div>
      <van-nav-bar
        title="支付完成"
        left-arrow
        @click-left="onClickLeft"
        />


        <div class="wz-box">
            <div class="wz-nav"><img src="../../assets/img/end.png" alt=""></div>
            <div class="wz-font1">支付成功</div>
            <div class="wz-font2">订单支付成功 请确认</div>
            <div class="footer">查看订单</div>
        </div>
  </div>
</template>

<script>
import qs from "qs"
export default {
    data(){
        return{

        }
    },
    // created(){
    //     console.log(this.$store.state.zhifu.orderNumber)
    //     let params={
    //         orderId:this.$store.state.zhifu.orderNumber
    //     }
    //     this.$http.payorder(qs.stringify(params)).then(res=>{
    //         console.log(res)
    //     })
    // },
    // methods:{
    //     onClickLeft(){
    //         this.$router.back();
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.wz-box{
    width: 100%;
    div{
        display: flex;
        justify-content: center;
        img{
            width: 200px;
            height: 200px;
        }
    }
    .wz-nav{
        width: 100%;
        margin: 80px 0px;
    }
    .wz-font1{
        font-size: 32px;
        font-weight: 700;
    }
    .wz-font2{
        font-size: 28px;
        margin-top: 8px;
    }
    .footer{
        width: 94%;
        margin: 0 auto;
        height: 80px;
        background: #0D70FF;
        box-sizing: border-box;
        color: #fff;
        border-radius: 10px;
        text-align: center;
        line-height: 80px;
        margin-top: 180px;
    }
}
</style>