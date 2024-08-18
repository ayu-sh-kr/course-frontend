<script setup lang="ts">
import {useDark} from "@vueuse/core";
import SideNav from "~/components/utils/nav/SideNav.vue";


const dark = useDark();
dark.value = false;
</script>

<template>
    <div class="bg-slate-50 grid grid-cols-[auto_1fr]">
        <SideNav/>
        <main>
            <slot/>
        </main>
        <UNotifications/>
    </div>
</template>

<style scoped>

</style>