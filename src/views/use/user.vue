<template>
  <div>
      
      <div class="TOP-user">
        <div class="user">
          <img src="../../assets/img/use2.png" alt="">
          <div class="user1">
              <div class="div1">{{userdata.login_name}}</div>
              <div class="div2">男士</div>
              <div class="div3"><van-icon name="user-circle-o" />{{userdata.mobile_phone}}</div>
          </div>
          <div class="user2">
            <van-button round type="info" color="#FF6565" @click="ccc">签到领积分</van-button>
          </div>
        </div>
        <div class="TOP-Qian">
          <div class="div1">每天领红包，年卡仅12万/天</div>
          <div class="div2">立即开通></div>
        </div>
      </div>
      <input type="button" value="登录" @click="go">
      <van-cell-group>
        <van-cell title="单元格" value="内容" >
          <template #title>
            <div class="title">我的订单</div>
          </template>
          <template #default>
            <div class="default">
              查看所有订单>>
            </div>
          </template>
        </van-cell>
       
      </van-cell-group>
      <van-grid>
        <van-grid-item icon="hotel-o" text="文字" />
        <van-grid-item icon="balance-o" text="文字" />
        <van-grid-item icon="free-postage" text="待收货" />
        <van-grid-item icon="records" text="待评价"/>
      </van-grid>
      <div class="box-img">
        <img src="../../assets/img/use1.webp" alt="">
      </div>
      <div class="tit">
        常用功能
      </div>
      <van-grid>
        <van-grid-item icon="hotel-o" text="收获地址" />
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="eye-o" text="浏览记录"/>
        <van-grid-item icon="setting-o" text="设置" @click="addout"/>
      
      </van-grid>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userdata:{}
    }
  },
  // mounted(){
  //     window.addEventListener('click',this.fresh(this.ccc,8000)) 
  // },
  // destroyed(){
  //     window.removeEventListener('click',this.ccc)
  // },
methods:{
  //  fresh(fn,interval){
  //        let last=0
  //       return function(){
  //           let context=this
  //           let args=arguments

  //           let now=+new Date()
  //           if((now-last)>interval){
  //               last=now
  //               fn.apply(context,args)
  //           }
  //       }
  //    } ,
  ccc(){
    this.$toast.success("签到成功");
    console.log("111");
  },
  addout(){
    this.$router.push({
      path:'/ttuse'
    })
  },
 
  go(){
    this.$router.push({
      path:'/login'
    })
  }
},

created(){
  this.$network.UserData().then(res=>{
    console.log(res.data.data);
    this.userdata=res.data.data
  })
}
}
</script>

<style scoped lang="scss">
.TOP-user{
  width: 100%;
  height: 350px;
  box-sizing: border-box;
  background: rgb(69, 69, 247);
  .user{
    width: 90%;
    height: 80%;
    border: 1px solid #000;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 50px;
    display: flex;
    img{
      width: 20%;
      height: 150px;
    }
    .user1{
      width: 50%;
      height: 80%;
     
       box-sizing: border-box;
       .div1{
         font-size: 50px;
         color: white;
       }
       .div2{
         font-size: 40px;
         color: white;
       }
       .div3{
         font-size: 30px;
         color: white;
       }  
    }
    .user2{
      width: 30%;
      height: 80%;
      text-align: center;
      line-height: 224px;
      box-sizing: border-box;
      
    }
  }
  .TOP-Qian{
    width: 90%;
    height: 20%;
    margin: 0 auto;
    background: gray;
    display: flex;
    justify-content: space-around;
    line-height: 80px;
  }
}
.title{
  font-size: 40px;
  font-weight: bold;
}
.box-img{
  width: 100%;
  height: 230px;
  box-sizing: border-box;
  text-align: center;
  line-height: 230px;
  // border: 1px solid #000;
  margin-top: 20px;
  img{
    width: 90%;
    height: 90%;
  }
}
.tit{
  width: 100%;
  font-size: 60px;
  font-weight: bold;
}
</style>