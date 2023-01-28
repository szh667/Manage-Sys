<template>
    <div class="outer">
        <el-table height="76%" :data="isSearch ? searchList : tableData" style="width: 100%">
            <el-table-column :prop=i.model v-for="(i, index) of operateFormLabel" :label="i.label" :key="index">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination :page-size="15" @next-click="handlePchange" @current-change="handlePchange" :pager-count="7"
                layout="prev, pager, next" :total="total" @prev-click="handlePchange">
            </el-pagination>
        </div>

    </div>

</template>

<script>
import { getUser, deleteU } from '../api'
import { mapState } from 'vuex'

export default {
    name: 'UserTable',
    data() {
        return {
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
            dialogFormVisible: false,
            total: 0,
            pageData: {
                limit: 15,
                page: 1
            }
        }
    },
    computed: {
        ...mapState(['dialogTableVisible', 'searchList', 'isSearch', 'operateForm', 'formLabelWidth', 'operateFormLabel', 'tableData'])
    },
    mounted() {
        this.getUlist()
    },
    methods: {
        handleEdit(data) {
            this.$store.state.dialogFormVisible = true
            this.$store.state.isAdd = false
            this.$store.state.operateForm = JSON.parse(JSON.stringify(data))
        },
        handleDelete(data) {
            if (confirm(`确认删除${data.name}的信息吗?`)) {
                deleteU(data).then(() => {
                    this.getUlist()
                })
            }

        },
        getUlist() {
            getUser({ params: this.pageData }).then(data => {
                this.$store.commit('GETUSER', data.list)
                this.total = data.count || 0
            })
        },
        handlePchange(p) {
            this.pageData.page = p
            this.getUlist()
        }
    }
}
</script>

<style less="lang" scoped>
.outer {
    height: 750px;

}

.el-pagination {
    margin-top: 10px;
    float: right;
    margin-right: 10px;
}
</style>