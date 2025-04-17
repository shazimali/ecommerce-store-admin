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

            <ProductReviewOperation
            v-if="canUserAccess('product_review_create')"
            btn-title="create"
            modal-title="Product"
            :product-review-id=0
            color="primary"
            size="default"
            @refresh-product-review-list="doFetchProductReview"
            />
        </v-subheader>
        <v-card>
            <v-data-table-server
            :headers="headers"
            :search="search"
            :items="lstProductReview"
            :items-length="total_items"
            v-model:page="current_page"
            v-model:items-per-page="item_per_page"
            :loading="loading"
            @update:options ="doFetchProductReview"
            >
          <template v-slot:item.image1="{ item }">
              <v-img
                  :width="50"
                  :height="50"
                  :src="item.image1"
                ></v-img>
          </template>
          <template v-slot:item.image2="{ item }">
              <v-img
                  :width="50"
                  :height="50"
                  :src="item.image2"
                ></v-img>
          </template>
          <template v-slot:item.image3="{ item }">
              <v-img
                  :width="50"
                  :height="50"
                  :src="item.image3"
                ></v-img>
          </template>
            <template v-slot:item.actions="{ item }">
                <ProductReviewOperation 
                    v-if="canUserAccess('product_review_edit')"
                    btn-title="Edit"
                    modal-title="Edit Product Review"
                    color="primary"
                    :product-review-id="item.id"
                    size="x-small"
                    @refresh-product-review-list="doFetchProductReview"
                    />
                    <DeleteDailog
                    v-if="canUserAccess('product_review_delete')"
                    :id="item.id"
                    action="product_review"
                    @refresh-list="doFetchProductReview"
                    />
            </template>
            </v-data-table-server>
        </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { canUserAccess } from '@/@core/utils/helpers';
import ProductReviewOperation from '@/components/ProductReviewOperation.vue';
import { useProductReview } from '@/composable/useProductReview';

const { lstProductReview,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchProductReview
    } = useProductReview();
</script>



