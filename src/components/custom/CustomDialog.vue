<template>
    <div>
        <el-dialog :title="title" :visible="visible" @close="close">
            <slot></slot>
            <div slot="footer" class="dialog-footer">
                <el-button size="medium" @click="cancel">{{cancelText}}</el-button>
                <el-button size="medium" type="primary" @click="determine">{{confirmText}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CustomDialog",
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            cancelText: {
                type: String,
                default: '取 消'
            },
            confirmText: {
                type: String,
                default: '确 定'
            },
        },
        methods: {
            close() {
                this.$emit('closeDialog', false);
            },
            cancel() {
                this.$emit('closeDialog', false);
            },
            determine() {
                this.$emit('determine');
            }
        }
    }
</script>

<style scoped>

</style>