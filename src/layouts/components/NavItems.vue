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
