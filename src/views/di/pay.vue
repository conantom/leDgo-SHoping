<template>
  <div>
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-radio-group v-model="radio" @change="chan">
      <div class="box">
        <div class="img">
          <img src="../../assets/img/pay3.png" alt />
        </div>
        <div class="contet">余额支付</div>
        <van-radio name="1"></van-radio>
      </div>
      <div class="box">
        <div class="img">
          <img src="../../assets/img/pay2.png" alt />
        </div>
        <div class="contet">微信支付</div>
        <van-radio name="2"></van-radio>
      </div>
      <div class="box">
        <div class="img">
          <img src="../../assets/img/pay1.png" alt />
        </div>
        <div class="contet">支付宝支付</div>
        <van-radio name="3"></van-radio>
      </div>
    </van-radio-group>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    <div class="footer" @click="pay">确认支付</div>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";
export default {
  data() {
    return {
      value: "",
      showKeyboard: false,
      radio: "1",
      OutTradeNo: "",
      num: "",
      money:0,
      name:"",
    };
  },
  methods: {
    chan(name){
     this.name=name
    },

    onInput(key) {
      this.num = "";
      this.value = (this.value + key).slice(0, 6);
      console.log(this.value);
      if (this.value.length == 6) {
        var valuemd = md5(this.value);
        let params = {
          paypwd: valuemd,
        };
        this.$network.verifyPayPWD(qs.stringify(params)).then((res) => {
          console.log(res.data.msg);
          this.num = res.data.code;
          if (this.num == 200) {
              this.$router.push({
                  path:'/cheng'
              })
          }
        });

        this.$network
          .payOrder(qs.stringify({ orderNum: this.orderNumber }))
          .then((res) => {
            console.log(res.data);
          });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },

    pay() {
     
      if(this.name==3){
        let params={
            OutTradeNo:this.orderNumber,
            Subject :"支付宝",
            ProductCode :"QUICK_WAP_WAY",
            TotalAmount :this.money
          }
          this.$network.appWebPay(qs.stringify(params)).then(res=>{
            console.log(res.data);
          })
      }else{
         this.showKeyboard = true;
      }
       
    },
    onClickLeft() {
      this.$router.push({
        path: "/ding",
      });
    },
  },
  created() {
    this.orderNumber = this.$store.state.dingnum;
    console.log(this.orderNumber);
    this.money=this.$route.query.num
    console.log(this.money);
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100px;

  display: flex;
  .img {
    width: 15%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .contet {
    width: 300px;
    height: 100%;
    font-size: 30px;
    line-height: 100px;
  }
}
.footer {
  width: 100%;
  height: 150px;
  font-size: 50px;
  background: rgb(78, 129, 240);
  color: white;
  text-align: center;
  line-height: 150px;
  position: fixed;
  bottom: 0px;
}
</style>