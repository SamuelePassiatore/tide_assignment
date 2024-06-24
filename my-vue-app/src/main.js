import { createApp } from 'vue'
import { router } from './router';
import store from "./store"

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue'

const app = createApp(App);

// ROUTER
app.use(router);


// LOCAL STORE
app.use(store);

app.mount('#app');
