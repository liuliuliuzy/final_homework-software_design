import Vue from 'vue'
import Router from 'vue-router'
import start from './pages/start'
import view from './views/Gallery'
import intro from './components/intro'
import login from './pages/login'
import register from './pages/register'
// import face from './pages/faceswap'
// import userinfo from './pages/userinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start,
      children: [
        {
          path: '',
          component: intro
        },
        {
          path: '/view',
          component: view
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // {
    //   path: '/face',
    //   name: 'face',
    //   component: face
    // },
    // {
    //   path: '/userinfo',
    //   name: 'userinfo',
    //   component: userinfo
    // }
  ]
})
