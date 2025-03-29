<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Social Medias</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <SocialMediaOperation 
              v-if="canUserAccess('social_media_create')"
              btn-title="create"
              modal-title="Create Social Media"
              :social-media-id=0
              color="primary"
              size="default"
              @refresh-social-media-list="doFetchSocialMedias"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstSocialMedias"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchSocialMedias"
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
                  <SocialMediaOperation 
                      v-if="canUserAccess('social_media_edit')"
                      btn-title="Edit"
                      modal-title="Edit Social Media"
                      color="primary"
                      :social-media-id="item.id"
                      size="x-small"
                      @refresh-social-media-list="doFetchSocialMedias"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('social_media_delete')"
                      :id="item.id"
                      action="social_media"
                      @refresh-list="doFetchSocialMedias"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import SocialMediaOperation from '@/components/SocialMediaOperation.vue';
import { useSocialMedias } from '@/composable/useSocialMedias';
const { lstSocialMedias,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchSocialMedias
      } = useSocialMedias();
  </script>
  
