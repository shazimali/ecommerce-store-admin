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
            <template v-slot:item.order_id="{item}">
            <a :href="item.slip_link" target="_blank">
              ED#{{ item.order_id }}
            </a>
            </template>
            <!-- <template v-slot:item.free_shipping="{ item }">
                <v-chip v-if="item.free_shipping == 1"  :key="item.id" color="success" class="mx-1 my-1">
                    YES
                </v-chip>
                <v-chip v-if="item.free_shipping == 0"  :key="item.id" color="primary" class="mx-1 my-1">
                    NO
                </v-chip>
            </template> -->
            <!-- <template v-slot:item.shipping_charges="{ item }">
                <v-chip v-if="item.free_shipping == 1"  :key="item.id" color="success" class="mx-1 my-1">
                  N/A
                </v-chip>
                <v-chip v-if="item.free_shipping == 0"  :key="item.id" color="primary" class="mx-1 my-1">
                  {{ item.shipping_charges }}
                </v-chip>
            </template> -->
            <template v-slot:item.status="{ item }">
                <v-chip v-if="item.status == 'PLACED'"  :key="item.id" color="warning" class="mx-1 my-1">
                    {{ item.status }}
                </v-chip>
                <v-chip v-if="item.status == 'IN_TRANSIT'"  :key="item.id" color="default" class="mx-1 my-1">
                    Shipped
                </v-chip>
                <v-chip v-if="item.status == 'DELIVERED'"  :key="item.id" color="success" class="mx-1 my-1">
                    {{ item.status }}
                </v-chip>
                 <v-chip v-if="item.status == 'CANCELLED'"  :key="item.id" color="error" class="mx-1 my-1">
                    {{ item.status }}
                </v-chip>
            </template>
        
            <template v-slot:item.total="{ item }">
              <v-text>{{ commaFormate(item.total) }}</v-text>
            </template>
            <template v-slot:item.actions="{ item }">
                      <BookOrder
                      v-if="item.status == 'PLACED'" 
                      icon="bx bxs-truck"
                      color="warning"
                      :status="item.status"
                      :order-id="item.order_id"
                      size="x-small"
                      @refresh-order-list="doFetchOrder"
                      />
                      <BookOrder
                      v-if="item.status == 'IN_TRANSIT'" 
                      color="secondary"
                      icon="bx bx-package"
                      :status="item.status"
                      :order-id="item.order_id"
                      size="x-small"
                      @refresh-order-list="doFetchOrder"
                      />
                       <VIcon
                       v-if="item.status == 'DELIVERED'" 
                      icon="bx bx-user-check"
                      color="success"
                      />
                       <VIcon
                       v-if="item.status == 'CANCELLED'" 
                      icon="bx bx-user-x"
                      color="error"
                      />
                    <DeleteDailog
                      v-if="item.status == 'PLACED'" 
                      :id="item.order_id"
                      action="order"
                      @refresh-list="doFetchOrder"
                      />
                   

              </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">

import { commaFormate } from '@/@core/utils/helpers';
import BookOrder from '@/components/BookOrder.vue';
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



