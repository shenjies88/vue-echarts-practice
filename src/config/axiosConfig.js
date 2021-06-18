import axios from 'axios'
import config from '@/config/config'

axios.defaults.baseURL = config[process.env.NODE_ENV].baseURL
axios.interceptors.response.use(response => {
        return response.data
    }
)

export default axios
