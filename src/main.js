// import "src/assets/external.css";
// import "src/assets/login.css";
// import "./assets/appointmentBooking.css"

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';


// Import your components
// import Home from './components/Home.vue';
import Login from './components/login.vue';
import Booking from "./components/booking.vue";
// import Marketplace from './marketplace.html'


// Define routes
const routes = [
    // { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/booking', component: Booking },

    // { path: '/market', component: Marketplace},
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .mount('#app')
