import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "vue-progressive-image/dist/style.css"; // <--- very important!
import FloatingVue from 'floating-vue'
// import './style/index.css' use when needed
createApp(App).use(store).use(router).use(FloatingVue, {
    themes: {
        'info-tooltip': {
        $extend: 'tooltip',
        placement: 'bottom',
        delay: 50,
      },
    },
  }).mount('#app')

