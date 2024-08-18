<script setup lang="ts">

import NavElement from "~/components/utils/nav/NavElement.vue";

const state = reactive({
    expanded: false
})
</script>

<template>
<aside class="h-screen">
    <nav class="h-full flex flex-col bg-white border-r shadow-sm px-2 pt-2"
         :class="{'w-[380px]': state.expanded}"
    >
        <div class="px-4 py-5 flex justify-between items-center">
            <h1 v-text="'Logo'"
                 class="overflow-hidden transition-all" :class="`${state.expanded ? 'w-32 ml-3' : 'w-0'}`"
            />
            <div @click="state.expanded = !state.expanded"
                 class="hover:bg-gray-100 p-1.5 rounded-lg transition-all duration-300 cursor-pointer"
            >
                <UIcon :name="`${state.expanded ? 'i-heroicons-chevron-left' : 'i-heroicons-chevron-right'}`" dynamic
                       class="text-gray-950 h-6 w-6 flex items-center transition-all duration-500"
                />
            </div>
        </div>

        <NavElement :expanded="state.expanded" icons="heroicons-academic-cap-20-solid" text="Courses" url="/" title="Courses"/>
        <NavElement :expanded="state.expanded" icons="heroicons-square-3-stack-3d-solid" text="Instances" url="/instance" title="Instances"/>
    </nav>
</aside>
</template>

<style scoped>

</style>