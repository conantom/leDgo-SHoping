<template>
  <div class="box">
    <nav>
      <van-row type="flex" align="center">
        <van-col span="2">
          <van-icon name="arrow-left" size="30px" @click="goshou" />
        </van-col>
        <van-col span="22">
          <van-tabs v-model="active">
            <van-tab v-for="(item,index) in navtit" :key="index" :title="item"></van-tab>
          </van-tabs>
        </van-col>
      </van-row>
    </nav>

    <div v-if="Show">
      <van-skeleton title :row="12" />
    </div>
    <div v-else>
      <div class="TOP-img">
        <img :src="goods.goodsLogo" alt />
      </div>
      <div class="TOP-tit">
        <van-tag type="primary" size="medium">新品</van-tag>
        {{goods.goodsName}}
      </div>
      <div class="Money">
        <div class="Money1">￥{{goods.goodsPrice}}</div>
        <div class="Money2">
          <s>{{goods.goodsOldPrice}}</s>
        </div>
      </div>

      <div class="TOP-num">
        <div class="TOP-num1">售量{{goods.goodsBuyNum}}</div>
        <div class="TOP-num2">收藏{{goods.goodsFav}}</div>
        <div class="TOP-num3">{{goods.goodsAre}}</div>
      </div>

      <div class="ShouH">
        <div v-for="(item,index) in shouH" :key="index">
          <img :src="item.icon" alt />
          {{item.name}}
        </div>
      </div>

      <van-cell-group>
        <van-cell title="卖家评论2" value="更多>>" />
      </van-cell-group>
      <div class="PPL" v-if="diss">
        <div class="PPLcon" v-for="(item,index) in PPLtext" :key="index">
          <div class="p1">
            <img :src="item.comment_body.user_img" alt />
            <div class="p1-1">{{item.comment_body.user_name}}</div>
          </div>
          <div class="p2">{{item.comment_body.content}}</div>
          <div class="p3">{{time}}</div>
        </div>
      </div>
      <div class="ShangJ">
        <div class="p1">
          <img :src="ShangJ.shopLogo" alt />
          <div class="p1-1">{{ShangJ.shopName}}</div>
        </div>
        <div class="ShangJ-pf">
          <div class="ShangJ-pf1">
            <div class="ShangJ-pf1-1">
              {{ShangJ.snum}}
              <p>总销量</p>
            </div>
            <div class="ShangJ-pf1-2">
              {{ShangJ.snum}}
              <p>全部宝贝</p>
            </div>
          </div>
          <div class="ShangJ-pf2">
            <div>描述相符&nbsp;{{ShangJ.shopPiont}}<span>高</span></div>
            <div>价格合理&nbsp;{{ShangJ.shopPriceOk}}<span>高</span></div>
            <div>质量满意&nbsp;{{ShangJ.shopQuality}}<span>高</span></div>
          </div>
        </div>
        <div class="dianP">
          进店看看
        </div>
      </div>
    
    <div class="htmlimg">
       <div v-html="goods.goodsIntroduce" ></div>
    </div>
     
    </div>
    <div class="dian"></div>
    <div class="van-goods">
<van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" dot />
  <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
  <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
  <van-goods-action-button type="warning" text="加入购物车" @click="addCars" />
  <van-goods-action-button type="danger" text="立即购买" />
</van-goods-action>
    
    </div>
   
  </div>
</template>

<script>
import {debounce} from '../uit/desic';
import qs from 'qs';
export default {
  data() {
    return {
      navtit: ["商品", "评论", "详情", "推荐"],
      active: 0,
      Show: true,
      goodsLogo: "",
      goods: [],
      shouH: [],
      PPLtext: [],
      time:"",
      diss:true,
      num:1,
      id:"",
    };
  },
  methods: {
   
    addCars:debounce(function(){
      let params={
          product_id:this.id,
          product_amount:this.num++,
          price:this.goods.goodsPrice
        }
        this.$network.addCart(qs.stringify(params)).then(res=>{
          console.log(res.data.msg);
          if(res.data.msg=="添加购物车成功"){
             this.$toast.success("添加成功");
                setTimeout(() => {
                  this.$router.push({ path: "/cars" });

                }, 1000);
                  }
        })
    },3000),
    goshou() {
      this.$router.push({
        path: "/",
      });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.$network
      .Xiangcon({
        params: {
          goodsId: this.id,
        },
      })
      .then((res) => {
        // console.log(res.data.data[3]);
        this.goods = res.data.data[0];
        this.ShangJ = res.data.data[1];
        this.shouH = res.data.data[2];
        this.PPLtext = res.data.data[3];
        this.PPLtext.map(i=>{
          if(i==null){
            this.diss=false
          }else{
          let time= i.comment_body.audit_time
         var may=new Date(time*1000)
         this.time=`${may.getFullYear()}-${may.getMonth()+1}-${may.getDate()}`
          }
        
        })
        this.Show = false;
      });
  },
};
</script>

<style scoped lang="scss">

nav {
  width: 100%;
  position: fixed;
  top: 0px;
  background: white;
}
.TOP-img {
  margin-top: 100px;
  width: 100%;
  height: 700px;
  img {
    width: 100%;
    height: 100%;
  }
}
.TOP-tit {
  width: 100%;
  font-size: 30px;
  box-sizing: border-box;
  padding: 10px;
}

.Money {
  width: 100%;
  height: 100px;

  display: flex;
  .Money1 {
    height: 100%;
    line-height: 100px;
    font-size: 45px;
    color: violet;
  }
  .Money2 {
    height: 100%;
    line-height: 130px;
    color: gray;
  }
}
.ShouH {
  width: 100%;
  height: 70px;
  display: flex;
  img {
    width: 30px;
    height: 30px;
  }
  div {
    flex: 1;
    line-height: 70px;
  }
}
.dian {
  width: 100%;
  height: 100px;
}
.TOP-num {
  width: 100%;
  height: 80px;
  display: flex;
  div {
    flex: 1;
    color: gray;
    line-height: 80px;
  }
  .TOP-num2 {
    text-align: center;
  }
  .TOP-num3 {
    text-align: right;
  }
}
.PPL {
  width: 100%;
  .PPLcon {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    padding: 10px;
    .p1 {
      width: 100%;
      height: 100px;

      display: flex;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .p1-1 {
        height: 100%;
        line-height: 100px;
        font-size: 30px;
      }
    }
    .p2 {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: gray;
      margin-top: 10px;
    }
  }
}
.ShangJ {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  padding: 10px;
  border-top: 2px solid #f2f5f8;
  border-bottom: 10px solid #f2f5f8;
  .p1 {
    width: 100%;
    height: 100px;
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .p1-1 {
      margin-left: 40px;
      height: 100%;
      font-size: 30px;
      line-height: 100px;
    }
  }
  .ShangJ-pf {
    width: 100%;
    height: 270px;
    box-sizing: border-box;
    // border: 1px solid #000;
    display: flex;
    padding: 30px;
    .ShangJ-pf1 {
      flex: 1;
      border: 1px solid #000;
      display: flex;
      div {
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        padding-top: 40px;
        font-size: 30px;
      }
    }
    .ShangJ-pf2 {
      flex: 1;
      border: 1px solid #000;
      line-height: 60px;
      div{
        width: 100%;
        padding-left: 20px;
        span{
          margin-left: 20px;
          background: green;
          color: white;
          font-size: 30px;
        }
      }
    }
  }
  .dianP{
    width: 260px;
    height: 60px;
    border-radius:20px;
    background: rgb(192, 191, 191);
    text-align: center;
    line-height: 60px;
    margin: 0 auto;
    font-size: 30px;
  }
}
.van-goods{
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 99999;
}
.htmlimg{
  width: 100%;
  /deep/ div{
    width: 100%;
    img{
      width: 100%;
    }
  }
}
</style>