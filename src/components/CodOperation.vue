<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="btnTitle != 'Edit'"
        v-bind="activatorProps"
        :text="btnTitle"
        :color="color"
        :size="size"
         @click="getAllCountries(codId)"
      >
      </v-btn>
      <VIcon
      v-else
      icon="bx-edit"
      :color="color"
      @click="getAllCountries(codId)"
      v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="modalTitle">
        <template v-slot:text>
          <div v-if="loading" class=" d-flex justify-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-form v-else @submit.prevent="handleSubmit(codId, isActive)">
            <v-row>
              <v-col cols="6">
                <v-text-field
                v-model="form.title"
                :error-messages="errorMessages.title"
                autofocus
                @keyup="handleSlug"
                label="COD Title"
                type="text"
                placeholder="COD Title"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.api_test_url"
                :error-messages="errorMessages.api_test_url"
                label="Api Test Url"
                type="text"
                placeholder="Api Test Url"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.api_url"
                :error-messages="errorMessages.api_url"
                label="Api Url"
                type="text"
                placeholder="Api Url"
              />
              </v-col>
             
              <v-col cols="6">
                <v-text-field
                v-model="form.api_key"
                :error-messages="errorMessages.api_key"
                label="Api Key"
                type="text"
                placeholder="Api Key"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.api_password"
                :error-messages="errorMessages.api_password"
                label="Api Password"
                type="text"
                placeholder="Api Password"
              />
              </v-col>
                <v-col cols="6">
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['DEFAULT','ACTIVE','INACTIVE']"
                  label="Status"
                />
              </v-col>
            </v-row>
             
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <h5>Countries</h5>
                  <v-checkbox v-model="isSelectAllCountries" @update:model-value="selectAllCountries" label="Select All"></v-checkbox>
                </div>
                <v-container>
                  <v-row no-gutters>
                    <v-col v-for="country in lstCountries" :key="country.id" cols="3">
                      <v-checkbox :value="country.id" :label="country.name" v-model="form.countries"></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="text-sm text-error">
                    {{ errorMessages.countries }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            <v-row>
              <v-col cols="12">
                <v-btn
                :text="codId == 0 ? 'save':'update'"
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


import { useCodOperation } from '@/composable/useCodOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
        btnTitle: string,
        modalTitle:string,
        codId:number,
        color:string,
        size:string;
     }>()
const emit = defineEmits(['refreshCodList']);

     
const { 
  loading,
  form,
  isCompleted,
  errorMessages,
  handleSubmit,
  getAllCountries,
  lstCountries,
  isSelectAllCountries,
  selectAllCountries,
  formLoading,
  } = useCodOperation();

watch(isCompleted, (newIsCompleted:number) => {
emit('refreshCodList');
});
</script>


