<template>
  <v-row>
    <v-col cols="12">
      <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
        <h3>Badges</h3>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-icon="bx-search"
          density="compact"
          label="Search"
          variant="outlined"
        ></v-text-field>
        <v-spacer></v-spacer>

        <BadgeOperation 
          v-if="canUserAccess('badge_create')"
          btn-title="create"
          modal-title="Create Badge"
          :badge-id="0"
          color="primary"
          size="default"
          @refresh-badge-list="doFetchBadges"
        />
      </v-subheader>
      <v-card>
        <v-data-table-server
          :headers="headers"
          :search="search"
          :items="lstBadges"
          :items-length="total_items"
          v-model:page="current_page"
          v-model:items-per-page="item_per_page"
          :loading="loading"
          @update:options="doFetchBadges"
        >
          <template v-slot:item.image="{ item }">
            <v-img
              :width="50"
              :height="50"
              :src="(item.image as any)"
            ></v-img>
          </template>
          <template v-slot:item.sub_categories="{ item }">
            <v-chip v-for="sub_category in item.sub_categories" :key="sub_category" color="red" class="mx-1 my-1">
              {{ sub_category }}
            </v-chip>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip v-if="item.status == 'ACTIVE'" color="success" class="mx-1 my-1">
              {{ item.status }}
            </v-chip>
            <v-chip v-if="item.status == 'INACTIVE'" color="error" class="mx-1 my-1">
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <BadgeOperation 
              v-if="canUserAccess('badge_edit')"
              btn-title="Edit"
              modal-title="Edit Badge"
              color="primary"
              :badge-id="item.id"
              size="x-small"
              @refresh-badge-list="doFetchBadges"
            />
            <DeleteDailog
              v-if="canUserAccess('badge_delete')"
              :id="item.id"
              action="badge"
              @refresh-list="doFetchBadges"
            />
          </template>
        </v-data-table-server>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import BadgeOperation from '@/components/BadgeOperation.vue';
import { useBadges } from '@/composable/useBadges';

const { 
  lstBadges,
  loading,
  headers,
  total_items,
  current_page,
  item_per_page,
  search,
  doFetchBadges
} = useBadges();
</script>
