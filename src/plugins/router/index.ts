import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('token')) next({ name: 'login' })
  else if(to.name == 'login' && localStorage.getItem('token')) next({name: 'dashboard'})
  else next()
})

export default function (app: App) {
  app.use(router)
}

export { router }
