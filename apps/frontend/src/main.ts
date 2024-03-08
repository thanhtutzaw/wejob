import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import router from './router'
import config from '../formkit.config'
// import { store } from './stores/.vuex'
const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(store as any)
app.use(plugin, defaultConfig(config))
app.mount('#app')
