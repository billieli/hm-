import axios from 'axios'
// 先下载
// 引入的axios进行克隆（就是引入一个axios可配置多个默认）
// 根据需求不同配置多个名字不同的axios
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 5000
})

export default request
