<template>
    <div>
        <tool-bar></tool-bar>
            <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
import ToolBar from './ToolBar'
import AppFooter from './AppFooter'
export default {
    components: {
        toolBar: ToolBar,
        AppFooter: AppFooter
    }
}
</script>

<style scoped>

</style>