import Vue from 'vue'
import Router from 'vue-router'


import store from '../store'

import Login from '@/components/Login'
import Vehicles from '@/components/Vehicles'
import Logs from '@/components/Logs'
import Logdetails from '@/components/Logdetails'
import NewLog from '@/components/NewLog'

Vue.use(Router)

var therouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Vehicles',
      name: 'Vehicles',
      component: Vehicles
    },
    {
      path: '/Vehicles/:vehicleid',
      name: 'Logs',
      component: Logs
    },
    {
      path: '/Vehicles/:vehicleid/:logid',
      name: 'Logdetails',
      component: Logdetails
    }
    // ,
    // {
    //   path: '/Vehicles/:vehicleid/new',
    //   name: 'New log',
    //   component: NewLog
    // }
  ]
})

therouter.beforeEach((to, from, next) => {
    if (to.name) {
        store.commit("settitle", to.name)
      }
      console.log(to.name)
    if (!store.state.user && to.name !== "Login")  { 
      next("/")
    } else 
    {
      next()
    }
 
  // next()
})

export default therouter