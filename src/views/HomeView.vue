<script setup lang="ts">
import { ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
const title = ref("wonJob")
const toggle = ref(false)
function toggleTitle() {
  title.value = toggle.value ? "wonJob" : "Let's Go"
  toggle.value = !toggle.value;
}
</script>

<template>
  <main>
   <h1> {{ title }}</h1>
   <h3>Let's finish your Job search journey together 🙉 🚀</h3>
   <button @click="toggleTitle" type="button">Get Started</button>
    <!-- <TheWelcome /> -->
  </main>
</template>

<style>
button{
  /* background-color: rgba(143, 143, 255); */
  background-color: var(--primary-color);
  color: white;
  padding: .5rem 1rem;
  border:0;
  margin-block: 1rem;
  border-radius: 1rem;
}
</style>
