<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Users</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
          <UserOperations 
            btn-title="create"
            modal-title="create User"
            :role-id=0
            color="primary"
            size="default"
            @refresh-user-list="fetchUsersList"
            />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstUsers"
              v-model:items-length="total_items"
              v-model:page="current_page"
              :items-per-page="item_per_page"
              :loading="loading"
              @update:options ="fetchUsersList"
              >
              <template v-slot:item.roles="{ item }">
                  <v-chip v-for="role in item.roles" :key="role" color="red" class="mx-1 my-1">
                      {{ role }}
                  </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                  <UserOperations 
                      btn-title="Edit"
                      modal-title="Edit User"
                      color="primary"
                      :role-id="item.id"
                      size="x-small"
                        @refresh-user-list="fetchUsersList"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('user_delete')"
                      :id="item.id"
                      action="user"
                      @refresh-list="fetchUsersList"
                    />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
  import { canUserAccess } from '@/@core/utils/helpers';
import { useUsers } from '@/composable/useUsers';
  const { lstUsers,
      loading,
      headers,
      handleEdit,
      handleDelete,
      total_items,
      current_page,
      item_per_page,
      search,
      fetchUsersList
      } = useUsers();
  </script>
  