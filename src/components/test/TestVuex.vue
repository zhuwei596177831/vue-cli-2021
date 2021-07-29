<template>
    <div>
        <p>点击了 {{ localComputed }} 次</p>
        <button @click="mutationsCountAdd">mutations方式递增1
        </button
        >&nbsp;&nbsp;&nbsp;
        <button @click="actionsCountAdd">actions方式递增1</button>
        <br/>
        <button @click="mutationscountAddN(initialNum)">mutations方式递增n
        </button
        >&nbsp;&nbsp;&nbsp;
        <button @click="actionsCountAddN">actions方式递增n</button>
        <p v-for="organ of zcbs" :key="organ.id">
            {{ organ.name }}
        </p>
        <button @click="addZcb">添加总包</button>
        <p v-for="(value, name, index) of getOrganById" :key="value">
            {{ index }}-{{ name }}-{{ value }}
        </p>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {
        addZcb,
        incrementN,
        increment,
        addIncrement,
    } from "@/store/names/mutations-name";

    export default {
        name: "TestVuex",
        data() {
            return {
                initialNum: 2,
                dateCount: this.$store.state.countModule.count,
            };
        },
        computed: {
            localComputed() {
                return this.$store.state.countModule.count;
                // return this.$store.state.addModule.count
            },
            zcbs() {
                return this.$store.getters.getZcb;
            },
            // 使用对象展开运算符将此对象混入到外部对象中
            ...mapState({
                count: (state) => state.count,
                countPlus(state) {
                    return state.count + this.initialNum;
                },
                getOrganById() {
                    return this.$store.getters.getOrganById(4);
                },
            }),
        },
        // computed: mapState({
        //     count: state => state.count,
        //     countPlus(state) {
        //         return state.count + this.initialNum
        //     }
        // }),
        // computed: {
        //     count() {
        //         return this.$store.state.count
        //     }
        // },
        methods: {
            mutationsCountAdd() {
                //提交mutations 同步
                this.$store.commit(increment);
                // this.$store.commit(addIncrement);
            },
            actionsCountAdd() {
                //分发action 同步
                this.$store.dispatch(increment).then(() => alert("actions方式递增1成功"));
            },
            mutationscountAddN(initialNum) {
                this.$store.commit(incrementN, {
                    name: "mutations方式递增n",
                    num: initialNum,
                });
            },
            actionsCountAddN() {
                this.$store
                    .dispatch(incrementN, {
                        name: "actions方式递增n",
                        num: this.initialNum,
                    })
                    .then(() => alert("actions方式递增n成功"));
                //以对象形式分发
                // this.$store.dispatch(
                //     {
                //         type: incrementN,
                //         name: 'actions方式递增n',
                //         num: this.initialNum
                //     }
                // );
            },
            addZcb() {
                this.$store.commit(addZcb);
            },
        },
    };
</script>

<style scoped></style>
