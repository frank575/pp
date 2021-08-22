import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

export { router }

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  routes,
})
