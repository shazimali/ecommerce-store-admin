<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
           @click="getAllExtra(collectionId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        @click="getAllExtra(collectionId)"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(collectionId, isActive)">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.title"
                  :error-messages="errorMessages.title"
                  autofocus
                  @keyup="handleSlug"
                  label="Collection Title"
                  type="text"
                  placeholder="Collection Title"
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
                  <v-img
                  v-show="imageMobSrc"
                    :width="50"
                    :height="50"
                    :src="imageMobSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.mob_image"
                  :error-messages="errorMessages.mob_image"
                  label="Mobile Image"
                  @change="(event) => handleMobImageChange(event)"
                  placeholder="Upload mob image"
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
                  placeholder="Upload image"
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
                <v-col cols="4">
                  <v-select
                  v-model="form.position"
                  :error-messages="errorMessages.position"
                  :items="['START','TOP','BOTTOM']"
                  label="Position"
                />
                </v-col>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h5>Products</h5>
                    <v-checkbox v-model="isSelectAllProducts" @update:model-value="selectAllProducts" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="product in lstProducts" :key="product.id" cols="3">
                        <v-checkbox :value="product.id" :label="product.title" v-model="form.products"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="text-sm text-error">
                      {{ errorMessages.products }}
                      </v-col>
                    </v-row>
                  </v-container>
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
                  :text="collectionId == 0 ? 'save':'update'"
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

import { useCollectionOperation } from '@/composable/useCollectionOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          collectionId:number,
          color:string,
          size:string
       }>()
const emit = defineEmits(['refreshCollectionList']);

       
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getCollectionByID,
    handleSubmit,
    selectAllWebsites,
    selectAllProducts,
    isSelectAllWebsites,
    isSelectAllProducts,
    imageSrc,
    imageMobSrc,
    handleSlug,
    getAllExtra,
    lstWebsites,
    lstProducts,
    handleImageChange,
    handleMobImageChange,
    formLoading,
    } = useCollectionOperation();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshCollectionList');
});
</script>
