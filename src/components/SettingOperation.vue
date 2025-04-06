<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="btnTitle != 'Edit'"
        v-bind="activatorProps"
        :text="btnTitle"
        :color="color"
        :size="size"
         @click="getAllCountries(settingId)"
      >
      </v-btn>
      <VIcon
      v-else
      icon="bx-edit"
      :color="color"
      @click="getAllCountries(settingId)"
      v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="modalTitle">
        <template v-slot:text>
          <div v-if="loading" class=" d-flex justify-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-form v-else @submit.prevent="handleSubmit(settingId, isActive)">
            <v-row>
              <v-col cols="6">
                <v-text-field
                v-model="form.title"
                :error-messages="errorMessages.title"
                autofocus
                @keyup="handleSlug"
                label="Setting Title"
                type="text"
                placeholder="Setting Title"
              />
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.key"
                :error-messages="errorMessages.key"
                label="Key"
                type="text"
                placeholder="Key"
              />
            </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="form.value"
                :error-messages="errorMessages.value"
                label="Value"
                type="text"
                placeholder="Value"
              />
              </v-col>
              <v-col cols="6">
                <v-select
                    v-model="form.country_id"
                    :items="lstCountries"
                    label="Countries"
                    :item-title="item => item? `${item.name}`: ''"
                    item-value="id"
                    :error-messages="errorMessages.country_id"
                    variant="outlined"
                   
                  />
                  
              
              </v-col>
            
              
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                :text="settingId == 0 ? 'save':'update'"
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


import { useSettingOperation } from '@/composable/useSettingsOperation';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
        btnTitle: string,
        modalTitle:string,
        settingId:number,
        color:string,
        size:string;
     }>()
const emit = defineEmits(['refreshSettingList']);

     
const { 
  loading,
  form,
  isCompleted,
  errorMessages,
  getCategoryByID,
  handleSubmit,
  selectAllCountries,
  isSelectAllCountries,
  imageSrc,
  handleSlug,
  getAllCountries,
  lstCountries,
  handleImageChange,
  formLoading,
  } = useSettingOperation();

watch(isCompleted, (newIsCompleted:number) => {
emit('refreshSettingList');
});
</script>

