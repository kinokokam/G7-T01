<script setup>
import login from './components/login.vue'
import register from './components/register.vue'


</script>

<template>
  <div id="app">
        <router-view></router-view> <!-- Renders the current route component -->
    </div>
  <main>
    <TheWelcome />
  </main>
</template>
