import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.css'
import '@/assets/js/chalk'
import '@/assets/js/vintage'
import '@/assets/font/iconfont.css'
import '@/config/echartsConfig'
import '@/config/socketConfig'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
