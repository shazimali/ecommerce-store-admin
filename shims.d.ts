import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {    
    Pusher: typeof Pusher;
    Echo : Echo;
}
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module 'vue-prism-component' {
  import { ComponentOptions } from 'vue';
  const component: ComponentOptions
  export default component
}
declare module 'vue-shepherd';
