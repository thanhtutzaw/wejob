<script setup lang="ts">
import { onMounted, onUnmounted, ref , type Ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
const title = ref("wonJob")
const job_posts_error : Ref<unknown> = ref(null)
const toggle = ref(false)
const job_posts_loading  = ref(false)
const jobTitle = ref("")
function toggleTitle() {
  title.value = toggle.value ? "wonJob" : "Let's Go"
  toggle.value = !toggle.value;
}
const jobLists : Ref<{title:string; _id:string , createdAt:Date}[]> = ref([])
const localBackendURL = `http://localhost:5038`;
const productionBackendURL = `https://wonjob-backend.vercel.app`;
const Backend_URL = import.meta.env.DEV && !import.meta.env.PROD ?  localBackendURL : productionBackendURL
 function getJobLists() {
  console.log("DEV - "+import.meta.env.DEV);
  console.log("PROD - "+import.meta.env.PROD);
  async function getNew() {
    try {
      job_posts_loading.value  =true;
      const response = await fetch(`${Backend_URL}/api/job_posts`)
      if (!response.ok) {
        job_posts_loading.value  =false;
        job_posts_error.value = `${response.status} : ${response.statusText}`;
        throw new Error(`List fetching Failed - ${response.status} : ${response.statusText}` );
      }
      jobLists.value = await response.json();
      job_posts_error.value = null;
      job_posts_loading.value  =false;      
    } catch (error) {
      console.log(error);
      job_posts_error.value = error;
      job_posts_loading.value  =false;
    }
  }
  getNew()
  // jobLists.value = newLists ?? {};
}
async function deleteLists(_id:string | number) {
  jobLists.value = jobLists.value.filter(j => j._id !== _id)
  await fetch(`${Backend_URL}/api/job_posts?id=`+_id, {method:"DELETE"})
}
async function addLists(e: Event) {
  // const formData = new FormData();
  // console.log(formData);
  console.log(e);
  console.log(jobTitle);
  const newData = {
    createdAt: Date.now()
  }
  try {
    await fetch(`${Backend_URL}/api/job_posts?title=${jobTitle.value}`, {method:"POST", body:JSON.stringify(newData) , headers: {
        "Content-Type": "application/json",

      },
    } )
    getJobLists();
    jobTitle.value = ''
  } catch (error) {
    throw new Error(`${error}`);
  }
  
}
onMounted(() => {
  getJobLists();
})
onUnmounted(()=>{
  getJobLists();

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
   <form class="jobForm" @submit.prevent="addLists">
    <input v-model="jobTitle" required class="jobTitleInput" type="search" name="jobTitle" placeholder="Add Job Title" />
     <button class="submit" type="submit">Add New</button>
   </form>
   <p v-if="job_posts_loading">Loading...</p>
   <p v-if="job_posts_error" style="color:red"> {{job_posts_error}}</p>
    <ol class="job_lists" v-if="jobLists.length && !job_posts_loading">
      <li class="card_Item" v-bind:key="i._id" v-for="i of jobLists">
      {{i.title }} 
      <p class="date">{{ i?.createdAt ? new Date(i.createdAt).toLocaleDateString() : "" }}</p>
    <button class="danger" @click="deleteLists(i._id)">Delete</button>
    </li>
    </ol>
  </main>
</template>

<style>
.job_lists{
  button{
    min-width: 90px;
  }
  padding: 0;
  .card_Item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .date{
    color:gray;
  }
}}
form.jobForm{
      position: sticky;
    top: 0;
    background: white;
display: flex;
justify-content: space-between;
gap:1rem;
align-items: center;
font-size: 1rem;
input{
  min-height: 45px;
  flex:1;
}
.submit{
  min-height: 45px;
  font-weight: 600;
  color: var(--primary-color);
  background-color: rgb(0 140 141 / 26%);  
}
}
.listsContainer{
  display: flex;
  gap:1rem;

}
button.danger{
background: #ffd6d6;
    color: red;
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
  border-radius: 10px;
}
</style>
