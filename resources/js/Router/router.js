import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login/Login';
import Signup from '../components/login/Signup'
import Logout from '../components/login/Logout'
import Home from '../components/AppHome';
import Forum from '../components/Forum/forum';
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
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/forum',
            name: 'forum',
            component: Forum

        },
       
    ],
});

export default router