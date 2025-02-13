<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>Roles</h3>
            <v-spacer></v-spacer>

            <v-text-field
            v-model="search"
            prepend-icon="bx-search"
            density="compact"
            label="Search"
            variant="outlined"
            ></v-text-field>
        <v-spacer></v-spacer>

            <RoleOperations 
            v-if="canUserAccess('role_create')"
            btn-title="create"
            modal-title="create Role"
            :role-id=0
            color="primary"
            size="default"
            @refresh-role-list="doFetchRoles"
            />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items="lstRoles"
            v-model:items-length="total_items"
            v-model:page="current_page"
            :items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchRoles"
            >
            <template v-slot:item.permissions="{ item }">
                <v-chip v-for="permission in item.permissions" :key="permission" color="red" class="mx-1 my-1">
                    {{ permission }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <RoleOperations 
                v-if="canUserAccess('role_edit')"
                    btn-title="Edit"
                    modal-title="Edit Role"
                    color="primary"
                    :role-id="item.id"
                    size="x-small"
                    @refresh-role-list="doFetchRoles"
                    />
                    <DeleteDailog
                      v-if="canUserAccess('role_delete')"
                      :id="item.id"
                      action="role"
                      @refresh-list="doFetchRoles"
                      />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import RoleOperations from '@/components/RoleOperations.vue';
import { useRoles } from '@/composable/useRoles';
const { lstRoles,
    loading,
    headers,
    handleEdit,
    handleDelete,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchRoles
    } = useRoles();
</script>
