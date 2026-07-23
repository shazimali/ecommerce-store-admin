<script setup lang="ts">
import { computed, ref } from 'vue'

interface BrandWebsite {
  id: number
  title: string
  subtitle: string
  description: string
  domain: string
  domainDisplay: string
  tag: string
  iconClass: string
  image: string
  highlights: string[]
}

const darkMode = ref(false)
const searchQuery = ref('')
const menuOpen = ref(false)

const websites = ref<BrandWebsite[]>([
  {
    id: 1,
    title: 'Everyday Plastic',
    subtitle: 'Kitchenware & Homeware',
    description: 'Shop premium plastic kitchen storage, 3-in-1 plate racks, spice racks, shoe racks, laundry baskets and home organizers for Pakistani homes.',
    domain: 'https://everydayplastic.co',
    domainDisplay: 'everydayplastic.co',
    tag: 'Kitchenware & Storage',
    iconClass: 'fa-solid fa-box-open',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    highlights: ['Plate Racks (3-in-1)', 'Spice Racks', 'Multi-Purpose Racks', 'Laundry Baskets'],
  },
  {
    id: 2,
    title: 'Everyday Home Appliances',
    subtitle: 'Home & Kitchen Electronics',
    description: 'Smart kitchen gadgets, electric choppers, food processors, fans and home comfort tech for modern Pakistani households.',
    domain: 'https://everydayhomeappliances.co',
    domainDisplay: 'everydayhomeappliances.co',
    tag: 'Appliances & Tech',
    iconClass: 'fa-solid fa-plug',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&auto=format&fit=crop&q=80',
    highlights: ['Electric Choppers', 'Food Processors', 'Cooling & Heating', 'Kitchen Gadgets'],
  },
  {
    id: 3,
    title: 'Everyday Sanitary',
    subtitle: 'Bath Accessories & Fittings',
    description: 'Complete bath sets, 20L heavy buckets, bath stools, soap dishes, ceramic basins and durable plumbing ware.',
    domain: 'https://everydaysanitary.co',
    domainDisplay: 'everydaysanitary.co',
    tag: 'Bath & Sanitary Ware',
    iconClass: 'fa-solid fa-bath',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
    highlights: ['5-Piece Bath Sets', 'Bath Stools & Tubs', 'Soap Dishes & Mugs', 'Sanitary Fittings'],
  },
  {
    id: 4,
    title: 'Everyday Furniture',
    subtitle: 'Chairs, Tables & Baby Seating',
    description: 'Baby rocking chairs, small and jumbo plastic tables, ergonomic armchairs, study desks and outdoor patio furniture.',
    domain: 'https://everydayfurniture.co',
    domainDisplay: 'everydayfurniture.co',
    tag: 'Furniture & Seating',
    iconClass: 'fa-solid fa-chair',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
    highlights: ['Baby Rocking Chairs', 'Jumbo Plastic Tables', 'Armchairs & Seating', 'Kids Study Desks'],
  },
])

const filteredWebsites = computed(() => {
  if (!searchQuery.value) return websites.value
  const q = searchQuery.value.toLowerCase()
  return websites.value.filter(
    w => w.title.toLowerCase().includes(q) ||
         w.tag.toLowerCase().includes(q) ||
         w.subtitle.toLowerCase().includes(q)
  )
})

function openWhatsApp() {
  window.open('https://wa.me/923363413244', '_blank')
}
</script>

<template>
  <!--
    This page uses the EXACT same HTML structure and CSS classes as ~/Sites/everyday-shops
    CSS is loaded from https://everydayplastic.co/build/assets/ in index.html
    so all Tailwind tokens (bg-primary, bg-secondary, text-primary, etc.) work as-is.
  -->
  <div :class="{ 'dark': darkMode }" class="dark:bg-black bg-white w-full">

    <!-- ══════════════════════════════════════════════════════ -->
    <!-- STICKY HEADER WRAPPER                                  -->
    <!-- ══════════════════════════════════════════════════════ -->
    <div class="sticky lg:block md:block xs:hidden top-0 z-50">

      <!-- 1. NEWS MARQUEE — inc/news.blade.php -->
      <div class="flex flex-col items-center justify-center">
        <marquee class="bg-primary text-black">
          <small>
            Enjoy FREE Home Delivery on orders above Rs. 3,999/- | Welcome to Every Day Group — Deal in Quality Products
          </small>
        </marquee>
      </div>

      <!-- 2. HEADER INFO BAR — inc/header_with_info.blade.php -->
      <div class="grid lg:grid-cols-3 md:grid-cols-3 bg-secondary dark:bg-black py-2 px-8 font-normal dark:border-b dark:border-b-slate-800" :style="{ backgroundColor: darkMode ? '#000000' : 'rgb(237 241 255)' }">
        <div>
          <a class="hover:text-primary dark:text-secondary border-solid border-black dark:border-secondary border-r-2 pr-2 dark:hover:text-primary" href="tel:+923363413244">
            <i class="fa-solid fa-phone text-primary dark:hover:text-primary"></i>&nbsp;
            <span class="text-black hover:text-primary dark:text-secondary dark:hover:text-primary">+92 336 3413244</span>
          </a>
          <a class="hover:text-primary dark:text-secondary pl-3 dark:hover:text-primary" href="mailto:info@everydayplastic.co">
            <i class="fa-solid fa-envelope text-primary dark:hover:text-primary"></i>&nbsp;
            <span class="text-black hover:text-primary dark:text-secondary dark:hover:text-primary">info@everydayplastic.co</span>
          </a>
        </div>

        <div class="text-center bg-gradient-to-r from-orange-200 via-red-500 to-violet-600 bg-clip-text text-transparent font-semibold">
          Welcome to Every Day Group. Deal in Quality Products
        </div>

        <div class="text-end text-black dark:text-primary">
          <a class="mr-3 text-black dark:text-primary hover:text-primary py-2" target="_blank" href="https://www.facebook.com/everydayoffcl">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a class="mr-3 text-black dark:text-primary hover:text-primary py-2" target="_blank" href="https://www.instagram.com/everydayoffcl/">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a class="mr-3 text-black dark:text-primary hover:text-primary py-2" target="_blank" href="https://twitter.com/EverydayOffcl">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a class="mr-3 text-black dark:text-primary hover:text-primary py-2" target="_blank" href="https://www.youtube.com/@everydayoffcl">
            <i class="fa-brands fa-youtube"></i>
          </a>
          <!-- theme_changer.blade.php — exact copy -->
          <button
            @click="darkMode = !darkMode"
            class="lg:border-l-2 md:border-l-2 lg:border-solid md:border-solid lg:border-black md:border-black lg:dark:border-primary md:dark:border-primary lg:dark:border-solid md:dark:border-solid lg:dark:border-l-2 md:dark:border-l-2 pl-3"
          >
            <i v-show="!darkMode" class="fa-solid fa-moon text-black dark:text-primary"></i>
            <i v-show="darkMode" class="fa-solid fa-sun text-secondary dark:text-primary"></i>
          </button>
        </div>
      </div>

      <!-- 3. LOGO + SEARCH + CART — layouts/header.blade.php -->
      <div class="grid lg:grid-cols-3 md:grid-cols-3 py-5 px-8 bg-white border-secondary border-b dark:bg-black dark:border-b-slate-800">
        <div class="text-4xl font-semibold">
          <a href="/">
            <span class="text-primary dark:text-secondary uppercase">everyday</span>
            <span class="dark:text-primary text-black uppercase"> Group</span>
          </a>
        </div>

        <!-- Search — global-search livewire equivalent -->
        <div class="relative text-black dark:text-white">
          <div class="flex justify-center">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search For Products"
              class="placeholder-black dark:placeholder-white lg:py-3 md:py-3 sm:py-2 xs:py-2 lg:px-4 md:px-4 sm:px-2 xs:px-2 block text-sm border border-secondary w-full dark:bg-black dark:border-slate-800"
            />
            <i class="lg:-ml-7 md:-ml-7 sm:-ml-[1.4rem] xs:-ml-[1.4rem] lg:mt-4 md:mt-4 sm:mt-[0.7rem] xs:mt-[0.7rem] text-primary fas fa-search"></i>
          </div>
        </div>

        <!-- Cart button (Admin Portal for this admin app) -->
        <div class="text-end">
          <div class="drawer-content mt-3 cursor-pointer">
            <RouterLink
              to="/login"
              class="drawer-button text-primary border border-solid border-secondary dark:border-slate-800 py-3 px-6 inline-block"
            >
              <i class="fa-solid fa-user-lock"></i>
              <span class="text-black dark:text-white text-sm font-semibold ml-1">Admin Portal</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- 4. NAVBAR — inc/navbar.blade.php -->
      <div class="lg:block md:block sm:hidden xs:hidden relative z-40">
        <div class="grid lg:grid-cols-4 md:grid-cols-4 gap-5 px-8 bg-white dark:bg-black">
          <!-- Left: Collections dropdown trigger (nav-bar-collection livewire equivalent) -->
          <div>
            <li
              @click="menuOpen = !menuOpen"
              class="bg-primary text-black block py-3 font-normal pl-5 border-secondary dark:text-white dark:border-slate-800 border-b list-none cursor-pointer flex justify-between items-center"
            >
              <span>
                <i class="fa-solid fa-layer-group mr-2"></i> Our Divisions
              </span>
              <div class="inline-block pr-5">
                <i :class="menuOpen ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'"></i>
              </div>
            </li>
            <!-- Dropdown menu -->
            <li
              v-show="menuOpen"
              class="absolute z-50 list-none"
              style="width: 22.8%"
            >
              <ul class="relative">
                <li
                  v-for="site in websites"
                  :key="site.id"
                  class="bg-white text-black cursor-pointer pl-5 block font-normal py-2 border-secondary border-b border-l border-r dark:text-secondary dark:border-slate-800 dark:bg-black hover:text-primary"
                >
                  <a :href="site.domain" target="_blank" class="hover:text-primary flex justify-between items-center pr-5">
                    <span>
                      <i :class="site.iconClass" class="text-primary mr-2.5 w-4 text-center"></i>
                      {{ site.title }}
                    </span>
                    <i class="fa-solid fa-caret-right text-xs"></i>
                  </a>
                </li>
              </ul>
            </li>
          </div>

          <!-- Right: nav links -->
          <div class="col-span-3 grid grid-cols-2 py-3 bg-white text-black dark:bg-black relative">
            <ul class="flex items-center">
              <li class="mr-6">
                <a class="text-primary dark:text-primary font-semibold flex items-center gap-1.5" href="#portals">
                  <i class="fa-solid fa-house text-xs"></i> Home
                </a>
              </li>
              <li class="mr-6">
                <a class="hover:text-primary dark:text-secondary dark:hover:text-primary flex items-center gap-1.5" href="https://everydayplastic.co" target="_blank">
                  <i class="fa-solid fa-box-open text-primary text-xs"></i> Plastic
                </a>
              </li>
              <li class="mr-6">
                <a class="hover:text-primary dark:text-secondary dark:hover:text-primary flex items-center gap-1.5" href="https://everydayhomeappliances.co" target="_blank">
                  <i class="fa-solid fa-plug text-primary text-xs"></i> Appliances
                </a>
              </li>
              <li class="mr-6">
                <a class="hover:text-primary dark:text-secondary dark:hover:text-primary flex items-center gap-1.5" href="https://everydaysanitary.co" target="_blank">
                  <i class="fa-solid fa-bath text-primary text-xs"></i> Sanitary
                </a>
              </li>
              <li class="mr-6">
                <a class="hover:text-primary dark:text-secondary dark:hover:text-primary flex items-center gap-1.5" href="https://everydayfurniture.co" target="_blank">
                  <i class="fa-solid fa-chair text-primary text-xs"></i> Furniture
                </a>
              </li>
            </ul>
            <ul class="flex justify-end">
              <li class="mr-4 text-xs text-black dark:text-secondary font-semibold">
                <i class="fa-solid fa-clock text-primary mr-1"></i> Mon - Sat: 9:00 AM - 9:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div><!-- end sticky -->

    <!-- ══════════════════════════════════════════════════════ -->
    <!-- MAIN CONTENT — home.blade.php @section('content')     -->
    <!-- ══════════════════════════════════════════════════════ -->
    <section class="bg-white dark:bg-black text-black dark:text-secondary">

      <!-- Facilities row (matching home.blade.php facilities grid) -->
      <div class="lg:block md:block sm:block xs:hidden">
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-5 lg:px-8 md:px-8 xs:px-2 mt-12 lg:mt-16 md:mt-16 dark:text-secondary">
          <div class="p-5 border border-secondary flex justify-center dark:border-slate-800">
            <span><i class="fa-solid fa-truck text-primary text-5xl"></i></span>
            <h1 class="lg:text-2xl md:text-2xl xs:text-1xl mt-2 font-bold ml-3">Free Delivery</h1>
          </div>
          <div class="p-5 border border-secondary flex justify-center dark:border-slate-800">
            <span><i class="fa-solid fa-shield-halved text-primary text-5xl"></i></span>
            <h1 class="lg:text-2xl md:text-2xl xs:text-1xl mt-2 font-bold ml-3">Quality Assured</h1>
          </div>
          <div class="p-5 border border-secondary flex justify-center dark:border-slate-800">
            <span><i class="fa-solid fa-rotate-left text-primary text-5xl"></i></span>
            <h1 class="lg:text-2xl md:text-2xl xs:text-1xl mt-2 font-bold ml-3">Easy Returns</h1>
          </div>
          <div class="p-5 border border-secondary flex justify-center dark:border-slate-800">
            <span><i class="fa-solid fa-headset text-primary text-5xl"></i></span>
            <h1 class="lg:text-2xl md:text-2xl xs:text-1xl mt-2 font-bold ml-3">24/7 Support</h1>
          </div>
        </div>
      </div>

      <!-- Section heading — matching home.blade.php "Our Collection" h1 style -->
      <div id="portals" class="mt-16 text-center">
        <h1 class="font-bold lg:text-4xl md:text-4xl sm:text-2xl xs:text-2xl dark:text-secondary">
          Our Brand Websites
        </h1>
      </div>

      <!-- 4 Brand Website cards — product_box.blade.php pattern -->
      <div class="mt-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 lg:px-8 md:px-8 sm:px-2 xs:px-2 pb-16">

        <a
          v-for="site in filteredWebsites"
          :key="site.id"
          :href="site.domain"
          target="_blank"
          class="block border border-secondary dark:border-slate-800 group hover:border-primary/60 dark:hover:border-primary/60 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-slate-950 transition-all duration-300"
        >
          <!-- Card image (product_box image div pattern) -->
          <div class="w-full relative overflow-hidden bg-cover bg-no-repeat border-b border-secondary dark:border-slate-800">
            <!-- Active store badge (discount badge pattern) -->
            <div class="absolute right-0 top-0 z-10 w-auto px-2 py-1 bg-green-600 text-white text-center text-xs font-extrabold">
              Active Store
            </div>

            <img
              :src="site.image"
              :alt="site.title"
              class="transition duration-300 ease-in-out group-hover:scale-110 w-full"
              style="height: 280px; object-fit: cover;"
            />
          </div>

          <!-- Card body (product_box text div pattern) -->
          <div class="border-b border-secondary dark:border-slate-800 py-5 px-6 text-center dark:text-secondary">
            <!-- Tag / category -->
            <div class="flex items-center justify-center gap-2 text-primary text-xs font-semibold mb-2">
              <i :class="site.iconClass"></i>
              <span>{{ site.tag }}</span>
            </div>

            <!-- Title — group-hover:text-primary as in product_box -->
            <h1 class="text-xl font-bold group-hover:text-primary transition-colors duration-300 mb-1">
              {{ site.title }}
            </h1>

            <!-- Subtitle -->
            <h2 class="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {{ site.subtitle }}
            </h2>

            <!-- Description -->
            <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {{ site.description }}
            </p>

            <!-- Highlights -->
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <span
                v-for="(hl, i) in site.highlights"
                :key="i"
                class="bg-primary text-black font-medium text-xs px-2.5 py-1 border border-primary"
                :style="{ backgroundColor: 'rgb(209, 156, 151)', color: '#000000' }"
              >
                {{ hl }}
              </span>
            </div>

            <!-- CTA — "View Detail" link pattern from navbar new arrivals -->
            <div class="w-full">
              <span class="block text-xs border border-secondary p-1 hover:text-primary hover:border-primary dark:border-slate-700 py-2 transition-colors duration-200 group-hover:text-primary group-hover:border-primary">
                <i class="fa-regular fa-eye text-primary"></i>
                Visit {{ site.domainDisplay }}
              </span>
            </div>
          </div>
        </a>

        <!-- Empty search state -->
        <div v-if="filteredWebsites.length === 0" class="col-span-2 text-center py-16 dark:text-secondary">
          <i class="fa-solid fa-search text-4xl text-primary mb-3 block"></i>
          <h3 class="text-lg font-bold mb-2">No website matching "{{ searchQuery }}"</h3>
          <p class="text-xs text-gray-500 mb-4">Try: Plastic, Appliances, Sanitary, or Furniture</p>
          <button @click="searchQuery = ''" class="bg-primary text-white py-2 px-4 text-sm">
            Show All Websites
          </button>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════ -->
    <!-- FOOTER — layouts/footer.blade.php (exact copy)        -->
    <!-- ══════════════════════════════════════════════════════ -->
    <div class="mt-16 text-black">
      <div class="bg-secondary py-10 border-b-2 border-white dark:bg-black dark:border-slate-800" :style="{ backgroundColor: darkMode ? '#000000' : 'rgb(237 241 255)' }">
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-10 px-8">
          <!-- Col 1: Brand + Address -->
          <div>
            <a class="block" href="/">
              <h1 class="text-2xl font-semibold text-center my-2">
                <span class="text-primary dark:text-black uppercase">EveryDay</span>
                <span class="text-black dark:text-primary ml-1 uppercase">Group</span>
              </h1>
            </a>
            <div class="mt-3">
              <i class="fa-solid fa-location-dot text-primary"></i>
              <span class="text-black"> Ali Pur Chowk, Raj Kot, Gondlanwala Road, Gujranwala, PK</span>
            </div>
            <div class="mt-3">
              <i class="fa-solid fa-envelope text-primary"></i>
              <a href="mailto:info@everydayplastic.co" class="hover:text-primary"> info@everydayplastic.co</a>
            </div>
            <div class="mt-3">
              <i class="fa-solid fa-phone text-primary"></i>
              <a href="tel:+923363413244" class="hover:text-primary"> +92 336 3413244</a>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div>
            <h1 class="font-bold text-2xl mb-3">Quick Links</h1>
            <ul>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="#portals">Home</a></li>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="https://everydayplastic.co" target="_blank">Everyday Plastic</a></li>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="https://everydayhomeappliances.co" target="_blank">Everyday Appliances</a></li>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="https://everydaysanitary.co" target="_blank">Everyday Sanitary</a></li>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="https://everydayfurniture.co" target="_blank">Everyday Furniture</a></li>
            </ul>
          </div>

          <!-- Col 3: Support -->
          <div>
            <h1 class="font-bold text-2xl mb-3">Support</h1>
            <ul>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="#">Privacy Policy</a></li>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="#">Terms &amp; Conditions</a></li>
              <li class="py-1"><a class="hover:text-primary hover:underline" href="#">Return Policy</a></li>
              <li class="py-1"><RouterLink class="hover:text-primary hover:underline" to="/login">Admin Portal</RouterLink></li>
            </ul>
          </div>

          <!-- Col 4: Newsletter — exact from footer.blade.php -->
          <div>
            <h1 class="font-bold text-2xl mb-3">Newsletter</h1>
            <form @submit.prevent>
              <input type="text" placeholder="Your Name" class="w-full p-2 py-3 my-2 border border-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-secondary dark:placeholder-gray-500" />
              <input type="email" placeholder="Your Email" class="w-full p-2 py-3 my-2 border border-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-secondary dark:placeholder-gray-500" />
              <button class="bg-primary text-white p-2 my-2 w-full py-3 hover:opacity-90 transition">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Copyright bar -->
      <div class="bg-secondary lg:px-8 md:px-8 sm:px-8 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 py-5 dark:bg-black dark:border-t dark:border-slate-800" :style="{ backgroundColor: darkMode ? '#000000' : 'rgb(237 241 255)' }">
        <div class="lg:text-start md:text-start sm:text-start xs:text-center">
          All reserved by <b>Every day Group</b>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════ -->
    <!-- WHATSAPP FLOATING BUTTON — footer.blade.php exact copy -->
    <!-- ══════════════════════════════════════════════════════ -->
    <div class="fixed bottom-4 left-4 sm:bottom-6 sm:left-6" style="z-index: 2147483647;">
      <button
        id="whatsappButton"
        class="bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-[#1ea952] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-emerald-400/40 cursor-pointer"
        @click="openWhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
        </svg>
      </button>
    </div>

  </div>
</template>

<style>
.bg-secondary {
  background-color: rgb(237 241 255 / var(--tw-bg-opacity, 1)) !important;
}
.dark .dark\:bg-black,
.dark .bg-secondary {
  background-color: #000000 !important;
}
</style>

