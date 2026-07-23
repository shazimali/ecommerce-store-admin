import { canUserAccess } from '@/@core/utils/helpers';

const checkPermission = (permission: string) => {
  const token = localStorage.getItem('token')
  if (!token) return '/admin/login'
  if (!canUserAccess(permission)) return '/admin/login'
  return true
}

export const routes = [
  // 👉 Public Home Portal (5 Website Widgets - No Login Required)
  {
    path: '/',
    name: 'home-portal',
    component: () => import('@/pages/index.vue'),
  },

  // 👉 Direct Login Shortcut (/login -> /admin/login)
  {
    path: '/login',
    redirect: '/admin/login',
  },

  // 👉 Admin Panel Dashboard & Management Routes (Under /admin)
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        beforeEnter() {
          const res = checkPermission('dashboard_access')
          if (res !== true) return res
        },
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/pages/roles.vue'),
        beforeEnter() {
          const res = checkPermission('role_access')
          if (res !== true) return res
        },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/pages/users.vue'),
        beforeEnter() {
          const res = checkPermission('user_access')
          if (res !== true) return res
        },
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('@/pages/permissions.vue'),
        beforeEnter() {
          const res = checkPermission('permission_access')
          if (res !== true) return res
        },
      },
      {
        path: 'websites',
        name: 'websites',
        component: () => import('@/pages/websites.vue'),
        beforeEnter() {
          const res = checkPermission('website_access')
          if (res !== true) return res
        },
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/pages/categories.vue'),
        beforeEnter() {
          const res = checkPermission('category_access')
          if (res !== true) return res
        },
      },
      {
        path: 'subcategories',
        name: 'subcategories',
        component: () => import('@/pages/sub-categories.vue'),
        beforeEnter() {
          const res = checkPermission('subcategory_access')
          if (res !== true) return res
        },
      },
      {
        path: 'badges',
        name: 'badges',
        component: () => import('@/pages/badges.vue'),
        beforeEnter() {
          const res = checkPermission('badge_access')
          if (res !== true) return res
        },
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/pages/products.vue'),
        beforeEnter() {
          const res = checkPermission('product_access')
          if (res !== true) return res
        },
      },
      {
        path: 'bundles',
        name: 'bundles',
        component: () => import('@/pages/bundles.vue'),
        beforeEnter() {
          const res = checkPermission('bundle_access')
          if (res !== true) return res
        },
      },
      {
        path: 'banners',
        name: 'banners',
        component: () => import('@/pages/banners.vue'),
        beforeEnter() {
          const res = checkPermission('banner_access')
          if (res !== true) return res
        },
      },
      {
        path: 'facilities',
        name: 'facilities',
        component: () => import('@/pages/facilities.vue'),
        beforeEnter() {
          const res = checkPermission('facility_access')
          if (res !== true) return res
        },
      },
      {
        path: 'collections',
        name: 'Collections',
        component: () => import('@/pages/collections.vue'),
        beforeEnter() {
          const res = checkPermission('collection_access')
          if (res !== true) return res
        },
      },
      {
        path: 'social-medias',
        name: 'social-medias',
        component: () => import('@/pages/social-medias.vue'),
        beforeEnter() {
          const res = checkPermission('social_media_access')
          if (res !== true) return res
        },
      },
      {
        path: 'suppliers',
        name: 'suppliers',
        component: () => import('@/pages/suppliers.vue'),
        beforeEnter() {
          const res = checkPermission('supplier_access')
          if (res !== true) return res
        },
      },
      {
        path: 'purchases',
        name: 'purchases',
        component: () => import('@/pages/purchases.vue'),
        beforeEnter() {
          const res = checkPermission('purchase_access')
          if (res !== true) return res
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/settings.vue'),
        beforeEnter() {
          const res = checkPermission('setting_access')
          if (res !== true) return res
        },
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('@/pages/coupons.vue'),
        beforeEnter() {
          const res = checkPermission('coupon_access')
          if (res !== true) return res
        },
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('@/pages/blogs.vue'),
        beforeEnter() {
          const res = checkPermission('blog_access')
          if (res !== true) return res
        },
      },
      {
        path: 'cod',
        name: 'cod',
        component: () => import('@/pages/cod.vue'),
        beforeEnter() {
          const res = checkPermission('cod_access')
          if (res !== true) return res
        },
      },
      {
        path: 'pages',
        name: 'pages',
        component: () => import('@/pages/pages.vue'),
        beforeEnter() {
          const res = checkPermission('page_access')
          if (res !== true) return res
        },
      },
      {
        path: 'product-review',
        name: 'product-review',
        component: () => import('@/pages/product-review.vue'),
        beforeEnter() {
          const res = checkPermission('product_review_access')
          if (res !== true) return res
        },
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/pages/order.vue'),
        beforeEnter() {
          const res = checkPermission('order_access')
          if (res !== true) return res
        },
      },
    ],
  },

  // 👉 Admin Blank Layout Pages (Login, Forgot Password, Invoice Prints)
  {
    path: '/admin',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/pages/forgot-password.vue'),
      },
      {
        path: 'print/:id',
        name: 'print',
        component: () => import('@/pages/Prints/Invoice.vue'),
      },
    ],
  },

  // 👉 Error / 404 Route
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'error',
        name: 'error',
        component: () => import('@/pages/[...error].vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
