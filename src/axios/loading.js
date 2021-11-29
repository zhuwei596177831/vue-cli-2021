/**
 * @author 朱伟伟
 * @date 2021-11-29 14:29:22
 * @description
 */
import {Loading} from 'element-ui'

let loading; // Loading实例
let count = 0; // 数据请求次数

/**
 * 开始加载
 */
const START = () => {
    if (count === 0) {
        loading = Loading.service({
            text: 'Loading...',
            spinner: 'el-icon-loading'
        });
    }
    ++count;
};

/**
 * 结束加载
 */
const END = () => {
    --count;
    if (count === 0) {
        loading.close();
    }
};
export {START, END};
