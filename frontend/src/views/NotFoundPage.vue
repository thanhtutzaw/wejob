<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
   <p class="notFound">Not Found Page - 404</p>
  </main>
</template>

<style>
@media (min-width: 1024px) {
main{
  min-height: 100vh;
      /* position: relative;
    top: 35vh; */
        padding-top: 35vh;
}
}
.notFound{
  text-align: center;
    margin-block: 1rem;
}
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
