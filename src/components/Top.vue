<template>
    <div style="marginBottom:10px">
        <el-header>
            <div class="topBread">
                <el-button icon="el-icon-menu" @click="$store.state.isOpen = !$store.state.isOpen"
                    size="small"></el-button>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item style="color:white" :to="{ path: i.path }" v-for="i of $store.state.breadList"
                        :key="i.name">{{ i.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-dropdown @command="handlClick">
                    <span class="el-dropdown-link">
                        <a href="#"> <img src="../assets/images/user.webp" alt="" class="head"></a>
                    </span>
                    <el-dropdown-menu slot="dropdown" :split-button="true">
                        <el-dropdown-item command="home">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>

        </el-header>

    </div>


</template>

<script>
export default {
    name: "Top",
    data() {
        return {
            breadList: [{
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home',
            },]
        }
    },
    methods: {
        handlClick(command) {
            if (command === 'logout') {
                this.$store.state.breadList = this.breadList
                this.$router.replace('/login')
            } else this.$router.push('/home')
        }
    }
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #2F2F2F;
    color: white;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;

    .el-breadcrumb {
        margin-top: 8px;
    }

    .topBread {
        display: flex;
        align-content: center;
        flex-wrap: wrap;

        button {
            margin-right: 15px;
        }

        /deep/.el-breadcrumb__inner {
            font-weight: 400;

            &.is-link {
                color: #888;
            }

        }
    }

    .el-dropdown-link {
        margin-right: 15px;
    }

    .el-dropdown {
        height: 52px;
    }

    .head {
        margin-top: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>