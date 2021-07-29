import Vue from 'vue'
import Vuex from 'vuex'
import countModule from '@/store/modules/count'
import {pageNumChange} from "@/config/constants";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        pageNum: 1,
        pageSize: 10,
        user: {}
    },
    mutations: {
        [pageNumChange](state, payload) {
            state.pageNum = payload;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        [pageNumChange]({commit}, payload) {
            commit('pageNumChange', payload);
        }
    },
    modules: {
        countModule
    },
});
export default store;