import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Rights from '@/components/rights/right'
Vue.use(Router)

export default new Router({
  routes: [
<<<<<<< HEAD
=======
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/',
      name:'home',
      component:Home,
      children:[
        {name:'users',path:'users',component:Users},
        {name:'rights',path:'rights',component:Rights}
      ]
    },

>>>>>>> dev-login
  ]
})
