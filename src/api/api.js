import axiosConfig from '@/config/axiosConfig'

export default {
    seller: function () {
        return axiosConfig.get('/seller')
    },
    trend: function () {
        return axiosConfig.get('/trend')
    },
    map: function () {
        return axiosConfig.get('/map')
    },
    rank: function () {
        return axiosConfig.get('/rank')
    },
    hot: function () {
        return axiosConfig.get('/hot')
    },
    stock: function () {
        return axiosConfig.get('/stock')
    }
}
