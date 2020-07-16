<template>
    <div>
        <v-toolbar>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-toolbar-title>Bitfumes</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="hidden-sm-and-down">
                <router-link to="#">
                    <v-btn text>Forum</v-btn>
                </router-link>
                 <router-link to="#">
                    <v-btn text>Ask question</v-btn>
                </router-link>
                 <router-link to="#">
                    <v-btn text>Category</v-btn>
                </router-link>
                 <router-link to="/login">
                    <v-btn text>Login</v-btn>
                </router-link>
            </div>
        </v-toolbar>
    </div>
</template>