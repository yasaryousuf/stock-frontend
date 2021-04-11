import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
    { 
        path: '/home', 
        component: Home,             
        meta: {
            requiresAuth: true
        } 
    },
    { 
        path: '/about', 
        component: About,             
        meta: {
            requiresAuth: true
        } 
    },
    { 
        path: '/login', 
        component: Login,             
        meta: {
            onlyGuest: true
        }            
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            console.log(to, 'to');
            next({
                path: '/login',
                query: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ name: 'userboard'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'userboard'})
        }
    }else {
        next()
    }
})

export default router