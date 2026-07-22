<script lang="ts" setup>
import { canUserAccess } from '@/@core/utils/helpers';
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>
  <VerticalNavLink
    v-show="canUserAccess('dashboard_access')"
    :item="{
      title: 'Dashboard',
      icon: 'bx-home-smile',
      to: '/admin/dashboard',
    }"
  />
  <VerticalNavSectionTitle  
    :item="{
      heading: 'Utils',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('website_access')"
    :item="{
      title: 'Websites',
      icon: 'bx bx-store',
      to: '/admin/websites',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('category_access')"
    :item="{
      title: 'Categories',
      icon: 'bx-category-alt',
      to: '/admin/categories',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('subcategory_access')"
    :item="{
      title: 'Sub Categories',
      icon: 'bx bxs-category',
      to: '/admin/subcategories',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('badge_access')"
    :item="{
      title: 'Badges',
      icon: 'bx bx-award',
      to: '/admin/badges',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('product_access')"
    :item="{
      title: 'Products',
      icon: 'bx bxl-product-hunt',
      to: '/admin/products',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('bundle_access')"
    :item="{
      title: 'Bundles',
      icon: 'bx bx-package',
      to: '/admin/bundles',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('banner_access')"
    :item="{
      title: 'Banners',
      icon: 'bx bx-slideshow',
      to: '/admin/banners',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('facility_access')"
    :item="{
      title: 'Facilities',
      icon: 'bx-building',
      to: '/admin/facilities',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('collection_access')"
    :item="{
      title: 'Collections',
      icon: 'bx bx-collection',
      to: '/admin/collections',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('social_media_access')"
    :item="{
      title: 'Social Medias',
      icon: 'bx bxl-meta',
      to: '/admin/social-medias',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('supplier_access')"
    :item="{
      title: 'Suppliers',
      icon: 'bx bx-cylinder',
      to: '/admin/suppliers',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('purchase_access')"
    :item="{
      title: 'Purchases',
      icon: 'bx bx-purchase-tag',
      to: '/admin/purchases',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('setting_access')"
    :item="{
      title: 'Settings',
      icon: 'bx bx-cog',
      to: '/admin/settings',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('coupon_access')"
    :item="{
      title: 'Coupons',
      icon: 'bx bxs-coupon',
      to: '/admin/coupons',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('blog_access')"
    :item="{
      title: 'Blogs',
      icon: 'bx bx-message-square-edit',
      to: '/admin/blogs',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('page_access')"
    :item="{
      title: 'Pages',
      icon: 'bx bxs-notepad',
      to: '/admin/pages',
    }"
  />

  <VerticalNavLink
    v-show="canUserAccess('cod_access')"
    :item="{
      title: 'COD',
      icon: 'bx bxl-codepen',
      to: '/admin/cod',
    }"
  />

  <VerticalNavLink
    v-show="canUserAccess('product_review_access')"
    :item="{
      title: 'Product Review',
      icon: 'bx bx-history',
      to: '/admin/product-review',
    }"
  />

  <VerticalNavLink
    v-show="canUserAccess('order_access')"
    :item="{
      title: 'Orders',
      icon: 'bx bx-cart',
      to: '/admin/orders',
    }"
  />
  
  <VerticalNavSectionTitle  
    :item="{
      heading: 'User Management',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('user_access')"
    :item="{
      title: 'Users',
      icon: 'bx-user',
      to: '/admin/users',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('role_access')"
    :item="{
      title: 'Roles',
      icon: 'bx-check-shield',
      to: '/admin/roles',
    }"
  />
  <VerticalNavLink
    v-show="canUserAccess('permission_access')"
    :item="{
      title: 'Permissions',
      icon: 'bx-dice-5',
      to: '/admin/permissions',
    }"
  />
</template>
