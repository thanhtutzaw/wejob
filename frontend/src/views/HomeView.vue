<script setup lang="ts">
import { onMounted, onUnmounted, ref , type Ref } from 'vue';
import type {JobPost} from 'src/types'
import EditJobPostForm from './EditJobPostForm.vue'
import AddJobPostForm from './AddJobPostForm.vue';
// import TheWelcome from '../components/TheWelcome.vue'
const title = ref("wonJob")
const job_posts_error : Ref<unknown> = ref(null)
const toggle = ref(false)
const add_job_posts_loading  = ref(false);
const editModalRef = ref<HTMLDialogElement | null>(null)
const addModalRef = ref<HTMLDialogElement | null>(null)
const job_posts_loading  = ref(false)
const editModalForm : Ref<JobPost | null> = ref(null)
//   {
//   _id: '',
//     title: '',
//       description: '',
//         createdAt: null,
//           updatedAt: null,
// }
function toggleTitle() {
  title.value = toggle.value ? "wonJob" : "Let's Go"
  toggle.value = !toggle.value;
}
const jobLists : Ref<JobPost[]> = ref([])
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
function closeAddModal() {
 if(addModalRef.value){
const modal  = addModalRef.value
modal.close()
}
resetForm()
}
function closeEditModal() {
 if(editModalRef.value){
const modal  = editModalRef.value
modal.close()
}
resetForm()
}
async function openEditModal(_id:JobPost["_id"] , newData:JobPost) {
  // editModalToggle.value = !editModalToggle.value;
  if(editModalRef.value){
    
    const modal = editModalRef.value
    modal.showModal();
  }
  console.log(newData);
  editModalForm.value = newData
  // jobLists.value = jobLists.value.filter(j => j._id !== _id)
  // await fetch(`${Backend_URL}/api/job_posts?id=`+_id, {method:"PATCH" , body:JSON.stringify(newData)})
}
async function openAddModal() {
  // editModalToggle.value = !editModalToggle.value;
  if(addModalRef.value){
    
    const modal = addModalRef.value
    modal.showModal();
  }
  // jobLists.value = jobLists.value.filter(j => j._id !== _id)
  // await fetch(`${Backend_URL}/api/job_posts?id=`+_id, {method:"PATCH" , body:JSON.stringify(newData)})
}
async function editForm() {
  if(!editModalForm.value ) return;
  const newData = editModalForm.value;
  const postId = newData._id
const updateData = {...newData ,updatedAt:Date.now()}
  try {
    await fetch(`${Backend_URL}/api/job_posts?id=`+postId, {method:"PUT" , body:JSON.stringify(updateData),headers: {
      "Content-Type": "application/json",
    }})
    editModalRef.value?.close()
  } catch (error) {
    console.log(error);
  }
  getJobLists();
}
async function deleteLists(_id: JobPost["_id"]) {
  try {
    await fetch(`${Backend_URL}/api/job_posts?id=`+_id, {method:"DELETE"})
    jobLists.value = jobLists.value.filter(j => j._id !== _id)
  } catch (error) {
    console.log(error);
  }
}
function resetForm() {
  editModalForm.value = null
}
async function addLists() {
  if(!editModalForm.value) return;
  // const formData = new FormData();
  const {_id , ...data} = editModalForm.value
  const newData = {
    ...editModalForm.value ? (data ): {},
    createdAt: Date.now()
  }
  console.log("add : " + JSON.stringify(newData));
  try {
    await fetch(`${Backend_URL}/api/job_posts?title=${editModalForm.value?.title}`, {method:"POST", body:JSON.stringify(newData) , headers: {
      "Content-Type": "application/json",      
    },
  } )
  getJobLists();
  resetForm();
  closeAddModal();
} catch (error) {
    add_job_posts_loading.value = false;
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
  <main class="welcome">
   <div>
     <h1>{{ title }}</h1>
     <h3>Let's finish your Job search journey together 🙉 🚀</h3>
     <button @click="toggleTitle" type="button">Get Started</button>
   </div>
    <!-- <TheWelcome /> -->
   <div class="listsContainer">
      <button type="button" @click="jobLists.reverse()">Reverse</button>
      <button type="button" @click="jobLists = []">Clear</button>
   </div>
   <form class="jobForm" @submit.prevent="addLists">
    <input style="cursor: pointer;" @click="openAddModal" readonly class="jobTitleInput" type="search" name="jobTitle" placeholder="Add Job Title" />
     <button :disabled="false" class="submit" type="button" @click="openAddModal">
    {{ false ? "Adding" : "Add New" }}
    </button>
   </form>
   <p class="loading" v-if="job_posts_loading">Loading...</p>
   <p v-if="job_posts_error" style="color:red"> {{job_posts_error}}</p>
    <ol class="job_lists" v-if="jobLists.length && !job_posts_loading">
      <li @click="openEditModal(post._id , post)" class="card_Item" v-bind:key="post._id" v-for="post of jobLists" >      
      <div v-if="post" class="left">
        <p v-if="post.title" class="title">{{ post.title }}</p>
        <p v-if="post.description" class="description">{{post.description ?? "Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf.Two line description nn dfdf." }}</p>
        <p v-if="post.createdAt" class="date">{{ post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "" }}</p>
      </div>
    <button class="submit" @click="openEditModal(post._id , post)">Edit</button>
    <button class="danger" @click="deleteLists(post._id)">Delete</button>
    </li>
    </ol>
    <dialog  @close="resetForm" ref="addModalRef">
      <AddJobPostForm  :resetForm="resetForm" :closeModal="closeAddModal" :submitAddForm="addLists" 
      :editModalForm="editModalForm" @update:modelValue="editModalForm = $event" 
        />
    </dialog>
    <dialog  @close="resetForm" ref="editModalRef">
    <EditJobPostForm  :resetForm="resetForm" v-if="editModalForm" :closeModal="closeEditModal" :submitEditForm="editForm" 
    :editModalForm="editModalForm" @update:modelValue="editModalForm = $event" 
      />
    </dialog>
  </main>
</template>

<style>
dialog{
  min-width: 50vw;
/* max-width: 55vw; */
  margin:auto;
  border: 1px solid rgba(128, 128, 128, 0.404);
box-shadow:0 0px 20px 0px #00000038;
  border-radius: 1rem;
  form.jobForm{
    label{
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    textarea{
      min-width: 100%;
      min-height: 25vh;
    }
    flex-direction: column;
    textarea , input{
      font-size: 1.3rem;
    }
    input{
      border-radius: 10px !important;
    }
  }
  form{
    
    label{
      font-weight: bold;
      color: gray;
    }
  }
  > form > * {
        width: 100%;
  }
}
dialog header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.job_lists{
  display: flex;
  flex-direction: column;
  gap:.8rem;
  margin-bottom: 2rem;
  button{
    min-width: 90px;
  }
  padding: 0;
  .card_Item{
       
    gap:1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  .left{
    display: flex;
    justify-content: space-between;
    flex:1;
    flex-direction: column;

    /* max-width: 71vw; */
    /* max-width: 35vw; */
    white-space: nowrap;
    -webkit-line-clamp: 3;
    line-clamp: 3; 
     overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .title{
    font-weight: bold;
    /* max-width: 50%; */
    flex:1;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .description{
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
  }
  .date{
    color:gray;
  }
}}
@media (min-width: 1024px) {
.welcome{
  min-height: 100vh;
      /* position: relative;
    top: 35vh; */
        padding-top: 35vh;
}
.job_lists{
.card_Item{
  max-width: 385px;
}}
}
form.jobForm{
      position: sticky;
    top: 0;
    background: white;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap:1rem;
align-items: center;
font-size: 1rem;
input{
  min-height: 45px;
  flex:1;
}
.submit{
min-width: 90px;
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