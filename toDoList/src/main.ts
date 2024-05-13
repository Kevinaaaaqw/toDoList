import 'uno.css'
import '@fortawesome/fontawesome-free'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//使用日期選擇器
app.component('VueDatePicker', VueDatePicker);

//pinia持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)


app.use(router)

app.mount('#app')
