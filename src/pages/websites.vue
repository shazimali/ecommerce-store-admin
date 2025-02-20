<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Websites</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <WebsiteOperations 
              v-if="canUserAccess('website_create')"
              btn-title="create"
              modal-title="Create Website"
              :website-id=0
              color="primary"
              size="default"
              @refresh-website-list="doFetchWebsites"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstWebsites"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchWebsites"
              >
              <template v-slot:item.actions="{ item }">
                  <WebsiteOperations 
                      v-if="canUserAccess('website_edit')"
                      btn-title="Edit"
                      modal-title="Edit Website"
                      color="primary"
                      :website-id="item.id"
                      size="x-small"
                      @refresh-website-list="doFetchWebsites"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('website_delete')"
                      :id="item.id"
                      action="website"
                      @refresh-list="doFetchWebsites"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import { useWebsite } from '@/composable/useWebsites';
const { lstWebsites,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchWebsites
      } = useWebsite();
  </script>
  
