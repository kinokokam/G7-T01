<script setup>

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
                // this.$router.push('/dashboard'); // Redirect to your dashboard or home
            } else {
                console.log("No user is logged in.");
            }
        });
    }, methods:{
        async logout() {
      try {
        await signOut(auth); // Clear authentication and log out
        this.user = null;    // Clear user data in the component
        this.$router.push("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    }
};


</script>