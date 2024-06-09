import { createApp } from 'vue'
import { router } from './router';
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue'

const app = createApp(App);

// ROUTER
app.use(router);

app.mount('#app');
