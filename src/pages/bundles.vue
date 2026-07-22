<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Bundles</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <BundleOperation 
              v-if="canUserAccess('bundle_create')"
              btn-title="create"
              modal-title="Create Bundle"
              :product-id=0
              color="primary"
              size="default"
              @refresh-product-list="doFetchBundles"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstBundles"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchBundles"
              >
            <template v-slot:item.image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.image"
                  ></v-img>
            </template>
            <template v-slot:item.coming_soon="{ item }">
                <v-chip :color="item.coming_soon ? 'success' : 'default'">
                    {{ item.coming_soon ? 'Yes' : 'No' }}
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
                                        <BundleOperation 
                                        v-if="canUserAccess('bundle_edit')"
                                        btn-title="Edit"
                                        modal-title="Edit Bundle"
                                        color="primary"
                                        :product-id="item.id"
                                        size="x-small"
                                        @refresh-product-list="doFetchBundles"
                                        />
                                    </template>
                                </VListItem>
                                <VListItem link>
                                    <template #prepend>
                                        <BundlePrice 
                                        v-if="canUserAccess('bundle_price_access')"
                                        btn-title="Edit"
                                        modal-title="Prices"
                                        color="primary"
                                        :product-id="item.id"
                                        size="x-small"
                                        />
                                    </template>
                                </VListItem>
                                <VListItem link>
                                    <template #prepend>
                                        <BundleColor 
                                        v-if="canUserAccess('bundle_color_access')"
                                        btn-title="Edit"
                                        modal-title="Colors"
                                        color="primary"
                                        :product-id="item.id"
                                        size="x-small"
                                        />
                                    </template>
                                </VListItem>
                                <VListItem link>
                                    <template #prepend>
                                        <DeleteDailog
                                        v-if="canUserAccess('bundle_delete')"
                                        :id="item.id"
                                        action="bundle"
                                        @refresh-list="doFetchBundles"
                                        />
                                    </template>
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
  import BundleColor from '@/components/BundleColor.vue';
  import BundlePrice from '@/components/BundlePrice.vue';
  import BundleOperation from '@/components/BundleOperation.vue';
  import { useBundles } from '@/composable/useBundles';
  const { lstBundles,
        loading,
        headers,
        total_items,
        current_page,
        item_per_page,
        search,
        doFetchBundles
        } = useBundles();
  </script>
