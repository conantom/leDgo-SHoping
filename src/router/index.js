import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';

Vue.use(VueRouter)

  const routes = [
 
  { //首页
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    meta:{
      isShow:true
    },
    beforeEnter:(to,from,next)=>{
      if(store.state.cookieL==""){
        next({path:'/login'})
      }else{
        next();
      }
    }
  },
 
  { //商城
    path: '/shop',
    name: 'shop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/shop/shop.vue'),
    meta:{
      isShow:true
    }
  },
  { //购物车
    path: '/cars',
    name: 'cars',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/cars/cars.vue'),
    meta:{
      isShow:false
    }
  },
  { //我的
    path: '/use',
    name: 'use',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/use/user.vue'),
    meta:{
      isShow:true
    }
  },
  { //我的
    path: '/ttuse',
    name: 'ttuse',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/use/ttuse.vue'),
    meta:{
      isShow:true
    }
  },
  { //我的
    path: '/xiang',
    name: 'xiang',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Xiang/xiang.vue'),
    meta:{
      isShow:false
    }
  },
  { //登录
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue'),
    meta:{
      isShow:false
    }
  },
  { //登录
    path: '/ding',
    name: 'ding',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ding/dingD.vue'),
    meta:{
      isShow:false
    }
  },
  { //地址
    path: '/di',
    name: 'di',
    component: () => import(/* webpackChunkName: "about" */ '../views/di/diZ.vue'),
    meta:{
      isShow:false
    }
  },
  { //搜索
    path: '/sou',
    name: 'sou',
    component: () => import(/* webpackChunkName: "about" */ '../views/sou/sou.vue'),
    meta:{
      isShow:false
    }
  },
  { 
    path:'/zeng',
    name:'zeng',
    component: () => import(/* webpackChunkName: "about" */ '../views/di/zeng.vue'),
    meta:{
      isShow:false
    }
 },
 { 
  path:'/pay',
  name:'pay',
  component: () => import(/* webpackChunkName: "about" */ '../views/di/pay.vue'),
  meta:{
    isShow:false
  }
},
{ 
  path:'/cheng',
  name:'cheng',
  component: () => import(/* webpackChunkName: "about" */ '../views/ding/shopend.vue'),
  meta:{
    isShow:false
  }
},
{ 
  path:'/ping',
  name:'ping',
  component: () => import(/* webpackChunkName: "about" */ '../views/ping/pingl.vue'),
  meta:{
    isShow:false
  }
}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
