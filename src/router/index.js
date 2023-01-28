import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            redirect: '/home',
            component: () => import('../pages/Main'),
            children: [
                {
                    name: 'user',
                    path: 'user',
                    component: () => import('../pages/User')
                },
                {
                    name: 'home',
                    path: 'home',
                    component: () => import('../pages/Home')
                },
                {
                    path: 'mall',
                    name: 'mall',
                    component: () => import('../pages/Goods')
                },
                {
                    path: 'page1',
                    name: 'page1',
                    component: () => import('../pages/Page1')
                },
                {
                    path: 'page2',
                    name: 'page2',
                    component: () => import('../pages/Page2')
                },
            ]
        },
        {
            path: '/login',
            component: () => import('../pages/Login')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.path === '/login') next()
    else {
        if (token) next()
        else router.replace('/login')
    }
})
export default router