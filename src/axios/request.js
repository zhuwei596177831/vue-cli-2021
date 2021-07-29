import axios from 'axios'
import md5 from 'blueimp-md5';
import uuid from 'es6-uuid';
import {MessageBox, Loading} from 'element-ui'
import qs from 'qs';
import {
    file_content_type,
    httpMethods,
    loginUrl,
    urlencoded_content_type,
    success_code,
    unauthorized_code,
    json_content_type
} from "@/config/constants";
import router from "@/route";
import {err, success} from "@/config/message";
import store from "@/store";

const [get, post, put, del, options] = httpMethods;

//自定义axios实例
const instance = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'http://127.0.0.1:9000/api',

    //cookie跨域： 配置
    //"serve": "vue-cli-service serve --open --host 10.0.4.40 --port 8760",
    // baseURL: 'http://10.0.4.40:9000/api',

    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    // timeout: 5000,
    timeout: 20000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证  本项目使用cookie session机制 必须为true
    withCredentials: true,
});
instance.defaults.headers['Content-Type'] = json_content_type;
let loading;
//请求拦截
instance.interceptors.request.use(
    config => {
        loading = Loading.service({
            text: 'Loading...',
            spinner: 'el-icon-loading',
            // background: '#FFFFFF'
            // background: 'rgba(0, 0, 0, 0.7)'
        });
        // console.log(config);
        // 在发送请求之前添加接口验签数据
        const {url, method, headers, data} = config;
        headers.pageNum = store.state.pageNum;
        headers.pageSize = store.state.pageSize;
        const contentType = headers['content-type'];
        if (contentType === urlencoded_content_type) {
            config.data = qs.stringify(data);
        }
        // let reqData = data;
        // if (method === get || method === del) {
        // reqData = '';
        // } else if (contentType === urlencoded_content_type || contentType === file_content_type) {
        // reqData = '';
        // if (contentType === urlencoded_content_type) {
        //     config.data = qs.stringify(data);
        // }
        // }
        // if (url !== loginUrl && method !== options) {
        // const time = Math.trunc(new Date().getTime() / 1000);
        // headers['user-time'] = time;
        // const nonce = uuid(32, 36);
        // nonce 防止sign被抓包截取 后端每次校验nonce唯一
        // headers['user-nonce'] = nonce;
        // headers['user-sign'] = md5(signKey + time + nonce + reqData).toLocaleUpperCase();
        // }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
//响应拦截
instance.interceptors.response.use(
    response => {
        loading.close();
        const {data: {code, msg}} = response;
        if (code !== success_code) {
            if (code === unauthorized_code) {
                router.replace('/login');
            }
            err(msg);
            return Promise.reject(msg);
        }
        return response.data;
    },
    error => {
        loading.close();
        err(error);
        // router.replace('/login');
        return Promise.reject(error);
    });

export default function request(config) {
    return instance.request(config);
}

// export default function request(config) {
//     const loginFlag = config.url === loginUrl;
//     return new Promise(
//         (resolve, reject) => {
//             instance
//                 .request(config)
//                 .then(response => {
//                     const {data: {code, msg}} = response;
//                     if (code !== success_code) {
//                         if (code === unauthorized_code) {
//                             router.replace('/login');
//                         }
//                         return Promise.reject(msg);
//                     }
//                     // if (loginFlag) {
//                     //     success('登录成功');
//                     // } else {
//                     //     success();
//                     // }
//                     resolve(response.data);
//                 })
//                 .catch(err => {
//                     error(err);
//                     reject(err);
//                 });
//         }
//     );
// }