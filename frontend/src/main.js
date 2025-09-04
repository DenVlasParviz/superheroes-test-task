import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


export const API_BASE_URL = 'http://localhost:3000';

createApp(App).use(router).mount('#app')
