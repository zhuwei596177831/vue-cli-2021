<template>
    <div class="header-buttons">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "CustomHeaderButtons"
    }
</script>

<style scoped>
    .header-buttons {
        text-align: right;
        height: 40px;
        background-color: white;
        margin-bottom: 10px;
        padding-right: 15px;
    }
</style>