<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>Order</h3>
            <v-spacer></v-spacer>


      
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items=" lstOrder"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchOrder"
            >
            <template v-slot:item.status="{ item }">
                <v-chip  :key="item.id" color="primary" class="mx-1 my-1">
                    {{ item.status }}
                </v-chip>
            </template>
            <template v-slot:item.sub_total="{ item }">
               <v-text>{{ commaFormate(item.sub_total) }}</v-text>
            </template>
            <template v-slot:item.total="{ item }">
              <v-text>{{ commaFormate(item.total) }}</v-text>
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">

import { commaFormate } from '@/@core/utils/helpers';
import { useOrder } from '@/composable/useOrder';


const {lstOrder,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchOrder
    } = useOrder();
</script>



