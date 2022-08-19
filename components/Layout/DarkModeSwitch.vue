<script setup>
const colorMode = useColorMode();
const darkMode = ref(colorMode.value == "dark" ? true : false);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  darkMode.value
    ? (colorMode.preference = "dark")
    : (colorMode.preference = "default");
};
</script>

<template>
  <div
    class="block px-4 py-2 text-sm text-gray-700"
    role="menuitem"
    tabindex="-1"
    id="menu-1-item-0"
  >
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex items-center justify-between">
      <span class="flex flex-grow flex-col">
        <span class="text-sm text-gray-700" id="availability-label"
          >Dark Mode</span
        >
      </span>
      <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
      <button
        @click="toggleDarkMode"
        type="button"
        :class="[darkMode ? 'bg-indigo-600' : 'bg-gray-200']"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        role="switch"
        aria-checked="false"
        aria-labelledby="availability-label"
        aria-describedby="availability-description"
      >
        <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
        <span
          aria-hidden="true"
          :class="[darkMode ? 'translate-x-5' : 'translate-x-0']"
          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        ></span>
      </button>
    </div>
  </div>
</template>
