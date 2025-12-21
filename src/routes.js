import Home from './pages/Home.vue'
import Product from './pages/Product.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    name: "product",
    component: Product,
    props: true
  },
  {
    path: '/notes',
    name: "notes",
    component: () => import('./pages/Notes.vue'),
    props: true
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]