<script setup lang="ts">
import { ref } from 'vue'

interface WebsiteWidget {
  id: number
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  bgGradient: string
  domain: string
  tag: string
  image: string
}

const websites = ref<WebsiteWidget[]>([
  {
    id: 1,
    title: 'Everyday Plastics',
    subtitle: 'Industrial & Household Plastic Solutions',
    description: 'High-quality durable containers, storage units, household products, and custom plastic manufacturing.',
    icon: 'bx-box',
    color: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%)',
    domain: 'https://everydayplastics.com',
    tag: 'Plastics & Containers',
    image: 'https://images.unsplash.com/photo-1584473457406-6df3a5025a7c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Everyday Home Appliances',
    subtitle: 'Modern Electronics & Kitchen Appliances',
    description: 'Smart kitchen gadgets, washing machines, refrigerators, and energy-efficient home electronics.',
    icon: 'bx-tv',
    color: '#10B981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%)',
    domain: 'https://everydayappliances.com',
    tag: 'Appliances & Tech',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Everyday Furniture',
    subtitle: 'Contemporary Home & Office Decor',
    description: 'Premium wooden furniture, ergonomic office chairs, luxury sofas, and space-saving living solutions.',
    icon: 'bx-closet',
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%)',
    domain: 'https://everydayfurniture.com',
    tag: 'Living & Comfort',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Everyday Sanitary',
    subtitle: 'Bathroom Fitting & Plumbing Accessories',
    description: 'Designer faucets, luxury showers, ceramic basins, and premium plumbing fixtures.',
    icon: 'bx-bath',
    color: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%)',
    domain: 'https://everydaysanitary.com',
    tag: 'Sanitary & Bath',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Everyday E-Commerce',
    subtitle: 'Multi-Category Online Shopping Portal',
    description: 'Our central marketplace combining products across all Everyday verticals with fast delivery & deals.',
    icon: 'bx-shopping-bag',
    color: '#EC4899',
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.02) 100%)',
    domain: 'https://everydaystore.com',
    tag: 'Central Marketplace',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
  },
])

const searchQuery = ref('')

const filteredWebsites = computed(() => {
  if (!searchQuery.value) return websites.value
  const q = searchQuery.value.toLowerCase()
  return websites.value.filter(
    (w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.tag.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="portal-container">
    <!-- Top Navigation Header -->
    <header class="portal-header">
      <div class="header-inner">
        <div class="brand-wrapper">
          <div class="brand-icon">
            <VIcon icon="bx-store-alt" color="primary" size="28" />
          </div>
          <div>
            <h1 class="brand-name">EVERYDAY GROUP</h1>
            <p class="brand-subtitle">Official Brand Portals & Stores</p>
          </div>
        </div>

        <div class="header-actions">
          <VBtn
            to="/admin/login"
            variant="elevated"
            color="primary"
            class="admin-btn"
            prepend-icon="bx-lock-alt"
          >
            Admin Panel Login
          </VBtn>
        </div>
      </div>
    </header>

    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-content">
        <VChip color="primary" variant="tonal" class="mb-3 font-weight-medium">
          <VIcon icon="bx-grid-alt" start /> Everyday Brands Directory
        </VChip>
        <h2 class="hero-title">Explore Our Business Ecosystem</h2>
        <p class="hero-description">
          Welcome to the Everyday Group Portal. Select any of our specialized website divisions below to access products, services, and online stores.
        </p>

        <!-- Search Bar -->
        <div class="search-wrapper">
          <VTextField
            v-model="searchQuery"
            prepend-inner-icon="bx-search"
            placeholder="Search stores (e.g. Plastics, Appliances, Furniture)..."
            clearable
            variant="outlined"
            hide-details
            class="portal-search"
          />
        </div>
      </div>
    </section>

    <!-- Website Widgets Grid (5 Items) -->
    <section class="widgets-section">
      <VRow justify="center">
        <VCol
          v-for="site in filteredWebsites"
          :key="site.id"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <VCard
            class="widget-card h-100"
            :style="{ background: site.bgGradient }"
          >
            <!-- Card Image Cover -->
            <div class="card-image-wrapper">
              <VImg
                :src="site.image"
                height="160"
                cover
                class="card-img"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height bg-grey-100">
                    <VIcon icon="bx-image" size="36" color="grey-400" />
                  </div>
                </template>
              </VImg>
              <div class="card-tag-badge">
                <VChip size="small" variant="flat" color="surface" class="font-weight-semibold shadow-1">
                  {{ site.tag }}
                </VChip>
              </div>
            </div>

            <VCardItem class="pt-4">
              <div class="d-flex align-center gap-3 mb-2">
                <div
                  class="site-icon-badge"
                  :style="{ backgroundColor: site.color + '15', border: `1px solid ${site.color}30` }"
                >
                  <VIcon :icon="site.icon" :color="site.color" size="24" />
                </div>
                <div>
                  <VCardTitle class="site-title">{{ site.title }}</VCardTitle>
                  <span class="site-subtitle text-caption text-disabled">{{ site.subtitle }}</span>
                </div>
              </div>

              <VCardText class="px-0 py-2 site-desc text-body-2">
                {{ site.description }}
              </VCardText>
            </VCardItem>

            <VCardActions class="px-4 pb-4 pt-0 justify-space-between align-center">
              <span class="status-indicator d-flex align-center gap-1 text-caption text-success font-weight-medium">
                <span class="status-dot"></span> Active Store
              </span>

              <VBtn
                :href="site.domain"
                target="_blank"
                variant="tonal"
                color="primary"
                size="small"
                append-icon="bx-link-external"
                class="visit-btn"
              >
                Visit Website
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>

      <!-- Empty State -->
      <div v-if="filteredWebsites.length === 0" class="text-center py-12">
        <VIcon icon="bx-search-alt" size="48" color="disabled" class="mb-2" />
        <h4 class="text-h6 font-weight-medium">No matching website found</h4>
        <p class="text-caption text-disabled">Try searching with a different keyword</p>
      </div>
    </section>

    <!-- Portal Footer -->
    <footer class="portal-footer">
      <div class="footer-content">
        <p class="mb-0 text-caption">
          &copy; {{ new Date().getFullYear() }} Everyday Group of Companies. All Rights Reserved.
        </p>
        <div class="footer-links text-caption">
          <RouterLink to="/admin/login" class="text-primary font-weight-medium">Admin Portal</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.portal-container {
  min-height: 100vh;
  background-color: var(--v-theme-background, #f5f5f9);
  display: flex;
  flex-direction: column;
}

.portal-header {
  background: rgba(var(--v-theme-surface), 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  padding-block: 0.875rem;

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding-inline: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand-wrapper {
    display: flex;
    align-items: center;
    gap: 0.875rem;

    .brand-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(var(--v-theme-primary), 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(var(--v-theme-primary), 0.2);
    }

    .brand-name {
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: 0.5px;
      color: rgb(var(--v-theme-on-surface));
    }

    .brand-subtitle {
      font-size: 0.75rem;
      margin: 0;
      color: rgba(var(--v-theme-on-surface), 0.55);
    }
  }

  .admin-btn {
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
}

.hero-section {
  padding-block: 3.5rem 2rem;
  text-align: center;

  .hero-content {
    max-width: 720px;
    margin: 0 auto;
    padding-inline: 1.5rem;
  }

  .hero-title {
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.5px;
    margin-bottom: 0.75rem;
    background: linear-gradient(135deg, rgb(var(--v-theme-on-surface)) 0%, rgb(var(--v-theme-primary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-description {
    font-size: 1rem;
    color: rgba(var(--v-theme-on-surface), 0.65);
    margin-bottom: 2rem;
  }

  .search-wrapper {
    max-width: 520px;
    margin: 0 auto;

    .portal-search {
      border-radius: 14px;
    }
  }
}

.widgets-section {
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: 1.5rem;
  padding-bottom: 4rem;
  flex: 1;
}

.widget-card {
  border-radius: 16px !important;
  border: 1px solid rgba(var(--v-border-color), 0.08) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08) !important;
  }

  .card-image-wrapper {
    position: relative;
    overflow: hidden;

    .card-img {
      transition: transform 0.4s ease;
    }

    .card-tag-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
    }
  }

  &:hover .card-img {
    transform: scale(1.04);
  }

  .site-icon-badge {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .site-title {
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0;
    line-height: 1.3;
  }

  .site-desc {
    color: rgba(var(--v-theme-on-surface), 0.7);
    line-height: 1.5;
  }

  .status-indicator {
    font-size: 0.75rem;

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: rgb(var(--v-theme-success));
      display: inline-block;
      box-shadow: 0 0 0 3px rgba(var(--v-theme-success), 0.2);
    }
  }

  .visit-btn {
    border-radius: 8px;
    font-weight: 600;
  }
}

.portal-footer {
  background: rgba(var(--v-theme-surface), 0.7);
  border-top: 1px solid rgba(var(--v-border-color), 0.08);
  padding-block: 1.5rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-inline: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(var(--v-theme-on-surface), 0.5);
  }
}
</style>
