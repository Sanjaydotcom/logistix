<script>
export default {
  props: ["isLoading", "onClick"],
  setup(props) {
    const isLoading = ref(props.isLoading);
    const onClick = ref(props.onClick);
    return { isLoading, onClick };
  },
};
</script>

<template>
  <div>
    <button
      @click="onClick"
      class="px-4 py-2 text-sm font-medium text-gray-500"
      :class="[isLoading ? 'animate-spin' : null]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  </div>
</template>
