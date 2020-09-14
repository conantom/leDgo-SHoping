<template>
  <div>
    <van-row type="flex" align="center">
      <van-col span="2">
        <van-icon name="arrow-left" size="30px" @click="goshou" />
      </van-col>
      <van-col span="22">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </van-col>
    </van-row>
    <div class="box">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item,index) in getlistnav" :key="index" :title="item.cat_name" @click="clicknav(item.cat_id)" />
      </van-sidebar>
        <SHlist :name=list></SHlist>
    </div>
    <div class="dian"></div>
  </div>
</template>

<script>
import SHlist from '../../components/SHlist';
export default {
  components:{
    SHlist
  },
  data() {
    return {
      activeKey: 0,
      value: "",
      getlistnav: [],
      id:"85",
      list:[]
    };
  },
  methods: {
    clicknav(id){
      this.id=id
      this.$network.SHanglist({params:{
        cat_id:this.id,
        
      }}).then(res=>{
      this.list=res.data.data
      })
    },
    goshou() {
      this.$router.push({
        path: "/",
      });
    },
  },
  mounted() {
    this.$network.listnav().then((res) => {
    
      this.getlistnav = res.data.data;
    });

     this.$network.SHanglist({params:{
        cat_id:this.id,
        
      }}).then(res=>{
      
            this.list=res.data.data
      })  
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  // height: 80vh;
  display: flex;
}
.dian {
  width: 100%;
  height: 70px;
}
</style>