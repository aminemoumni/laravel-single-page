<template>
<div>
    <app-edit-question :data="question" v-if="editing"></app-edit-question>
    <div v-else>
        <app-show-question :data="question" v-if="question"></app-show-question>
        <transition name="slide" mode="out-in" appear>
            <app-replies v-if="showReplies" :replies="question.replies" :slug="question.slug"></app-replies>
        </transition>
        <app-new-reply :questionSlug="question.slug"></app-new-reply>
    </div>
</div>
</template>
<script>
import showquestion from './showQuestion';
import editquestion from './editQuestion';
import replies from '../reply/replies';
import newreply from '../reply/newReply';
export default {
    data(){
        return {
            question: null,
            editing: false,
            showReplies: false
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
            EventBus.$on('showReplies', () => {
                this.showReplies = !this.showReplies
            })
            EventBus.$on('refreshReplies', () => {
                this.getQuestions();
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
        appEditQuestion: editquestion,
        appReplies: replies,
        appNewReply: newreply,
    }
}
</script>

<style scoped>

.slide-enter {

}
.slide-enter-active {
    animation: slide-in .3s ease-in forwards;
}
.slide-leave {

}
.slide-leave-active {
    animation: slide-in .3s ease-out forwards reverse;
    
}
.slide-move {
    transition: transform 1s;
}
@keyframes slide-in {
    0% {
        transform: translateY(-20px);
        opacity: 0;
    }
    100% {
        transform: translate(0);
        opacity: 1;
    }
}
</style>