import axios from 'axios'
import store from './store'
import router from './router'
import { Notify, Toast } from 'vant'
// import Cookies from 'js-cookie'


// axios.defaults.timeout = 1000 * 5
// axios.defaults.baseURL = 'https://api.imnms.com/api/'
// axios.defaults.baseURL = 'http://103.122.244.183:802/api/'
axios.defaults.baseURL = 'http://192.168.0.119:8000/api/'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // 开启网络加载动画
        // Toast.loading({
        //     mask: true,
        //     duration: 0,
        //     message: '加载中...',
        // });

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {

        // 取消网络加载提示
        // Toast.clear();
        // alert(2)

        switch (response.data.code) {
            // 成功信息
            case 10000:
                Notify({
                    message: response.data.message,
                    duration: 1000,
                    background: '#1989fa'
                })
                break
            // 警告信息
            case 20000:
                Notify(response.data.message)
                break
        }
        return response.data
    },
    error => {


        // 取消网络加载提示
        Toast.clear();

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    store.commit('logout')
                    Notify('状态失效，请重新登录')
                    router.push('/login')
                    break
                case 404:
                    Notify('请求地址不存在')
                    break
                case 419:
                    Notify('请求失效，请刷新页面')
                    break
                case 422:
                    Notify(error.response.data.message)
                    break
                case 429:
                    Notify('频率过快')
                    break
                case 500:
                    Notify('系统异常')
                    break
                case 404:
                    router.push('/404')
                    Notify('请求出错')
                    break
                default:
                // 
            }
        } else {
            // alert(3)
            Toast.fail({
                message: '网络请求异常'
            })
        }
        return Promise.reject(error)
    }
)


export default axios