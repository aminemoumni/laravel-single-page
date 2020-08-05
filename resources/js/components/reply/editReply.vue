<template>
    <div >
        <vue-simplemde 
        v-model="reply.reply" 
        />
        <v-card-actions>
            <v-btn icon @click="update">
                <v-icon color="green">save</v-icon>
            </v-btn>
            <v-btn icon @click="cancel">
                <v-icon color="black">cancel</v-icon>
            </v-btn>
        </v-card-actions>
    </div>
</template>
<script>
export default {
    props: ['reply'],

    methods: {
        cancel(){
            EventBus.$emit('cancelEditing')
        },
        update(){
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
                
            axios.patch('/api/question/'+this.reply.question_slug+'/reply/'+this.reply.id,{body: this.reply.reply})
                .then((res) => {
                    this.cancel()

                    loader.hide()
                    Toast.fire({
                            icon: 'success',
                            title: 'reply has been updated successfly'
                    })
                })
                .catch((err) => {
                    loader.hide()
                })
        }
    }
}
</script>