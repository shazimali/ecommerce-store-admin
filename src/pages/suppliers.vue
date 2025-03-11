<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Suppliers</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <SupplierOperation 
              v-if="canUserAccess('supplier_create')"
              btn-title="create"
              modal-title="Create Supplier"
              :supplier-id=0
              color="primary"
              size="default"
              @refresh-supplier-list="doFetchSuppliers"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstSuppliers"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchSuppliers"
              >
              <template v-slot:item.actions="{ item }">
                  <SupplierOperation 
                      v-if="canUserAccess('supplier_edit')"
                      btn-title="Edit"
                      modal-title="Edit Website"
                      color="primary"
                      :supplier-id="item.id"
                      size="x-small"
                      @refresh-supplier-list="doFetchSuppliers"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('supplier_delete')"
                      :id="item.id"
                      action="supplier"
                      @refresh-list="doFetchSuppliers"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import { useSuppliers } from '@/composable/useSuppliers';
const { lstSuppliers,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchSuppliers
      } = useSuppliers();
  </script>
  
