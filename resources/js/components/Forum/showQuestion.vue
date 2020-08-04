<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    <div class="headline mb-0">
                        {{data.title}}
                    </div>
                    <span class="grey--text">{{data.user}} | {{data.created_at}}</span>

                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal">5 Replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body"></v-card-text>
            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="yellow">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>
<script>

export default {
    props: ['data'],
    data(){
        return {
            own: User.own(this.data.user_id),
            fullPage: false
        }
    },
    computed: {
        body(){
            return md.parse(this.data.body)
        }
    },
    methods: {  
        destroy(){
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
                axios.delete('/api/question/'+ this.data.slug)
                    .then((res) => {
                    loader.hide()
                    this.$router.push({name: 'forum'})
                    
                    })
                    .catch((err) => {
                   loader.hide()
                   Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    })
                }
                })
            
        },
        edit(){
            EventBus.$emit('startEditing')
        }
    },
}
</script>