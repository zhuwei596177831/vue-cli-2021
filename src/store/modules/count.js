//使用常量替代 Mutation 事件类型
import {organs, token} from "@/config/constants";
import {getOrganById, getToken, getZcb} from "@/config/getters-name";
import {addZcb, increment, incrementN} from "@/config/mutations-name";

const state = {
    count: 0,
    token,
    organs
};
const getters = {
    [getZcb](state, getters) {
        console.log(getters.getToken);
        return state.organs.filter(organ => organ.isZcb);
    },
    [getToken](state) {
        return state.token;
    },
    [getOrganById]: (state) => (id) => {
        console.log(id);
        return state.organs.find(organ => organ.id === id);
    }
};
const mutations = {
    [increment](state) {
        state.count++;
    },
    [incrementN](state, {name, num}) {
        console.log(name);
        state.count += num;
    },
    [addZcb](state) {
        state.organs.push({id: 5, name: '总包2', isZcb: true});
    }
};
const actions = {
    [increment](context) {
        // console.log(context);
        return new Promise((resolve) => {
            setTimeout(() => {
                context.commit(increment);
                resolve();
            }, 2000);
        })
    },
    // [incrementN]({commit, state, getters, dispatch}, {type,name,num}) {
    [incrementN]({commit, state, getters, dispatch}, payload) {
        console.log(commit);
        console.log(state);
        console.log(getters);
        console.log(dispatch);
        const {name, num} = payload;
        console.log(name);
        console.log(num);
        commit(incrementN, payload);
    }
};
export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}