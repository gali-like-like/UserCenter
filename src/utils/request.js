import axios from 'axios';
import messageDialog from "@/utils/messageDialog.js";

// 创建 Axios 实例
const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true
});
// 添加请求拦截器
request.interceptors.request.use(config => {

// 在发送请求之前做些什么
    return config;
}, error => {
// 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(response => {
// 对响应数据做点什么
    if (response.data.code !== 200) {
        messageDialog(response.data.description,'error');
        console.error(`url:${response.config.url},error:${JSON.stringify(response.data)}`);
    } else {
        messageDialog(response.data.description,'success');
        console.info(`url:${response.config.url},info:${JSON.stringify(response.data)}`);
    }
    return response.data;
}, error => {
// 对响应错误做点什么
    return Promise.reject(error);
});
export default request;
