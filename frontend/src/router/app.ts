import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/views/App/children/Home.vue'
import DemoView from 'src/views/App/children/DemoView/script'
import DemoQuery from 'src/views/App/children/DemoQuery/script'
import DemoMutation from 'src/views/App/children/DemoMutation/script'

import userRoutes, { links as userLinks } from './user'

Vue.use(Router)


export const links = {
  home: 'home',
  demoView: 'demoView',
  demoQuery: 'demoQuery',
  demoMutation: 'DemoMutation',
  about: 'about',
  user: userLinks
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: links.home,
      path: '/',
      component: Home,
      meta: { title: "Home" },
    },
    {
      name: links.demoView,
      path: '/demoView',
      component: DemoView,
      meta: { title: "DemoView" },
    },
    {
      name: links.demoQuery,
      path: '/demoQuery',
      component: DemoQuery,
      meta: { title: "DemoQuery" },
    },
    {
      name: links.demoMutation,
      path: '/demoMutation',
      component: DemoMutation,
      meta: { title: "DemoMutation" },
    },
    {
      name: links.about,
      path: '/about',
      meta: { title: "About" },
      component: () => import(/* webpackChunkName: "about" */ 'src/views/App/children/About.vue'),
    },
    ...userRoutes
  ],
});

export default router as Router