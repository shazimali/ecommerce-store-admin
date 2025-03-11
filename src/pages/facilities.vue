<template>
    <v-row>
      <v-col cols="12">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
              <h3>Facilities</h3>
              <v-spacer></v-spacer>
  
              <v-text-field
              v-model="search"
              prepend-icon="bx-search"
              density="compact"
              label="Search"
              variant="outlined"
              ></v-text-field>
          <v-spacer></v-spacer>
  
              <FacilityOperation 
              v-if="canUserAccess('facility_create')"
              btn-title="create"
              modal-title="Create Facility"
              :facility-id=0
              color="primary"
              size="default"
              @refresh-facility-list="doFetchFacilities"
              />
          </v-subheader>
          <v-card>
              <v-data-table-server
              :headers="headers"
              :search="search"
              :items="lstFacilities"
              :items-length="total_items"
              v-model:page="current_page"
              v-model:items-per-page="item_per_page"
              :loading="loading"
              @update:options ="doFetchFacilities"
              >
            <template v-slot:item.image="{ item }">
                <v-img
                    :width="50"
                    :height="50"
                    :src="item.image"
                  ></v-img>
            </template>
            <template v-slot:item.countries="{ item }">
                <v-chip v-for="country in item.countries" :key="country" color="red" class="mx-1 my-1">
                    {{ country }}
                </v-chip>
            </template>
              <template v-slot:item.actions="{ item }">
                  <FacilityOperation 
                      v-if="canUserAccess('facility_edit')"
                      btn-title="Edit"
                      modal-title="Edit Facility"
                      color="primary"
                      :facility-id="item.id"
                      size="x-small"
                      @refresh-facility-list="doFetchFacilities"
                      />
                      <DeleteDailog
                      v-if="canUserAccess('facility_delete')"
                      :id="item.id"
                      action="facility"
                      @refresh-list="doFetchFacilities"
                      />
              </template>
              </v-data-table-server>
          </v-card>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import FacilityOperation from '@/components/FacilityOperation.vue';
import { useFacilities } from '@/composable/useFacilities';
const { lstFacilities,
      loading,
      headers,
      total_items,
      current_page,
      item_per_page,
      search,
      doFetchFacilities
      } = useFacilities();
  </script>
  
