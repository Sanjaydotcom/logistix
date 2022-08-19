<script>
export default {
  props: ["filterData", "removeFilter"],
  setup(props) {
    const filterData = computed(() => {
      return props.filterData;
    });
    const removeFilter = ref(props.removeFilter);
    watch(filterData, () => {
      filterData.value = props.filterData;
    });
    return {
      filterData,
      removeFilter,
    };
  },
};
</script>
<template>
  <div v-for="item in filterData" :key="item">
    <span
      class="align-center ease  mt-2 ml-1 flex w-max cursor-pointer rounded-full bg-gray-200 px-4 py-0.5 text-xs font-semibold text-gray-500 transition duration-300 active:bg-gray-300"
    >
      {{ item }}
      <button
        @click="removeFilter(item)"
        class="hover bg-transparent focus:outline-none"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          class="ml-3 w-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </button>
    </span>
  </div>
</template>
