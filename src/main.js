import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
import { createPinia } from 'pinia'
const pinia = createPinia();

app.use(router).use(ElementPlus).use(pinia).mount('#app');
