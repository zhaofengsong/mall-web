import Vue from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import store from '@/store/index.js'
=======
import store from './store'
>>>>>>> 15339f760fcb3282f67b06f08266cb83f30e0702

import './plugins/element.js'
import './plugins/axios.js'

<<<<<<< HEAD
Vue.config.productionTip = false;
=======
Vue.config.productionTip = false
>>>>>>> 15339f760fcb3282f67b06f08266cb83f30e0702

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
