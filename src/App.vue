<script setup>
import login from './components/login.vue'
import register from './components/register.vue'

</script>

<template>
    <div id="app">
        <router-view></router-view> <!-- Renders the current route component -->
    </div>
    <main>
        <!-- <TheWelcome /> -->
    </main>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase'; // Adjust the path as necessary

export default {
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is logged in:", user);
                // Handle successful login (e.g., redirect)
                console.log("User ID:", user.uid);
                this.$router.push('/dashboard'); // Redirect to your dashboard or home
            } else {
                console.log("No user is logged in.");
            }
        });
    }
};


</script>