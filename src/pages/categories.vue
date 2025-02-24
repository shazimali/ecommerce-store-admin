<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Categories</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <CategoryOperation 
              v-if="canUserAccess('category_create')"
              btn-title="create"
              modal-title="Create Category"
              :category-id=0
              color="primary"
              size="default"
              @refresh-category-list="doFetchCategories"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstCategories"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchCategories"
              >
            <template v-slot:item.image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.image"
                  ></v-img>
            </template>
            <template v-slot:item.websites="{ item }">
                <v-chip v-for="website in item.websites" :key="website" color="red" class="mx-1 my-1">
                    {{ website }}
                </v-chip>
            </template>
              <template v-slot:item.actions="{ item }">
                  <CategoryOperation 
                      v-if="canUserAccess('category_edit')"
                      btn-title="Edit"
                      modal-title="Edit Category"
                      color="primary"
                      :category-id="item.id"
                      size="x-small"
                      @refresh-category-list="doFetchCategories"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('category_delete')"
                      :id="item.id"
                      action="category"
                      @refresh-list="doFetchCategories"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import CategoryOperation from '@/components/CategoryOperation.vue';
import { useCategories } from '@/composable/useCategories';
const { lstCategories,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchCategories
      } = useCategories();
  </script>
  
