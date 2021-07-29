<template>
    <div>
        <template v-for="moduleMenu of menuList">
            <el-menu-item :index="moduleMenu.path" :key="moduleMenu.id" v-if="moduleMenu.childMenus.length === 0">
                <i :class="moduleMenu.iconClass"></i>
                <span slot="title">{{moduleMenu.name}}</span>
            </el-menu-item>
            <el-submenu :key="moduleMenu.id" :index="moduleMenu.path" v-else>
                <template slot="title">
                    <i :class="moduleMenu.iconClass"></i>
                    <span slot="title">{{moduleMenu.name}}</span>
                </template>
                <menu-tree :menu-list="moduleMenu.childMenus"></menu-tree>   <!--递归调用-->
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: "MenuTree",
        props: {
            menuList: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            routeMenu(routePath) {
                this.$router.push(routePath)
            }
        },
    };
</script>

<style scoped>

</style>
