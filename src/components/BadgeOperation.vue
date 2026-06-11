<template>
    <v-dialog max-width="800" @update:model-value="(val) => { if (val) getAllSubCategories(badgeId) }">
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
        v-bind="activatorProps"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(badgeId, isActive)">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.title"
                  :error-messages="errorMessages.title"
                  autofocus
                  label="Badge Title"
                  type="text"
                  placeholder="Badge Title"
                />
                </v-col>

                <v-col cols="6">
                  <v-select
                  v-model="form.status"
                  :error-messages="errorMessages.status"
                  :items="['ACTIVE', 'INACTIVE']"
                  label="Status"
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
                  v-model="(form.image as any)"
                  :error-messages="errorMessages.image"
                  label="Image"
                  @change="(event: any) => handleImageChange(event)"
                  placeholder="Upload badge image"
                    />
                </v-col>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h5>Sub Categories</h5>
                    <v-checkbox v-model="isSelectAllSubCategories" @update:model-value="selectAllSubCategories" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="subCat in lstSubCategories" :key="subCat.id" cols="4">
                        <v-checkbox :value="subCat.id" :label="subCat.title" v-model="form.sub_categories"></v-checkbox>
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
                  <v-btn
                  :text="badgeId == 0 ? 'save':'update'"
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
import { useBadgeOperation } from '@/composable/useBadgeOperation';
import { defineEmits, defineProps, watch } from 'vue';

const props = defineProps<{
  btnTitle: string,
  modalTitle: string,
  badgeId: number,
  color: string,
  size: string;
}>()

const emit = defineEmits(['refreshBadgeList']);

const { 
  loading,
  form,
  isCompleted,
  errorMessages,
  handleSubmit,
  selectAllSubCategories,
  isSelectAllSubCategories,
  imageSrc,
  getAllSubCategories,
  lstSubCategories,
  handleImageChange,
  formLoading,
} = useBadgeOperation();

watch(isCompleted, (newIsCompleted: number) => {
  emit('refreshBadgeList');
});
</script>
