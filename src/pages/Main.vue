<template>
    <el-container style="height:100vh">

        <Aside />
        <el-container class="is-vertical">
            <Top />
            <TopTag />
            <Show />
        </el-container>
    </el-container>
</template>

<script>
import Aside from '../components/Aside.vue'
import Top from '../components/Top.vue'
import Show from '../components/Show.vue'
import TopTag from '../components/TopTag.vue'
export default {
    name: 'Main',
    components: { Aside, Top, Show, TopTag },

}
</script>

<style>

</style>