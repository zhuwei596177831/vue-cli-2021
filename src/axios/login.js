import {urlencoded_content_type, file_content_type, json_content_type, loginUrl} from '@/config/constants.js'
import request from '@/axios/request';

export function login(data) {
    return request({
        url: loginUrl,
        method: 'post',
        data: data,
        headers: {'content-type': urlencoded_content_type}
    });
}

//post json
// this.axios.post('/getOrganList', this.loginForm)

//post application/x-www-form-urlencoded
// this.axios.post('/getOrganList', qs.stringify(this.loginForm),
//     {
//         headers: {'content-type': 'application/x-www-form-urlencoded'},
//     }
// )

//post multipart/form-data
// const configs = {
//     headers: {'content-type': 'multipart/form-data'}
// };
// let forms = new FormData();
// forms.append('username',this.loginForm.username);
// forms.append('password',this.loginForm.password);
// forms.append('picFile', null);
// this.axios.post('/getOrganList', forms, configs)

//get param
// this.axios.get('/getOrganList', {
//     params: this.loginForm
// })