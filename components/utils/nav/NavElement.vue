<script setup lang="ts">

const props = defineProps({
    text: {
        type: String,
        required: true
    },

    icons: {
        type: String,
        required: true
    },

    expanded: {
        type: Boolean,
        required: true
    },

    url: {
        type: String
    }
})

</script>

<template>
    <NuxtLink :to="url">
        <div class="py-1 rounded-lg flex items-center cursor-pointer transition-colors hover:bg-gray-100"
             :class="`${expanded ? 'justify-start gap-x-5 px-4' : 'justify-center gap-x-0 p-1.5'}`"
        >
            <UIcon :name="'i-' + icons" class="text-gray-800 h-6 w-6"/>
            <h2 class="text-gray-800 text-2xl text-center flex transition-all overflow-hidden"
                :class="`${expanded ? 'w-fit' : 'w-0'}`"
            >
                {{text}}
            </h2>
        </div>
    </NuxtLink>
</template>

<style scoped>

</style>