<template>
    <div>
        <custom-search-form :search-form-model="searchForm" @formSearch="formSearch">
            <el-form-item prop="name">
                <el-input size="medium" placeholder="请输入角色名称" v-model.trim="searchForm.name" clearable/>
            </el-form-item>
        </custom-search-form>
        <custom-header-buttons>
            <el-button size="mini" type="success" icon="el-icon-plus" @click="addRole" v-show="addShow">新增</el-button>
        </custom-header-buttons>
        <custom-table :tableData="tableData">
            <el-table-column prop="code" label="角色编码"/>
            <el-table-column prop="name" label="角色名称"/>
            <el-table-column prop="inputTime" label="录入时间"/>
            <el-table-column prop="inputUserName" label="录入用户"/>
            <el-table-column prop="updateTime" label="修改时间"/>
            <el-table-column prop="updateUserName" label="修改用户"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="updateRole(scope.row)" v-show="updateShow"/>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRole(scope.row.id)" v-show="deleteShow"/>
                    <el-button type="info" size="mini" icon="el-icon-s-custom" @click="permissionMenus(scope.row)" v-show="permissionShow"/>
                </template>
            </el-table-column>
        </custom-table>
        <custom-pagination :total="total" @pageChange="pageChange($event)"/>
        <!--添加、修改 表单-->
        <custom-dialog :visible="formVisible" :title="title" @determine="formDetermine" @closeDialog="formVisible = $event">
            <el-form :ref="formName" :model="roleForm" :rules="rules" label-width="120px" size="medium">
                <el-form-item label="角色编码" prop="code">
                    <el-input v-model.trim="roleForm.code" placeholder="请输入角色编码" clearable/>
                </el-form-item>
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model.trim="roleForm.name" placeholder="请输入角色名称" clearable/>
                </el-form-item>
            </el-form>
        </custom-dialog>
        <!--分配角色权限-->
        <custom-dialog :visible="treeVisible" title="分配权限" @determine="treeDetermine" @closeDialog="treeVisible = $event">
            <el-tree :data="roleMenuData" ref="roleMenuTree" node-key="id" :default-expand-all="true"
                     :show-checkbox="true" :check-on-click-node="true" :expand-on-click-node="false"
                     :default-checked-keys="defaultCheckedKeys" :highlight-current="true"
                     style="max-height: 400px;overflow-x: hidden;overflow-y: auto;"></el-tree>
        </custom-dialog>
    </div>
</template>

<script>
    import CustomSearchForm from '@/components/custom/CustomSearchForm'
    import CustomHeaderButtons from '@/components/custom/CustomHeaderButtons'
    import CustomPagination from '@/components/custom/CustomPagination'
    import CustomTable from '@/components/custom/CustomTable'
    import CustomDialog from '@/components/custom/CustomDialog'
    import {roleList, addRole, updateRole, deleteRole, getMenuTrees, permissionRoleMenus} from '@/axios/system/role'
    import {hasPermission} from '@/axios/permission'
    import {hasIllegalChar} from '@/config/validation'
    import {pageNumChange} from '@/config/constants'
    import {warning} from '@/config/message'

    export default {
        name: "RoleList",
        components: {
            CustomSearchForm,
            CustomHeaderButtons,
            CustomPagination,
            CustomTable,
            CustomDialog
        },
        created() {
            this.getRoleData();
            hasPermission('role-add').then(result => {
                this.addShow = result.data;
            });
            hasPermission('role-update').then(result => {
                this.updateShow = result.data;
            });
            hasPermission('role-delete').then(result => {
                this.deleteShow = result.data;
            });
            hasPermission('role-permission-menu').then(result => {
                this.permissionShow = result.data;
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
            return {
                addShow: true,
                updateShow: true,
                deleteShow: true,
                permissionShow: true,
                searchForm: {
                    name: ''
                },
                formVisible: false,
                title: '',
                formName: 'roleForm',
                roleForm: {
                    id: null,
                    code: null,
                    name: null
                },
                tableData: [],
                total: 0,
                rules: {
                    code: [
                        {required: true, message: '请输入角色编码'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符'},
                        {validator: illegalChar}
                    ],
                    name: [
                        {required: true, message: '请输入角色名称'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符'},
                        {validator: illegalChar}
                    ]
                },
                treeVisible: false,
                roleMenuData: [],
                roleId: null,
                defaultCheckedKeys: []
            }
        },
        methods: {
            formSearch() {
                this.$store.dispatch(pageNumChange, 1);
                this.getRoleData();
            },
            getRoleData() {
                roleList(this.searchForm).then(result => {
                    this.tableData = result.data.data;
                    this.total = result.data.total;
                });
            },
            addRole() {
                this.formVisible = true;
                this.title = '新增角色';
                this.roleForm.id = null;
                this.roleForm.code = null;
                this.roleForm.name = null;
            },
            updateRole(row) {
                this.formVisible = true;
                this.title = '修改角色';
                this.roleForm.id = row.id;
                this.roleForm.code = row.code;
                this.roleForm.name = row.name;
            },
            deleteRole(id) {
                this.$confirm('确定删除？', '提示').then(() => {
                    deleteRole(id).then(() => {
                        this.getRoleData();
                    });
                });
            },
            pageChange(pageNum) {
                this.$store.dispatch(pageNumChange, pageNum);
                this.getRoleData();
            },
            formDetermine() {
                this.$refs[this.formName].validate(valid => {
                    if (valid) {
                        if (this.roleForm.id === null) {
                            addRole(this.roleForm).then(result => {
                                this.formVisible = false;
                                this.getRoleData();
                            });
                        } else {
                            updateRole(this.roleForm).then(result => {
                                this.formVisible = false;
                                this.getRoleData();
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            permissionMenus(row) {
                getMenuTrees().then(result => {
                    this.treeVisible = true;
                    this.roleMenuData = result.data.data;
                    this.roleId = row.id;
                    this.defaultCheckedKeys = row.checkedMenuIds;
                });
            },
            treeDetermine() {
                let checkedMenuIds = this.$refs['roleMenuTree'].getCheckedKeys();
                let halfCheckedKeys = this.$refs['roleMenuTree'].getHalfCheckedKeys();
                let menus = [...halfCheckedKeys, ...checkedMenuIds];
                if (checkedMenuIds.length === 0) {
                    warning('请勾选菜单');
                    return;
                }
                permissionRoleMenus({
                    roleId: this.roleId,
                    checkedMenuIds: checkedMenuIds,
                    menus: menus
                }).then(() => {
                    this.treeVisible = false;
                    this.getRoleData();
                });
            }
        }
    }
</script>

<style scoped>

</style>