import axios from 'axios'
import {Loading, Message} from 'element-ui';

export const info = (msg) => {
    Message.info({
        message: msg,
        duration: 2000
    });
};

export const success = () => {
    Message.success({
        message: '成功',
        duration: 1000
    });
};
export const warning = (msg) => {
    Message.warning({
        message: msg,
        duration: 2000
    });
};
export const error = (msg) => {
    Message.error({
        message: msg,
        duration: 2000
    });
};

export function get(url, params) {
    return new Promise(((resolve, reject) => {
        axios.post(url, params)
            .then(response => resolve(response.data))
            .catch(err => reject(err));
    }));
}

export function post(url, data, config = {}) {
    let loading = Loading.service({
        lock: true,
        text: '加载中',
        // spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
    });
    return new Promise(((resolve, reject) => {
        axios.post(url, data, config)
            .then(response => {
                loading.close();
                const {data, data: {code, msg}} = response;
                if (code !== '0000') {
                    warning(msg);
                    return;
                } else {
                    success();
                }
                resolve(data);
            })
            .catch(err => {
                setTimeout(() => {
                    error(err.toString());
                    loading.close();
                }, 500);
                // reject(err);
            });
    }));
}