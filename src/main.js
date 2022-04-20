import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//登录粒子背景特效
import VueParticles from "vue-particles";
//Element-Ui
import ElementUI from 'element-ui';
//缓存cookie
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css';
//引入lib-flexible
import 'lib-flexible/flexible';

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
