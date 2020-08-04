import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login/Login';
import Signup from '../components/login/Signup'
import Logout from '../components/login/Logout'
import Home from '../components/AppHome';
import Forum from '../components/Forum/forum';
import Read from '../components/Forum/Read';
import Create from '../components/Forum/create';
import CreateCategory from '../components/Category/create'
const router = new VueRouter({
    mode: 'history',
    routes: [
        // 
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
        {
            path: '/question/:slug',
            name: 'read',
            component: Read

        },
        {
            path: '/ask',
            name: 'create',
            component: Create

        },
        {
            path: '/category',
            name: 'createCategory',
            component: CreateCategory,
            beforeEnter (to, from, next) {
                if(!User.admin()){
                   return next({name: 'forum'})
                   
                }
                next()
            },
        },
       
    ],
});

export default router