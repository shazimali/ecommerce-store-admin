import App from '@/App.vue';
import '@/auth/api';
import '@core/scss/template/index.scss';
import { registerPlugins } from '@core/utils/plugins';
import '@layouts/styles/index.scss';
import '@styles/styles.scss';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { createApp } from 'vue';
import 'vue3-toastify/dist/index.css';

    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY, 
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, 
        forceTLS: true,
    });
    
const app = createApp(App)
registerPlugins(app)
app.component('QuillEditor', QuillEditor)
app.mount('#app')


