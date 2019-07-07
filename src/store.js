import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
    },
    mutations: {
        // 设置token
        login(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        // 退出
        logout(state) {
            state.token = ''
            localStorage.removeItem('token');
        }
    },
    actions: {

    },
});
