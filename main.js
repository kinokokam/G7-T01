//import the Firebase stuff 
import { db } from './path/to/firebase'; // adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore'; // import Firestore methods

//import the CSS Styling
import "./assets/external.css";
import "./assets/login.css";
import "./assets/questionaire.css";


import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';


// Import your components
// import Home from './components/Home.vue';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Explore from './components/explore.vue';
import Questionnaire from './components/questionnaire.vue';
import Favorites from './components/Favorites.vue';


// Define routes
const routes = [
    // { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/questionnaire', component: Questionnaire },
    {path: '/explore', component: Explore},
    { path: '/favorites', component: Favorites },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .mount('#app')