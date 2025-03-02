<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
           @click="getAllSubCategories(productId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        @click="getAllSubCategories(productId)"
        v-bind="activatorProps"
        />
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
                  <v-text-field
                  v-model="form.title"
                  :error-messages="errorMessages.title"
                  autofocus
                  @keyup="handleSlug"
                  label="Title"
                  type="text"
                  placeholder="Title"
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
                <v-col cols="3">
                  <v-text-field
                  v-model="form.code"
                  :error-messages="errorMessages.code"
                  label="Code"
                  type="text"
                  placeholder="Code"
                />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                  v-model="form.sku"
                  :error-messages="errorMessages.sku"
                  label="SKU"
                  type="text"
                  placeholder="SKU"
                />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                  v-model="form.order"
                  :error-messages="errorMessages.order"
                  label="Order"
                  type="text"
                  placeholder="Order"
                />
                </v-col>
                <v-col cols="3">
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['ACTIVE','INACTIVE']"
                  label="Status"
                />
                </v-col>
                <v-col cols="4">
                    <v-switch
                    :model-value="form.is_new"
                    @change="handleState('is_new')"
                    color="primary"
                    label="New"
                    ></v-switch>
                </v-col>
                <v-col cols="4">
                    <v-switch
                    :model-value="form.is_featured"
                    @change="handleState('is_featured')"
                    color="primary"
                    label="Featured"
                    ></v-switch>
                </v-col>
                <v-col cols="4">
                    <v-switch
                    :model-value="form.coming_soon"
                    @change="handleState('coming_soon')"
                    color="primary"
                    label="Coming Soon"
                    ></v-switch>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="form.short_desc"
                  :error-messages="errorMessages.short_desc"
                  label="Short Description"
                  type="text"
                  placeholder="Short Description"
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
                <v-col cols="6">
                  <v-text-field
                  v-model="form.youtube_link"
                  label="Youtube Link"
                  type="text"
                  placeholder="Youtube Link"
                />
                </v-col>        
                <v-col cols="6">
                    <v-text-field
                  v-model="form.seo_title"
                  label="SEO Title"
                  type="text"
                  placeholder="SEO Description"
                />
                </v-col>
                <v-col cols="6">
                    <v-text-field
                  v-model="form.seo_desc"
                  label="SEO Description"
                  type="text"
                  placeholder="SEO Description"
                />
                </v-col>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h5>Sub Categories</h5>
                    <v-checkbox v-model="isSelectAllSubCategories" @update:model-value="selectAllSubCategories" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="sub_category in lstSubCategories" :key="sub_category.id" cols="3">
                        <v-checkbox :value="sub_category.id" :label="sub_category.title" v-model="form.sub_categories"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="text-sm text-error">
                      {{ errorMessages.sub_categories }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                    <label for="">Description</label>
                  <QuillEditor
                   v-model:content="form.description"
                   content-type="html"
                   toolbar="full" 
                   theme="snow" />
                </v-col>
                <v-col class="text-sm text-error">
                      {{ errorMessages.description }}
                      </v-col>
              </v-row>
              <v-row class="mt-16">
                <v-col cols="12">
                  <v-btn
                  :text="productId == 0 ? 'save':'update'"
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

import { useProductOperation } from '@/composable/useProductOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          productId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshProductList']);

       
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getCategoryByID,
    handleSubmit,
    selectAllSubCategories,
    isSelectAllSubCategories,
    imageSrc,
    handleSlug,
    handleState,
    getAllSubCategories,
    lstSubCategories,
    handleImageChange,
    formLoading,
    } = useProductOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshProductList');
});
</script>
