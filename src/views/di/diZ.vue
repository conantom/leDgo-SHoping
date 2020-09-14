<template>
  <div>
    <van-nav-bar
      title="更换收货地址"
      left-text="返回"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRights"
    />

    <div v-if="showNull">
      <van-empty description="还未添加收货地址" />
    </div>

    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        add-button-text="选择该地址"
         default-tag-text="默认"
        @add="onClickRight"
        @select="check"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      showNull: false,
      chosenAddressId: "0",
      list:[],
      items:{},
    };
  },
  mounted() {
    this.id = this.$route.query.id;

    this.$network.getArea().then((res) => {
      console.log(res.data.data);
      this.list=res.data.data;
      let msg = res.data.msg;
      if (msg == "没有更多了") {
        this.showNull = true;
      }
        
    });
  },
  methods: {
    check(item){
      // console.log(item);
       this.items=item
    },  
    onClickRights(){
        this.$router.push({
        path: "/zeng",
        
      });     
    },
    onClickLeft() {
      this.$router.push({
        path: "/ding",
        query: {
          id: this.id,
        },
      });
    },
    onClickRight() {
       
        this.$store.dispatch("ClickRight",this.items)
      this.$router.push({
        path: "/ding",
        query:{
            id:this.id
        }
      });
    },
  },
};
</script>

<style>
</style>