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
    import {getOrganList} from '@/api/login';

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
                        getOrganList(this.loginForm)
                            .then(data => {
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