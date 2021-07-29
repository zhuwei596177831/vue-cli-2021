//使用常量替代 Mutation 事件类型
import {organs, signKey} from "@/config/constants";
import {getOrganById, getToken, getZcb} from "@/store/names/getters-name";
import {addZcb, increment, incrementN} from "@/store/names/mutations-name";

const state = {
    count: 0,
    token: signKey,
    organs
};
const getters = {
    [getZcb](state, getters) {
        return state.organs.filter(organ => organ.isZcb);
    },
    [getToken](state) {
        return state.token;
    },
    [getOrganById]: (state) => (id) => {
        return state.organs.find(organ => organ.id === id);
    }
};
const mutations = {
    [increment](state) {
        state.count++;
    },
    [incrementN](state, {name, num}) {
        state.count += num;
    },
    [addZcb](state) {
        state.organs.push({id: 5, name: '总包2', isZcb: true});
    }
};
const actions = {
    [increment](context) {
        return new Promise((resolve) => {
            setTimeout(() => {
                context.commit(increment);
                resolve();
            }, 2000);
        })
    },
    // [incrementN]({commit, state, getters, dispatch}, {type,name,num}) {
    [incrementN]({commit, state, getters, dispatch}, payload) {
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