import { createRouter, createWebHistory } from 'vue-router'
import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '../components/Admin/Admin.vue'


Vue.use(VueRouter)
const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminHome,
    // alias:'/',
    children: [
      {
        path: '/admin/list-account',
        name: 'ListAccount',
        component: () => import( '../components/Admin/account/List.vue')
    
      },
      {
        path: '/admin/insert',
        component: () => import( '../components/Admin/account/Insert.vue')
    
      },
      {
        path: '/admin/room',
        name: 'ListRoom',
        component: () => import( '../components/Admin/room/Room.vue')
      },
      {
        path: '/admin/list-room-type',
        name: 'ListRoomType',
        component: () => import( '../components/Admin/room/ListRoomType.vue')
      },
      {
        path: '/admin/stuffs',
        name: 'ListStuffs',
        component: () => import( '../components/Admin/stuffs/Stuffs.vue')
      },
      {
        path: '/admin/upload',
        name: 'Listimg',
        component: () => import( '../components/Admin/UploadFile.vue')
      },
    
    ]
    
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')

  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')

  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/MyAccount.vue')

  }

      
  ]

  


const router = new VueRouter({
    mode:'history',
    base: (process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('username');

  if (authRequired && !loggedIn) {
    
  }
  next();
})

export default router
