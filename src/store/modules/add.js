import {addIncrement} from "@/config/mutations-name";

const state = {
    count: 2
};
const mutations = {
    [addIncrement](state) {
        state.count += 5;
    }
};
export default {
    namespace: true,
    state,
    mutations
}
