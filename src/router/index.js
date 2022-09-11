import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () =>
            import(/* webpackChunkName : "base" */ '@/views/layout'),
        redirect: '/ ',
        children: [
            {
                path: '/ ',
                component: () => import('@/views/home')
            },
            {
                path: '/video',
                component: () => import('@/views/video')
            },
            {
                path: '/qa',
                component: () => import('@/views/Qa')
            },
            {
                path: '/profile',
                component: () => import('@/views/my')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login')
        // 路由懒加载
    }
]

const router = new VueRouter({
    routes
})

export default router
