import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from './stores'

import App from './App.vue'
import router from './router'
import './style/index.scss'


const start=()=>{
  const app = createApp(App)
  app.use(pinia)
  app.use(router)
  app.mount('#app')
  return app
}

start()


