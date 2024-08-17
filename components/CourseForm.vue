<script setup lang="ts">

import Scaffold from "~/components/utils/Scaffold.vue";
import {object, string} from "yup";
import type {FormError, FormErrorEvent, FormSubmitEvent} from "#ui/types";
import SectionHeader from "~/components/utils/SectionHeader.vue";


const {$fetcher, $toast} = useNuxtApp()

const schema = object<CourseForm>({
    title: string().required("Title can't be empty"),
    code: string().required("Code can't be empty"),
    description: string().required("Description can't be empty")
});

const state = reactive<CourseForm>({
    title: undefined,
    code: undefined,
    description: undefined
});

const empty = reactive<CourseForm>({...state});

function resetState() {
    Object.assign(state, empty);
}


const validate = (state: CourseForm): FormError[] => {
    const errors = [];

    if (!state.title) errors.push({path: 'title', message: "Title can't be empty"})
    if (!state.code) errors.push({path: 'code', message: "Code can't be empty"})
    if (!state.description) errors.push({path: 'description', message: "Description can't be empty"})

    return errors;
}

async function onError(event: FormErrorEvent) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({behavior: 'smooth', block: 'center'})
}

async function submit(event: FormSubmitEvent<CourseForm>) {
    const data = event.data;

    try {
        const {status, data: result} = await $fetcher.post<any>('/courses/', data);

        if (status === 201) {
            $toast.success(result.message)
            closeModel();
        } else {
            $toast.info(result.message)
        }
    } catch (err: any) {
        $toast.failure(err.message)
    } finally {
        resetState();
        closeModel();
    }


}

const emit = defineEmits(['close-model'])

function closeModel() {
    emit('close-model');
}


export interface CourseForm {
    title: string | undefined,
    code: string | undefined,
    description: string | undefined
}
</script>

<template>
    <Scaffold>
        <div class="relative flex justify-center items-center w-full lg:py-20 md:py-16 py-10">
            <UButton @click="closeModel()" icon="i-heroicons-arrow-left-solid" size="xl" color="gray" variant="ghost" class=" absolute top-10 left-10"/>
            <h1 class="text-4xl font-medium text-gray-800">Course Form</h1>
        </div>
        <div class="w-full flex justify-center items-center">
            <UForm
                :schema="schema"
                :state="state"
                :validate="validate"
                @error="onError"
                @submit="submit"
                class="space-y-8 w-full md:w-1/3 bg-white rounded-lg shadow-md p-8">
                <UFormGroup name="title" class="w-full" label="Course Title">
                    <UInput class="w-full" v-model="state.title"/>
                </UFormGroup>
                <UFormGroup name="code" class="w-full" label="Course Code">
                    <UInput class="w-full" v-model="state.code"/>
                </UFormGroup>
                <UFormGroup name="description" class="w-full" label="Course Description">
                    <UInput class="w-full" v-model="state.description"/>
                </UFormGroup>
                <div class="w-full flex justify-center items-center">
                    <UButton type="submit" label="Submit" size="lg"
                             class="w-32 flex items-center justify-center font-semibold"/>
                </div>
            </UForm>
        </div>
    </Scaffold>
</template>

<style scoped>

</style>