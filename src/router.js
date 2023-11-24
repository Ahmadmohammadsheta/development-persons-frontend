import { createRouter, createWebHistory } from "vue-router";

import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta : {public: true} // Mark this route as public
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta : {public: true} // Mark this route as public
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta : {public: true} // Mark this route as public
    },
];
    

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!to.meta.public && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;