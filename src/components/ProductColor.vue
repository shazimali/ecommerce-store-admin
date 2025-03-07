<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <VIcon
        icon="bx bx-palette"
        :color="color"
        @click="getAllColors(productId)"
        v-bind="activatorProps"
        />
        &nbsp;
        &nbsp;
        <v-label
        @click="getAllColors(productId)"
        v-bind="activatorProps"
        > Colors</v-label>
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
                    v-model="form.color_name"
                    :error-messages="errorMessages.color_name"
                    label="Color Name"
                    type="text"
                    placeholder="Color Name"
                    />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="colorImageSrc"
                    :width="50"
                    :height="50"
                    :src="colorImageSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.color_image"
                  :error-messages="errorMessages.color_image"
                  label="Color Image"
                  @change="(event) => handleImageChange(event, 'color_image')"
                  placeholder="Upload color image"
                    />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="image1InputSrc"
                    :width="50"
                    :height="50"
                    :src="image1InputSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.image1"
                  :error-messages="errorMessages.image1"
                  label="Image1"
                  @change="(event) => handleImageChange(event, 'image2')"
                  placeholder="Upload image2"
                    />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="image2InputSrc"
                    :width="50"
                    :height="50"
                    :src="image2InputSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.image2"
                  :error-messages="errorMessages.image2"
                  label="Image2"
                  @change="(event) => handleImageChange(event, 'image2')"
                  placeholder="Upload image2"
                    />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="image3InputSrc"
                    :width="50"
                    :height="50"
                    :src="image3InputSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.image3"
                  :error-messages="errorMessages.image3"
                  label="Image3"
                  @change="(event) => handleImageChange(event, 'image3')"
                  placeholder="Upload image2"
                    />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="image4InputSrc"
                    :width="50"
                    :height="50"
                    :src="image4InputSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.image4"
                  :error-messages="errorMessages.image4"
                  label="Image4"
                  @change="(event) => handleImageChange(event, 'image4')"
                  placeholder="Upload image2"
                    />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="image5InputSrc"
                    :width="50"
                    :height="50"
                    :src="image5InputSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.image5"
                  :error-messages="errorMessages.image5"
                  label="Image5"
                  @change="(event) => handleImageChange(event, 'image5')"
                  placeholder="Upload image2"
                    />
                </v-col>
              </v-row>              
              <v-row>
                <v-col cols="12">
                  <v-btn
                  text="save"
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
              <v-row>
                <div v-if="colorLoading" class=" d-flex justify-center">
                <v-progress-circular indeterminate></v-progress-circular>
                </div>
                <v-col v-else cols="12">
                    <v-table>
                        <thead>
                            <tr class="text-sm">
                                <th>Product</th>
                                <th>Color Name</th>
                                <th>Color Image</th>
                                <th>Image1</th>
                                <th>Image2</th>
                                <th>Image3</th>
                                <th>Image4</th>
                                <th>Image5</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in lstColors" :key="index">
                                <td>{{ item.product_name}}</td>
                                <td>{{ item.color_name}}</td>
                                <td>
                                    <v-img
                                        :width="20"
                                        :height="20"
                                        class="rounded"
                                        :src="item.color_image_src"
                                    ></v-img>
                                </td>
                                <td>
                                    <v-img
                                        :width="50"
                                        :height="50"
                                        :src="item.image1_src"
                                    ></v-img>
                                </td>
                                <td>
                                    <v-img
                                        :width="50"
                                        :height="50"
                                        :src="item.image2_src"
                                    ></v-img>
                                </td>
                                <td>
                                    <v-img
                                        :width="50"
                                        :height="50"
                                        :src="item.image3_src"
                                    ></v-img>
                                </td>
                                <td>
                                    <v-img
                                        :width="50"
                                        :height="50"
                                        :src="item.image4_src"
                                    ></v-img>
                                </td>
                                <td>
                                    <v-img
                                        :width="50"
                                        :height="50"
                                        :src="item.image5_src"
                                    ></v-img>
                                </td>
                                <td>
                                    <DeleteDailog
                                        :id="item.id"
                                        action="product_color"
                                        @refresh-list="getAllColors(item.id)"
                                        />
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
              </v-row>
            </v-form>
          </template>
        </v-card>
      </template>
    </v-dialog>
</template>
<script setup lang="ts">

import { useProductColor } from '@/composable/useProductColor';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          productId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshList']);

       
const { 
    loading,
    form,
    colorLoading,
    errorMessages,
    handleSubmit,
    getAllColors,
    lstColors,
    formLoading,
    colorImageSrc,
    image1InputSrc,
    image2InputSrc,
    image3InputSrc,
    image4InputSrc,
    image5InputSrc,
    } = useProductColor();
</script>
