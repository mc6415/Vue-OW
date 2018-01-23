import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Calculator from '@/components/Calculator'
import Home from '@/components/Home'
import ZaryaStats from '@/components/ZaryaStats';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {path: '/Profile', name: 'Profile', component: Profile},
    {path: '/Calculator', name: 'Calculator', component: Calculator},
    {path: '/ZaryaStats/:player', name: 'zarya-stats', component: ZaryaStats, props: {stats: {}}}
  ]
})
