<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <VIcon
        :icon="icon"
        :color="color"
        @click="fetchAllCODCompanies()"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Cash On Delivery">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(orderId,status,isActive)">
              <v-row v-if="status == 'PLACED'">
                 <v-col cols="6">
                  <v-select
                  v-model="form.cod_company"
                  :error-messages="errorMessages.cod_company"
                  :items="lstCODCompanies"
                  :item-title="item => item? `${item.title}`: ''"
                  item-value="title"
                  label="COD Company"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.track_number"
                  :error-messages="errorMessages.track_number"
                  label="Track Number"
                  type="text"
                  placeholder="Track Number"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.weight"
                  :error-messages="errorMessages.weight"
                  label="Weight"
                  type="text"
                  placeholder="Weight"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.piece"
                  :error-messages="errorMessages.piece"
                  label="Number of Pieces"
                  type="text"
                  placeholder="Number of Pieces"
                />
                </v-col>
                 <v-col cols="6">
                  <v-text-field
                  v-model="form.special_instruction"
                  :error-messages="errorMessages.special_instruction"
                  label="Special Instructions"
                  type="text"
                  placeholder="Special Instructions"
                />
                </v-col>
              </v-row>
              <v-row v-if="status != 'PLACED'">
                <v-col cols="12">
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['DELIVERED','CANCELLED']"
                  label="Order Status"
                />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  :text="status == 'PLACED' ? 'Book':'Update'"
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

import { useBookOrder } from '@/composable/useBookOrder';
import { defineEmits } from 'vue';
const emit = defineEmits(['refreshOrderList']);
const props = defineProps<{orderId:number,status:string,icon:string,color:string}>()
const { 
    loading,
    fetchAllCODCompanies,
    handleSubmit,
    isCompleted,
    lstCODCompanies,
    formLoading,
    form,
    errorMessages
    } = useBookOrder();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshOrderList');
});
</script>
