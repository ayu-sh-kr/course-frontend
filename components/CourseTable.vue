<script setup lang="ts">


import Scaffold from "~/components/utils/Scaffold.vue";
import SectionHeader from "~/components/utils/SectionHeader.vue";
import type {DropdownItem} from "#ui/types";

const columns = ref<ColumnMeta[]>([
    {key: 'course_id', label: 'Course Id'},
    {key: 'title', label: 'Title'},
    {key: 'description', label: 'Description'},
    {key: 'code', label: 'Code'},
    {key: 'created_on', label: 'Created On'},
    {key: 'actions', label: 'Actions'}
]);

const {$fetcher, $toast} = useNuxtApp();

const courses = ref<Course[]>();

onMounted(async () => {
    await fetchCourses();
});


const loading = ref(false);
async function fetchCourses() {
    console.log('clicked')
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

function updateCourse(id: number) {
    courses.value = courses.value?.filter(course => course.course_id !== id);
}

const actions = (row: Course): RowActionMeta[][] => [
    [
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-solid',
            click: async () => {
                try {
                    const {status, data: result} = await $fetcher.delete(`/courses/delete/${row.course_id}`);

                    if(status === 200) {
                        $toast.success(result.message);
                        updateCourse(row.course_id);
                    } else {
                        $toast.failure(result.message);
                    }

                }catch (e: any) {
                    $toast.info(e.message)
                }
            }
        }
    ]
];


const model = ref(false);

function toggleModel() {
    console.log('clicked')
    model.value = !model.value;
}
</script>

<template>

    <Scaffold>
        <SectionHeader text="Course Table"/>

        <div class="flex flex-col gap-8 justify-center items-center w-full overflow-x-auto">

            <div class="flex justify-end gap-x-8 bg-white p-2 w-2/3 rounded-lg shadow-md">
                <UButton @click="fetchCourses()" color="gray" variant="ghost" icon="i-heroicons-arrow-path-solid"/>
                <UButton @click="toggleModel()" color="gray" variant="ghost" icon="i-heroicons-plus-solid"/>

            </div>

            <UTable :rows="courses" :columns="columns" class="w-2/3 bg-white shadow-md rounded-lg">

                <template #created_on-data="{ row }" >
                    <UBadge color="emerald" :label="new Date(row.created_on * 1000).toDateString()"/>
                </template>

                <template #actions-data="{ row }">
                    <UDropdown :items="actions(row) as DropdownItem[][]">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid"/>
                    </UDropdown>
                </template>
            </UTable>
        </div>
    </Scaffold>

    <UModal v-model="model" fullscreen>
        <CourseForm @close-model="toggleModel()"/>
    </UModal>

</template>

<style scoped>

</style>