<template>
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="btnTitle != 'Edit'"
          v-bind="activatorProps"
          :text="btnTitle"
          :color="color"
          :size="size"
          @click="getAllRoles(roleId)"
        >
        </v-btn>
        <VIcon
        v-else
        icon="bx-edit"
        :color="color"
        v-bind="activatorProps"
        @click="getAllRoles(roleId)"
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
                <v-col cols="6">
                  <v-text-field
                  v-model="form.name"
                  :error-messages="errorMessages.name"
                  autofocus
                  label="User Name"
                  type="text"
                  placeholder="Johan Zieme"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.email"
                  :error-messages="errorMessages.email"
                  autofocus
                  label="User Email"
                  type="email"
                  placeholder="user@example.com"
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.password"
                  :error-messages="errorMessages.password"
                  autofocus
                  label="Password"
                  type="password"
                  placeholder="........."
                />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="form.password_confirmation"
                  :error-messages="errorMessages.password_confirmation"
                  autofocus
                  label="Password Confirmation"
                  type="password"
                  placeholder="........."
                />
                </v-col>
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h5>User Roles</h5>
                    <v-checkbox v-model="isSelectAllRoles" @update:model-value="selectAllRoles" label="Select All"></v-checkbox>
                  </div>
                  <v-container>
                    <v-row no-gutters>
                      <v-col v-for="role in lstRoles" :key="role.id" cols="3">
                        <v-checkbox :value="role.id" :label="role.name" v-model="form.roles"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="text-sm text-error">
                      {{ errorMessages.roles }}
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

import { useUsersOperations } from '@/composable/useUsersOperations';
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
    lstRoles,
    loading,
    getAllRoles,
    form,
    isCompleted,
    errorMessages,
    handleSubmit,
    formLoading,
    selectAllRoles,
    isSelectAllRoles
    } = useUsersOperations();

watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshUserList');
});
</script>
