<template>
    <div class="mt-3">
        <v-card>
            <v-card-title>
                <div class="headline">{{data.user }}</div>
                <div class="ml-2"> {{data.created_at}}</div>
                <v-spacer></v-spacer>
                <app-like :content="data"></app-like>
            </v-card-title>
            <v-divider></v-divider>
            <app-edit-reply 
            v-if="editing"
            :reply="data"
            >
            </app-edit-reply>

            <v-card-text v-html="reply" v-else></v-card-text>
           <div v-if="!editing">
                <v-card-actions v-if="own">
                    <v-btn icon @click="edit">
                        <v-icon color="yellow">edit</v-icon>
                    </v-btn>
                    <v-btn icon @click="destroy(data.id)">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-card-actions>
           </div>
        </v-card>
    </div>
</template>
<script>
import edireply from './editReply'
import like from '../likes/like'
export default {
    props: ['data', 'slug'],
    data() {
        return {
            editing:false
        }
    },
    computed:{
        own(){
            return User.own(this.data.user_id)
        },
        reply(){
            return md.parse(this.data.reply)
        }
    },
    methods: {
        destroy(id){
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                
                let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.delete('/api/question/'+this.slug+'/reply/'+id)
                .then((res) => {
                    loader.hide()
                    EventBus.$emit('refreshReplies')
                })
                .catch((err) => {
                    console.log(err)
                    loader.hide()
                })
                
            }
            })
        },
        edit(){
            this.editing = true
        },
        listen(){
            EventBus.$on('cancelEditing', () => {
                this.editing = false
            })
        }
    },
    components: {
        appEditReply: edireply,
        appLike: like,
    },

    created(){
        this.listen()
    }
}
</script>

