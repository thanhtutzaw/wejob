<script setup lang="ts">
import type { JobPost } from '@/types';
import { ref } from 'vue';
import {FormKit} from '@formkit/vue'

const props = defineProps<{
	resetForm: () => void;
	Backend_URL: string;
	closeModal: () => void;
	getJobLists:  () => void;
		editModalForm: JobPost | null;
		
}>()

const loading= ref(false);
console.log(props);
// const castRangeToNumber = (node) => {
//   // We add a check to add the cast only to range inputs
//   if (node.props.type !== 'range') return

//   node.hook.input((value, next) => next(Number(value)))
// }

// const createCharacter = async (fields) => {
//   await new Promise((r) => setTimeout(r, 1000))
  
// }
const onsubmit = async (fields:JobPost) => {
	 const { _id, ...data } = fields;
	 const newData = {
		 ...fields ? (data) : {},
		 createdAt: Date.now()
		}
		loading.value = true;
		try {
		await fetch(`${props.Backend_URL}/api/job_posts?title=${fields.title}`, {
			method: "POST", body: JSON.stringify(newData), headers: {
				"Content-Type": "application/json",
			}})
			loading.value = false;
			props.getJobLists();
			props.closeModal();
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
<template>
	      <header>
	        <h1>Create Job Post</h1>
	        <button type="button" @click="closeModal">x</button>
	      </header>
		  <FormKit id="AddNewForm" class="AddNewForm" @submit="onsubmit" type="form" #default="{ value }" >
	    <FormKit
	      type="text"
	      validation="required|length:4"
	      label="Title"
	     class="jobTitleInput" id="title" name="title" placeholder="Add Job Title" 
	    />
	    <FormKit
	      type="textarea"
		  validation="required|length:4"
	      label="Description"
	     class="jobTitleInput" id="description" name="description" placeholder="Add Job Description" 
	    />
		 <pre wrap>{{ value }}</pre>
		</FormKit>
	        <!-- <label for="jobTitle">Title
		        <input
		      @input="updateTitle"
				required 
				 :value="props.editModalForm?.title"  
				class="jobTitleInput" name="jobTitle" id="jobTitle" placeholder="Add Job Title"  />
		        </label> -->
				 <!-- @input="$emit('update:modelValue' , ($event.target as HTMLInputElement).value)" -->
		        <!-- <label required for="jobDescription">Description
		        <textarea :value="props.editModalForm?.description" 
				@input="updateDescription"
				 class="jobTitleInput" id="jobDescription" name="jobDescription" placeholder="Add Job Description"   ></textarea>
		        </label> -->
	       <!-- <button :disabled="loading" class="submit" type="submit">
	      {{ loading ? "Creating" : "Create" }}
	      </button> -->
	
</template>
<style scoped>
/* .formkit-input {
  border-color : var(--primary-color) !important;
  outline-color: var(--primary-color) !important;
} */

dialog {
	min-width: 50vw;
	/* max-width: 55vw; */
	margin: auto;
	border: 1px solid rgba(128, 128, 128, 0.404);
	box-shadow: 0 0px 20px 0px #00000038;
	border-radius: 1rem;

	.AddNewForm {
		label {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		textarea {
			min-width: 100%;
			min-height: 25vh;
		}

		flex-direction: column;

		textarea,
		input {
			font-size: 1.3rem !important;
			 &:focus{
        color:black !important;
      }
		}

		input {
			border-radius: 10px !important;
		}
	}

	form {

		label {
			font-weight: bold;
			color: gray;
		}
	}

	>form>* {
		width: 100%;
	}
}

dialog header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.job_lists {
	display: flex;
	flex-direction: column;
	gap: .8rem;
	margin-bottom: 2rem;

	button {
		min-width: 90px;
	}

	padding: 0;

	.card_Item {

		gap: 1rem;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;

		.left {
			display: flex;
			justify-content: space-between;
			flex: 1;
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

		.title {
			font-weight: bold;
			/* max-width: 50%; */
			flex: 1;
			-webkit-line-clamp: 1;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.description {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			white-space: break-spaces;
		}

		.date {
			color: gray;
		}
	}
}

@media (min-width: 1024px) {
	.welcome {
		min-height: 100vh;
		/* position: relative;
    top: 35vh; */
		padding-top: 35vh;
	}

	.job_lists {
		.card_Item {
			max-width: 385px;
		}
	}
}
.jobTitleInput {
	padding: .5rem 1rem;
	border-radius: 1rem;
	border: 1px solid gray;
	font-size: 1.3rem;

	&:focus {
		border: 1px solid var(--primary-color);
		outline: 1px solid var(--primary-color);
	}
}
.AddNewForm {
	position: sticky;
	top: 0;
	background: white;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 1rem;
	align-items: center;
	font-size: 1rem;

	input {
		min-height: 45px;
		flex: 1;
	}
/* >*{
	border:2px solid red;
} */
	.submit , [data-type=submit] .formkit-input {
		min-width: 90px;
		min-height: 45px;
		font-weight: 600;
		color: var(--primary-color);
		background-color: rgb(0 140 141 / 26%) !important;
	}
}

.listsContainer {
	display: flex;
	gap: 1rem;

}

button.danger {
	background: #ffd6d6;
	color: red;
}



button {
	/* background-color: rgba(143, 143, 255); */
	background-color: var(--primary-color);
	color: white;
	padding: .5rem 1rem;
	border: 0;
	margin-block: 1rem;
	border-radius: 10px;
}</style>