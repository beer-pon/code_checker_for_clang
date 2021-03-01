import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import CodeCheck from '../views/CodeCheck.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/upload',
    name: 'FileUpload',
    component: CodeCheck
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
