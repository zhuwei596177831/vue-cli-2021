import {Message} from 'element-ui';

export const info = (msg) => {
    Message.info({
        message: msg,
        duration: 2000
    });
};

export const success = (msg = '成功') => {
    Message.success({
        message: msg,
        duration: 1000
    });
};
export const warning = (msg) => {
    Message.warning({
        message: msg,
        duration: 3000
    });
};
export const err = (msg) => {
    Message.error({
        message: msg,
        duration: 3000
    });
};