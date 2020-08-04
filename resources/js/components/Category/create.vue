<template>
    <v-container>
        <v-form >
            <v-text-field
            v-model="form.category"
            label="Category name"
            type="text"
            required
            ></v-text-field>

            <v-btn v-if="!updated" @click.prevent="create" type="submit" color="green">
               Create
            </v-btn>
            <v-btn v-if="updated" @click.prevent="update" type="submit" color="yellow">
               Update
            </v-btn>
        </v-form>
        <v-card class="mt-5">
             <v-toolbar color="indigo" dark dense>
                <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>
       
            <v-list-item  v-for="category in categories" :key="category.id">
                <v-list-item-action>
                    <v-btn icon small @click="edit(category.slug)">
                        <v-icon color="yellow">edit</v-icon>
                    </v-btn>
                    
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{category.name}}
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                   
                    <v-btn icon small @click="destroy(category.slug)">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        <v-divider></v-divider>
        </v-card>
       
    </v-container>
</template>
<script>
export default {
    
    data() {
        return {
            form: {
                category: null,
            },
            errors: {},
            categories: {},
            slug: null,
            updated: false
        }
    },
    methods: {
        create(){
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.post('/api/category', this.form)
                .then((res) => {
                    this.form.category = null
                    loader.hide()
                    this.getCategories()
                })
                .catch((err) => {
                    this.errors = err.response.data.error
                    loader.hide()
                })

        },
        getCategories() {
             axios.get('/api/category')
            .then(res => this.categories = res.data.data)
        },
        destroy(slug) {
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
                axios.delete('/api/category/' + slug)
                    .then((res) => {
                        this.getCategories()
                        loader.hide()
                    })
                    .catch((err) => {
                        console.log(err)
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
        edit(slug) {
            
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.get('/api/category/' + slug)
                .then((res) => {
                    this.updated = true
                    this.form.category = res.data.data.name
                    this.slug = res.data.data.slug
                    loader.hide();
                    
                    
                })
                .catch((err) => {

                    loader.hide();
                })
        },
        update(){
            
           // alert('update ' + this.slug)
            let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: false,
                  onCancel: this.onCancel,
                  color:' #007BFF',
                });
            axios.patch('/api/category/' + this.slug, this.form)
                .then((res) => {
                    this.updated = false
                    this.getCategories()
                    this.form.category = null
                    loader.hide();
                    Toast.fire({
                            icon: 'success',
                            title: 'Category has been updated successfly'
                    })
                })
                .catch((err) => {

                    loader.hide();
                })
        }
    
    },
    created() {
        this.getCategories()
        
    }
}
</script>