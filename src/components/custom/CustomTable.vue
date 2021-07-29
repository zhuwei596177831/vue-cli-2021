<template>
    <el-table :data="tableData" :size="size" style="font-size: 14px;" :cell-style="{textAlign: 'center'}"
              :header-cell-style="{backgroundColor:'#F5F7FA',textAlign:'center'}" border>
        <slot></slot>
    </el-table>
</template>

<script>
    export default {
        name: "CustomTable",
        props: {
            tableData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            size: {
                type: String,
                default: 'small'
            }
        }
    }
</script>

<style scoped>

</style>