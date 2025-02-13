import { createApp } from 'vue'

import App from '@/App.vue'
import '@/auth/api'
import '@core/scss/template/index.scss'
import { registerPlugins } from '@core/utils/plugins'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')
