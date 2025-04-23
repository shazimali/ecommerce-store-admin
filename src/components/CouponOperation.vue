<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="btnTitle != 'Edit'"
        v-bind="activatorProps"
        :text="btnTitle"
        :color="color"
        :size="size"
         @click="getAllCountries(couponId)"
      >
      </v-btn>
      <VIcon
      v-else
      icon="bx-edit"
      :color="color"
      @click="getAllCountries(couponId)"
      v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="modalTitle">
        <template v-slot:text>
          <div v-if="loading" class=" d-flex justify-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-form v-else @submit.prevent="handleSubmit(couponId, isActive)">
            <v-row>
              <v-col cols="6">
                <v-text-field
                v-model="form.title"
                :error-messages="errorMessages.title"
                autofocus
                @keyup="handleSlug"
                label="Coupon Title"
                type="text"
                placeholder="Coupon Title"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.code"
                :error-messages="errorMessages.code"
                label="Code"
                type="text"
                placeholder="Code"
              />
            </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.discount"
                :error-messages="errorMessages.discount"
                label="Discount"
                type="text"
                placeholder=" Discount"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.date_from"
                :error-messages="errorMessages.date_from"
                label="Date_from"
                type="date"
                placeholder="Date_From"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.date_to"
                :error-messages="errorMessages.date_to"
                label="Date_to"
                type="date"
                placeholder="Date_to"
              />
              </v-col>
              <v-col cols="6">
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['ACTIVE','INACTIVE']"
                  label="Status"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                    v-model="form.country_id"
                    :items="lstCountries"
                    label="Countries"
                    :item-title="item => item? `${item.name}`: ''"
                    item-value="id"
                    :error-messages="errorMessages.country_id"
                    variant="outlined"
                   
                  />
                  
              
              </v-col>
            
              
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                :text="couponId == 0 ? 'save':'update'"
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


import { useCouponOperation } from '@/composable/useCouponOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
        btnTitle: string,
        modalTitle:string,
        couponId:number,
        color:string,
        size:string;
     }>()
const emit = defineEmits(['refreshCouponList']);

     
const { 
  loading,
  form,
  isCompleted,
  errorMessages,
  handleSubmit,
  
  getAllCountries,
  lstCountries,
  handleSlug,
  formLoading,
  } = useCouponOperation();

watch(isCompleted, (newIsCompleted:number) => {
emit('refreshCouponList');
});
</script>


