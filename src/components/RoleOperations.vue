<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
          @click="getAllPermissions(roleId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        v-bind="activatorProps"
        @click="getAllPermissions(roleId)"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card :title="modalTitle">
          <template v-slot:text>
            <div v-if="loading" class=" d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <v-form v-else @submit.prevent="handleSubmit(roleId, isActive)">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  v-model="form.name"
                  :error-messages="errorMessages.name"
                  autofocus
                  label="Role Name"
                  type="text"
                  placeholder="Administrator Role"
                />
                </v-col>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h5>Role Permissions</h5>
                    <v-checkbox v-model="isSelectAllPermissions" @update:model-value="selectAllPermissions" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="permission in lstPermissions" :key="permission.id" cols="3">
                        <v-checkbox :value="permission.id" :label="permission.name" v-model="form.permissions"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="text-sm text-error">
                      {{ errorMessages.permissions }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  :text="roleId == 0 ? 'save':'update'"
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

import { useRoleOperations } from '@/composable/useRoleOperations';
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
          btnTitle: string,
          modalTitle:string,
          roleId:number,
          color:string,
          size:string;
       }>()
const emit = defineEmits(['refreshRoleList']);

       
const { 
    lstPermissions,
    loading,
    getAllPermissions,
    form,
    isCompleted,
    errorMessages,
    handleSubmit,
    formLoading,
    selectAllPermissions,
    isSelectAllPermissions
    } = useRoleOperations();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshRoleList');
});
</script>
