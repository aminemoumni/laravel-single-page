<template>
<div>
    <app-edit-question :data="question" v-if="editing"></app-edit-question>
    <div v-else>
        <app-show-question :data="question" v-if="question"></app-show-question>
    </div>
</div>
</template>
<script>
import showquestion from './showQuestion';
import editquestion from './editQuestion';
export default {
    data(){
        return {
            question: null,
            editing: false
        }
    }
    ,
    created(){
        this.listen()
        this.getQuestions()
    },
    methods: {
        listen(){
            EventBus.$on('startEditing', () => {
                this.editing = true
            })
            EventBus.$on('redirect', () => {
                this.editing = false
            })
            EventBus.$on('refresh', (link) => {
                this.editing = false
                axios.get('/api' + link)
                .then(res => this.question = res.data.data)
                .catch(error => console.log(error))
            })
        },
        getQuestions(){
            axios.get('/api/question/' + this.$route.params.slug)
            .then(res => this.question = res.data.data)
            .catch(error => console.log(error))
        }
    },
    components: {
        appShowQuestion: showquestion,
        appEditQuestion: editquestion
    }
}
</script>