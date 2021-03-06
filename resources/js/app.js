/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)
export default new Vuetify({
    icons: {
      iconfont: 'md',
    },
  })

import VueSimplemde from 'vue-simplemde'
import md from 'marked'
import 'simplemde/dist/simplemde.min.css'
Vue.component('vue-simplemde', VueSimplemde)
window.md = md

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import Swal from 'sweetalert2'
window.Swal = Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast = Toast;

import User from './Helpers/User'
window.User = User

window.EventBus = new Vue();

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('AppHome', require('./components/AppHome.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import router from './Router/router';
import AppHome from './components/AppHome';
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router: router,
    
});
