<template>
    <div>
        <custom-search-form :search-form-model="searchForm" @formSearch="formSearch">
            <el-form-item prop="name">
                <el-input size="medium" placeholder="请输入用户名称" v-model.trim="searchForm.name" clearable/>
            </el-form-item>
        </custom-search-form>
        <custom-header-buttons>
            <el-button size="mini" type="success" icon="el-icon-plus" @click="addUser" v-show="addShow">新增</el-button>
        </custom-header-buttons>
        <custom-table :tableData="tableData">
            <el-table-column prop="loginName" label="登录名"/>
            <el-table-column prop="roleNames" label="角色"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="sex" label="性别"/>
            <el-table-column prop="phone" label="手机号"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="address" label="住址"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="updateUser(scope.row)" v-show="updateShow"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)" v-show="deleteShow"></el-button>
                </template>
            </el-table-column>
        </custom-table>
        <custom-pagination :total="total" @pageChange="pageChange($event)"/>
        <!--添加、修改 表单-->
        <custom-dialog :visible="formVisible" :title="title" @closeDialog="formVisible = $event" @determine="determine">
            <el-form :ref="formName" :model="userForm" :rules="rules" :inline="true" label-width="120px" size="medium">
                <el-form-item label="登录名" prop="loginName">
                    <el-input v-model.trim="userForm.loginName" placeholder="请输入登录名" clearable/>
                </el-form-item>
                <el-form-item label="角色" prop="roleIds">
                    <el-select v-model="userForm.roleIds" clearable multiple placeholder="请选择角色">
                        <el-option v-for="item of roles" :label="item.name" :value="item.id" :key="item.id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model.trim="userForm.name" placeholder="请输入姓名" clearable/>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="userForm.sex" clearable placeholder="请选择性别">
                        <el-option v-for="(item,index) of sexs" :label="item" :value="item" :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="userForm.phone" placeholder="请输入手机号" clearable/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model.trim="userForm.email" placeholder="请输入邮箱" clearable/>
                </el-form-item>
                <el-form-item label="住址" prop="address">
                    <el-input v-model.trim="userForm.address" placeholder="请输入住址" clearable/>
                </el-form-item>
            </el-form>
        </custom-dialog>
    </div>
</template>

<script>
    import CustomSearchForm from '@/components/custom/CustomSearchForm'
    import CustomHeaderButtons from '@/components/custom/CustomHeaderButtons'
    import CustomPagination from '@/components/custom/CustomPagination'
    import CustomTable from '@/components/custom/CustomTable'
    import CustomDialog from '@/components/custom/CustomDialog'
    import {pageNumChange} from "@/config/constants";
    import {userList, addUser, updateUser, deleteUser} from "@/axios/system/user";
    import {findAllRoles} from '@/axios/system/role'
    import {hasIllegalChar, isPhone, isEmail} from "@/config/validation";
    import {hasPermission, hasRoles} from '@/axios/permission'

    export default {
        name: "UserList",
        components: {
            CustomSearchForm,
            CustomHeaderButtons,
            CustomPagination,
            CustomTable,
            CustomDialog
        },
        created() {
            this.getUserData();
            hasPermission('user-add').then(result => {
                this.addShow = result.data;
            });
            hasPermission('user-update').then(result => {
                this.updateShow = result.data;
            });
            hasPermission('user-delete').then(result => {
                this.deleteShow = result.data;
            });
        },
        data() {
            const illegalChar = (rule, value, callback) => {
                if (hasIllegalChar(value)) {
                    callback(new Error("含有非法字符"));
                } else {
                    callback();
                }
            };
            const checkPhone = (rule, value, callback) => {
                if (isPhone(value)) {
                    callback();
                } else {
                    callback(new Error("手机号格式不正确"));
                }
            };
            const checkEmail = (rule, value, callback) => {
                if (value === null || value === '' || isEmail(value)) {
                    callback();
                } else {
                    callback(new Error("邮箱格式不正确"));
                }
            };
            return {
                addShow: true,
                updateShow: true,
                deleteShow: true,
                sexs: ['男', '女'],
                searchForm: {
                    name: null
                },
                tableData: [],
                total: 0,
                formVisible: false,
                title: '',
                formName: 'userForm',
                userForm: {
                    id: null,
                    loginName: null,
                    roleIds: [],
                    name: null,
                    sex: null,
                    phone: null,
                    email: null,
                    address: null
                },
                roles: [],
                rules: {
                    loginName: [
                        {required: true, message: '请输入登录名'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符'},
                        {validator: illegalChar}
                    ],
                    roleIds: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符'},
                        {validator: illegalChar}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号'},
                        {validator: checkPhone}
                    ],
                    email: [
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符'},
                        {validator: checkEmail}
                    ],
                    address: [
                        {min: 1, max: 100, message: '长度在 1 到 100 个字符'},
                        {validator: illegalChar}
                    ]
                }
            }
        },
        methods: {
            getUserData() {
                userList(this.searchForm).then(result => {
                    this.tableData = result.data.data;
                    this.total = result.data.total;
                });
            },
            formSearch() {
                this.$store.dispatch(pageNumChange, 1);
                this.getUserData();
            },
            findAllRoles() {
                findAllRoles().then(result => {
                    this.roles = result.data.data;
                });
            },
            addUser() {
                this.formVisible = true;
                this.title = '新增用户';
                this.$nextTick(() => {
                    this.$refs[this.formName].resetFields();
                    this.userForm.id = null;
                    this.findAllRoles();
                });
            },
            updateUser(row) {
                this.formVisible = true;
                this.title = '修改用户';
                this.$nextTick(() => {
                    this.$refs[this.formName].resetFields();
                    this.userForm.id = row.id;
                    this.userForm.loginName = row.loginName;
                    this.userForm.roleIds = row.roleIds;
                    this.userForm.name = row.name;
                    this.userForm.sex = row.sex;
                    this.userForm.phone = row.phone;
                    this.userForm.email = row.email;
                    this.userForm.address = row.address;
                    this.findAllRoles();
                });
            },
            deleteUser(id) {
                this.$confirm('确定删除？', '提示').then(() => {
                    deleteUser(id).then(() => {
                        this.getUserData();
                    });
                });
            },
            pageChange(pageNum) {
                this.$store.dispatch(pageNumChange, pageNum);
                this.getUserData();
            },
            determine() {
                this.$refs[this.formName].validate(valid => {
                    if (valid) {
                        if (this.userForm.id === null) {
                            addUser(this.userForm).then(result => {
                                this.formVisible = false;
                                this.getUserData();
                            });
                        } else {
                            updateUser(this.userForm).then(result => {
                                this.formVisible = false;
                                this.getUserData();
                            })
                        }
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>