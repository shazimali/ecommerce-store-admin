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
        @click="getWebsiteByID(websiteId)"
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(websiteId, isActive)">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.title"
                  :error-messages="errorMessages.title"
                  autofocus
                  label="Website Title"
                  type="text"
                  placeholder="Website Title"
                />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.domain"
                  :error-messages="errorMessages.domain"
                  label="Domain"
                  type="text"
                  placeholder="Domain"
                />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.email"
                  :error-messages="errorMessages.email"
                  label="Email Address"
                  type="text"
                  placeholder="Email Address"
                />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.phone"
                  :error-messages="errorMessages.phone"
                  label="Phone"
                  type="text"
                  placeholder="Phone"
                />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                  v-model="form.phone1"
                  label="Mobile"
                  type="text"
                  placeholder="Mobile"
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
                <v-col cols="6">
                  <v-text-field
                  v-model="form.wel_msg"
                  label="Welcome Message"
                  type="text"
                  placeholder="Welcome Message"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.news"
                  label="News"
                  type="text"
                  placeholder="News"
                />
                </v-col>
                <v-col cols="6">
                  <v-img
                  v-show="logoSrc"
                    :width="50"
                    :height="50"
                    :src="logoSrc"
                  ></v-img>
                  <v-file-input
                  v-model="form.logo"
                  :error-messages="errorMessages.logo"
                  label="Logo"
                  @change="(event) => handleLogoChange(event)"
                  placeholder="Upload website logo"
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
                <v-col cols="12">
                  <v-text-field
                  v-model="form.address"
                  :error-messages="errorMessages.address"
                  label="Address"
                  type="text"
                  placeholder="Address"
                />
                </v-col>
                <v-col cols="12">
                  <QuillEditor
                   v-model:content="form.about"
                   content-type="html"
                   toolbar="full" 
                   theme="snow" />
                </v-col>
              </v-row>
              <v-row class="mt-10">
                <v-col cols="12">
                  <v-btn
                  :text="websiteId == 0 ? 'save':'update'"
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

import { useWebsiteOperations } from '@/composable/useWebsiteOperations';
import { QuillEditor } from '@vueup/vue-quill';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          websiteId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshWebsiteList']);

       
const { 
    loading,
    form,
    isCompleted,
    errorMessages,
    getWebsiteByID,
    handleSubmit,
    logoSrc,
    handleLogoChange,
    formLoading,
    } = useWebsiteOperations();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshWebsiteList');
});
</script>
