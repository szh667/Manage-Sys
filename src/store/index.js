import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const actions = {
    addB(context, val) {
        const newArr = context.state.breadList.filter(item => item.name === val.name)
        if (!newArr.length) context.commit('ADDB', val)
    },

}
const mutations = {
    ADDB(state, val) {
        state.breadList.push(val)
        localStorage.setItem('breadList', JSON.stringify(state.breadList))
    },
    UPBCOLOR(state, val) {
        state.breadList.map(item => {
            if (val !== '/home') {
                if (item.path === val) item.active = true
                else item.active = false
            }
        })
    },
    DELETETAG(state, val) {
        state.breadList = state.breadList.filter(item => item.path !== val)
        localStorage.setItem('breadList', JSON.stringify(state.breadList))
    },
    GETUSER(state, val) {
        state.tableData = val
    },
    DELETE(state, val) {
        state.tableData = state.tableData.filter(item => item.id !== val)
    },
    EDIT(state, val) {
        state.tableData = state.tableData.map(item => item.id !== val)
    },
    ADDUSER(state, val) {

        state.tableData.unshift(val)
    }
}
const state = {
    isOpen: true,
    tableData: [],
    isAdd: true,
    isSearch: false,
    dialogTableVisible: false,
    dialogFormVisible: false,

    operateFormLabel: [
        {
            model: 'name',
            label: '姓名',
            type: 'input'
        },
        {
            model: 'age',
            label: '年龄',
            type: 'input'
        },
        {
            model: 'sex',
            label: '性别',
            type: 'select',
            opts: [
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 0
                }
            ]
        },
        {
            model: 'birth',
            label: '出生日期',
            type: 'date'
        },
        {
            model: 'addr',
            label: '地址',
            type: 'input'
        }
    ],
    operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
    },
    formLabelWidth: '100px',
    info: [
        {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home',
        },
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'edit-outline',
            url: 'MallManage/MallManage',

        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'UserManage/UserManage',

        },
        {
            label: '其他',
            path: '/other',
            icon: 'location',
            name: 'other',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Other/PageOne',

                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Other/PageTwo',

                }
            ]
        }
    ],
    breadList: JSON.parse(localStorage.getItem('breadList'))
}
export default new Vuex.Store({
    mutations,
    state,
    actions
})