
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
          if(!canUserAccess('dashboard_access')) return '/error'
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
      {
        path: 'products',
        name:'products',
        component: () => import('@/pages/products.vue'),
        beforeEnter() {
          if(!canUserAccess('product_access')) return '/error'
        }
      },
      {
        path: 'banners',
        name:'banners',
        component: () => import('@/pages/banners.vue'),
        beforeEnter() {
          if(!canUserAccess('banner_access')) return '/error'
        }
      },
      {
        path: 'facilities',
        name:'facilities',
        component: () => import('@/pages/facilities.vue'),
        beforeEnter() {
          if(!canUserAccess('facility_access')) return '/error'
        }
      },
      {
        path: 'social-medias',
        name:'social-medias',
        component: () => import('@/pages/social-medias.vue'),
        beforeEnter() {
          if(!canUserAccess('facility_access')) return '/error'
        }
      },
      {
        path: 'suppliers',
        name:'suppliers',
        component: () => import('@/pages/suppliers.vue'),
        beforeEnter() {
          if(!canUserAccess('supplier_access')) return '/error'
        }
      },
      {
        path: 'purchases',
        name:'purchases',
        component: () => import('@/pages/purchases.vue'),
        beforeEnter() {
          if(!canUserAccess('purchase_access')) return '/error'
        }
      },
      {
        path: 'settings',
        name:'settings',
        component: () => import('@/pages/settings.vue'),
        beforeEnter() {
          if(!canUserAccess('setting_access')) return '/error'
        }
      },
      {
        path: 'coupons',
        name:'coupons',
        component: () => import('@/pages/coupons.vue'),
        beforeEnter() {
          if(!canUserAccess('coupon_access')) return '/error'
        }
      },
      {
        path: 'blogs',
        name:'blogs',
        component: () => import('@/pages/blogs.vue'),
        beforeEnter() {
          if(!canUserAccess('blog_access')) return '/error'
        }
      },
      {
        path: 'pages',
        name:'pages',
        component: () => import('@/pages/pages.vue'),
        beforeEnter() {
          if(!canUserAccess('page_access')) return '/error'
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
      },
      {
        path: '/print/:id',
        name: 'print',
        component: () => import('@/pages/prints/invoice.vue')
      },
    ],
  },
]
