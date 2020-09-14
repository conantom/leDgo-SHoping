import Vue from 'vue'
import Vuex from 'vuex'
import createistate from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookieL:"",
    carsArry:[],
    numAll:0,
    Did:"",
    items:{},
    dingnum:[]
  },
  mutations: {

    ding(state,orderNumber){
      state.dingnum=orderNumber
    },
    Did(state,Did){
      state.Did=Did
      console.log(Did);
    },
    ClickRight(state,item){
      state.items=item
    },
    Cookivuex(state,cooknum){
      state.cookieL=cooknum
  
    
    },
    Carslist(state,params){
      
        state.carsArry=params
       
    },
    // check(state){
    //   console.log("111");
    //   state.carsArry.map(item=>{
    //     state.numAll+=item.product_amount*item.price
    //     console.log(item);
    //   })
    // }
  },
  actions: {
    ding(context,orderNumber){
      context.commit("ding",orderNumber)
    },
    ClickRight(context,item){
      context.commit("ClickRight",item)
    },
    Did(context,Did){
      context.commit("Did",Did)
    },
   
    Cookivuex(context,cooknum){
      // console.log(cooknum);
      context.commit("Cookivuex",cooknum)
    },
    Carslist(context,params){
      context.commit("Carslist",params)
    },
    // check(context){
    //   context.commit("check")
    // }
  },
  modules: {
  },
    plugins:[createistate({
        storage:window.localStorage
      })]
})
