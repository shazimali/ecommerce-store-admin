<template>
    <v-dialog max-width="400">
      <template v-slot:activator="{ props: activatorProps }">
        
        <VIcon
        icon="bx-trash"
        color="error"
        v-bind="activatorProps"
        />
        &nbsp;
        &nbsp;
        <v-label
        v-if="action == 'product'"
        v-bind="activatorProps"
        > Delete</v-label>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Are you sure? you wanted to delete?">
          <template v-slot:text>
            <v-form>
              <v-row>
               
                
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                  text="Confirm"
                  variant="elevated"
                  type="button"
                  class="mr-2"
                  :loading="formLoading"
                  @click="doDelete(id,action, isActive)"
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

import { useDeleteDailog } from '@/composable/useDeleteDailog';
import { defineEmits, defineProps } from 'vue';

const { doDelete, isCompleted,formLoading } = useDeleteDailog();
const props = defineProps<{
          id: number,
          action:string,
       }>()
const emit = defineEmits(['refreshList']);
watch(isCompleted, (newIsCompleted:number) => {
  emit('refreshList');
});
</script>
