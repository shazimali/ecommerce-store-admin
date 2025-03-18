<template>
    <v-dialog max-width="1200">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
           @click="getAllSuppliers(purchaseId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        @click="getAllSuppliers(purchaseId)"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(purchaseId, isActive)">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.invoice_date"
                  :error-messages="errorMessages.invoice_date"
                  label="Invoice Date"  
                  type="date"
                  placeholder="Invoice Date"
                />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="form.supplier_id"
                    :items="lstSuppliers"
                    :item-title="item => item? `${item.name}`: ''"
                    item-value="id"
                    :error-messages="errorMessages.supplier_id"
                    variant="outlined"
                  />
                </v-col>
                <VCol cols="12">
            
            <label for="products">Products</label>
            <v-autocomplete
                v-model="form.product_id"
                v-model:search="searchInput"
                :items="lstProducts"
                :item-title="item => item? `${item.product_code}-${item.product_title}-${item.color_name}`: ''"
                item-value="list_id"
                variant="outlined"
                @keyup.enter="handleSelectedProducts"
                >
            </v-autocomplete>
        </VCol>
        <VCol cols="12">
          <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Title
        </th>
        <th class="text-uppercase">
          Code
        </th>

        <th class="text-uppercase">
          Qty
        </th>
        <th class="text-uppercase">
          Price
        </th> 
        <th class="text-uppercase">
          Color
        </th> 
        <th class="text-uppercase">
          Total
        </th> 
        <th class="text-uppercase">
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in form.purchase_detail"
        :key="item.id">
        
        <td>
          {{ item.title }}
        </td>
        <td>
          {{ item.code }}
        </td>
        <td>
          <VTextField
            type="number"
            v-model="item.qty"
            persistent-placeholder
            max-width="100"
            oninput="if(this.value < 0 || this.value == '') this.value = 1;" 
            @keyup="handleChangeProductQty(item.qty ,item.list_id )" 
            />
        </td>
        <td>
          <VTextField
            type="number" 
            v-model="item.net_price"
            persistent-placeholder
            max-width="100"
            oninput="if(this.value < 0 || this.value == '') this.value = 1;" 
            @keyup="handleChangeProductPrice(item.net_price, item.list_id)"
             />
        </td>
        <td>
           {{ item.color_name }}
        </td>
        <td>
          {{ commaFormate(item.qty * item.net_price) }}
        </td>
        <td>
          <v-icon color="error" @click="handleDelete(item.list_id)" class="bx-trash"></v-icon>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <b>Total Qty: {{ commaFormate(form.total_qty)  }}</b>
          <br/>
          <b>Total Amount: {{ commaFormate(form.total_price) }}</b>
        </td>
      </tr>
    </tbody>
  </VTable>
        </VCol>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  :text="purchaseId == 0 ? 'save':'update'"
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
            </v-form>
          </template>
        </v-card>
      </template>
    </v-dialog>
</template>
<script setup lang="ts">

import { commaFormate } from '@/@core/utils/helpers';
import { usePurchaseOperation } from '@/composable/usePurchaseOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          purchaseId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshPurchaseList']);
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getPurchaseByID,
    handleSubmit,
    getAllSuppliers,
    lstSuppliers,
    searchInput,
    handleChangeProductQty,
    handleChangeProductPrice,
    handleDelete,
    handleSelectedProducts,
    lstProducts,
    formLoading,
    } = usePurchaseOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshPurchaseList');
});
</script>
