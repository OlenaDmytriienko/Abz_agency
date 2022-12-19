import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "vue-progressive-image/dist/style.css"; // <--- very important!
import VueProgressiveImage from 'vue-progressive-image'
// import './style/index.css' use when needed
createApp(App).use(store).use(router).use(VueProgressiveImage).mount('#app')

