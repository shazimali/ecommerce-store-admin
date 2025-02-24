<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
           @click="getAllCategories(subCategoryId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        @click="getAllCategories(subCategoryId)"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(subCategoryId, isActive)">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.title"
                  :error-messages="errorMessages.title"
                  autofocus
                  @keyup="handleSlug"
                  label="Sub Category Title"
                  type="text"
                  placeholder="Sub Category Title"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.slug"
                  :error-messages="errorMessages.slug"
                  label="Slug"
                  type="text"
                  placeholder="Slug"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.order"
                  :error-messages="errorMessages.order"
                  label="Order"
                  type="text"
                  placeholder="Order"
                />
                </v-col>
  
                <v-col cols="6">
                  <v-img
                  v-show="imageSrc"
                    :width="50"
                    :height="50"
                    :src="imageSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.image"
                  :error-messages="errorMessages.image"
                  label="Image"
                  @change="(event) => handleImageChange(event)"
                  placeholder="Upload website image"
                    />
                </v-col>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h5>Categories</h5>
                    <v-checkbox v-model="isSelectAllCategories" @update:model-value="selectAllCategories" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="category in lstCategories" :key="category.id" cols="3">
                        <v-checkbox :value="category.id" :label="category.title" v-model="form.categories"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="text-sm text-error">
                      {{ errorMessages.categories }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  :text="subCategoryId == 0 ? 'save':'update'"
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

import { useSubCategoryOperation } from '@/composable/useSubCategoryOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          subCategoryId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshSubCategoryList']);

       
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getSubCategoryByID,
    handleSubmit,
    selectAllCategories,
    isSelectAllCategories,
    imageSrc,
    handleSlug,
    getAllCategories,
    lstCategories,
    handleImageChange,
    formLoading,
    } = useSubCategoryOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshSubCategoryList');
});
</script>
