<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Collections</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <CollectionOperation 
              v-if="canUserAccess('collection_create')"
              btn-title="create"
              modal-title="Create Collection"
              :collection-id=0
              color="primary"
              size="default"
              @refresh-collection-list="doFetchCollections"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstCollections"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchCollections"
              >
            <template v-slot:item.image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.image"
                  ></v-img>
            </template>
            <template v-slot:item.mob_image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.mob_image"
                  ></v-img>
            </template>
            <template v-slot:item.websites="{ item }">
                <v-chip v-for="website in item.websites" :key="website" color="default" class="mx-1 my-1">
                    {{ website }}
                </v-chip>
            </template>
            <template v-slot:item.products="{ item }">
                <v-chip v-for="product in item.products" :key="product" color="primary" class="mx-1 my-1">
                    {{ product }}
                </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip v-if="item.status == 'ACTIVE'" color="success" class="mx-1 my-1">
                    {{ item.status }}
                </v-chip>
                <v-chip v-if="item.status == 'INACTIVE'" color="error" class="mx-1 my-1">
                    {{ item.status }}
                </v-chip>
            </template>
            <template v-slot:item.position="{ item }">
                <v-chip v-if="item.position == 'TOP'" color="success" class="mx-1 my-1">
                    {{ item.position }}
                </v-chip>
                <v-chip v-if="item.position == 'BOTTOM'" color="warning" class="mx-1 my-1">
                    {{ item.position }}
                </v-chip>
                 <v-chip v-if="item.position == 'START'" color="primary" class="mx-1 my-1">
                    {{ item.position }}
                </v-chip>
            </template>
              <template v-slot:item.actions="{ item }">
                  <CollectionOperation 
                      v-if="canUserAccess('collection_edit')"
                      btn-title="Edit"
                      modal-title="Edit Collection"
                      color="primary"
                      :collection-id="item.id"
                      size="x-small"
                      @refresh-collection-list="doFetchCollections"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('collection_delete')"
                      :id="item.id"
                      action="collection"
                      @refresh-list="doFetchCollections"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import { useCollections } from '@/composable/useCollections';
const { 
    lstCollections,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchCollections
      } = useCollections();
  </script>
  
