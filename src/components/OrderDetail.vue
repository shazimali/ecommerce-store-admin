<template>
    <v-dialog max-width="900" scrollable>
      <template v-slot:activator="{ props: activatorProps }">
        <a
        href="javascript:void(0)"
        v-bind="activatorProps"
        @click="doFetchOrderDetail()"
        >
          ED#{{ orderId }}
        </a>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title class="d-flex align-center">
            <span>Order ED#{{ orderId }}</span>
            <v-chip v-if="order" :color="statusColor(order.status)" size="small" class="ms-3">
              {{ order.status == 'IN_TRANSIT' ? 'Shipped' : order.status }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn icon="bx-x" variant="text" size="small" @click="isActive.value = false"></v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <div v-if="loading" class="d-flex justify-center py-6">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>

            <template v-else-if="order">
              <v-row>
                <v-col cols="12" md="6">
                  <h6 class="text-h6 mb-2">Customer</h6>
                  <div>{{ order.customer_name }}</div>
                  <div>{{ order.customer_email }}</div>
                  <div>{{ order.phone }}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <h6 class="text-h6 mb-2">Shipping</h6>
                  <div>{{ order.address }}</div>
                  <div>{{ order.city }}, {{ order.country }}</div>
                  <div v-if="order.special_instructions">Note: {{ order.special_instructions }}</div>
                  <div v-if="order.track_number">
                    {{ order.cod_company }} – {{ order.track_number }}
                  </div>
                  <a v-if="order.slip_link" :href="order.slip_link" target="_blank">View slip</a>
                </v-col>
              </v-row>

              <v-table class="mt-4" density="comfortable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Color</th>
                    <th class="text-end">Price</th>
                    <th class="text-center">Qty</th>
                    <th class="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.id">
                    <td>
                      <div class="d-flex align-center py-2">
                        <v-avatar rounded size="48" class="me-3" color="grey-lighten-3">
                          <v-img v-if="item.image" :src="item.image" cover></v-img>
                          <VIcon v-else icon="bx-package" />
                        </v-avatar>
                        <div>
                          <div class="font-weight-medium">{{ item.title }}</div>
                          <div class="text-caption">
                            <span v-if="item.sku">SKU: {{ item.sku }}</span>
                            <v-chip v-if="item.is_bundle" size="x-small" color="info" class="ms-1">Bundle</v-chip>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ item.color || '—' }}</td>
                    <td class="text-end">{{ item.currency }} {{ commaFormate(item.unit_amount) }}</td>
                    <td class="text-center">{{ item.quantity }}</td>
                    <td class="text-end">{{ item.currency }} {{ commaFormate(item.total_amount) }}</td>
                  </tr>
                </tbody>
              </v-table>

              <v-row class="mt-2" justify="end">
                <v-col cols="12" sm="6" md="5">
                  <div class="d-flex justify-space-between">
                    <span>Sub Total</span>
                    <span>{{ commaFormate(order.sub_total) }}</span>
                  </div>
                  <div v-if="order.discount" class="d-flex justify-space-between">
                    <span>Discount ({{ order.code }} – {{ order.discount }}%)</span>
                    <span>-{{ commaFormate(order.discount_amount) }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>Shipping</span>
                    <span>{{ order.free_shipping == 1 ? 'Free' : commaFormate(order.shipping_charges) }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between font-weight-bold">
                    <span>Total</span>
                    <span>{{ commaFormate(order.total) }}</span>
                  </div>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
</template>
<script setup lang="ts">
import { commaFormate } from '@/@core/utils/helpers';
import { IOrderDetail } from '@/Interfaces/IOrder';
import httpClient from '@/plugins/httpClient';
import { fetchOrderDetail } from '@/services/OrderService';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps<{
  orderId: number | string
}>()

const order = ref<IOrderDetail | null>(null)
const loading = ref<boolean>(false)

const statusColor = (status: string) => ({
  PLACED: 'warning',
  IN_TRANSIT: 'default',
  DELIVERED: 'success',
  CANCELLED: 'error',
}[status] ?? 'default')

const doFetchOrderDetail = () => {
  loading.value = true
  fetchOrderDetail(httpClient, props.orderId).then((res) => {
    order.value = res.data.data
    loading.value = false
  }).catch((err) => {
    toast.error(err.response?.data?.message ?? err.message)
    loading.value = false
  })
}
</script>
