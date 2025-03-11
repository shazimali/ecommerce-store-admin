<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        @click="getSupplierByID(supplierId)"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(supplierId, isActive)">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  v-model="form.name"
                  :error-messages="errorMessages.name"
                  autofocus
                  label="Supplier Name"
                  type="text"
                  placeholder="Supplier Name"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.email"
                  :error-messages="errorMessages.email"
                  label="Email Address"
                  type="text"
                  placeholder="Email Address"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.phone"
                  :error-messages="errorMessages.phone"
                  label="Phone"
                  type="text"
                  placeholder="Phone"
                />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="form.address"
                  :error-messages="errorMessages.address"
                  label="Address"
                  type="text"
                  placeholder="Address"
                />
                </v-col>
              </v-row>
              <v-row class="mt-10">
                <v-col cols="12">
                  <v-btn
                  :text="supplierId == 0 ? 'save':'update'"
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

import { useSupplierOperation } from '@/composable/useSupplierOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          supplierId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshSupplierList']);

       
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getSupplierByID,
    handleSubmit,
    logoSrc,
    formLoading,
    } = useSupplierOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshSupplierList');
});
</script>
