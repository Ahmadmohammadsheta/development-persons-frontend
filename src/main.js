import { createApp } from 'vue';
import App from './App.vue';

import store from './store'; // Vuex store
import router from './router.js'; // Vuex router

const app = createApp(App)

app.use(store)
app.use(router)

// createApp(App).mount('#app')
app.mount('#app')