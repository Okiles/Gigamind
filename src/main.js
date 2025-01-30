import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import profile from './plugins/profile'
import gameSettings from './plugins/gameSettings'

const app = createApp(App)

app.use(profile)
app.use(gameSettings)
app.use(router)

app.mount('#app')
