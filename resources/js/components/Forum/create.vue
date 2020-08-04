<template>
    <v-container>
        <v-form
            @submit.prevent="create"
            >
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

            <v-btn
            color="green"
            type="submit"
            >
                Create
            </v-btn>
        </v-form>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            form: {
                title: null,
                category_id:null,
                body: null
            },
            categories: [],
            errors: {},
            fullPage: false
        }
    },
    
    methods:{
        create(){
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.post('/api/question', this.form)
                .then((res) => {
                    this.form.title = null
                    this.form.body = null
                    this.form.category_id = null

                    loader.hide()
                    this.$router.push({path: res.data.path})
                    //console.log(res.data)
                })
                .catch((err) => {
                    this.errors = err.response.data.error
                    loader.hide()
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        }
    },
    created(){
        axios.get('/api/category').then(res => this.categories = res.data.data)
    }
}
</script>