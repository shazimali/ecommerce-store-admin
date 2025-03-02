<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Sub Categories</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <SubCategoryOperation 
              v-if="canUserAccess('subcategory_create')"
              btn-title="create"
              modal-title="Create Sub Category"
              :sub-category-id=0
              color="primary"
              size="default"
              @refresh-sub-category-list="doFetchSubCategories"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstSubCategories"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchSubCategories"
              >
            <template v-slot:item.image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.image"
                  ></v-img>
            </template>
            <template v-slot:item.categories="{ item }">
                <v-chip v-for="category in item.categories" :key="category" color="red" class="mx-1 my-1">
                    {{ category }}
                </v-chip>
            </template>
              <template v-slot:item.actions="{ item }">
                  <SubCategoryOperation 
                      v-if="canUserAccess('subcategory_edit')"
                      btn-title="Edit"
                      modal-title="Edit Sub Category"
                      color="primary"
                      :sub-category-id="item.id"
                      size="x-small"
                      @refresh-sub-category-list="doFetchSubCategories"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('subcategory_delete')"
                      :id="item.id"
                      action="subcategory"
                      @refresh-list="doFetchSubCategories"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import SubCategoryOperation from '@/components/SubCategoryOperation.vue';
import { useSubCategories } from '@/composable/useSubCategories';
const { lstSubCategories,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchSubCategories
      } = useSubCategories();
  </script>
  
