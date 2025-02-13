<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Permissions</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <PermissionOperations 
              v-if="canUserAccess('permission_create')"
              btn-title="create"
              modal-title="Create Permission"
              :permission-id=0
              color="primary"
              size="default"
              @refresh-permission-list="doFetchPermissions"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstPermissions"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchPermissions"
              >
              <template v-slot:item.permissions="{ item }">
                  <v-chip v-for="permission in item.permissions" :key="permission" color="red" class="mx-1 my-1">
                      {{ permission }}
                  </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                  <PermissionOperations 
                        v-if="canUserAccess('permission_edit')"
                      btn-title="Edit"
                      modal-title="Edit Permission"
                      color="primary"
                      :permission-id="item.id"
                      size="x-small"
                      @refresh-permission-list="doFetchPermissions"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('permission_delete')"
                      :id="item.id"
                      action="permission"
                      @refresh-list="doFetchPermissions"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import PermissionOperations from '@/components/PermissionOperations.vue';
import { usePermissions } from '@/composable/usePermissions';
const { lstPermissions,
      loading,
      headers,
      handleDelete,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchPermissions
      } = usePermissions();
  </script>
  
