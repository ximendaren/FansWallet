import axios from 'axios'
import { Toast } from 'vant';
const request = axios.create({   
    //创建axios实例，在这里可以设置请求的默认配置
    timeout: 200000,
    // baseURL: process.env.NODE_ENV === 'production' ? '' : '/api',   
    //根据自己配置的反向代理去设置不同环境的baeUrl

    //测试接口
    baseURL: 'http://api.chainfans.io',  
    // 线上接口
    // baseURL: 'https://api.cloud.chainfans.io',

})
request.defaults.headers.get['Content-Type'] = 'application/json';
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
request.interceptors.request.use(config => {

    // Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true,
    //     loadingType: 'spinner',
    //     duration: 0,
    // }); 
    let token;
    if(window.plus){
        
        // if(plus.storage.getItem("key")){
        //     let val =JSON.parse(plus.storage.getItem("key"));
        //     if(Date.now()-val.time>val.expire){
        //        plus.storage.removeItem("token");
        //     }else{
        //         token = plus.storage.getItem("token")
        //     }
        // }

  
        token = plus.storage.getItem("token")
    }else{
        token = $cookies.get('token')
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
    err => {
        return Promise.reject(err)
    })
request.interceptors.response.use(response => {
    // Toast.clear();
    return response.data
},
    error => {
        if (error.response) {
            // switch (error.response.status) {
            //     case 401:
            //         if(window.plus){
            //             plus.storage.removeItem('token')
            //             plus.storage.removeItem('refresh_token')
            //         }else{
            //             localStorage.clear('token')
            //             localStorage.clear('refresh_token')
            //         }

            //         window.location.hash ='#/login' 
            // }
        }
        return Promise.reject(error)
    })

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            // alert(response)
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}