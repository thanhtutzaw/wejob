<script setup lang="ts">
import type { JobPost } from '@/types';
import { ref } from 'vue';

const props = defineProps<{
	resetForm: () => void;
	closeModal: () => void;
	submitAddForm:  () => Promise<void>;
		editModalForm: JobPost | null;
}>()
const loading= ref(false);
console.log(props);
const onsubmit = async () => {
	loading.value = true;
	try {
		await props.submitAddForm()
		loading.value = false;
		props.resetForm();
	} catch (error) {
		loading.value = false;
		console.log(error);
	}
};
const emit = defineEmits(["update:modelValue"])
const updateTitle = (e: Event) => {
	emit('update:modelValue', { ...props.editModalForm, title: (e.target as HTMLInputElement).value });
};
const updateDescription = (e: Event) => {
	emit('update:modelValue', { ...props.editModalForm, description: (e.target as HTMLTextAreaElement).value });
};
</script>
	<!-- 
export default {
	props: {
		: (newData: JobPost) => Promise<void>,
		editModalForm: JobPost;
	},
}; -->

<template>
	      <header>
	        <h1>Create Job Post</h1>
	        <button type="button" @click="closeModal">x</button>
	      </header>
	      <form class="jobForm" @submit.prevent="onsubmit" >
	        <label for="jobTitle">Title
		        <input
		      @input="updateTitle"
				required 
				 :value="props.editModalForm?.title"  
				class="jobTitleInput" name="jobTitle" id="jobTitle" placeholder="Add Job Title"  />
		        </label>
				 <!-- @input="$emit('update:modelValue' , ($event.target as HTMLInputElement).value)" -->
		        <label required for="jobDescription">Description
		        <textarea :value="props.editModalForm?.description" 
				@input="updateDescription"
				 class="jobTitleInput" id="jobDescription" name="jobDescription" placeholder="Add Job Description"   ></textarea>
		        </label>
	       <button :disabled="loading" class="submit" type="submit">
	      {{ loading ? "Creating" : "Create" }}
	      </button>
	     </form>
	
</template>
