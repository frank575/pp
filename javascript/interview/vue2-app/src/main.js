import Vue from 'vue'
import App from './App.vue'
import './style/main.scss'
import { router } from './routes'
import { store } from './store'

new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount('#app')
