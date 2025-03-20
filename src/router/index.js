import { createWebHistory, createRouter } from 'vue-router'
import navBar from '../components/navBar.vue'

const routes = [
  
  {
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue'),
  },
  {
  path: '/gameZone',
  name: 'gameZone',
  component: () => import ('../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
