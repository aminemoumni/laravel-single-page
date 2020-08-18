<template>
    <div>
        <v-toolbar color="indigo" dark>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-toolbar-title>
                <router-link class="logo" to="/">Bitfumes</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            
            <div class="hidden-sm-and-down">
                <router-link 
                v-for="item in items"
                :key="item.title"
                :to="item.to"
                v-if="item.show">
                    <v-btn text>{{item.title}}</v-btn>
                </router-link>
            </div>
        </v-toolbar>
    </div>
</template>

<script>

export default {
    data() {
        return {
            items: [
                {title: 'Form', to: '/forum', show: User.loggedIn()},
                {title: 'Ask Quetion', to: '/ask', show: User.loggedIn()},
                {title: 'Category', to: '/category', show: User.admin()},
                {title: 'Logout', to: '/logout', show: User.loggedIn()},
                {title: 'Login', to: '/login', show: !User.loggedIn()},
                {title: 'Sign up', to: '/signup', show: !User.loggedIn()},
                

            ]
        }
    },
    created(){
        EventBus.$on('logout', ()=>{
            User.logout()
        })
    },
    
}
</script>

<style scoped>
    .logo {
        text-decoration: none;
        color: white;
    }
</style>