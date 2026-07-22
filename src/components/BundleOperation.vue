<template>
    <v-dialog max-width="1200">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
          @click="getBundleDetails(productId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        @click="getBundleDetails(productId)"
        v-bind="activatorProps"
        />
        &nbsp;
        &nbsp;
        <v-label
        v-if="btnTitle == 'Edit'"
        @click="getBundleDetails(productId)"
        v-bind="activatorProps"
        > Edit</v-label>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class="d-flex justify-center">
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
                <v-col cols="4">
                  <v-text-field
                  v-model="form.sku"
                  :error-messages="errorMessages.sku"
                  label="SKU"
                  type="text"
                  placeholder="SKU"
                />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.order"
                  :error-messages="errorMessages.order"
                  label="Order"
                  type="text"
                  placeholder="Order"
                />
                </v-col>
                <v-col cols="4">
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['ACTIVE','INACTIVE']"
                  label="Status"
                />
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
                <v-col cols="3">
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
                  @change="(event) => handleImageChange(event, 'image')"
                  
                    />
                </v-col>
                <v-col cols="3">
                  <v-img
                  v-show="imageSrc1"
                    :width="50"
                    :height="50"
                    :src="imageSrc1"
                  ></v-img>
                  <v-file-input
                  v-model="form.image1"
                  :error-messages="errorMessages.image1"
                  label="Image1"
                  @change="(event) => handleImageChange(event, 'image1')"
                  
                    />
                </v-col>
                <v-col cols="3">
                  <v-img
                  v-show="imageSrc2"
                    :width="50"
                    :height="50"
                    :src="imageSrc2"
                  ></v-img>
                  <v-file-input
                  v-model="form.image2"
                  :error-messages="errorMessages.image2"
                  label="Image2"
                  @change="(event) => handleImageChange(event, 'image2')"
                  
                    />
                </v-col>
                <v-col cols="3">
                  <v-img
                  v-show="imageSrc3"
                    :width="50"
                    :height="50"
                    :src="imageSrc3"
                  ></v-img>
                  <v-file-input
                  v-model="form.image3"
                  :error-messages="errorMessages.image3"
                  label="Image3"
                  @change="(event) => handleImageChange(event, 'image3')"
                  
                    />
                </v-col>
                <v-col cols="3">
                  <v-img
                  v-show="imageSrc4"
                    :width="50"
                    :height="50"
                    :src="imageSrc4"
                  ></v-img>
                  <v-file-input
                  v-model="form.image4"
                  :error-messages="errorMessages.image4"
                  label="Image4"
                  @change="(event) => handleImageChange(event, 'image4')"
                  
                    />
                </v-col>
                <v-col cols="3">
                  <v-img
                  v-show="imageSrc5"
                    :width="50"
                    :height="50"
                    :src="imageSrc5"
                  ></v-img>
                  <v-file-input
                  v-model="form.image5"
                  :error-messages="errorMessages.image5"
                  label="Image5"
                  @change="(event) => handleImageChange(event, 'image5')"
                  
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
                  placeholder="SEO Title"
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
import { useBundleOperation } from '@/composable/useBundleOperation';
import { defineEmits, defineProps, watch } from 'vue';
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
    handleSubmit,
    imageSrc,
    imageSrc1,
    imageSrc2,
    imageSrc3,
    imageSrc4,
    imageSrc5,
    handleSlug,
    getBundleDetails,
    handleImageChange,
    formLoading,
    } = useBundleOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshProductList');
});
</script>
