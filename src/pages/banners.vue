<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Banners</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <BannerOperation 
              v-if="canUserAccess('banner_create')"
              btn-title="create"
              modal-title="Create Banner"
              :banner-id=0
              color="primary"
              size="default"
              @refresh-banner-list="doFetchBanners"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstBanners"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchBanners"
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
                    <BannerOperation 
                      v-if="canUserAccess('banner_update')"
                      btn-title="Edit"
                      modal-title="Edit Banner"
                      color="primary"
                      :banner-id="item.id"
                      size="x-small"
                      @refresh-banner-list="doFetchBanners"
                    />
                      <DeleteDailog
                      v-if="canUserAccess('banner_delete')"
                      :id="item.id"
                      action="banner"
                      @refresh-list="doFetchBanners"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import BannerOperation from '@/components/BannerOperation.vue';
import { useBanners } from '@/composable/useBanners';
const { lstBanners,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchBanners
      } = useBanners();
  </script>
  
