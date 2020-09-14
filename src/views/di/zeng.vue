<template>
  <div>
<van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
/>
  </div>
</template>

<script>
import qs from 'qs';
export default {
data() {
    return {
areaList:{
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    
    120100: '天津市',
   
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    110103: '昌平区',
    110105: '朝阳区',
    110106: '丰台区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    // ....
  }
      },
      searchResult: [],
      content:{},
    };
  },
  methods: {
    onSave(content) {
    
      this.content=content;
      console.log(this.content);
      var params={
        Name:this.content.name,
        Phone:this.content.tel,
        Province:this.content.Province,
        City:this.content.city,
        District:this.content.county,
        Address:this.content.addressDetail
      }
      this.$network.AddArea(qs.stringify(params)).then(res=>{
        console.log(res.data.msg);
        let ss=res.data.msg
        if(ss=="添加收货地址成功"){
           this.$router.push({
        path: "/di",
        
      });     
        }
      })
    },
    onDelete() {
      Toast('delete');
    },
    
  },
}
</script>

<style>

</style>