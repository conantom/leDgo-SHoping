<template>
  <div>
      <nav>
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />

      </nav>
    <div class="DZ" @click="go">
      <div class="img" ><img src="../../assets/img/dinglogo.png" alt=""></div>
      <div class="contxt">
          <p >{{list.name}}{{list.tel}}
            <br>{{list.city}}-{{list.district}}
          </p>
          
      </div>
    </div>  
    <div class="BOX" v-for="(item,index) in Dlist" :key="index">
        <div class="logoname">
           <img :src="item.shopLogo" alt=""> <div>{{item.shopName}}&nbsp;></div>
        </div>
        <van-card
            num="1"
           
            :desc="item.goodsOldPrice"
            :title="item.goodsName"
            :thumb="item.goodsLogo"
        >
        <template #price>
            <div class="tian">七天退换</div>
        </template>
        </van-card>
        <div class="img">
            <img src="../../assets/img/dingshop.png" alt="">  
        </div>
      
    </div>
    <van-submit-bar :price="num" button-text="去支付" @submit="onSubmit" />
  </div>
</template>

<script>
import qs from 'qs';
export default {
  data() {
    return {
      Did: "",
      list:{},
      Listshop: [],
      Dlist: [],
      num:0,
      tt:1,
      datt:[],
      orderNumber:""
    };
  },
  methods: {
    go(){
      this.$router.push({
          path:"/di",
          query:{
            id:this.Did
          }
        })
    },
      onSubmit(){
     console.log(this.list);
       let num=this.num/100
          let params={
            price:num,
            consignee_addr:this.list.name+","+this.list.phone+","+this.list.city+","+this.list.district+","+this.list.address,
            goodsId:this.Did,
            isFcart:true,

          }
          this.$network.cretaeOrder(qs.stringify(params)).then(res=>{
            console.log(res.data.data);
            this.datt=res.data.data
            this.datt.map(i=>{
              console.log(i.orderNumber);
              this.orderNumber=i.orderNumber
            })
            this.$store.dispatch("ding",this.orderNumber)
           let msg=res.data.msg
           if(msg=="订单创建成功"){
            this.$toast.success('订单创建成功');
            this.$router.push({
              path:'/pay',
              query:{
                num:this.num
              }
            })
           }
          })



       
        },
        
     
    onClickLeft() {
      this.$router.push({
        path: "/cars",
      });
    },
  },
  mounted() {
    this.Did = this.$route.query.id;
    console.log(this.Did);
    this.$store.dispatch("Did",this.Did)

    // console.log(this.$store.state.Did,);

    this.$network
      .DingInfo({
        params: {
          goodsid:this.$store.state.Did,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        let Dlist = res.data.data;
        for(var i=0;i<Dlist.length;i++){
         
            let ss=Object.assign(Dlist[i][0],Dlist[i][1])
           
           this.Dlist.push(ss)
        }
        this.Dlist.map(i=>{

            this.num+=i.goodsPrice*this.tt*100
        })
      });

      this.list=this.$store.state.items
  },
};
</script>

<style scoped lang="scss">
nav{
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0px;
    z-index: 999;
}
.BOX{
  width: 100%;
  height: 650px;

 
  .logoname {
    width: 100%;
    height: 80px;
    display: flex;
    box-sizing: border-box;
   
    // line-height: 60px;
    img {
      width: 70px;
      height: 70px;
       border-radius:50% ; 
    }
    div{
        // font-size: 30px;
        width: 300px;
        height: 100%;
        line-height: 80px;
    }
  }
  .img{
      width: 100%;
      height: 350px;
      img{
          width: 100%;
          height: 100%;
      }
  }
}
.tian{
    width: 100px;
    height: 40px;
    border: 1px solid rgb(247, 145, 12);
    color: rgb(255, 115, 0);
    text-align: center;
    background: rgb(252, 197, 183);
    line-height: 40px;
}
.DZ{
   margin-top: 130px;
  width: 100%;
  height: 100px;
  border: 1px solid #000;
  box-sizing: border-box;
  display: flex;
  .img{
    width: 15%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .contxt{
    width: 85%;
    height: 100%;
    p{
      width: 100%;
      height: 30px;
    }
  }
}
</style>