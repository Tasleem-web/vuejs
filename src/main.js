import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes'
import store from "./store/index";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

app.use(router)
app.use(store)
app.mount('#app')