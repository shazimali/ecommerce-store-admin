<template>
  <v-row>
    <v-col cols="12">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg mb-3">
            <h3>Blogs</h3>
            <v-spacer></v-spacer>

            <v-text-field
            v-model="search"
            prepend-icon="bx-search"
            density="compact"
            label="Search"
            variant="outlined"
            ></v-text-field>
        <v-spacer></v-spacer>

            <BlogOperation
            v-if="canUserAccess('blog_create')"
            btn-title="create"
            modal-title="Create Blog"
            :blog-id=0
            color="primary"
            size="default"
            @refresh-blog-list="doFetchBlogs"
            />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items="lstBlogs"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchBlogs"
            >
          <template v-slot:item.image="{ item }">
              <v-img
                  :width="50"
                  :height="50"
                  :src="item.image"
                ></v-img>
          </template>
          <template v-slot:item.countries="{ item }">
              <v-chip v-for="country in item.countries" :key="country" color="red" class="mx-1 my-1">
                  {{ country }}
              </v-chip>
          </template>
            <template v-slot:item.actions="{ item }">
                <BlogOperation 
                    v-if="canUserAccess('blog_edit')"
                    btn-title="Edit"
                    modal-title="Edit Blog"
                    color="primary"
                    :blog-id="item.id"
                    size="x-small"
                    @refresh-blog-list="doFetchBlogs"
                    />
                    <DeleteDailog
                    v-if="canUserAccess('blog_delete')"
                    :id="item.id"
                    action="blog"
                    @refresh-list="doFetchBlogs"
                    />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import BlogOperation from '@/components/BlogOperation.vue';
import { useBlogs } from '@/composable/useBlogs';

const { lstBlogs,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchBlogs
    } = useBlogs();
</script>


