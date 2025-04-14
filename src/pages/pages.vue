<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>Pages</h3>
            <v-spacer></v-spacer>

            <v-text-field
            v-model="search"
            prepend-icon="bx-search"
            density="compact"
            label="Search"
            variant="outlined"
            ></v-text-field>
        <v-spacer></v-spacer>

            <PagesOperation
            v-if="canUserAccess('page_create')"
            btn-title="create"
            modal-title="Create Page"
            :page-id=0
            color="primary"
            size="default"
            @refresh-page-list="doFetchPages"
            />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items="lstPages"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchPages"
            >
          <template v-slot:item.countries="{ item }">
              <v-chip v-for="country in item.countries" :key="country" color="red" class="mx-1 my-1">
                  {{ country }}
              </v-chip>
          </template>
            <template v-slot:item.actions="{ item }">
                <PagesOperation 
                    v-if="canUserAccess('page_edit')"
                    btn-title="Edit"
                    modal-title="Edit Page"
                    color="primary"
                    :page-id="item.id"
                    size="x-small"
                    @refresh-page-list="doFetchPages"
                    />
                    <DeleteDailog
                    v-if="canUserAccess('page_delete')"
                    :id="item.id"
                    action="page"
                    @refresh-list="doFetchPages"
                    />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import PagesOperation from '@/components/PagesOperation.vue';
import { usePages } from '@/composable/usePages';
const { lstPages,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchPages
    } = usePages();
</script>

