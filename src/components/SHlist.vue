<template>
  <div class="SHlist">
    <div class="SHlist-box" v-for="(item,index) in SHlist" :key="index" @click="golist(item.goodsId)">
      <img :src="item.goodsLogo" alt />
      <div class="SHlist-tit">{{item.goodsName}}</div>
      <div class="SHlist-money">
        <span style="color:red">￥{{item.goodsPrice}}</span>
        <span>
          <van-icon name="star-o" />
          {{item.goodsFav}}
        </span>
      </div>
      <div class="SHlist-Y">
        <s>{{item.goodsOldPrice}}</s>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jiaZ: {
      type: Array,
      required: false,
    },
    name: {
      type: Array,
       required: true,
    },
  },
  data() {
    return {
      SHlist: [],
    };
  },

  watch: {
     name() {
      console.log(this.name);
     
      this.SHlist = this.name;
    },
    jiaZ() {
      this.SHlist = [...this.SHlist, ...this.jiaZ];
    },
   
  },
  methods:{
    golist(id){
      this.$router.push({
        query:{
          id:id
        },
        path:'/xiang'
        
      })
    }
  },
  // mounted() {
  //   this.$network
  //     .SHlist({
  //       params: {
  //         sortType: this.type,
  //         page: this.pagenum,
  //       },
  //     })
  //     .then((res) => {
  //       this.SHlist = res.data.data;
  //     });
  // },
};
</script>

<style scoped lang="scss">
.SHlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.SHlist-box {
  width: 50%;
  height: 500px;
  box-sizing: border-box;
  border: 1px solid #000;
}
.SHlist-box img {
  width: 100%;
  height: 80%;
}
.SHlist-tit {
  width: 100%;
  height: 30px;
  word-break: break-all;
  /*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
  text-overflow: ellipsis;
  display: -webkit-box;
  /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical;
  /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1;
  /** 显示的行数 **/
  overflow: hidden;
}
.SHlist-money {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
}
.SHlist-Y {
  color: gainsboro;
}
</style>