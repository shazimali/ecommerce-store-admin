<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="btnTitle != 'Edit'"
        v-bind="activatorProps"
        :text="btnTitle"
        :color="color"
        :size="size"
         @click="getAllCountries(pageId)"
      >
      </v-btn>
      <VIcon
      v-else
      icon="bx-edit"
      :color="color"
      @click="getAllCountries(pageId)"
      v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="modalTitle">
        <template v-slot:text>
          <div v-if="loading" class=" d-flex justify-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-form v-else @submit.prevent="handleSubmit(pageId, isActive)">
            <v-row>
              <v-col cols="6">
                <v-text-field
                v-model="form.title"
                :error-messages="errorMessages.title"
                autofocus
               @keyup="handleSlug"
                label="Page Title"
                type="text"
                placeholder="Page Title"
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
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['ACTIVE','INACTIVE']"
                  label="Status"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.seo_title"
                :error-messages="errorMessages.seo_title"
                label="Seo Title"
                type="text"
                placeholder="Seo Title"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.seo_description"
                :error-messages="errorMessages.seo_description"
                label="Seo Desc"
                type="text"
                placeholder="Seo Desc"
              />
              </v-col>

              <v-col cols="6">
                  <v-select
                  v-model="form.position"
                  :error-messages="errorMessages.position"
                  :items="['HEADER','FOOTER']"
                  label="Page Position"
                />
              </v-col>
             
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
              <v-col cols="12">
                    <label for="">Content</label>
                  <QuillEditor
                   v-model:content="form.content"
                   content-type="html"
                   toolbar="full" 
                   theme="snow" />
                </v-col>
                <v-col class="text-sm text-error">
                      {{ errorMessages.content }}
                      </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                :text="pageId == 0 ? 'save':'update'"
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


import { usePageOperation } from '@/composable/usePageOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
        btnTitle: string,
        modalTitle:string,
        pageId:number,
        color:string,
        size:string;
     }>()
const emit = defineEmits(['refreshPageList']);

     
const { 
  loading,
  form,
  isCompleted,
  errorMessages,
  handleSubmit,
   handleSlug,
  selectAllCountries,
  isSelectAllCountries,
  getAllCountries,
  lstCountries,
  formLoading,
  } = usePageOperation();

watch(isCompleted, (newIsCompleted:number) => {
emit('refreshPageList');
});
</script>


