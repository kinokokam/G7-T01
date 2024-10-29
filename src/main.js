import "./assets/external.css";
import "./assets/login.css";

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';


// Import your components
// import Home from './components/Home.vue';
import Login from './components/login.vue';
import Register from './components/register.vue';


// Define routes
const routes = [
    // { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .mount('#app')
