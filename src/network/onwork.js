import axios from 'axios';
import {MET} from './inwork';

import store from '../store/index';
const {baseUrl}=require('../config/env.'+process.env.NODE_ENV+".js");
const infromer=axios.create({
    baseURL:baseUrl,
    timeout:20000
})

//头部添加token信息
// cancelToken




// 添加请求拦截器
infromer.interceptors.request.use(function (config) {
           
            
        // 在发送请求之前做些什么
    // console.log(store.state.cookieL)
        if(store.state.cookieL){//添加token
            config.headers.token = store.state.cookieL
        }
        return config;
    }, function (error) {
    
        return Promise.reject(error);
    });
    
    // 添加响应拦截器
    // infromer.interceptors.response.use(function (response) {
    //     // 对响应数据做点什么
    //     Toast.clear();
    //     return response;
    // }, function (error) {
    //     // 对响应错误做点什么
    //     return Promise.reject(error);
    // });


export function request(method,url,params){
    switch(method){
        case MET.GET:
            return GET(url,params);
        case MET.POST:
            return POST(url,params);
        case MET.PATCH:
            return PATCH(url,params)
    }
}

function GET(url,params){
    return infromer.get(url,params)
}
function POST(url,params){
    return infromer.post(url,params)
}
function PATCH(url,params){
    return infromer.patch(url,params)
}