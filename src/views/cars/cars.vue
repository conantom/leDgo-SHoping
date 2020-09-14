<template>
  <div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      right-text="管理"
      @click-right="onClickRight"
    />
    <div v-if="tt">
      <van-empty description="未添加商品" />
    </div>
    <van-row type="flex" align="center" v-for="(item,index) in carsList" :key="index">
      <van-col span="2">
        <van-checkbox-group v-model="result">
          <van-checkbox :name="item" @click="check(item.cart_id)"></van-checkbox>
        </van-checkbox-group>
      </van-col>
      <van-col span="22">
        <van-card :price="item.price" :desc="item.add_time" :title="item.title" :thumb="item.image">
          <template #footer>
            <van-stepper
              :default-value="item.product_amount"
              @change="jia(item)"
              @plus="carjia(item)"
              @minus="carjian(item)"
            />
          </template>
        </van-card>
      </van-col>
    </van-row>
    <div class="car" v-if="dd">
      <van-submit-bar :price="this.allmenoy" button-text="提交订单" @submit="add">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div class="ss" v-else>
      <van-submit-bar button-text="删除订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="AllCheck">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      result: [],
      carsList: [],
      checked: false,
      allmenoy: 0,
      dd: true,
      id: {},
      tt: false,
    };
  },
  methods: {
    add() {
      if(this.result.length == 0) {
        alert("您还没有选择商品哦");
        return
      } else {
        var dingId = [];
        this.result.map((i) => {
          dingId.push(i.product_id);
        });
        var Aid = dingId.join(" ");
        this.$router.push({
          query: {
            id: Aid,
          },
          path: "/ding",
        });
      }
    },
    onClickRight() {
      this.dd = !this.dd;
    },
    onSubmit() {
      this.result.map((i) => {
        this.id = i.cart_id;
      });
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否删除所选内容",
        })
        .then(() => {
          this.carsList = [];
          let params = {
            carid: this.id,
          };
          this.$network.DeleteCart(qs.stringify(params)).then((res) => {
            console.log(res.data);
          });

          this.$network.getCart().then((res) => {
            this.carsList = res.data.data;

            this.$store.dispatch("Carslist", res.data.data);
          });
        })
        .catch(() => {});
    },
    AllCheck() {
      if (this.checked) {
        this.result = this.$store.state.carsArry;
        this.save();
      } else {
        this.result = [];
      }
    },

    carjian(item) {
      item.product_amount--;
      this.save();
    },

    save() {
      this.allmenoy = 0;
      this.result.map((i) => {
        this.allmenoy += i.price * i.product_amount * 100;
      });
    },

    carjia(item) {
      item.product_amount++;
      this.save();
    },

    jia(item) {
      this.save();
      let ss = localStorage.vuex.carsArry;
      if (ss) {
        console.log(ss);
        // ss.map(i=>{
        //   i.product_amount=item.product_amount
        // })
      }
      let params = {
        catId: item.cart_id,
        product_amount: item.product_amount,
      };
      this.$network.CartNum(qs.stringify(params)).then((res) => {
        console.log(res.data);
      });
    },
    check(id) {
      this.save();
      // this.$store.dispatch("check")

      this.checked = this.result.length == this.carsList.length;
      //   let params={
      //     catId:id
      //   }
      // this.$network.CartChecked(qs.stringify(params)).then(res=>{
      //   console.log(res);
      // })
    },

    onClickLeft() {
      this.$router.push({
        path: "/",
      });
    },
  },
  mounted() {
    this.$network.getCart().then((res) => {
      console.log(res.data);
      this.carsList = res.data.data;
      if (res.data.msg == "没有更多了") {
        this.tt = true;
      }
      this.$store.dispatch("Carslist", res.data.data);
    });
  },
};
</script>

<style scoped lang="scss">
.car {
  width: 100%;
  position: fixed;

  bottom: 100px;
  z-index: 9999;
}
.ss {
  width: 100%;
  position: fixed;

  bottom: 100px;
  z-index: 9999;
}
</style>