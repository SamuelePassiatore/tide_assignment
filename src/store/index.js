import { createStore } from 'vuex';

export default createStore({
    state: {
        userAddress: null
    },
    mutations: {
        setUserAddress(state, address) {
            state.userAddress = address;
        },
        clearUserAddress(state) {
            state.userAddress = null;
        }
    },
    actions: {
        setUserAddress({ commit }, address) {
            commit('setUserAddress', address);
        },
        clearUserAddress({ commit }) {
            commit('clearUserAddress');
        }
    },
    getters: {
        userAddress: state => state.userAddress
    }
});