import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'


const vue =createApp(App)
const pinia =createPinia()


vue.use(pinia)
vue.mount('#app')
