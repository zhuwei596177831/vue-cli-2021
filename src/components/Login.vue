<template>
    <div class="login-div" @keyup.enter="onSubmit('loginForm')">
        <el-form :ref="formName" :model="loginForm" :rules="loginFormRules" label-width="80px" class="login-box"
                 status-icon>
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="loginForm.username" maxlength="20" show-word-limit
                          clearable/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" size="medium" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-button" size="medium" @click="onSubmit(formName)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from "@/axios/login";
    import {hasIllegalChar} from "@/config/validation";

    export default {
        name: "Login",
        data() {
            const validate = (rule, value, callback) => {
                if (hasIllegalChar(value)) {
                    callback(new Error("含有非法字符"));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: "right",
                formName: 'loginForm',
                loginForm: {
                    username: '',
                    password: '',
                },
                loginFormRules: {
                    username: [
                        {required: true, message: "请输入账号", trigger: "blur"},
                        {min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"},
                        {validator: validate, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 1, max: 200, message: "长度在 1 到 200 个字符", trigger: "blur"},
                        {validator: validate, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            onSubmit: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login(this.loginForm)
                            .then((result) => {
                                // const {data: {customSessionIdCookie, tokenSurviveSecond}} = result;
                                //设置cookie 关闭浏览器 cookie 失效
                                // this.$cookies.set("customSessionIdCookie", customSessionIdCookie, 0);
                                this.$cookies.set("isAuthenticated", true, 0);
                                this.$router.push("/index");

                                //永不过期tokenExpireTime
                                // this.$cookies.set("token", token, -1);
                                //默认秒
                                // this.$cookies.set("token", token, 10);
                                // this.$cookies.set("token", token, tokenSurviveSecond);
                            })
                    } else {
                        return false;
                    }
                });
            },
        },
        created() {
        }
    };
</script>

<style scoped lang="less">
    /*@import "../assets/css/login.css";*/
    @import "../assets/less/login";
</style>
