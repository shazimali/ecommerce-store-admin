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
            @update:options =" doFetchOrder"
            >
         
          
           
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">

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



