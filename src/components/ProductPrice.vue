<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <VIcon
        icon="bx bx-dollar-circle"
        :color="color"
        @click="getAllPrices(productId)"
        v-bind="activatorProps"
        />
        &nbsp;
        &nbsp;
        <v-label
        @click="getAllPrices(productId)"
        v-bind="activatorProps"
        > Prices</v-label>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(productId, isActive)">
              <v-row>
                <v-col cols="6">
                    <v-autocomplete
                    v-model="form.country_id"
                    :items="lstCountries"
                    label="countries"
                    :item-title="item => item? `${item.name}`: ''"
                    item-value="id"
                    variant="outlined"
                    :error-messages="errorMessages.country_id"
                    >
                </v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.price"
                  :error-messages="errorMessages.price"
                  label="Price"
                  type="number"
                  placeholder="Price"
                />
                </v-col>
                <v-col cols="4">
                    <v-select
                    v-model="form.discount"
                    :items="Array.from({ length: 100 }, (_, i) => i + 1)"
                    label="Discount"
                    />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.discount_from"
                  :error-messages="errorMessages.discount_from"
                  label="Discount From"
                  type="date"
                  placeholder="Discount From"
                />
                </v-col>
                <v-col cols="4">
                    <v-text-field
                  v-model="form.discount_to"
                  :error-messages="errorMessages.discount_to"
                  label="Discount To"
                  type="date"
                  placeholder="Discount To"
                />
                </v-col>
              </v-row>              
              <v-row>
                <v-col cols="12">
                  <v-btn
                  text="save"
                  variant="elevated"
                  type="submit"
                  class="mr-2"
                  :loading="formLoading"
                >
                <template v-slot:loader><v-progress-circular indeterminate></v-progress-circular> Save</template>
                </v-btn>
                <v-btn
                  text="Cancel"
                  variant="tonal"
                  @click="isActive.value = false"
                ></v-btn>
                </v-col>
              </v-row>
              <v-row>
                <div v-if="priceLoading" class=" d-flex justify-center">
                <v-progress-circular indeterminate></v-progress-circular>
                </div>
                <v-col v-else cols="12">
                    <v-table>
                        <thead>
                            <tr class="text-sm">
                                <th>Product</th>
                                <th>Country</th>
                                <th>Price</th>
                                <th>Discount%</th>
                                <th>Discount From</th>
                                <th>Discount To</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in lstPrices" :key="index">
                                <td>{{ item.product}}</td>
                                <td>{{ item.country }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.discount > 0 ? item.discount: '-' }}</td>
                                <td>{{ item.discount_from ? item.discount_from : '-' }}</td>
                                <td>{{ item.discount_to ? item.discount_to : '-' }}</td>
                                <td>
                                    <DeleteDailog
                                        :id="item.id"
                                        action="product_price"
                                        @refresh-list="getAllPrices(item.product_id)"
                                        />
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
              </v-row>
            </v-form>
          </template>
        </v-card>
      </template>
    </v-dialog>
</template>
<script setup lang="ts">

import { useProductPrice } from '@/composable/useProductPrice';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          productId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshProductPriceList']);

       
const { 
    loading,
    form,
    priceLoading,
    errorMessages,
    handleSubmit,
    getAllPrices,
    lstCountries,
    lstPrices,
    formLoading,
    } = useProductPrice();
</script>
