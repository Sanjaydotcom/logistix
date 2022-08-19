<script setup>
const props = defineProps(["variant"]);
</script>

<template>
  <div v-for="loop in 8" :key="loop">
    <div v-if="variant == 'userProfile'" class="flex h-full w-full animate-pulse items-center justify-start p-2">
      <div class="h-10 w-10 rounded-full bg-gray-300" alt="user-img" />
      <div>
        <div class="my-1 mx-2 h-4 w-64 rounded-xl bg-gray-300 text-sm font-medium" />
        <span class="hidden">{{ loop }} </span>
        <div class="my-2 mx-2 h-3 w-56 rounded-xl bg-gray-300 text-sm" />
      </div>
    </div>

    <div v-if="variant == 'simpleList'" class="flex h-full w-full animate-pulse items-center justify-start p-2">
      <div class="w-full">
        <div class="mx-2 h-8 rounded-md bg-gray-300 text-sm font-medium" />
        <span class="hidden">{{ loop }} </span>
      </div>
    </div>

  </div>

  <div v-for="loop in 6" :key="loop">
    <div v-if="variant == 'table'" class="flex h-full w-full animate-pulse items-center justify-start p-2">
      <div v-for="col in 6" class="mx-2 my-2 w-full h-8 rounded-md bg-gray-300 text-sm font-medium" />
    </div>
  </div>
</template>
