import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'

const routes = [
  { path: '/', name: "login", component: LoginPage },
  { path: '/home', name: "home", component: HomePage },
  { path: '/:catchAll(.*)', redirect: '/' } // Redirects all unmatched routes to login
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export { router };
