<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545C65" active-text-color="#ffd04b"
        text-color="#FFFFFF" :collapse="isOpen" :router="true">
        <p class="title" v-text="isOpen ? '后台' : '通用后台管理系统'"></p>
        <el-menu-item v-for="i of info1" :key="i.name" :index="i.path" @click="dealRoute(i)">
            <i :class="`el-icon-${i.icon}`"
                :style="{ color: i.name === $route.name ? 'rgb(255, 208, 75)' : '#909399' }"></i>
            <span slot="title">{{ i.label }}</span>
        </el-menu-item>
        <el-submenu :index="k.path" v-for="k of info2" :key="k.name">
            <template slot="title">
                <i :class="`el-icon-${k.icon}`"></i>
                <span slot="title">{{ k.label }}</span>
            </template>
            <el-menu-item-group v-for="j of k.children" :key="j.name">
                <el-menu-item :index="j.path" @click="dealRoute(j)">
                    <i :class="`el-icon-${j.icon}`"
                        :style="{ color: j.name === $route.name ? 'rgb(255, 208, 75)' : '#909399' }"></i>
                    {{ j.label }}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>


    </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Aside',
    computed: {
        ...mapState(['isOpen', 'info']),

        info1() {
            return this.info.filter(obj => !obj.children)
        },
        info2() {
            return this.info.filter(obj => obj.children)

        },
    },
    methods: {
        dealRoute(i) {
            this.$store.dispatch('addB', i)
            this.$store.commit('UPBCOLOR', i.path)
        }
    },



}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    border: none;

    .title {
        margin: 10px 0;
        text-align: center;
        color: #FFFFFF
    }
}
</style>