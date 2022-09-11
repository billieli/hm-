import axios from 'axios'
import store from '@/store'
// 先下载
// 引入的axios进行克隆（就是引入一个axios可配置多个默认）
// 根据需求不同配置多个名字不同的axios
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 5000
})
// 给 创建出来的request添加公用的请求头部
request.interceptors.request.use(
    function (confing) {
        const {
            getters: { isLogin },
            state: { tokenObj }
        } = store
        if (isLogin) {
            confing.headers.Authorization = `Bearer ${tokenObj.token}`
        }
        return confing
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default request
