<script setup lang="ts">
import { ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
const title = ref("wonJob")
const toggle = ref(false)
function toggleTitle() {
  title.value = toggle.value ? "wonJob" : "Let's Go"
  toggle.value = !toggle.value;
}
const jobLists = ref([1, 2, 3])
function deleteLists(id:string | number) {
  jobLists.value = jobLists.value.filter(j => j !== id)
}
</script>

<template>
  <main>
   <h1> {{ title }}</h1>
   <h3>Let's finish your Job search journey together 🙉 🚀</h3>
   <button @click="toggleTitle" type="button">Get Started</button>
    <!-- <TheWelcome /> -->
   <div class="listsContainer">
     <button type="button" @click="jobLists.push(jobLists.length + 1)">Add Job Lists</button>
      <button type="button" @click="jobLists.reverse()">Reverse</button>
      <button type="button" @click="jobLists = []">Clear</button>
   </div>
    <ul v-if="jobLists.length">
      <li v-bind:key="i" v-for="i of jobLists">
      {{i}}
    <button @click="deleteLists(i)">Delete</button>
    </li>
    </ul>
  </main>
</template>

<style>
.listsContainer{
  display: flex;
  gap:1rem;

}
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
