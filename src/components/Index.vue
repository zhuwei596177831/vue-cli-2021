<template>
    <el-container>
        <el-header class="index-el-header">
            <div style="float: left;">
                vue-cli-2021
            </div>
            <div style="float: right;">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <span style="margin-right: 15px">{{user.name}}</span>
                <el-button size="small" type="primary" @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container style="display: flex;">
            <!--            <el-aside >-->
            <el-menu
                    class="el-menu-vertical"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="routeMenu"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <menu-tree :menu-list="userMenus"></menu-tree>
            </el-menu>
            <!--            </el-aside>-->
            <!--            <el-container>-->
            <el-main style="margin: 8px;flex: 1;">
                <router-view/>
            </el-main>
            <!--            </el-container>-->
        </el-container>
    </el-container>
</template>

<script>
    import MenuTree from '@/components/MenuTree'
    import {logout} from '@/axios/logout'
    import {userMenus} from "@/axios/system/menu";
    import {findUser} from '@/axios/system/user'

    export default {
        name: "Index",
        components: {
            MenuTree
        },
        data() {
            return {
                userMenus: []
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            findUser().then(result => {
                let user = result.data;
                this.$store.commit('setUser', user)
            });
            userMenus().then((result) => {
                this.userMenus = result.data.data;
            });
        },
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            routeMenu(routePath) {
                this.$router.push(routePath)
            },
            logout() {
                logout().then(() => {
                    this.$cookies.remove('isAuthenticated');
                    this.$router.push('/login');
                });
            }
        }
    }
    ;
</script>

<style>

    .el-menu-vertical:not(.el-menu--collapse) {
        flex: 0.16;
        min-height: 672px;
    }

    .index-el-header {
        font-size: 14px;
        background-color: #95989D;
        color: white;
        line-height: 50px;
        height: 50px !important;
    }

    .el-main {
        padding: 0;
    }

</style>
