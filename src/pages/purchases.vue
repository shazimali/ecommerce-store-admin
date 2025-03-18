<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Purchases</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <PurchaseOperation 
              v-if="canUserAccess('purchase_create')"
              btn-title="create"
              modal-title="Create Purchase"
              :purchase-id=0
              color="primary"
              size="default"
              @refresh-purchase-list="doFetchPurchases"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstPurchases"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchPurchases"
              >
              <template v-slot:item.actions="{ item }">
                  <PurchaseOperation 
                      v-if="canUserAccess('purchase_edit')"
                      btn-title="Edit"
                      modal-title="Edit Website"
                      color="primary"
                      :purchase-id="item.id"
                      size="x-small"
                      @refresh-purchase-list="doFetchPurchases"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('purchase_delete')"
                      :id="item.id"
                      action="purchase"
                      @refresh-list="doFetchPurchases"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import PurchaseOperation from '@/components/PurchaseOperation.vue';
import { usePurchases } from '@/composable/usePurchases';
const { lstPurchases,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchPurchases
      } = usePurchases();
  </script>
  
