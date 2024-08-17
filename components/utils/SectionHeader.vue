<script setup lang="ts">

const props = defineProps({
    text: {
        type: String,
        required: true
    },
});

</script>

<template>
    <div class="relative flex justify-center items-center w-full lg:py-20 md:py-16 py-10">
        <h1 class="text-4xl font-medium text-gray-800">{{ text }}</h1>
    </div>
</template>

<style scoped>

</style>