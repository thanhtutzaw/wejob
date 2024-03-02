<script setup lang="ts">
// import type { JobPost } from '@/types';
import { ref } from 'vue';
import { FormKit } from '@formkit/vue'
import { createZodPlugin } from '@formkit/zod';
import { JobPostSchema, mySchema, type JobPostType } from "@wonjob/shared-types/index";
// const JobPostSchema = z.object({
//   // _id: z.instanceof(ObjectId),
//   title: z.string().min(4).trim(),
//   description: z.string().min(4).trim(),
//   // createdAt: z.date().nullable(),
//   // updatedAt: z.date().nullable()
// });
const props = defineProps<{
	resetForm: () => void;
	Backend_URL: string;
	closeModal: () => void;
	getJobLists: () => void;
	editModalForm: JobPostType | null;
}>()

const loading = ref(false);
console.log(props);
// const castRangeToNumber = (node) => {
//   // We add a check to add the cast only to range inputs
//   if (node.props.type !== 'range') return
//   node.hook.input((value, next) => next(Number(value)))
// }
const [zodPlugin, submitHandler] = createZodPlugin(JobPostSchema, async (fields) => {
	// const { _id, ...data } = fields;
	const { ...data } = fields;
	const newData = {
		...fields ? (data) : {},
		// createdAt: Date.now()
	}
	loading.value = true;
	try {
		await fetch(`${props.Backend_URL}/api/job_posts?title=${fields.title}`, {
			method: "POST", body: JSON.stringify(newData), headers: {
				"Content-Type": "application/json",
			}
		})
		loading.value = false;
		props.getJobLists();
		props.closeModal();
		props.resetForm();
	} catch (error) {
		loading.value = false;
		console.log(error);
	}
})

const emit = defineEmits(["update:modelValue"])
// const updateTitle = (e: Event) => {
// 	emit('update:modelValue', { ...props.editModalForm, title: (e.target as HTMLInputElement).value });
// };
// const updateDescription = (e: Event) => {
// 	emit('update:modelValue', { ...props.editModalForm, description: (e.target as HTMLTextAreaElement).value });
// };
const formValues = ref({ title: "", description: "" })
</script>

<template>
	<header>
		<h1>Create Job Post - {{ mySchema }}</h1>
		<button type="button" @click="closeModal">x</button>
	</header>
	<FormKit :plugins="[zodPlugin]" submit-label="Create" id="AddNewForm" class="AddNewForm" @submit="submitHandler"
		type="form" v-model="formValues">
		<FormKit
			:validation-visibility="`${formValues && formValues.title && formValues.title.length > 0 ? 'live' : ''}`"
			type="text" validation="required|length:4" label="Title" class="jobTitleInput" id="title" name="title"
			placeholder="Add Job Title" />
		<FormKit
			:validation-visibility="`${formValues && formValues.description && formValues?.description.length > 0 ? 'live' : ''}`"
			type="textarea" validation="required|length:4" label="Description" class="jobTitleInput" id="description"
			name="description" placeholder="Add Job Description" />
		<pre wrap>{{ formValues }}</pre>
	</FormKit>
</template>

<style scoped>
dialog {
	min-width: 50vw;
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

			&:focus {
				color: black !important;
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
	.submit,
	[data-type=submit] .formkit-input {
		min-width: 90px;
		min-height: 45px;
		font-weight: 600;
		color: var(--primary-color);
		background-color: rgb(0 140 141 / 26%) !important;
	}
}

pre {
	max-width: 50vw;
	max-height: 30vw;
	overflow: auto;
	margin: 0 auto;
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
}
</style>