<script lang="ts" setup>
import { canUserAccess } from '@/@core/utils/helpers';
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'; /* PartiallyEnd: #3632/scriptSetup.vue */
</script>

<template>
  <VerticalNavLink
    v-show="canUserAccess('dashboard_access')"
    :item="{
      title: 'Dashboard',
      icon: 'bx-home-smile',
      to: '/dashboard',
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
      to: '/websites',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('category_access')"
    :item="{
      title: 'Categories',
      icon: 'bx-category-alt',
      to: '/categories',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('subcategory_access')"
    :item="{
      title: 'Sub Categories',
      icon: 'bx bxs-category',
      to: '/subcategories',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('product_access')"
    :item="{
      title: 'Products',
      icon: 'bx bxl-product-hunt',
      to: '/products',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('banner_access')"
    :item="{
      title: 'Banners',
      icon: 'bx bx-slideshow',
      to: '/banners',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('facility_access')"
    :item="{
      title: 'Facilities',
      icon: 'bx-building',
      to: '/facilities',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('social_media_access')"
    :item="{
      title: 'Social Medias',
      icon: 'bx bxl-meta',
      to: '/social-medias',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('supplier_access')"
    :item="{
      title: 'Suppliers',
      icon: 'bx bx-cylinder',
      to: '/suppliers',
    }"
  />
  <VerticalNavLink
  v-show="canUserAccess('purchase_access')"
    :item="{
      title: 'Purchases',
      icon: 'bx bx-purchase-tag',
      to: '/purchases',
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
      to: '/users',
    }"
  />
  <VerticalNavLink
   v-show="canUserAccess('role_access')"
    :item="{
      title: 'Roles',
      icon: 'bx-check-shield',
      to: '/roles'
    }"
  />
  <VerticalNavLink
   v-show="canUserAccess('permission_access')"
    :item="{
      title: 'Permissions',
      icon: 'bx-dice-5',
      to: '/permissions'
    }"
  />
</template>
