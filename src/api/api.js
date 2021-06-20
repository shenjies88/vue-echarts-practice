import axiosConfig from '@/config/axiosConfig'

export default {
    seller: function () {
        return axiosConfig.get('/seller')
    },
    trend: function () {
        return axiosConfig.get('/trend')
    }
}
