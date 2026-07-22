import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isPublicRoute = to.path === '/' || to.path === '/error' || to.name === 'home-portal' || to.name === 'error'
  const isAuthRoute = to.path.startsWith('/admin/login') || to.path.startsWith('/admin/forgot-password')
  const isAdminRoute = to.path.startsWith('/admin')

  if (isPublicRoute) {
    next()
  } else if (isAdminRoute && !isAuthRoute && !token) {
    next({ name: 'login' })
  } else if (isAuthRoute && token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default function (app: App) {
  app.use(router)
}

export { router }
