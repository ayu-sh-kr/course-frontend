<script setup lang="ts">

import SectionHeader from "~/components/utils/SectionHeader.vue";
import Scaffold from "~/components/utils/Scaffold.vue";
import {object, string} from "yup";
import type {FormError, FormErrorEvent, FormSubmitEvent} from "#ui/types";

const courses = ref<Course[]>();

const {$fetcher, $toast} = useNuxtApp()

onMounted(async () => {
    await fetchCourses();
});


const loading = ref(false);
async function fetchCourses() {
    loading.value = true;
    try {
        const {status, data: result} = await $fetcher.get<Course[]>('/courses/')
        if (status === 200) {
            courses.value = result.body
            $toast.success(result.message)
        } else {
            $toast.failure('Unable to fetch course')
        }
    }catch (err: any) {
        $toast.failure(err.message)
    }finally {
        loading.value = false;
    }
}

const courseOptions = computed(() => {
    return courses.value?.map(course => ({
        value: course.course_id,
        label: course.title
    }))
})


const schema = object<InstanceForm>({
    course: object().required('Course is must'),
    year: string().required('Year is must'),
    semester: string().required('Semester is must')
});

const state = reactive<InstanceForm>({
    course: undefined,
    year: undefined,
    semester: undefined
});

const empty = reactive<InstanceForm>({...state})

function resetState(){
    Object.assign(state, empty);
}

const semesters = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'
];

const validate = (state: InstanceForm): FormError[] => {
    let errors: FormError[] = []

    if (!state.course) errors.push({path: 'course', message: 'Course is required'})
    if (!state.year) errors.push({path: 'year', message: 'Year is required'})
    if (!state.semester) errors.push({path: 'semester', message: 'Semester is required'})

    return errors;
}

const submit = async (event: FormSubmitEvent<InstanceForm>) => {
    const formData = event.data;

    const body: InstanceData = {courseId: formData.course.value, year: formData.year ?? '', semester: formData.semester ?? ''}

    const {status, data: result} = await $fetcher.post<any>('/instances/', body);

    try {
        if (status === 201) {
            $toast.success(result.message);
        } else {
            $toast.failure(result.message)
        }
    }catch (err: any) {
        $toast.info(err.message)
    } finally {
        closeModel();
        resetState();
    }
}

async function onError(event: FormErrorEvent) {
    console.log(event.errors)
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({behavior: 'smooth', block: 'center'})
}

export interface InstanceForm {
    course: any | undefined,
    year: string | undefined,
    semester: string | undefined
}

const emit = defineEmits(['close-model']);

function closeModel() {
    emit('close-model')
}

export interface InstanceData {
    courseId: number,
    year: string,
    semester: string
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
                @submit="submit"
                @error="onError"
                class="space-y-8 gap-x-5 w-full md:w-2/3 lg:w-1/3 bg-white rounded-lg shadow-md p-8 grid grid-cols-1 md:grid-cols-2"
            >
                <UFormGroup name="course" label="Select Course" class="mt-3">
                    <USelectMenu v-model="state.course" :options="courseOptions" placeholder="Select Course"/>
                </UFormGroup>

               <div class="flex justify-start items-start w-2/3">
                   <UButton :loading="loading" :disabled="loading" @click="fetchCourses" label="Refresh" class="w-full flex justify-center"/>
               </div>

                <UFormGroup name="year" label="Enter Year">
                    <UInput v-model="state.year"/>
                </UFormGroup>

                <UFormGroup name="semester" label="Select Semester" class="mt-3">
                    <USelectMenu v-model="state.semester" :options="semesters" placeholder="Select Semester"/>
                </UFormGroup>

                <div class="col-span-2 flex justify-center">
                    <UButton type="submit" label="Submit"
                             class="flex justify-center items-center w-2/3 md:w-1/3 text-xl font-semibold"/>
                </div>

            </UForm>
        </div>

    </Scaffold>
</template>

<style scoped>

</style>