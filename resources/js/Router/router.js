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
import CreateCategory from '../components/Category/create';
import parallex from '../components/parallex'
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: parallex,
        },
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
            component: Forum,
            beforeEnter (to, from, next) {
                if(!User.loggedIn()){
                   return next({name: 'login'})
                   
                }
                next()
            },

        },
        {
            path: '/question/:slug',
            name: 'read',
            component: Read,
            beforeEnter (to, from, next) {
                if(!User.loggedIn()){
                   return next({name: 'login'})
                   
                }
                next()
            },

        },
        {
            path: '/ask',
            name: 'create',
            component: Create,
            beforeEnter (to, from, next) {
                if(!User.loggedIn()){
                   return next({name: 'login'})
                   
                }
                next()
            },

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