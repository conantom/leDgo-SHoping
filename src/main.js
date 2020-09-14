import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import network from './network/index';
import Vant from 'vant';

import 'lib-flexible/flexible'; //引入scss文件

import 'vant/lib/index.css';
Vue.use(Vant);

Vue.prototype.$network=network
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
