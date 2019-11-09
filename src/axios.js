import axios from 'axios'
import store from './store'
import router from './router'
import { Toast } from 'vant'
// import Cookies from 'js-cookie'

// axios.defaults.timeout = 1000 * 5
axios.defaults.baseURL = 'http://api.imddm.com/api/'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.timeout = 7000
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
                if (response.data.message) {
                    Toast({
                        message: response.data.message,
                        duration: 1000,
                        background: '#1989fa'
                    })
                }

                break
            // 警告信息
            case 20000:
                Toast(response.data.message)
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
                    Toast('状态失效，请重新登录')
                    router.push('/login')
                    break
                case 404:
                    router.push('/404')
                    Toast('请求丢失')
                    break
                case 419:
                    Toast('请求失效，请刷新页面')
                    break
                case 422:
                    Toast(error.response.data.message)
                    break
                case 429:
                    Toast('频率过快')
                    break
                case 500:
                    Toast('系统异常')
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