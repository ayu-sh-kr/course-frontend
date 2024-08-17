<script setup lang="ts">
import {useDark} from "@vueuse/core";


const dark = useDark();
dark.value = false;
</script>

<template>
<div class="bg-slate-50">
  <slot/>
    <UNotifications/>
</div>
</template>

<style scoped>

</style>