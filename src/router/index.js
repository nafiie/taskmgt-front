import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Home.vue'
import Loginpage from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Newtask from '../views/Newtask.vue'
import Edittask from '../views/Edittask.vue'




const routes = [
  { path: '/',component: Homepage },
  { path: '/login',component: Loginpage },
  { path: '/register',component: Register},
  { path: '/dashboard',component: Dashboard, meta:{requiresAuth: true}},
  { path: '/newtask',component: Newtask, meta:{requiresAuth: true}},
  { path: '/dashboard/edit/:id',component: Edittask, props: true, meta:{requiresAuth: true}  }
 

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
   }
   else{
    next();
   }
})

export default router