<template>
    <v-container>
        <v-form >
            <v-text-field
            v-model="form.title"
            label="Title"
            type="text"
            required
            ></v-text-field>
            <v-select
            :items="categories"
            item-text="name"
            item-value="id"
            label="Category"
            v-model="form.category_id"
            autocomplete>
            </v-select>

            <vue-simplemde 
            v-model="form.body" 
            />
            <v-card-actions>
                <v-btn icon small @click.prevent="update">
                    <v-icon color="green">save</v-icon>
                </v-btn>
                <v-btn icon small>
                    <v-icon color="red" @click="cancel">cancel</v-icon>
                </v-btn>
            </v-card-actions>
            
        </v-form>
    </v-container>
</template>
<script>
export default {
    props: ['data'],
    data(){
        return {
            form: {
                title: this.data.title,
                body: this.data.body,
                category_id: this.data.category_id
            },
            categories: []
        }
    },
    methods: {
        update(){
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.patch('/api/question/' + this.data.slug, this.form)
                .then((res) => {
                    //console.log(res)
                    loader.hide()
                    this.refresh(res.data.path)
                    //EventBus.$emit('redirect')
                })
                .catch((err) => {
                    //console.log(err)
                    loader.hide()
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        },
        cancel(){
            EventBus.$emit('redirect')
        },
        refresh(link){
            EventBus.$emit('refresh', link)
        }
    },
    created(){
        axios.get('/api/category').then(res => this.categories = res.data.data)
    }
}
</script>