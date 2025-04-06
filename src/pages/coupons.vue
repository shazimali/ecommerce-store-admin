<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>Coupons</h3>
            <v-spacer></v-spacer>

            <v-text-field
            v-model="search"
            prepend-icon="bx-search"
            density="compact"
            label="Search"
            variant="outlined"
            ></v-text-field>
        <v-spacer></v-spacer>

        <CouponOperation
              v-if="canUserAccess('coupon_create')"
              btn-title="create"
              modal-title="Create Coupons"
              :coupon-id=0
              color="primary"
              size="default"
              @refresh-coupon-list=" doFetchCoupons"
              />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items=" lstCoupons"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options =" doFetchCoupons"
            >
         
          
            <template v-slot:item.actions="{ item }">
                <CouponOperation
                    v-if="canUserAccess('coupon_edit')"
                    btn-title="Edit"
                    modal-title="Edit Coupon"
                    color="primary"
                    :coupon-id="item.id"
                    size="x-small"
                    @refresh-coupon-list=" doFetchCoupons"
                    />
                    <DeleteDailog
                    v-if="canUserAccess('coupon_delete')"
                    :id="item.id"
                    action="coupon"
                    @refresh-list="doFetchCoupons"
                    />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import CouponOperation from '@/components/CouponOperation.vue';
import { useCoupons } from '@/composable/useCoupons';


const {lstCoupons ,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchCoupons
    } = useCoupons();
</script>



