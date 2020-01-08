import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: 'movie'
      },
      {
        path: 'cinema',
        name: 'Cinema',
        component: () => import('../components/Cinema')
      },
      {
        path: 'movie',
        name: 'Movie',
        component: () => import('../components/Movie')
      }, {
        path: 'my',
        name: 'My',
        component: () => import('../components/My')
      },
    ]
  },
]
const router = new VueRouter({

  mode: 'history',
  routes,

});
export default router