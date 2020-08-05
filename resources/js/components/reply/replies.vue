<template>
    <v-container>
        <app-reply 
        v-for="reply in replies" 
        :key="reply.id" 
        :data="reply"
        :slug="slug"
        ></app-reply>
    </v-container>
</template>
<script>
import reply from './reply'
export default {
    props: ['replies', 'slug'],

    components: {
        appReply: reply
    }
}
</script>