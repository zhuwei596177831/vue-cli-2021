import Vue from 'vue'
import Vuex from 'vuex'
import countModule from '@/store/modules/count'
import addModule from '@/store/modules/add'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        countModule,
        addModule
    },
});