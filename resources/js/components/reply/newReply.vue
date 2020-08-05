<template>
    <v-container>
        <v-divider></v-divider>
        <h3>New reply</h3>
         <vue-simplemde 
            v-model="form.body" 
            />

        <v-btn color="green" dark @click="submit">
            Reply
        </v-btn>
    </v-container>
</template>
<script>
export default {
    props: ['questionSlug'],
    data() {
        return {
            form: {
                body: null
            }
        }
    },
    methods: {
        submit(){
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.post('/api/question/' + this.questionSlug + '/reply', this.form)
                .then((res) => {

                    this.form.body = ''
                    loader.hide()
                    Toast.fire({
                            icon: 'success',
                            title: 'reply has been created successfly'
                    })
                    EventBus.$emit('refreshReplies')
                })
                .catch((err) => {
                    loader.hide()
                })
        }
    },
}
</script>