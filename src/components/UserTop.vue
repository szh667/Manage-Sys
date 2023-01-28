<template>
    <div class="topOuter">
        <el-button type='primary' @click="addUser">+添加</el-button>
        <el-dialog title="编辑信息" :visible.sync="$store.state.dialogFormVisible" :before-close="beforeClose">
            <el-form :model="$store.state.operateForm" ref="form" :inline="true" :rules="rules"
                class="demo-form-inline">
                <el-form-item :label="i.label" :prop="i.model" v-for="(i, index) of operateFormLabel "
                    :label-width="formLabelWidth" :key="index">
                    <el-input autocomplete="off" :type="i.type" v-model="operateForm[i.model]">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="beforeClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model.lazy="keywords.name" placeholder="请输入姓名搜索"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUser">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getUser, createU, updateU } from '../api'

import { mapState } from 'vuex'
export default {
    name: 'UserTop',
    data() {
        return {
            keywords: { name: '' },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '请填写性别', trigger: 'blur' },
                ],
                birth: [
                    { required: true, message: '请输入生日', trigger: 'blur' },
                ],

                addr: [
                    { required: true, message: '请填写地址', trigger: 'blur' },
                ],
            },
        }
    },
    computed: {
        ...mapState(['dialogTableVisible', 'isAdd', 'operateForm', 'formLabelWidth', 'operateFormLabel'])
    },
    methods: {
        getUlist() {
            getUser({ params: this.keywords }).then(data => {
                this.$store.commit('GETUSER', data.list)
            })
        },
        submit() {
            this.$refs.form.validate(val => {
                if (val) {
                    const dataObj = { ...this.operateForm }
                    if (this.isAdd) {
                        createU(dataObj).then(() => this.getUlist())
                    } else { updateU(dataObj).then(() => this.getUlist()) }
                    this.beforeClose()
                }

            })
        },
        beforeClose() {
            for (let k in this.$store.state.operateForm) {
                this.$store.state.operateForm[k] = ''
            }
            this.$store.state.dialogFormVisible = false
        },
        addUser() {
            this.$store.state.dialogFormVisible = true
            this.$store.state.isAdd = true
        },
        searchUser() {
            if (this.keywords.name.trim()) {
                this.getUlist()
            }
            this.keywords.name = ''
        }

    }
}
</script>

<style lang="less" scoped>
.topOuter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    height: 40px;

}

.el-dialog {
    width: 50%;
}
</style>