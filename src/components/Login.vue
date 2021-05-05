<template>
    <div class="login-div">
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px"
                 :class="loginBox" status-icon>
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="loginForm.username"
                          maxlength="20" show-word-limit clearable/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"
                          size="medium" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button class="login-button" type="primary" @click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import qs from 'qs';

    export default {
        name: "Login",
        data() {
            return {
                labelPosition: 'right',
                loginForm: {
                    username: null,
                    password: null
                },
                loginFormRules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                loginBox: 'login-box'
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //post json
                        this.axios.post('/getOrganList', this.loginForm)

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

                            .then(response => {
                                console.log(response.data);
                            })
                            .catch(err => {
                                console.log("请求出错了：", err);
                            });
                        // this.$router.push('/index');
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    /*@import "../assets/css/login.css";*/
    @import "../assets/less/login";
</style>