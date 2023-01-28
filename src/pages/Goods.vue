<template>
    <div class="outer">
        <el-table :data="goodsData" border style="width: 100%">
            <el-table-column fixed :prop="i.detail" :label="i.label" v-for="(i, index) of goodsDetails" :key="index"
                width="200" :sortable="i.label === '价格'">
                <template slot-scope="scope">
                    <el-input v-if="i.label === '价格' || i.label === '库存'"
                        v-model.lazy="scope.row[scope.column.property]" v-show="i.label === '价格'
                        ? scope.row.isEdit.p : scope.row.isEdit.n" type="number" placeholder="请输入数字"></el-input>
                    <span>{{ scope.row[scope.column.property] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handlChange('修改价格', scope.row.isEdit)">{{
                        scope.row.isEdit.p ? '完成改价' : '修改价格'
                    }}</el-button>
                    <el-button size="mini" type="danger" @click="handlChange('修改库存', scope.row.isEdit)">{{
                        scope.row.isEdit.n ? '完成改存' : '修改库存'
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
export default {
    name: 'Goods',
    methods: {
        handlChange(i, row) {
            this.$confirm(`确认${i}吗?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
            }).then(() => {
                if (i === '修改价格') {
                    row.p = !row.p
                } else if (i === '修改库存') {
                    row.n = !row.n
                }
            })
        }

    },

    data() {
        return {
            goodsDetails: [{ detail: 'model', label: '机型' },
            { detail: 'color', label: '颜色' },
            { detail: 'count', label: '库存' }, { detail: 'price', label: '价格' }],
            goodsData: [{
                model: '苹果',
                color: '黑色',
                count: 464,
                price: 5999,
                isEdit: {
                    p: false,
                    n: false
                }
            },
            {
                model: 'oppo',
                color: '白色',
                count: 323,
                price: 3888,
                isEdit: {
                    p: false,
                    n: false
                }
            },
            {
                model: '华为',
                color: '紫色',
                count: 494,
                price: 8999,
                isEdit: {
                    p: false,
                    n: false
                }
            },
            {
                model: '小米',
                color: '蓝色',
                count: 126,
                price: 2339,
                isEdit: {
                    p: false,
                    n: false
                }
            },
            {
                model: '魅族',
                color: '粉色',
                count: 997,
                price: 1999,
                isEdit: {
                    p: false,
                    n: false
                }
            },
            {
                model: '三星',
                color: '银色',
                count: 52,
                price: 6999,
                isEdit: {
                    p: false,
                    n: false
                }
            },
            {
                model: 'vivo',
                color: '粉色',
                count: 731,
                price: 2999,
                isEdit: {
                    p: false,
                    n: false
                }
            },]
        }
    }
}
</script>

<style lang="less" scoped>
.outer {
    padding: 10px;

}
</style>