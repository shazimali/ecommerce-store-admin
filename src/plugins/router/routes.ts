
import { canUserAccess } from '@/@core/utils/helpers';
export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name:'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        beforeEnter() {
          // if(!canUserAccess('dashboard_access')) return '/error'
          if(!canUserAccess('user_access')) return '/error'
        }
      },
      {
        path: 'roles',
        name:'roles',
        component: () => import('@/pages/roles.vue'),
        beforeEnter() {
          if(!canUserAccess('role_access')) return '/error'
        }
      },
      {
        path: 'users',
        name:'users',
        component: () => import('@/pages/users.vue'),
        beforeEnter() {
          if(!canUserAccess('user_access')) return '/error'
        }
      },
      {
        path: 'permissions',
        name:'permissions',
        component: () => import('@/pages/permissions.vue'),
        beforeEnter() {
          if(!canUserAccess('permission_access')) return '/error'
        }
      },
      {
        path: 'websites',
        name:'websites',
        component: () => import('@/pages/websites.vue'),
        beforeEnter() {
          if(!canUserAccess('website_access')) return '/error'
        }
      },
      {
        path: 'categories',
        name:'categories',
        component: () => import('@/pages/categories.vue'),
        beforeEnter() {
          if(!canUserAccess('category_access')) return '/error'
        }
      },
      {
        path: 'subcategories',
        name:'subcategories',
        component: () => import('@/pages/sub-categories.vue'),
        beforeEnter() {
          if(!canUserAccess('subcategory_access')) return '/error'
        }
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name:'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'error',
        name: 'error',
        component: () => import('@/pages/[...error].vue')
      }
    ],
  },
]
