import '@/assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import UUID from "vue3-uuid"

const defaultTitle = 'MyApp'   // fallback if a route lacks meta.title

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ?? defaultTitle
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UUID)

app.mount('#app')
