<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>Settings</h3>
            <v-spacer></v-spacer>

            <v-text-field
            v-model="search"
            prepend-icon="bx-search"
            density="compact"
            label="Search"
            variant="outlined"
            ></v-text-field>
        <v-spacer></v-spacer>

        <SettingOperation 
              v-if="canUserAccess('setting_create')"
              btn-title="create"
              modal-title="Create Setting"
              :setting-id=0
              color="primary"
              size="default"
              @refresh-setting-list="doFetchSettings"
              />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items="lstSettings"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchSettings"
            >
          <!-- <template v-slot:item.countries="{ item }">
                <v-chip v-for="country in item.countries" :key="country" color="red" class="mx-1 my-1">
                    {{ country }}
                </v-chip>
            </template> -->
          
            <template v-slot:item.actions="{ item }">
                <SettingOperation
                    v-if="canUserAccess('setting_edit')"
                    btn-title="Edit"
                    modal-title="Edit Setting"
                    color="primary"
                    :setting-id="item.id"
                    size="x-small"
                    @refresh-setting-list="doFetchSettings"
                    />
                    <DeleteDailog
                    v-if="canUserAccess('setting_delete')"
                    :id="item.id"
                    action="setting"
                    @refresh-list="doFetchSettings"
                    />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import SettingOperation from '@/components/SettingOperation.vue';
import { useSettings } from '@/composable/useSettings';

const { lstSettings,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchSettings
    } = useSettings();
</script>


