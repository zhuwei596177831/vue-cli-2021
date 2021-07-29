import request from "@/axios/request";

export function test() {
    return request({
        url: '/test/test/test',
        method: 'get'
    });
}