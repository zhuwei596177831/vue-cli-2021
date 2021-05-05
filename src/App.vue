<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    // import TestVuex from './components/vuex/TestVuex'

    export default {
        name: 'App',
        components: {
            // TestVuex
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
