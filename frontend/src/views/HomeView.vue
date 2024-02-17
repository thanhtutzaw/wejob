<script setup lang="ts">
import { onMounted, ref , type Ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
const title = ref("wonJob")
const toggle = ref(false)
const jobTitle = ref("")
function toggleTitle() {
  title.value = toggle.value ? "wonJob" : "Let's Go"
  toggle.value = !toggle.value;
}
const jobLists : Ref<{title:string; _id:string}[]> = ref([])
async function getJobLists() {
  let newLists = await fetch('http://localhost:5038/api/job_posts').then(res => res.json());
  console.log(newLists);
  jobLists.value = newLists;
}
async function deleteLists(_id:string | number) {
  jobLists.value = jobLists.value.filter(j => j._id !== _id)
  await fetch('http://localhost:5038/api/job_posts?id='+_id, {method:"DELETE"})
  // await getJobLists();
}
async function addLists(e: Event) {
  // const formData = new FormData();
  // console.log(formData);
  console.log(e);
  console.log(jobTitle);
  await fetch(`http://localhost:5038/api/job_posts?title=${jobTitle.value}`, {method:"POST" , headers: {
      "Content-Type": "application/json",
    },
  } )
  await getJobLists();
  jobTitle.value =''
}
onMounted(async() => {
  await getJobLists();
})
</script>

<template>
  <main>
   <h1> {{ title }}</h1>
   <h3>Let's finish your Job search journey together 🙉 🚀</h3>
   <button @click="toggleTitle" type="button">Get Started</button>
    <!-- <TheWelcome /> -->
   <div class="listsContainer">
     <!-- <button type="button" @click="jobLists.push(jobLists.length + 1)">Add Job Lists</button> -->
      <button type="button" @click="jobLists.reverse()">Reverse</button>
      <button type="button" @click="jobLists = []">Clear</button>
   </div>
   <form @submit.prevent="addLists">
    <input v-model="jobTitle" class="jobTitleInput" type="search" name="jobTitle" placeholder="Add Job Title" />
     <button type="submit">Add New</button>
   </form>
    <ul v-if="jobLists.length">
      <li v-bind:key="i._id" v-for="i of jobLists">
      {{i.title}}
    <button @click="deleteLists(i._id)">Delete</button>
    </li>
    </ul>
  </main>
</template>

<style>
.listsContainer{
  display: flex;
  gap:1rem;

}
.jobTitleInput{
  padding:.5rem 1rem;
  border-radius: 1rem;
  border:1px solid gray;
  font-size: 1rem;
&:focus{
  border: 1px solid var(--primary-color);
  outline: 1px solid var(--primary-color);
}
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
