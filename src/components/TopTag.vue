<template>
    <div class="tagOuter">
        <el-tag @click="toRoute(tag)" @close="deleTag(tag)" :effect="tag.name===$route.name ? 'dark' : 'plain'"
            v-for="tag of breadList" :key="tag.name" :closable="tag.label !== '首页'" :type="tag.type">
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'TopTag',
    methods: {
        toRoute(tag) {
            this.$router.push(tag.path)
            this.$store.commit('UPBCOLOR', tag.path)
        },
        deleTag(tag) {
            this.$store.commit('DELETETAG', tag.path)
            if (tag.name === this.$route.name) {
                const index = this.breadList.length - 1
                this.$router.push(this.breadList[index].path)
            }
        }

    },

    computed: {
        ...mapState(['breadList'])
    }
}
</script>

<style>
.el-tag {
    margin-left: 10px;
    cursor: pointer;
    margin-bottom: 10px;
}
</style>