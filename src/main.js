import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios';

axios.defaults.baseURL = "http://192.168.10.49:3000"

createApp(App).use(router).mount('#app');
