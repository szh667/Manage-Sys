<template>
    <div class="outer">
        <el-form :model="login" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h3>登录系统</h3>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="login.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="logIn">登录</el-button>
                <el-button size="medium" @click="remind">提示</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import Mock from 'mockjs'
export default {
    name: 'Login',
    data() {
        return {
            login: {
                username: '',
                password: ''
            },

            rules: {
                username: [
                    { trigger: 'blur', required: true, message: '请输入用户名' }
                ],
                password: [
                    { trigger: 'blur', required: true, message: '请输入密码' }
                ],

            }
        }
    },
    mounted() {
        localStorage.clear()
    },
    methods: {
        logIn() {
            this.$refs.ruleForm.validate(val => {
                if (val) {
                    const token = Mock.Random.guid()
                    localStorage.setItem('token', token)
                    localStorage.setItem('breadList', JSON.stringify([{
                        path: '/',
                        name: 'home',
                        label: '首页',
                        icon: 's-home',
                        url: 'Home/Home',
                    },]))
                    this.$router.replace('/home')
                }
                else this.remind()
            })

        },
        remind() {
            this.$alert('用户名密码为任意字符串', '请输入账号密码', {
                confirmButtonText: '确定',
            });
        }
    }

}
</script>

<style lang="less" scoped>
.outer {
    width: 350px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 10px;
    padding: 35px 35px 15px 0px;
    text-align: center;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    h3 {
        margin: 0px auto;
        margin-bottom: 30px;
        margin-left: 38px;
        font-weight: 400;
        color: #333;
    }

    .el-button {
        margin: 0 auto;
        margin-right: 50px;
    }
}
</style>