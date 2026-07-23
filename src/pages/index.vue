<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import httpClient from '@/plugins/httpClient'

const router = useRouter()

// Interface definitions
interface Product {
  id: number
  title: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviewsCount: number
  image: string
  badge?: string
  badgeColor?: string
  inStock: boolean
  description?: string
  isTrending?: boolean
  isFeatured?: boolean
  isNew?: boolean
}

interface CategoryItem {
  id: number
  name: string
  icon: string
  itemCount: number
  image: string
}

// Reactive States
const searchQuery = ref('')
const selectedCategory = ref('All')
const cartDrawer = ref(false)
const quickViewDialog = ref(false)
const selectedProduct = ref<Product | null>(null)
const quantity = ref(1)

// Cart State
interface CartItem {
  product: Product
  qty: number
}
const cartItems = ref<CartItem[]>([])

// Notification Snackbar
const snackbar = ref(false)
const snackbarText = ref('')

function showToast(msg: string) {
  snackbarText.value = msg
  snackbar.value = true
}

// Categories list matching Everyday Plastic theme
const categories = ref<CategoryItem[]>([
  { id: 1, name: 'Kitchenware Range', icon: 'bx-bowl-hot', itemCount: 42, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Household & Storage', icon: 'bx-home-alt', itemCount: 38, image: 'https://images.unsplash.com/photo-1584473457406-6df3a5025a7c?w=600&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Furniture Range', icon: 'bx-chair', itemCount: 25, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Bath Accessories', icon: 'bx-bath', itemCount: 29, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Plastic Crates & Racks', icon: 'bx-box', itemCount: 18, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Utility & Organizers', icon: 'bx-grid-alt', itemCount: 31, image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80' },
])

// Rich Product Catalog matching theme screenshot
const products = ref<Product[]>([
  {
    id: 101,
    title: '3-Tier Deluxe Utensil & Spice Rack',
    category: 'Kitchenware Range',
    price: 2450,
    oldPrice: 2950,
    rating: 4.9,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1584473457406-6df3a5025a7c?w=600&auto=format&fit=crop&q=80',
    badge: 'HOT',
    badgeColor: 'error',
    inStock: true,
    description: 'Durable 3-tier plastic kitchen shelf organizer. Rust-free, space-saving design ideal for spices, jars, and cutlery.',
    isTrending: true,
    isFeatured: true,
  },
  {
    id: 102,
    title: '6-Piece Airtight Condiment Jar Stand',
    category: 'Kitchenware Range',
    price: 1850,
    oldPrice: 2200,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    badge: '15% OFF',
    badgeColor: 'warning',
    inStock: true,
    description: 'Clear acrylic spice container set with ergonomic wooden stand and airtight seals to keep spices fresh.',
    isTrending: true,
    isFeatured: true,
  },
  {
    id: 103,
    title: 'Heavy Duty 2-Tier Kitchen Organizer',
    category: 'Kitchenware Range',
    price: 1450,
    oldPrice: 1750,
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80',
    badge: 'BESTSELLER',
    badgeColor: 'success',
    inStock: true,
    description: 'Compact 2-level storage rack for countertops and cabinets. Made from high-grade BPA-free plastic.',
    isTrending: true,
    isFeatured: false,
  },
  {
    id: 104,
    title: 'Rattan Style Laundry Basket with Lid',
    category: 'Household & Storage',
    price: 1950,
    oldPrice: 2300,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80',
    badge: 'SALE',
    badgeColor: 'error',
    inStock: true,
    description: 'Elegant woven pattern laundry hamptons hamper. Lightweight, ventilated, and handles for easy transport.',
    isTrending: false,
    isFeatured: true,
  },
  {
    id: 105,
    title: 'Ergonomic Plastic Armchair Set (4 Pcs)',
    category: 'Furniture Range',
    price: 8900,
    oldPrice: 10500,
    rating: 5.0,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    badge: 'POPULAR',
    badgeColor: 'primary',
    inStock: true,
    description: 'Weather-proof, heavy-duty molded outdoor/indoor plastic chairs. UV resistant and stackable.',
    isTrending: true,
    isFeatured: true,
  },
  {
    id: 106,
    title: 'Luxury Floral Print Bathroom Bucket & Stool Set',
    category: 'Bath Accessories',
    price: 1650,
    oldPrice: 1990,
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    badge: 'NEW',
    badgeColor: 'info',
    inStock: true,
    description: 'Complete 5-piece bathroom set including 20L bucket, heavy stool, mug, and basin with floral print.',
    isTrending: false,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 107,
    title: 'Multi-Function Rotary Chutney & Chopper Maker',
    category: 'Kitchenware Range',
    price: 1250,
    oldPrice: 1500,
    rating: 4.6,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    badge: 'MUST HAVE',
    badgeColor: 'warning',
    inStock: true,
    description: 'Manual hand-crank vegetable chopper and chutney maker. Stainless steel blades with sturdy plastic container.',
    isTrending: true,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 108,
    title: '4-Tier Multipurpose Drawer Storage Unit',
    category: 'Household & Storage',
    price: 3200,
    oldPrice: 3800,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80',
    badge: 'TOP RATED',
    badgeColor: 'success',
    inStock: true,
    description: '4-level sliding drawer cabinet for clothes, toys, office supplies, and household organization.',
    isTrending: true,
    isFeatured: true,
    isNew: true,
  },
])

// Collections thumbnails matching screenshot circle bar
const collections = [
  { name: 'Vegetable Rack', image: 'https://images.unsplash.com/photo-1584473457406-6df3a5025a7c?w=300&auto=format&fit=crop&q=80' },
  { name: 'Chutney Maker', image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&auto=format&fit=crop&q=80' },
  { name: 'Spice Racks', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&auto=format&fit=crop&q=80' },
  { name: 'Multi-Plug Racks', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&auto=format&fit=crop&q=80' },
  { name: 'Bath Tubs & Stools', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&auto=format&fit=crop&q=80' },
]

// Category Banner Cards (4 large cards in screenshot)
const categoryBanners = [
  {
    title: 'KITCHENWARE RANGE',
    subtitle: 'Organized & Elegant Kitchen Solutions',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    color: '#854d0e',
    bgColor: '#fef9c3',
  },
  {
    title: 'HOUSEHOLD RANGE',
    subtitle: 'Essential Storage & Clean Home',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
    color: '#1e3a8a',
    bgColor: '#dbeafe',
  },
  {
    title: 'FURNITURE RANGE',
    subtitle: 'Durable Indoor & Outdoor Seating',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
    color: '#991b1b',
    bgColor: '#fee2e2',
  },
  {
    title: 'BATH ACCESSORIES',
    subtitle: 'Premium Bucket & Bath Utilities',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
    color: '#065f46',
    bgColor: '#d1fae5',
  },
]

// Computed filters
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = !searchQuery.value || p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCat = selectedCategory.value === 'All' || p.category === selectedCategory.value
    return matchesSearch && matchesCat
  })
})

const trendingProducts = computed(() => products.value.filter(p => p.isTrending))
const newArrivals = computed(() => products.value.filter(p => p.isNew))

const cartTotalCount = computed(() => cartItems.value.reduce((acc, item) => acc + item.qty, 0))
const cartTotalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + (item.product.price * item.qty), 0))

// Actions
function addToCart(product: Product) {
  const existing = cartItems.value.find(item => item.product.id === product.id)
  if (existing) {
    existing.qty += quantity.value
  } else {
    cartItems.value.push({ product, qty: quantity.value })
  }
  quantity.value = 1
  showToast(`Added "${product.title}" to Cart!`)
}

function removeFromCart(id: number) {
  cartItems.value = cartItems.value.filter(item => item.product.id !== id)
  showToast('Item removed from cart')
}

function openQuickView(product: Product) {
  selectedProduct.value = product
  quantity.value = 1
  quickViewDialog.value = true
}

function openWhatsApp() {
  window.open('https://wa.me/923214840041?text=Hello%20Everyday%20Plastic,%20I%20am%20interested%20in%20your%20products!', '_blank')
}

// Optional API fetch on mount to enrich with real database products if available
onMounted(async () => {
  try {
    const res = await httpClient.get('/products?page=1&item_per_page=12')
    if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      const apiProds: Product[] = res.data.data.map((item: any, idx: number) => ({
        id: item.id || (1000 + idx),
        title: item.name || item.title || 'Everyday Quality Plastic Product',
        category: item.category?.name || 'Kitchenware Range',
        price: Number(item.price || 1500),
        oldPrice: Number(item.old_price || item.price ? Number(item.price) * 1.2 : 1800),
        rating: 4.8,
        reviewsCount: 45 + idx,
        image: item.image || 'https://images.unsplash.com/photo-1584473457406-6df3a5025a7c?w=600&auto=format&fit=crop&q=80',
        badge: idx % 3 === 0 ? 'SALE' : 'HOT',
        badgeColor: idx % 3 === 0 ? 'error' : 'warning',
        inStock: true,
        description: item.description || 'High quality plastic household item manufactured by Everyday Plastic.',
        isTrending: true,
        isFeatured: true,
      }))
      products.value = [...apiProds, ...products.value]
    }
  } catch (err) {
    console.log('Using predefined theme catalog data')
  }
})
</script>

<template>
  <div class="theme-wrapper">
    <!-- 1. TOP ANNOUNCEMENT & CONTACT BAR -->
    <div class="top-announcement-bar">
      <div class="theme-container d-flex justify-space-between align-center py-1 text-caption">
        <div class="d-none d-md-flex align-center gap-4 text-white">
          <span><VIcon icon="bx-phone-call" size="14" class="mr-1" color="amber-lighten-2" /> +92 321 484 0041 | +92 300 484 0041</span>
          <span><VIcon icon="bx-envelope" size="14" class="mr-1" color="amber-lighten-2" /> info@everydayplastic.co</span>
        </div>

        <div class="ticker-text font-weight-medium text-amber-lighten-3 mx-auto mx-md-0">
          <VIcon icon="bx-gift" size="14" class="mr-1" color="amber" /> FREE DELIVERY ON ORDERS ABOVE RS. 5000 | 100% DURABLE PLASTIC
        </div>

        <div class="d-none d-sm-flex align-center gap-3 text-white">
          <span class="font-weight-semibold">PKR (Rs.)</span>
          <span>|</span>
          <RouterLink to="/admin/login" class="text-white text-decoration-none d-flex align-center gap-1 font-weight-medium hover-gold">
            <VIcon icon="bx-user-circle" size="16" color="amber-lighten-2" /> Admin Login
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 2. MAIN BRAND HEADER -->
    <header class="main-header py-3 bg-surface border-bottom shadow-sm">
      <div class="theme-container d-flex align-center justify-space-between gap-4">
        <!-- Logo -->
        <div class="brand-logo cursor-pointer" @click="router.push('/')">
          <div class="d-flex align-center gap-2">
            <div class="logo-badge bg-red-darken-3 text-white px-3 py-1 rounded-lg font-weight-black text-h6 tracking-wide shadow-sm">
              EVERYDAY
            </div>
            <span class="logo-text font-weight-bold text-h6 text-grey-darken-3 tracking-wider">PLASTIC</span>
          </div>
          <div class="logo-tagline text-caption text-grey-darken-1 font-weight-medium tracking-tight">
            House of Premium Utensils & Household Solutions
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-box-container flex-grow-1 mx-4 d-none d-md-block max-width-600">
          <div class="d-flex align-center search-pill border rounded-pill overflow-hidden bg-grey-lighten-4">
            <select v-model="selectedCategory" class="cat-select border-0 bg-transparent px-3 py-2 text-caption font-weight-semibold text-grey-darken-2 cursor-pointer">
              <option value="All">All Categories</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
            </select>
            <div class="divider-v bg-grey-lighten-2"></div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for kitchenware, racks, containers..."
              class="search-input flex-grow-1 border-0 bg-transparent px-3 py-2 text-body-2 text-grey-darken-3 outline-none"
            />
            <button class="search-btn bg-red-darken-3 text-white border-0 px-4 py-2 cursor-pointer d-flex align-center justify-center transition-fast">
              <VIcon icon="bx-search" size="20" />
            </button>
          </div>
        </div>

        <!-- Right Quick Actions -->
        <div class="header-actions d-flex align-center gap-3">
          <!-- Wishlist -->
          <VBtn icon variant="text" color="grey-darken-2" class="d-none d-sm-flex">
            <VBadge content="0" color="red-darken-2">
              <VIcon icon="bx-heart" size="24" />
            </VBadge>
          </VBtn>

          <!-- Cart Icon -->
          <VBtn color="red-darken-3" variant="flat" class="rounded-pill px-4" @click="cartDrawer = true">
            <VBadge :content="cartTotalCount" color="amber-darken-2" class="mr-2">
              <VIcon icon="bx-shopping-bag" size="22" />
            </VBadge>
            <span class="d-none d-sm-inline font-weight-bold">Rs. {{ cartTotalPrice.toLocaleString() }}</span>
          </VBtn>
        </div>
      </div>
    </header>

    <!-- 3. NAVIGATION BAR -->
    <nav class="theme-nav bg-red-darken-4 text-white">
      <div class="theme-container d-flex align-center justify-space-between">
        <!-- Categories Dropdown Button -->
        <div class="cat-dropdown-trigger bg-amber-darken-2 px-4 py-3 d-flex align-center gap-2 cursor-pointer text-grey-darken-4 font-weight-bold">
          <VIcon icon="bx-grid-alt" size="20" />
          <span>ALL CATEGORIES</span>
          <VIcon icon="bx-chevron-down" size="18" />
        </div>

        <!-- Horizontal Nav Links -->
        <div class="nav-links d-none d-md-flex align-center gap-6 text-subtitle-2 font-weight-medium">
          <RouterLink to="/" class="nav-item active">Home</RouterLink>
          <a href="#kitchenware" class="nav-item">Everyday Kitchen</a>
          <a href="#furniture" class="nav-item">Shop By Furniture</a>
          <a href="#household" class="nav-item">Plastic Range</a>
          <a href="#trending" class="nav-item">Trending Deals</a>
          <a href="#contact" class="nav-item">Contact Us</a>
        </div>

        <!-- Quick Login / Contact Info -->
        <div class="d-flex align-center gap-3 text-caption font-weight-semibold text-amber-lighten-3 pr-2">
          <VIcon icon="bx-time" size="16" /> Mon - Sat: 9:00 AM - 9:00 PM
        </div>
      </div>
    </nav>

    <!-- 4. HERO SECTION (SIDEBAR + MAIN BANNER MATCHING SCREENSHOT) -->
    <section class="hero-wrapper py-4 bg-grey-lighten-4">
      <div class="theme-container">
        <VRow no-gutters class="gap-y-4">
          <!-- Left Category Sidebar -->
          <VCol cols="12" md="3" class="pr-md-3">
            <div class="category-sidebar bg-white rounded-lg border shadow-xs overflow-hidden h-100">
              <div class="sidebar-header bg-grey-lighten-3 px-4 py-3 font-weight-bold text-grey-darken-3 border-bottom d-flex align-center gap-2">
                <VIcon icon="bx-menu" color="red-darken-3" /> Explore Categories
              </div>
              <ul class="sidebar-list list-none p-0 m-0">
                <li v-for="cat in categories" :key="cat.id" class="sidebar-item border-bottom">
                  <a href="#products-section" @click="selectedCategory = cat.name" class="d-flex align-center justify-space-between px-4 py-3 text-decoration-none text-grey-darken-3 hover-bg-red">
                    <span class="d-flex align-center gap-3 text-body-2 font-weight-medium">
                      <VIcon :icon="cat.icon" size="20" color="red-darken-3" />
                      {{ cat.name }}
                    </span>
                    <VIcon icon="bx-chevron-right" size="18" color="grey" />
                  </a>
                </li>
              </ul>
            </div>
          </VCol>

          <!-- Main Hero Banner (Green & Gold Theme matching Screenshot) -->
          <VCol cols="12" md="9">
            <div class="hero-banner-card rounded-lg overflow-hidden position-relative shadow-md">
              <VImg src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80" height="380" cover class="hero-bg-img">
                <div class="hero-overlay d-flex align-center px-6 px-md-10 fill-height">
                  <div class="hero-text-content text-white max-width-500">
                    <span class="hero-badge bg-amber-darken-2 text-grey-darken-4 font-weight-bold px-3 py-1 rounded text-caption mb-3 d-inline-block shadow-sm">
                      Every Day Plastic
                    </span>
                    <h1 class="hero-headline text-h4 text-md-h3 font-weight-black text-amber-lighten-4 mb-2 leading-tight">
                      BEST UTENSIL ORGANIZERS
                    </h1>
                    <p class="hero-subline text-subtitle-1 text-grey-lighten-3 mb-6 font-weight-medium">
                      MAKE YOUR KITCHEN ORGANIZED & ELEGANT
                    </p>

                    <div class="d-flex align-center gap-3">
                      <VBtn color="amber-darken-2" variant="flat" size="large" class="rounded-pill font-weight-bold text-grey-darken-4 px-6 shadow-md" href="#trending">
                        SHOP NOW <VIcon icon="bx-right-arrow-alt" end />
                      </VBtn>
                      <span class="text-caption text-amber-lighten-3 font-weight-semibold">www.everydayplastic.co</span>
                    </div>
                  </div>
                </div>
              </VImg>
            </div>
          </VCol>
        </VRow>
      </div>
    </section>

    <!-- 5. VALUE PROPOSITION FEATURE HIGHLIGHTS BAR -->
    <section class="value-bar py-6 bg-white border-block shadow-xs">
      <div class="theme-container">
        <VRow>
          <VCol cols="6" sm="3" class="border-right">
            <div class="feature-item d-flex align-center gap-3 justify-center">
              <div class="feature-icon-circle bg-red-lighten-5 text-red-darken-3 p-3 rounded-circle">
                <VIcon icon="bx-check-shield" size="28" />
              </div>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-grey-darken-3 mb-0">Quality Products</h4>
                <span class="text-caption text-grey">100% Durable Plastic</span>
              </div>
            </div>
          </VCol>

          <VCol cols="6" sm="3" class="border-right">
            <div class="feature-item d-flex align-center gap-3 justify-center">
              <div class="feature-icon-circle bg-red-lighten-5 text-red-darken-3 p-3 rounded-circle">
                <VIcon icon="bx-package" size="28" />
              </div>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-grey-darken-3 mb-0">Free Delivery</h4>
                <span class="text-caption text-grey">On Orders Above Rs. 5000</span>
              </div>
            </div>
          </VCol>

          <VCol cols="6" sm="3" class="border-right">
            <div class="feature-item d-flex align-center gap-3 justify-center">
              <div class="feature-icon-circle bg-red-lighten-5 text-red-darken-3 p-3 rounded-circle">
                <VIcon icon="bx-refresh" size="28" />
              </div>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-grey-darken-3 mb-0">7 Days Return</h4>
                <span class="text-caption text-grey">Easy Money Back Guarantee</span>
              </div>
            </div>
          </VCol>

          <VCol cols="6" sm="3">
            <div class="feature-item d-flex align-center gap-3 justify-center">
              <div class="feature-icon-circle bg-red-lighten-5 text-red-darken-3 p-3 rounded-circle">
                <VIcon icon="bx-support" size="28" />
              </div>
              <div>
                <h4 class="text-subtitle-2 font-weight-bold text-grey-darken-3 mb-0">24/7 Support</h4>
                <span class="text-caption text-grey">Dedicated Assistance</span>
              </div>
            </div>
          </VCol>
        </VRow>
      </div>
    </section>

    <!-- 6. TRENDING PRODUCTS SECTION -->
    <section id="trending" class="trending-section py-8 bg-grey-lighten-5">
      <div class="theme-container">
        <!-- Section Title -->
        <div class="text-center mb-6">
          <h2 class="section-title text-h5 font-weight-black text-grey-darken-3 tracking-wide mb-1">
            Trending Products
          </h2>
          <div class="title-underline mx-auto bg-red-darken-3 mb-3"></div>
          <p class="text-caption text-grey-darken-1">Handpicked best-selling organizers & plastic accessories for your home</p>
        </div>

        <!-- Product Cards Grid -->
        <VRow>
          <VCol v-for="product in trendingProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <VCard class="product-card h-100 border rounded-lg overflow-hidden elevation-1 hover-shadow transition-fast">
              <!-- Card Image & Badge -->
              <div class="product-img-wrapper position-relative bg-grey-lighten-4 overflow-hidden">
                <VImg :src="product.image" height="220" cover class="product-image transition-slow" />
                
                <span v-if="product.badge" :class="`badge-tag bg-${product.badgeColor} text-white text-caption font-weight-bold px-2 py-1 rounded-r shadow-xs`">
                  {{ product.badge }}
                </span>

                <!-- Quick Action Overlays -->
                <div class="quick-actions-overlay position-absolute fill-height fill-width d-flex align-center justify-center gap-2 transition-fast">
                  <VBtn icon color="white" variant="flat" size="small" class="shadow-md" @click="openQuickView(product)">
                    <VIcon icon="bx-search" color="grey-darken-3" />
                  </VBtn>
                  <VBtn icon color="red-darken-3" variant="flat" size="small" class="shadow-md" @click="addToCart(product)">
                    <VIcon icon="bx-cart-add" color="white" />
                  </VBtn>
                </div>
              </div>

              <!-- Product Details -->
              <VCardItem class="pa-4">
                <span class="text-caption text-grey font-weight-medium d-block mb-1">{{ product.category }}</span>
                <h3 class="product-name text-subtitle-1 font-weight-bold text-grey-darken-3 text-truncate mb-2" :title="product.title">
                  {{ product.title }}
                </h3>

                <!-- Rating -->
                <div class="d-flex align-center gap-1 mb-3">
                  <VRating :model-value="product.rating" color="amber-darken-2" density="compact" size="small" readonly half-increments />
                  <span class="text-caption text-grey font-weight-semibold">({{ product.reviewsCount }})</span>
                </div>

                <!-- Price & Action -->
                <div class="d-flex align-center justify-space-between pt-2 border-top">
                  <div>
                    <span class="text-h6 font-weight-bold text-red-darken-3">Rs. {{ product.price.toLocaleString() }}</span>
                    <span v-if="product.oldPrice" class="text-caption text-grey text-decoration-line-through ml-2">Rs. {{ product.oldPrice.toLocaleString() }}</span>
                  </div>

                  <VBtn color="red-darken-3" size="small" variant="tonal" class="rounded-pill font-weight-bold" @click="addToCart(product)">
                    Add +
                  </VBtn>
                </div>
              </VCardItem>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </section>

    <!-- 7. CATEGORY BANNERS GRID (4 Visual Cards matching screenshot) -->
    <section class="category-banners-section py-8 bg-white">
      <div class="theme-container">
        <VRow>
          <VCol v-for="(banner, idx) in categoryBanners" :key="idx" cols="12" sm="6" md="3">
            <div class="cat-banner-card rounded-lg overflow-hidden border shadow-sm position-relative group cursor-pointer" @click="selectedCategory = banner.title.split(' ')[0]">
              <VImg :src="banner.image" height="240" cover class="cat-banner-img transition-slow">
                <div class="cat-banner-overlay d-flex flex-column justify-end pa-4 text-white">
                  <h3 class="cat-banner-title font-weight-black text-subtitle-1 text-uppercase tracking-wider text-amber-lighten-3 mb-1" :style="{ color: banner.color }">
                    {{ banner.title }}
                  </h3>
                  <span class="cat-banner-sub text-caption text-grey-lighten-3 font-weight-medium mb-3">
                    {{ banner.subtitle }}
                  </span>
                  <div class="cat-banner-link text-caption font-weight-bold text-amber-lighten-2 d-flex align-center gap-1">
                    SHOP COLLECTION <VIcon icon="bx-right-arrow-alt" />
                  </div>
                </div>
              </VImg>
            </div>
          </VCol>
        </VRow>
      </div>
    </section>

    <!-- 8. OUR COLLECTION CIRCLE SHOWCASE -->
    <section class="our-collection-section py-8 bg-grey-lighten-4">
      <div class="theme-container">
        <div class="text-center mb-6">
          <h2 class="section-title text-h5 font-weight-black text-grey-darken-3 tracking-wide mb-1">
            Our Collection
          </h2>
          <div class="title-underline mx-auto bg-red-darken-3 mb-3"></div>
        </div>

        <div class="d-flex align-center justify-center flex-wrap gap-6 py-3">
          <div v-for="(col, i) in collections" :key="i" class="collection-circle-item text-center cursor-pointer" @click="searchQuery = col.name">
            <div class="circle-avatar border-3 border-red-darken-3 rounded-circle overflow-hidden mx-auto mb-2 shadow-sm transition-fast">
              <VImg :src="col.image" width="110" height="110" cover />
            </div>
            <span class="text-subtitle-2 font-weight-bold text-grey-darken-3 d-block">{{ col.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. FEATURED PRODUCTS SECTION -->
    <section id="products-section" class="featured-section py-8 bg-white">
      <div class="theme-container">
        <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-3">
          <div>
            <h2 class="section-title text-h5 font-weight-black text-grey-darken-3 tracking-wide mb-1">
              Featured Products
            </h2>
            <div class="title-underline bg-red-darken-3"></div>
          </div>

          <!-- Category filter buttons -->
          <div class="cat-filter-btns d-flex align-center gap-2 flex-wrap">
            <VBtn
              size="small"
              :variant="selectedCategory === 'All' ? 'flat' : 'outlined'"
              color="red-darken-3"
              class="rounded-pill"
              @click="selectedCategory = 'All'"
            >
              All Items
            </VBtn>
            <VBtn
              v-for="cat in categories"
              :key="cat.id"
              size="small"
              :variant="selectedCategory === cat.name ? 'flat' : 'outlined'"
              color="red-darken-3"
              class="rounded-pill"
              @click="selectedCategory = cat.name"
            >
              {{ cat.name }}
            </VBtn>
          </div>
        </div>

        <!-- Products Grid -->
        <VRow v-if="filteredProducts.length > 0">
          <VCol v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <VCard class="product-card h-100 border rounded-lg overflow-hidden elevation-1 hover-shadow transition-fast">
              <div class="product-img-wrapper position-relative bg-grey-lighten-4 overflow-hidden">
                <VImg :src="product.image" height="220" cover class="product-image transition-slow" />
                <span v-if="product.badge" :class="`badge-tag bg-${product.badgeColor} text-white text-caption font-weight-bold px-2 py-1 rounded-r shadow-xs`">
                  {{ product.badge }}
                </span>

                <div class="quick-actions-overlay position-absolute fill-height fill-width d-flex align-center justify-center gap-2 transition-fast">
                  <VBtn icon color="white" variant="flat" size="small" class="shadow-md" @click="openQuickView(product)">
                    <VIcon icon="bx-search" color="grey-darken-3" />
                  </VBtn>
                  <VBtn icon color="red-darken-3" variant="flat" size="small" class="shadow-md" @click="addToCart(product)">
                    <VIcon icon="bx-cart-add" color="white" />
                  </VBtn>
                </div>
              </div>

              <VCardItem class="pa-4">
                <span class="text-caption text-grey font-weight-medium d-block mb-1">{{ product.category }}</span>
                <h3 class="product-name text-subtitle-1 font-weight-bold text-grey-darken-3 text-truncate mb-2" :title="product.title">
                  {{ product.title }}
                </h3>

                <div class="d-flex align-center gap-1 mb-3">
                  <VRating :model-value="product.rating" color="amber-darken-2" density="compact" size="small" readonly half-increments />
                  <span class="text-caption text-grey font-weight-semibold">({{ product.reviewsCount }})</span>
                </div>

                <div class="d-flex align-center justify-space-between pt-2 border-top">
                  <div>
                    <span class="text-h6 font-weight-bold text-red-darken-3">Rs. {{ product.price.toLocaleString() }}</span>
                    <span v-if="product.oldPrice" class="text-caption text-grey text-decoration-line-through ml-2">Rs. {{ product.oldPrice.toLocaleString() }}</span>
                  </div>

                  <VBtn color="red-darken-3" size="small" variant="flat" class="rounded-pill font-weight-bold" @click="addToCart(product)">
                    Buy Now
                  </VBtn>
                </div>
              </VCardItem>
            </VCard>
          </VCol>
        </VRow>

        <div v-else class="text-center py-12">
          <VIcon icon="bx-package" size="56" color="grey" class="mb-2" />
          <h3 class="text-h6 text-grey-darken-2 font-weight-bold">No products found</h3>
          <p class="text-caption text-grey">Try clearing your category or search filter</p>
          <VBtn color="red-darken-3" variant="tonal" size="small" class="mt-2" @click="selectedCategory = 'All'; searchQuery = ''">
            Reset Filters
          </VBtn>
        </div>
      </div>
    </section>

    <!-- 10. JUST ARRIVED SECTION -->
    <section class="just-arrived-section py-8 bg-grey-lighten-5">
      <div class="theme-container">
        <div class="text-center mb-6">
          <h2 class="section-title text-h5 font-weight-black text-grey-darken-3 tracking-wide mb-1">
            Just Arrived
          </h2>
          <div class="title-underline mx-auto bg-red-darken-3 mb-3"></div>
          <p class="text-caption text-grey-darken-1">Check out our latest plastic kitchenware & household arrivals</p>
        </div>

        <VRow>
          <VCol v-for="product in newArrivals" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <VCard class="product-card h-100 border rounded-lg overflow-hidden elevation-1 hover-shadow transition-fast">
              <div class="product-img-wrapper position-relative bg-grey-lighten-4 overflow-hidden">
                <VImg :src="product.image" height="220" cover class="product-image transition-slow" />
                <span class="badge-tag bg-info text-white text-caption font-weight-bold px-2 py-1 rounded-r shadow-xs">
                  NEW ARRIVAL
                </span>
              </div>

              <VCardItem class="pa-4">
                <span class="text-caption text-grey font-weight-medium d-block mb-1">{{ product.category }}</span>
                <h3 class="product-name text-subtitle-1 font-weight-bold text-grey-darken-3 text-truncate mb-2">
                  {{ product.title }}
                </h3>

                <div class="d-flex align-center justify-space-between pt-2 border-top">
                  <span class="text-h6 font-weight-bold text-red-darken-3">Rs. {{ product.price.toLocaleString() }}</span>
                  <VBtn color="red-darken-3" size="small" variant="flat" class="rounded-pill font-weight-bold" @click="addToCart(product)">
                    Add to Cart
                  </VBtn>
                </div>
              </VCardItem>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </section>

    <!-- 11. FOOTER SECTION MATCHING BLUE BRAND FOOTER IN SCREENSHOT -->
    <footer id="contact" class="theme-footer bg-grey-darken-4 text-grey-lighten-3 pt-10 pb-6">
      <div class="theme-container">
        <VRow class="mb-8">
          <!-- Col 1: Brand & Contact Info -->
          <VCol cols="12" md="4">
            <div class="footer-brand mb-4">
              <div class="logo-badge bg-blue-darken-4 text-white px-3 py-2 rounded-lg font-weight-black text-h6 tracking-wide d-inline-block shadow-sm mb-2 border border-blue-lighten-1">
                EVERYDAY PLASTIC
              </div>
              <p class="text-body-2 text-grey-lighten-1 line-height-relaxed mb-4">
                Everyday Plastic is Pakistan's leading manufacturer of high-grade plastic kitchenware, utility racks, spice containers, and household solutions.
              </p>
            </div>

            <div class="contact-details text-caption text-grey-lighten-2 d-flex flex-column gap-2">
              <div class="d-flex align-center gap-2">
                <VIcon icon="bx-map" color="amber" size="18" />
                <span>Ferozepur Road Industrial Zone, Lahore, Pakistan</span>
              </div>
              <div class="d-flex align-center gap-2">
                <VIcon icon="bx-phone" color="amber" size="18" />
                <span>+92 321 484 0041 | +92 300 484 0041</span>
              </div>
              <div class="d-flex align-center gap-2">
                <VIcon icon="bx-envelope" color="amber" size="18" />
                <span>sales@everydayplastic.co</span>
              </div>
            </div>
          </VCol>

          <!-- Col 2: Quick Links -->
          <VCol cols="6" md="2">
            <h4 class="footer-heading text-subtitle-1 font-weight-bold text-amber-lighten-3 mb-4">Quick Links</h4>
            <ul class="footer-links list-none p-0 m-0 text-body-2 d-flex flex-column gap-2">
              <li><a href="#" class="text-grey-lighten-2 text-decoration-none hover-gold">Home Page</a></li>
              <li><a href="#kitchenware" class="text-grey-lighten-2 text-decoration-none hover-gold">Kitchenware Range</a></li>
              <li><a href="#furniture" class="text-grey-lighten-2 text-decoration-none hover-gold">Furniture Range</a></li>
              <li><a href="#household" class="text-grey-lighten-2 text-decoration-none hover-gold">Household Accessories</a></li>
              <li><a href="/admin/login" class="text-amber-lighten-3 text-decoration-none font-weight-bold">Admin Portal Login</a></li>
            </ul>
          </VCol>

          <!-- Col 3: Support -->
          <VCol cols="6" md="2">
            <h4 class="footer-heading text-subtitle-1 font-weight-bold text-amber-lighten-3 mb-4">Customer Support</h4>
            <ul class="footer-links list-none p-0 m-0 text-body-2 d-flex flex-column gap-2">
              <li><a href="#" class="text-grey-lighten-2 text-decoration-none hover-gold">Free Shipping Policy</a></li>
              <li><a href="#" class="text-grey-lighten-2 text-decoration-none hover-gold">7 Days Return Guarantee</a></li>
              <li><a href="#" class="text-grey-lighten-2 text-decoration-none hover-gold">Wholesale & Bulk Orders</a></li>
              <li><a href="#" class="text-grey-lighten-2 text-decoration-none hover-gold">Privacy & Terms</a></li>
            </ul>
          </VCol>

          <!-- Col 4: Newsletter -->
          <VCol cols="12" md="4">
            <h4 class="footer-heading text-subtitle-1 font-weight-bold text-amber-lighten-3 mb-4">Subscribe to Newsletter</h4>
            <p class="text-caption text-grey-lighten-1 mb-3">Get discount updates & new product launch alerts in your inbox.</p>
            
            <div class="newsletter-form d-flex flex-column gap-2">
              <input type="text" placeholder="Your Name" class="px-3 py-2 rounded bg-grey-darken-3 border-0 text-body-2 text-white outline-none" />
              <input type="email" placeholder="Your Email Address" class="px-3 py-2 rounded bg-grey-darken-3 border-0 text-body-2 text-white outline-none" />
              <VBtn color="amber-darken-2" class="font-weight-bold text-grey-darken-4 rounded" @click="showToast('Thank you for subscribing!')">
                SUBSCRIBE NOW
              </VBtn>
            </div>
          </VCol>
        </VRow>

        <div class="footer-bottom border-top border-grey-darken-3 pt-4 d-flex align-center justify-space-between flex-wrap gap-2 text-caption text-grey">
          <span>&copy; {{ new Date().getFullYear() }} Everyday Plastic / Everyday Group of Companies. All Rights Reserved.</span>
          <span>Designed & Maintained for everydaygroup.co</span>
        </div>
      </div>
    </footer>

    <!-- FLOATING WHATSAPP & ASK COMPANY BUTTONS -->
    <div class="floating-actions position-fixed bottom-6 right-6 d-flex flex-column gap-3 z-index-99">
      <VBtn color="green-darken-2" icon size="large" class="elevation-6 rounded-circle" @click="openWhatsApp" title="Chat on WhatsApp">
        <VIcon icon="bxl-whatsapp" size="32" color="white" />
      </VBtn>
    </div>

    <!-- QUICK VIEW DIALOG -->
    <VDialog v-model="quickViewDialog" max-width="650">
      <VCard v-if="selectedProduct" class="rounded-lg overflow-hidden pa-4">
        <VRow>
          <VCol cols="12" md="6">
            <VImg :src="selectedProduct.image" height="280" cover class="rounded-lg border" />
          </VCol>
          <VCol cols="12" md="6" class="d-flex flex-column justify-space-between">
            <div>
              <span class="text-caption text-red-darken-3 font-weight-bold text-uppercase">{{ selectedProduct.category }}</span>
              <h2 class="text-h6 font-weight-bold text-grey-darken-3 mb-2">{{ selectedProduct.title }}</h2>
              <div class="d-flex align-center gap-1 mb-2">
                <VRating :model-value="selectedProduct.rating" color="amber-darken-2" density="compact" size="small" readonly half-increments />
                <span class="text-caption text-grey">({{ selectedProduct.reviewsCount }} customer reviews)</span>
              </div>
              <p class="text-body-2 text-grey-darken-1 mb-4">{{ selectedProduct.description }}</p>
              
              <div class="price-box mb-4">
                <span class="text-h5 font-weight-bold text-red-darken-3">Rs. {{ selectedProduct.price.toLocaleString() }}</span>
                <span v-if="selectedProduct.oldPrice" class="text-caption text-grey text-decoration-line-through ml-2">Rs. {{ selectedProduct.oldPrice.toLocaleString() }}</span>
              </div>

              <div class="qty-selector d-flex align-center gap-3 mb-4">
                <span class="text-caption font-weight-bold">Quantity:</span>
                <VBtn icon size="x-small" variant="outlined" @click="quantity > 1 ? quantity-- : null">-</VBtn>
                <span class="font-weight-bold px-2">{{ quantity }}</span>
                <VBtn icon size="x-small" variant="outlined" @click="quantity++">+</VBtn>
              </div>
            </div>

            <VBtn color="red-darken-3" block size="large" class="rounded-pill font-weight-bold" @click="addToCart(selectedProduct); quickViewDialog = false">
              Add to Shopping Cart
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>

    <!-- CART SLIDE-OVER DRAWER -->
    <VNavigationDrawer v-model="cartDrawer" location="right" temporary width="380" class="cart-drawer">
      <div class="pa-4 bg-red-darken-4 text-white d-flex align-center justify-space-between">
        <div class="d-flex align-center gap-2">
          <VIcon icon="bx-shopping-bag" size="24" />
          <h3 class="text-subtitle-1 font-weight-bold mb-0">Your Shopping Cart</h3>
        </div>
        <VBtn icon variant="text" color="white" size="small" @click="cartDrawer = false">
          <VIcon icon="bx-x" />
        </VBtn>
      </div>

      <div v-if="cartItems.length > 0" class="cart-body pa-4 flex-grow-1 overflow-y-auto">
        <div v-for="item in cartItems" :key="item.product.id" class="cart-item d-flex gap-3 py-3 border-bottom align-center">
          <VImg :src="item.product.image" width="60" height="60" cover class="rounded border flex-shrink-0" />
          <div class="flex-grow-1 min-width-0">
            <h4 class="text-body-2 font-weight-bold text-truncate text-grey-darken-3 mb-1">{{ item.product.title }}</h4>
            <span class="text-caption text-grey">{{ item.qty }} x Rs. {{ item.product.price.toLocaleString() }}</span>
          </div>
          <VBtn icon variant="text" color="error" size="x-small" @click="removeFromCart(item.product.id)">
            <VIcon icon="bx-trash" />
          </VBtn>
        </div>

        <div class="cart-footer border-top pt-4 mt-4">
          <div class="d-flex align-center justify-space-between mb-3 text-subtitle-1 font-weight-bold">
            <span>Total Subtotal:</span>
            <span class="text-red-darken-3">Rs. {{ cartTotalPrice.toLocaleString() }}</span>
          </div>
          <p class="text-caption text-grey mb-4">Taxes and shipping calculated at checkout.</p>
          <VBtn color="red-darken-3" block size="large" class="rounded-pill font-weight-bold mb-2" @click="showToast('Proceeding to Checkout...')">
            Proceed to Checkout
          </VBtn>
          <VBtn variant="outlined" color="grey" block size="small" class="rounded-pill" @click="cartDrawer = false">
            Continue Shopping
          </VBtn>
        </div>
      </div>

      <div v-else class="text-center pa-8">
        <VIcon icon="bx-cart" size="64" color="grey-lighten-1" class="mb-3" />
        <h4 class="text-subtitle-1 font-weight-bold text-grey-darken-2">Your cart is empty</h4>
        <p class="text-caption text-grey mb-4">Add products from the catalog to see them here.</p>
        <VBtn color="red-darken-3" variant="flat" size="small" class="rounded-pill" @click="cartDrawer = false">
          Start Shopping
        </VBtn>
      </div>
    </VNavigationDrawer>

    <!-- GLOBAL TOAST SNACKBAR -->
    <VSnackbar v-model="snackbar" timeout="3000" color="red-darken-4" location="bottom right">
      <div class="d-flex align-center gap-2 text-subtitle-2 font-weight-medium">
        <VIcon icon="bx-check-circle" color="amber" />
        {{ snackbarText }}
      </div>
    </VSnackbar>
  </div>
</template>

<style lang="scss" scoped>
.theme-wrapper {
  font-family: 'Roboto', 'Outfit', sans-serif;
  color: #333;
  background-color: #f8fafc;
  min-height: 100vh;
}

.theme-container {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: 1rem;
}

/* 1. Top Bar */
.top-announcement-bar {
  background-color: #7f1d1d;
  color: #fff;

  .hover-gold:hover {
    color: #fcd34d !important;
  }
}

/* 2. Header */
.main-header {
  .logo-badge {
    letter-spacing: 1px;
    background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  }

  .search-pill {
    background-color: #f1f5f9;

    .cat-select {
      outline: none;
      width: 140px;
    }

    .divider-v {
      width: 1px;
      height: 24px;
    }

    .search-input {
      min-width: 200px;
    }

    .search-btn:hover {
      background-color: #991b1b !important;
    }
  }
}

/* 3. Navigation */
.theme-nav {
  .cat-dropdown-trigger {
    transition: background-color 0.2s ease;
    border-radius: 4px 4px 0 0;

    &:hover {
      background-color: #f59e0b !important;
    }
  }

  .nav-links {
    .nav-item {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding-block: 0.75rem;
      position: relative;
      transition: color 0.2s ease;

      &:hover,
      &.active {
        color: #fcd34d;
      }

      &.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #fcd34d;
        border-radius: 3px 3px 0 0;
      }
    }
  }
}

/* 4. Hero Section */
.hero-wrapper {
  .category-sidebar {
    .sidebar-item a {
      transition: all 0.2s ease;

      &:hover {
        background-color: #fef2f2;
        padding-left: 1.25rem !important;

        span {
          color: #b91c1c !important;
        }
      }
    }
  }

  .hero-banner-card {
    border: 1px solid #e2e8f0;

    .hero-overlay {
      background: linear-gradient(90deg, rgba(6, 78, 59, 0.92) 0%, rgba(4, 120, 87, 0.75) 50%, rgba(0, 0, 0, 0.3) 100%);
    }

    .hero-headline {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
}

/* 5. Value Bar */
.value-bar {
  .border-right {
    border-right: 1px solid #f1f5f9;

    @media (max-width: 600px) {
      border-right: none;
    }
  }

  .feature-icon-circle {
    transition: transform 0.3s ease;
  }

  .feature-item:hover .feature-icon-circle {
    transform: scale(1.1);
  }
}

/* Section Title Underline */
.section-title {
  position: relative;
}

.title-underline {
  width: 60px;
  height: 3.5px;
  border-radius: 2px;
}

/* Product Cards */
.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-6px);

    .product-image {
      transform: scale(1.06);
    }

    .quick-actions-overlay {
      opacity: 1;
    }
  }

  .badge-tag {
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 2;
  }

  .quick-actions-overlay {
    opacity: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 3;
  }
}

/* 7. Category Banners */
.cat-banner-card {
  .cat-banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%);
    transition: background 0.3s ease;
  }

  &:hover {
    .cat-banner-img {
      transform: scale(1.08);
    }

    .cat-banner-overlay {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.3) 70%, transparent 100%);
    }
  }
}

/* 8. Our Collection Circles */
.collection-circle-item {
  &:hover {
    .circle-avatar {
      transform: scale(1.08) rotate(2deg);
      border-color: #b91c1c !important;
    }
  }
}

.z-index-99 {
  z-index: 99;
}
</style>
