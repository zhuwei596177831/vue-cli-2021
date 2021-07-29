<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    // import TestVuex from './components/test/TestVuex'

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
        width: 100%;
        height: 100%;
    }
</style>
