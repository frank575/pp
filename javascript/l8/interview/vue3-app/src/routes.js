import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export { router }

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
