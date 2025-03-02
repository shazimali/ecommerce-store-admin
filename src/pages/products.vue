<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Products</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <ProductOperation 
              v-if="canUserAccess('product_create')"
              btn-title="create"
              modal-title="Create Product"
              :product-id=0
              color="primary"
              size="default"
              @refresh-product-list="doFetchProducts"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstProducts"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchProducts"
              >
            <template v-slot:item.image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.image"
                  ></v-img>
            </template>
            <template v-slot:item.sub_categories="{ item }">
                <v-chip v-for="sub_category in item.sub_categories" :key="sub_category" color="red" class="mx-1 my-1">
                    {{ sub_category }}
                </v-chip>
            </template>
              <template v-slot:item.actions="{ item }">
                        <v-menu>
                        <template v-slot:activator="{ props }">
                        <v-btn icon="bx bx-dots-vertical" variant="text" v-bind="props"></v-btn>
                        </template>

                            <v-list>
                                <VListItem link>
                                    <template #prepend>
                                        <ProductOperation 
                                        v-if="canUserAccess('product_edit')"
                                        btn-title="Edit"
                                        modal-title="Edit Product"
                                        color="primary"
                                        :product-id="item.id"
                                        size="x-small"
                                        @refresh-product-list="doFetchProducts"
                                        />
                                    </template>
                                    <VListItemTitle> Edit</VListItemTitle>
                                </VListItem>
                                <VListItem link>
                                    <template #prepend>
                                        <DeleteDailog
                                        v-if="canUserAccess('product_delete')"
                                        :id="item.id"
                                        action="product"
                                        @refresh-list="doFetchProducts"
                                        />
                                    </template>
                                    <VListItemTitle> Delete</VListItemTitle>
                                </VListItem>
                                <VListItem link>
                                    <template #prepend>
                                        <ProductPrice 
                                        v-if="canUserAccess('product_price_access')"
                                        btn-title="Edit"
                                        modal-title="Prices"
                                        color="primary"
                                        :product-id="item.id"
                                        size="x-small"
                                        @refresh-product-price-list="doFetchProducts"
                                        />
                                    </template>
                                    <VListItemTitle> Prices</VListItemTitle>
                                </VListItem>
                            </v-list>
                        </v-menu>
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import ProductOperation from '@/components/ProductOperation.vue';
import { useProducts } from '@/composable/useProducts';
const { lstProducts,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchProducts
      } = useProducts();
  </script>
  
