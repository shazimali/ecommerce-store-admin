<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="btnTitle != 'Edit'"
        v-bind="activatorProps"
        :text="btnTitle"
        :color="color"
        :size="size"
         @click="getAllProductReview (productReviewId)"
      >
      </v-btn>
      <VIcon
      v-else
      icon="bx-edit"
      :color="color"
      @click="getAllProductReview(productReviewId)"
      v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="modalTitle">
        <template v-slot:text>
          <div v-if="loading" class=" d-flex justify-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-form v-else @submit.prevent="handleSubmit(productReviewId, isActive)">
            <v-row>
              <v-col cols="6">
                <v-select
                    v-model="form.product_id"
                    :items="lstProduct"
                    :item-title="item => item? `${item.title}`: ''"
                    item-value="id"
                    :error-messages="errorMessages.product_id"
                    variant="outlined"
                  />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.rating"
                  :error-messages="errorMessages.rating"
                  :items="[1,2,3,4,5]"
                  label="Rating"
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
                <v-col cols="12">
                  <v-text-field
                  v-model="form.review"
                  :error-messages="errorMessages.review"
                  label="Review"
                  type="text"
                  placeholder="Review"
                />
                </v-col> 
              <v-col cols="12">
                <v-btn
                :text="productReviewId == 0 ? 'save':'update'"
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


import { useProductReviewOperation } from '@/composable/useProductReviewOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
        btnTitle: string,
        modalTitle:string,
        productReviewId:number,
        color:string,
        size:string;
     }>()
const emit = defineEmits(['refreshProductReviewList']);

     
const { 
  loading,
  form,
  isCompleted,
  errorMessages,
  handleSubmit,
  lstProduct,
  imageSrc1,
  imageSrc2,
  imageSrc3,
  getAllProductReview,
  handleImageChange,
  formLoading,
  } = useProductReviewOperation();

watch(isCompleted, (newIsCompleted:number) => {
emit('refreshProductReviewList');
});
</script>

