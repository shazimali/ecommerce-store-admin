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
        v-bind="activatorProps"
        @click="getPermissionById(permissionId)"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(permissionId, isActive)">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  v-model="form.name"
                  :error-messages="errorMessages.name"
                  autofocus
                  label="Permission Name"
                  type="text"
                  placeholder="Permission"
                />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="form.key"
                  :error-messages="errorMessages.key"
                  autofocus
                  label="Permission Key"
                  type="text"
                  placeholder="Permission"
                />
                </v-col>
               
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  :text="permissionId == 0 ? 'save':'update'"
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

import { usePermissionOperations } from '@/composable/usePermissionOperations';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          permissionId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshPermissionList']);

       
const { 
    loading,
    form,
    isCompleted,
    getPermissionById,
    errorMessages,
    handleSubmit,
    formLoading,
    } = usePermissionOperations();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshPermissionList');
});
</script>
