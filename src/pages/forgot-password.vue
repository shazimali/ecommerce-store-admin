<script setup lang="ts">
import { useLogin } from '@/composable/useLogin';
const {form, isPasswordVisible, handleSubmit, errorMessages, loading} = useLogin();
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <RouterLink
            to="/"
            class="app-logo"
          >
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="d-flex"
            >
            <img height="100" width="180" src="/logo.png" alt="logo">
            </div>
            <!-- <h1>
              Everyday Shops
            </h1> -->
          </RouterLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Forgot Password
          </h4>
          <p class="mb-0">
            Please enter email address
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  label="Email or Username"
                  type="email"
                  placeholder="johndoe@email.com"
                  :error-messages="errorMessages.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                  :loading="loading"
                >
                <template v-slot:loader><v-progress-circular indeterminate></v-progress-circular> Sending</template>
                  Send Reset Link
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
