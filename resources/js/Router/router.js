import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login/Login';
import Home from '../components/AppHome';
const router = new VueRouter({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home,
        // },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
       
    ],
});

export default router