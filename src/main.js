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

Vue.filter('timestampToTime', function (date) {
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    let s = date.getSeconds()
    if (s < 10) {
        s = '0' + s
    }
    return Y + M + D + h + m + s
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
