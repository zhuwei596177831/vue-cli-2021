<template>
    <div>
        <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :current-page="this.$store.state.pageNum" @current-change="pageChange"/>
    </div>
</template>

<script>
    export default {
        name: "CustomPagination",
        props: {
            total: {
                type: Number,
                required: true,
                default: 0
            }
        },
        methods: {
            pageChange(pageNum) {
                this.$emit('pageChange', pageNum);
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin: 10px 15px 0 0;
        float: right;
    }
</style>