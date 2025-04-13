<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>COD</h3>
            <v-spacer></v-spacer>

            <v-text-field
            v-model="search"
            prepend-icon="bx-search"
            density="compact"
            label="Search"
            variant="outlined"
            ></v-text-field>
        <v-spacer></v-spacer>

            <CodOperation
            v-if="canUserAccess('cod_create')"
            btn-title="create"
            modal-title="Create Cod"
            :cod-id=0
            color="primary"
            size="default"
            @refresh-cod-list="doFetchCod"
            />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items="lstCod"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchCod"
            >
          <template v-slot:item.countries="{ item }">
              <v-chip v-for="country in item.countries" :key="country" color="red" class="mx-1 my-1">
                  {{ country }}
              </v-chip>
          </template>
            <template v-slot:item.actions="{ item }">
                <CodOperation 
                    v-if="canUserAccess('cod_edit')"
                    btn-title="Edit"
                    modal-title="Edit Cod"
                    color="primary"
                    :cod-id="item.id"
                    size="x-small"
                    @refresh-blog-list="doFetchCod"
                    />
                    <DeleteDailog
                    v-if="canUserAccess('cod_delete')"
                    :id="item.id"
                    action="cod"
                    @refresh-list="doFetchCod"
                    />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import CodOperation from '@/components/CodOperation.vue';
import { useCod } from '@/composable/useCod';


const { lstCod,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchCod
    } = useCod();
</script>


