import { createStore } from "vuex";

import { router } from './router';


export default createStore({
    state: { // toy
        isLoggedIn: !!localStorage.getItem('token'),
    },
    mutations: { // button (instructions)
        LOGIN(state) {
          state.isLoggedIn = true // ON
        },
        LOGOUT(state) {
            state.isLoggedIn = false // OFF
        },
    },

    actions: { // kids
        login({ commit }) {
            commit('LOGIN')
        },
        logout({ commit, dispatch }) {
            commit('LOGOUT')
            dispatch('navigateToLogin')
        },
        navigateToLogin() {
            localStorage.clear()
            router.push({name: 'Login'});
        }
    }
})

