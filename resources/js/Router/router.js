import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'history',
    routes: [
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: login
        // },
        // {
        //     path: '/hello',
        //     name: 'hello',
        //     component: Hello,
        // },
    ],
});

export default router