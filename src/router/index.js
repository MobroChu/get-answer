import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: App,
      children: [
        {
          path: '/home',
          component: r => require.ensure([], () => r(require('../pages/home')), 'home')
        },
        {
          path: '/item',
          component: r => require.ensure([], () => r(require('../pages/item')), 'item')
        },
        {
          path: '/score',
          component: r => require.ensure([], () => r(require('../pages/score')), 'score')
        }
      ]
    }
  ]
})
