<template>
    <div>
        <custom-search-form :search-form-model="searchForm" @formSearch="formSearch">
            <el-form-item prop="name">
                <el-input size="medium" placeholder="请输入菜单名称" v-model.trim="searchForm.name" clearable/>
            </el-form-item>
            <el-form-item prop="type">
                <el-select size="medium" v-model="searchForm.type" clearable placeholder="请选择菜单类型">
                    <el-option v-for="item of menuTypeList" :label="item.desc" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
        </custom-search-form>
        <custom-header-buttons>
            <el-button size="small" type="success" icon="el-icon-plus" @click="addMenu" v-show="addShow">新增</el-button>
        </custom-header-buttons>
        <div style="display: flex;flex-direction: row;height: 100%;">
            <div style="flex: 0.18;margin-right: 20px;height: 100%;">
                <el-tree :data="treeData" @node-click="nodeClick" :expand-on-click-node="false" :default-expanded-keys="defaultExpandedKeys"
                         node-key="id"></el-tree>
            </div>
            <div style="flex: 1;">
                <custom-table :table-data="tableData">
                    <el-table-column prop="code" label="菜单编码"/>
                    <el-table-column prop="name" label="菜单名称"/>
                    <el-table-column prop="typeName" label="菜单类型"/>
                    <el-table-column prop="path" label="菜单路径"/>
                    <el-table-column prop="iconClass" label="菜单图标"/>
                    <el-table-column prop="parentName" label="上级菜单"/>
                    <el-table-column prop="sort" label="序号"/>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="updateMenu(scope.row)" v-show="updateShow"/>
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteMenu(scope.row.id)" v-show="deleteShow"/>
                        </template>
                    </el-table-column>
                </custom-table>
                <custom-pagination :total="total" @pageChange="pageChange($event)"/>
            </div>
        </div>
        <!--添加、修改 表单-->
        <custom-dialog :visible="visible" :title="title" @closeDialog="visible = $event" @determine="determine">
            <el-form :ref="formName" :model="menuForm" :rules="rules" :inline="true" label-width="120px" size="medium">
                <el-form-item label="菜单编码" prop="code">
                    <el-input v-model.trim="menuForm.code" placeholder="请输入菜单编码" clearable/>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model.trim="menuForm.name" placeholder="请输入菜单名称" clearable/>
                </el-form-item>
                <el-form-item label="菜单类型" prop="type">
                    <el-select v-model="menuForm.type" @change="typeChange" clearable placeholder="请选择菜单类型">
                        <el-option v-for="item of menuTypeList" :label="item.desc" :value="item.value" :key="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="上级菜单" prop="parentId" v-if="parentMenuShow">
                    <el-cascader v-model="menuForm.parentId" :options="parentMenuList" :show-all-levels="false"
                                 :props="{ checkStrictly: true,expandTrigger: 'hover',emitPath:false }"
                                 clearable placeholder="请选择上级菜单" :key="cascaderkey"></el-cascader>
                </el-form-item>
                <!--                <el-form-item label="上级菜单" prop="parentId" v-if="parentMenuShow">-->
                <!--                    <el-select v-model="menuForm.parentId" clearable placeholder="请选择上级菜单" filterable>-->
                <!--                        <el-option v-for="item of parentMenuList" :label="item.name" :value="item.id" :key="item.id"></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item label="菜单路径" prop="path" v-if="buttonMenuShow">
                    <el-input v-model.trim="menuForm.path" placeholder="请输入菜单路径" clearable/>
                </el-form-item>
                <el-form-item label="菜单图标" prop="iconClass" v-if="buttonMenuShow">
                    <el-input v-model.trim="menuForm.iconClass" placeholder="请输入菜单图标" clearable/>
                </el-form-item>
                <el-form-item label="序号" prop="sort">
                    <el-input v-model.number="menuForm.sort" placeholder="请输入序号" clearable/>
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
    import {hasIllegalChar} from '@/config/validation'
    import {menuList, addMenu, updateMenu, deleteMenu, menuTrees, menuTypes, parentMenus, cascaderTrees} from '@/axios/system/menu'
    import {hasPermission} from '@/axios/permission'
    import {pageNumChange} from '@/config/constants'

    export default {
        name: "TestTable",
        components: {
            CustomSearchForm,
            CustomHeaderButtons,
            CustomPagination,
            CustomTable,
            CustomDialog
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
                cascaderkey: 1,
                addShow: true,
                updateShow: true,
                deleteShow: true,
                parentMenuList: [],
                menuTypeList: [],
                treeData: [],
                defaultExpandedKeys: [],
                total: 0,
                visible: false,
                buttonMenuShow: true,
                parentMenuShow: true,
                title: '',
                iconClassPropName: 'iconClass',
                formName: 'menuForm',
                tableData: [],
                searchForm: {
                    name: null,
                    type: null,
                    parentId: null
                },
                menuForm: {
                    id: null,
                    code: '',
                    name: '',
                    type: null,
                    parentId: null,
                    path: '',
                    iconClass: '',
                    sort: null
                },
                rules: {
                    code: [
                        {required: true, message: '请输入菜单编码'},
                        {min: 1, max: 100, message: '长度在 1 到 50 个字符'},
                        {validator: illegalChar}
                    ],
                    name: [
                        {required: true, message: '请输入菜单名称'},
                        {min: 1, max: 50, message: '长度在 1 到 100 个字符'},
                        {validator: illegalChar}
                    ],
                    type: [
                        {required: true, message: '请选择菜单类型', trigger: 'change'}
                    ],
                    path: [
                        {required: true, message: '请输入菜单路径'},
                        {min: 1, max: 100, message: '长度在 1 到 255 个字符'}
                    ],
                    iconClass: [
                        {required: true, message: '请输入菜单图标'},
                        {min: 1, max: 100, message: '长度在 1 到 255 个字符'},
                        {validator: illegalChar}
                    ],
                    parentId: [
                        {required: true, message: '请选择上级菜单'},
                    ],
                    sort: [
                        {required: true, message: '请输入序号'},
                        {type: 'number', message: '序号必须为数字值'}
                    ]
                }
            }
        },
        created() {
            this.findMenuTypes();
            this.getMenuData();
            this.menuTrees();
            hasPermission('menu-add').then(result => {
                this.addShow = result.data;
            });
            hasPermission('menu-update').then(result => {
                this.updateShow = result.data;
            });
            hasPermission('menu-delete').then(result => {
                this.deleteShow = result.data;
            });
        },
        methods: {
            findMenuTypes() {
                menuTypes().then(result => {
                    this.menuTypeList = result.data.data;
                });
            },
            nodeClick(item) {
                this.searchForm.parentId = item.id;
                this.getMenuData();
            },
            pageChange(pageNum) {
                this.$store.dispatch(pageNumChange, pageNum);
                this.getMenuData();
            },
            typeChange(type) {
                this.buttonMenuShow = type !== 3;
                this.parentMenuShow = type !== 1;
                this.menuForm.parentId = null;
                this.menuForm.path = null;
                this.menuForm.iconClass = null;
                this.getParentMenus(type);
            },
            formSearch() {
                this.$store.dispatch(pageNumChange, 1);
                this.getMenuData();
            },
            addMenu() {
                this.visible = true;
                this.title = '新增菜单';
                this.buttonMenuShow = true;
                this.parentMenuShow = true;
                this.$nextTick(() => {
                    this.$refs[this.formName].resetFields();
                    this.menuForm.id = null;
                });
            },
            updateMenu(row) {
                this.visible = true;
                this.title = '修改菜单';
                this.buttonMenuShow = row.type !== 3;
                this.parentMenuShow = row.type !== 1;
                this.$nextTick(() => {
                    this.$refs[this.formName].resetFields();
                    this.menuForm.id = row.id;
                    this.menuForm.code = row.code;
                    this.menuForm.name = row.name;
                    this.menuForm.type = row.type;
                    this.menuForm.parentId = row.parentId;
                    this.menuForm.path = row.path;
                    this.menuForm.iconClass = row.iconClass;
                    this.menuForm.sort = row.sort;
                    this.getParentMenus(row.type);
                });
            },
            deleteMenu(id) {
                this.$confirm('确定删除？', '提示').then(() => {
                    deleteMenu(id).then(result => {
                        this.refreshMenu();
                    })
                });
            },
            determine() {
                this.$refs[this.formName].validate(valid => {
                    if (valid) {
                        if (this.menuForm.id === null) {
                            addMenu(this.menuForm).then(result => {
                                this.refreshMenu();
                            });
                        } else {
                            updateMenu(this.menuForm).then(result => {
                                this.refreshMenu();
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            getMenuData() {
                menuList(this.searchForm).then(result => {
                    this.tableData = result.data.data;
                    this.total = result.data.total;
                });
            },
            refreshMenu() {
                this.visible = false;
                this.getMenuData();
                this.menuTrees();
            },
            menuTrees() {
                menuTrees().then(result => {
                    this.treeData = result.data.data;
                    this.defaultExpandedKeys = this.treeData[0].children.filter(value => {
                        return value.type !== 3;
                    }).map(value => {
                        return value.id;
                    });
                });
            },
            getParentMenus(type) {
                this.cascaderkey++;
                this.parentMenuList = [];
                // parentMenus({type: type}).then(result => {
                //     this.parentMenuList = result.data.data;
                // });
                cascaderTrees({type: type}).then(result => {
                    this.parentMenuList = result.data.data;
                });

            }
        }
    }
</script>

<style scoped>
</style>