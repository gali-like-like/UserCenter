import { createRouter,createWebHistory,createWebHashHistory } from 'vue-router'
import request from '@/utils/request.js'
import {userInfoStore} from "@/store/useUserInfo.js";
const routes = [
    {
        path: '/login',
        component:() => import('@/views/login/index.vue')
    },
    {
        path: '/regedit',
        component: () => import('@/views/regedit/index.vue')
    },
    {
        path: '/test',
        component: () => import('@/views/test/index.vue')
    },
    {
        path:'/home',
        component: () => import('@/views/home/index.vue'),
        children:[
            {
                path: 'users',
                component: () => import('@/views/home/users/index.vue')
            },
            {
                path: 'usermanage',
                component: () => import('@/views/usermanage/index.vue')
            },
            {
                path: 'self',
                component: () => import('@/views/self/index.vue')
            }
        ],
        redirect: "/home/users"
    },
    {
        path: '/',
        redirect: '/login'
    }
]

const router = createRouter({
    // history: createWebHistory(),
    history:createWebHashHistory(),
    routes,
})
const authPath = ["/login", "/regedit", "/users","/test"];
router.beforeEach((to, from, next) => {
    // authPath.includes(to.path) ? next() : from.path = "/login"
    console.log(`${from.path} => ${to.path}` );
    if (!authPath.includes(to.path)) {
        // 获取当前用户
        request.get("/api/user/current").then(res => {
            if (res.code !== 200) {
                next("/login");
            } else {
                const userInfo = userInfoStore();
                if (!userInfo.user) {
                    console.dir(userInfo);
                    userInfo.changeUser(res.data);
                }
                next();
            }
        });
    } else {
        next();
    }
})
export default router;
