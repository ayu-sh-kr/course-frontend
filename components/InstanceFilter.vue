<script setup lang="ts">

const emit = defineEmits(['onFilter'])

const semesters = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'
];

const selected = ref();
const year = ref<string>();

function onFilter() {
    emit('onFilter', {year: year.value, semester: selected.value})
}

</script>

<template>
    <div class="flex items-center gap-x-10">
        <UInput v-model="year" placeholder="Input Year" />
        <USelectMenu v-model="selected" :options="semesters" placeholder="Select Semester"/>
        <UButton @click="onFilter()" label="Filter" class="w-32 flex justify-center"/>
    </div>
</template>

<style scoped>

</style>