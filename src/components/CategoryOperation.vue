<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
           @click="getAllWebsites(categoryId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        @click="getAllWebsites(categoryId)"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(categoryId, isActive)">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.title"
                  :error-messages="errorMessages.title"
                  autofocus
                  @keyup="handleSlug"
                  label="Category Title"
                  type="text"
                  placeholder="Category Title"
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
                    <h5>Websites</h5>
                    <v-checkbox v-model="isSelectAllWebsites" @update:model-value="selectAllWebsites" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="website in lstWebsites" :key="website.id" cols="3">
                        <v-checkbox :value="website.id" :label="website.title" v-model="form.websites"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="text-sm text-error">
                      {{ errorMessages.websites }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  :text="categoryId == 0 ? 'save':'update'"
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

import { useCategoryOperation } from '@/composable/useCategoryOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          categoryId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshCategoryList']);

       
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getCategoryByID,
    handleSubmit,
    selectAllWebsites,
    isSelectAllWebsites,
    imageSrc,
    handleSlug,
    getAllWebsites,
    lstWebsites,
    handleImageChange,
    formLoading,
    } = useCategoryOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshCategoryList');
});
</script>
