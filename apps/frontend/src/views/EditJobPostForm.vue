<script  setup lang="ts">
// import type { JobPost } from '@/types';
import type { JobPostType } from '@wonjob/shared-types';
import { ref } from 'vue';
const props = defineProps<{
	resetForm: () => void;
	closeModal: () => void;
	submitEditForm: () => Promise<void>;
	editModalForm: JobPostType ;
}>()
const editLoading = ref(false)
const emit = defineEmits(["update:modelValue"])

// const editModalForm = ref(props.editModalForm);
const updateTitle = (e: Event) => {
	emit('update:modelValue', {...props.editModalForm , title:(e.target as HTMLInputElement).value});
};
const updateDescription = (e: Event) => {
	emit('update:modelValue', {...props.editModalForm , description:(e.target as HTMLTextAreaElement).value});
};
const onsubmit = async() => {
	editLoading.value = true;
	try {
		await props.submitEditForm()
		editLoading.value = false;
		props.resetForm();
	} catch (error) {
		editLoading.value = false;
		console.log(error);
	}
};

// Methods
// 	emit('update:modelValue', editModalForm.value);
// 	emit('update:modelValue', { ...props.editModalForm, title: event.target.value });
</script>

<template>
	      <header>
	        <h1 style="font-size: 1.5rem; font-weight: bold;">Edit Post</h1>
	        <button type="button" @click="closeModal">x</button>
	      </header>
	      <form class="editForm" @submit.prevent="onsubmit">
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
	       <button :disabled="editLoading" class="submit" type="submit">
	      {{ editLoading ? "Updating" : "Update" }}
	      </button>
	     </form>
	<!-- @input="$emit('update:modelValue',($event.target as HTMLTextAreaElement).value)" -->
</template>
