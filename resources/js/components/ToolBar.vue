<template>
    <div>
        <v-toolbar>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-toolbar-title>Bitfumes</v-toolbar-title>
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
                {title: 'Form', to: '/forum', show: true},
                {title: 'Ask Quetion', to: '/ask', show: User.loggedIn()},
                {title: 'Category', to: '/category', show: User.admin()},
                {title: 'Logout', to: '/logout', show: User.loggedIn()},
                {title: 'Login', to: '/login', show: !User.loggedIn()},
                

            ]
        }
    },
    created(){
        EventBus.$on('logout', ()=>{
            User.logout()
        })
    }
}
</script>