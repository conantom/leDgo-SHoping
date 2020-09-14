<template>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action @keydown.enter="soutext">
      <template #label>商品名</template>
      <template #action>搜索</template>
    </van-search>
    <div v-if="SHow">
      <div class="box">
        <div class="box-x">
          <p>全网热搜</p>
          <div class="box-list">
            <div class="box-div" v-for="(item,index) in HOTlist" :key="index" @click="soutexts(item)">{{item}}</div>
          </div>
        </div>
      </div>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索内容</van-divider>
      <van-cell-group>
        <van-cell v-for="(item,index) in histext" :key="index" :title="item">
          <template #default>
            <van-icon name="delete" size="20px" @click="ss(index)" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-button type="primary" block @click="ssCC">删除历史记录</van-button>
    </div>

    <div v-else>
      <van-tabs v-model="active">
        <van-tab v-for="(item,index) in tabtit" :key="index" :title="item"></van-tab>
      </van-tabs>
      <SHlist :name="list"></SHlist>
    </div>
  </div>
</template>

<script>
import SHlist from "../../components/SHlist";
export default {
  data() {
    return {
      active: 1,
      value: "",
      HOTlist: [],
      histext: JSON.parse(localStorage.getItem("histext")) || [],
      his: [],
      SHow: true,
      tabtit: ["综合", "销量", "新品", "价格"],
      list: [],
    };
  },
  components: {
    SHlist,
  },
  methods: {
    ss(index){
      this.histext.splice(index,1)
      this.save()
    },
    ssCC(){
      this.$dialog.confirm({
  title: '删除记录',
  message: '是否删除所有历史记录',
})
  .then(() => {
    this.histext=[]
      this.save();
  })
  .catch(() => {
   
  });
      
    },
    soutexts(item){
        this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 3000,
      });
  

      this.value=item
      this.$network
        .getGoods({
          params: {
            goodsName: this.value,
            page: "1",
            pageSize: "10",
            sortType: "syn",
          },
        })
        .then((res) => {
          this.list = res.data.data;
          let code = res.data.code;
          if (code == 200) {
            this.SHow = false;
          }
        });

      var a = this.histext.indexOf(this.value);

      if (a == -1) {
        this.histext.unshift(this.value);
      } else {
        this.histext.splice(a, 1);
        this.histext.unshift(this.value);
      }

      if (this.histext.length > 6) {
        this.histext.pop();
      }

      this.save();
      this.value = "";
    },
    soutext() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 3000,
      });
  

     
      this.$network
        .getGoods({
          params: {
            goodsName: this.value,
            page: "1",
            pageSize: "10",
            sortType: "syn",
          },
        })
        .then((res) => {
          this.list = res.data.data;
          let code = res.data.code;
          if (code == 200) {
            this.SHow = false;
          }
        });

      var a = this.histext.indexOf(this.value);

      if (a == -1) {
        this.histext.unshift(this.value);
      } else {
        this.histext.splice(a, 1);
        this.histext.unshift(this.value);
      }

      if (this.histext.length > 6) {
        this.histext.pop();
      }

      this.save();
      this.value = "";
    },
    save() {
      localStorage.histext = JSON.stringify(this.histext);
    },
  },
  created() {
    this.$network.SearchHot().then((res) => {
      this.HOTlist = res.data.data;
    });

    let ss = localStorage.histext;

    if (ss) {
      this.histext = JSON.parse(ss);
    }
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 400px;

  box-sizing: border-box;
  .box-x {
    width: 80%;
    height: 80%;

    margin: 0 auto;
    p {
      font-size: 30px;
      color: gray;
    }
    .box-list {
      width: 100%;
      // height: 225px;
      // border: 1px solid #000;
      display: flex;
      flex-wrap: wrap;
      .box-div {
        border: 1px solid rgb(153, 151, 151);
        color: gray;
        font-size: 30px;
        margin: 15px;
        padding: 5px;
      }
    }
  }
}
</style>