<template>
  <div class="MAX-BOX">
    <nav>
      <div class="TOP-img">
        <img src="../../assets/img/download.png" alt />
      </div>
      <div class="NAV-top">
        <van-search placeholder="请输入搜索关键词" @focus="go" />
      </div>
    </nav>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" offset="0">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="Swiper-LB">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in LBimg" :key="index">
              <img :src="item.slide_show_imgUrl" alt />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="Gong">
          <van-grid :column-num="5" icon-size="50px" :border="false">
            <van-grid-item
              v-for="(item,index) in Gong"
              :key="index"
              :icon="item.sp_home_ico"
              :text="item.sp_home_title"
            />
          </van-grid>
        </div>
        <div id="showDays" :class="headerFixed?'issFixed':''">
          <van-tabs v-model="active" @change="add">
            <van-tab v-for="(item,index) in navlist" :key="index" :title="item" />
          </van-tabs>
        </div>
        <SHlist :name="SHlist" :jiaZ="JiaSHlist"></SHlist>
      </van-list>
    </van-pull-refresh>
    <div class="dian"></div>
  </div>
</template>

<script>
import SHlist from "../../components/SHlist";
export default {
  components: {
    SHlist,
  },
  data() {
    return {
      headerFixed: 0, //是否吸顶 条件
      offsetTop: 0, //元素的offsetTop
      active: "0",
      LBimg: [],
      Gong: [],
      navlist: ["流行", "新款", "精选"],
      num: "syn", //数据类型关键字  传给子组件
      loading: false,
      finished: false,
      refreshing: false,
      pagenum: 1,
      JiaSHlist: [], //向子组件传递获取的新数据
      SHlist: [],
    };
  },
  mounted() {
    //节流
    //  window.addEventListener('scroll',this.Refresh(this.onRefresh,1000)) 

    // 监听dom渲染完成
    this.$nextTick(function () {
      // 这里fixedHeaderRoot是吸顶元素的ID
      let header = document.getElementById("showDays");
      // 这里要得到top的距离和元素自身的高度
      this.offsetTop = header.offsetTop;
      // console.log("offsetTop:" + this.offsetTop);
    });
    // handleScroll为页面滚动的监听回调
    window.addEventListener("scroll", this.handleScroll);

    this.$network.LBG().then((res) => {
      // console.log(res);
      this.LBimg = res.data.data[1];
      this.Gong = res.data.data[0];
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.onRefresh);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    go() {
      this.$router.push({
        path: "/sou",
      });
    },
      //节流
    // Refresh(fn,interval){
    //      let last=0
    //     return function(){
    //         let context=this
    //         let args=arguments

    //         let now=+new Date()
    //         if((now-last)>interval){
    //             last=now
    //             fn.apply(context,args)
    //         }
    //     }
    //  } ,
    onRefresh() {
      console.log("刷新");
      setTimeout(() => {
        this.SHlist = [];
        this.$network
          .SHlist({
            params: {
              sortType: this.num,
              page: this.pagenum,
            },
          })
          .then((res) => {
            this.SHlist = res.data.data;
            this.refreshing = false;
            this.$toast.success("刷新成功");
          });
      }, 3000);
    },
    onLoad() {
      //获取新数据
      setTimeout(() => {
        this.$network
          .SHlist({
            params: {
              sortType: this.num,
              page: this.pagenum++,
            },
          })
          .then((res) => {
            this.JiaSHlist = res.data.data;
            this.loading = false;
          });
      }, 2000);
    },
    add(name) {
      //改变获取数据的类型
      if (this.name == 0) {
        this.num = "syn";
      }
      if (this.name == 1) {
        this.num = "new";
      }
      if (this.name == 2) {
        this.num = "sell";
      }
      this.$network
        .SHlist({
          params: {
            sortType: this.num,
            page: this.pagenum,
          },
        })
        .then((res) => {
          this.SHlist = res.data.data;
        });
    },
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置       console.log("divoffsetTOP"+document.getElementById("showDays").offsetTop);

      //如果滚动距离 大于元素的offsetTop 就返回1，吸顶
      //如果滚动距离 小于元素的offsetTop 就返回0，不吸顶
      this.headerFixed = scrollTop > this.offsetTop ? 1 : 0;
    },
  },
};
</script>

<style scoped >
.dian {
  width: 100%;
  height: 100px;
}
nav {
  width: 100%;
  height: 200px;
  position: fixed;
  top: 0px;
  z-index: 9999;
}
.TOP-img {
  background: white;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
}
.TOP-img img {
  width: 400px;
  height: 100%;
  margin: 0 auto;
}
.NAV-top {
  width: 100%;
  height: 100px;
}
.Swiper-LB {
  margin-top: 200px;
  width: 100%;
  height: 460px;
}
.my-swipe {
  width: 100%;
  height: 100%;
}
.my-swipe img {
  width: 100%;
  height: 100%;
}

.headerFixed {
  width: 100%;
  height: 100px;
}
.issFixed {
  position: fixed;
  top: 200px;
  left: 0px;
  right: 0px;
  z-index: 4;
}
</style>