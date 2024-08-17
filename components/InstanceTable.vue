<script setup lang="ts">


import Scaffold from "~/components/utils/Scaffold.vue";
import SectionHeader from "~/components/utils/SectionHeader.vue";
import type {DropdownItem} from "#ui/types";
import InstanceFilter from "~/components/InstanceFilter.vue";

const columns = ref<ColumnMeta[]>([
    {key: 'id', label: 'Instance Id'},
    {key: 'year', label: 'Year'},
    {key: 'semester', label: 'Semester'},
    {key: 'course_id', label: 'Course Id'},
    {key: 'created_on', label: 'Created On'},
    {key: 'actions', label: 'Actions'}
]);

const {$fetcher, $toast} = useNuxtApp();

const instances = ref<Instance[]>();
const filtered = ref<Instance[]>();

onMounted(async () => {
    await fetchCourses();
});


const loading = ref(false);
async function fetchCourses() {
    console.log('clicked')
    loading.value = true;
    try {
        const {status, data: result} = await $fetcher.get<Instance[]>('/instances/')
        if (status === 200) {
            instances.value = result.body
            filtered.value = instances.value;
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
    instances.value = instances.value?.filter(instance => instance.id !== id);
    filtered.value = instances.value;
}

const actions = (row: Instance): RowActionMeta[][] => [
    [
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-solid',
            click: async () => {
                try {
                    const {status, data: result} = await $fetcher.delete(`/instances/delete/${row.year}/${row.semester}/${row.course_id}`);

                    if(status === 200) {
                        $toast.success(result.message);
                        updateCourse(row.id);
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

function onFilter(event: FilterEvent) {
    if(event.year && event.semester) {
        filtered.value = instances.value?.filter(instance => instance.year === event.year && instance.semester === event.semester);
    } else if(event.year) {
        filtered.value = instances.value?.filter(instance => instance.year === event.year)
    } else {
        filtered.value = instances.value?.filter(instance => instance.semester === event.semester);
    }
}

export interface FilterEvent {
    year: string,
    semester: string
}
</script>

<template>

    <Scaffold>
        <SectionHeader text="Instance Table"/>

        <div class="flex flex-col gap-8 justify-center items-center w-full overflow-x-auto">
            <div class="flex justify-between gap-x-8 bg-white p-2 w-2/3 rounded-lg shadow-md">
                <InstanceFilter @on-filter="onFilter"/>
                <div class="flex gap-x-8 items-center">
                    <UButton @click="fetchCourses()" color="gray" variant="ghost" icon="i-heroicons-arrow-path-solid"/>
                    <UButton @click="toggleModel()" color="gray" variant="ghost" icon="i-heroicons-plus-solid"/>
                </div>
            </div>

            <UTable :rows="filtered" :columns="columns" class="w-2/3 bg-white shadow-md rounded-lg">

                <template #created_on-data="{ row }" >
                    <UBadge color="emerald" variant="soft" :label="new Date(row.created_on * 1000).toDateString()"/>
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
        <InstanceForm @close-model="toggleModel()"/>
    </UModal>

</template>

<style scoped>

</style>