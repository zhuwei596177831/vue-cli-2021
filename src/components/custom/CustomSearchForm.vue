<template>
    <div class="header-searchs">
        <el-form ref="searchForm" :model="searchFormModel" inline label-width="120px" size="medium">
            <slot></slot>
            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-search" @click="formSearch" plain>搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="info" icon="el-icon-download" @click="formClear" plain>清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "CustomElForm",
        props: {
            searchFormModel: {
                type: Object,
                required: true,
                default: () => {
                    return {}
                }
            }
        },
        methods: {
            formSearch() {
                this.$emit('formSearch');
            },
            formClear() {
                this.$refs['searchForm'].resetFields();
            }
        }
    }
</script>

<style scoped>
    .header-searchs {
        background-color: white;
    }

    /deep/ .el-form-item {
        margin: 8px 10px !important;
    }
</style>