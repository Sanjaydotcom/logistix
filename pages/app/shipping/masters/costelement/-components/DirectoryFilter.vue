<script>
import { FilterIcon } from "@heroicons/vue/solid";
import { useCostelementStore } from "~~/store/masters/costelement";

import { storeToRefs } from "pinia";
export default {
  props: ["sortByName", "sortByDate", "prevPage", "nextPage"],
  setup(props) {
    const store = useCostelementStore();

    const { pageNum } = storeToRefs(store);
    const { pageCount } = storeToRefs(store);
    const showFilters = ref(false);
    const showMore = ref(false);
    const inner_ref = ref(null);
    const filter = ref(store.getFilterType());
    const sortByName = props.sortByName;
    const sortByDate = props.sortByDate;
    const toggleFilter = () => {
      showFilters.value = !showFilters.value;
    };
    const toggleMore = () => {
      showMore.value = !showMore.value;
    };
    useClickOutSide(inner_ref, () => {
      showFilters.value = false;
    });
    const handleSort = (filterType) => {
      toggleFilter();
      store.sortList(filterType);
      toggleMore();
      filter.value = "Sorted by " + filterType;
    };
    return {
      showFilters,
      toggleFilter,
      sortByName,
      inner_ref,
      sortByDate,
      handleSort,
      pageNum,
      pageCount,
      toggleMore,
      showMore,
      filter,
    };
  },
  components: {
    FilterIcon,
  },
};
</script>

<template>
  <div class="relative flex-shrink-0" ref="inner_ref">
    <div
      class="flex justify-between border-t border-b border-gray-200 bg-gray-50"
    >
      <button
        @click="toggleFilter"
        class="flex px-6 py-2 text-sm font-medium text-gray-500"
      >
        <svg
          class="mr-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          ></path>
        </svg>
        <p>{{ filter }}</p>
      </button>
      <div class="flex justify-between bg-gray-50 px-4">
        <button
          v-if="pageNum != 0"
          @click="prevPage"
          class="px-6 py-2 text-sm font-medium text-gray-500"
        >
          <p>Prev</p>
        </button>
        <button
          v-if="pageCount == 10"
          @click="nextPage"
          class="px-6 py-2 text-sm font-medium text-gray-500"
        >
          <p>Next</p>
        </button>
      </div>
    </div>

    <div
      v-if="showFilters"
      class="
        absolute
        left-0
        z-30
        mt-2
        w-56
        origin-top-left
        rounded-md
        bg-white
        shadow-lg
        ring-1 ring-black ring-opacity-5
        focus:outline-none
      "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-1-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <div
          @click="handleSort('name')"
          class="block cursor-pointer px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="menu-1-item-0"
        >
          Sort by Name
        </div>
        <div
          @click="handleSort('code')"
          class="block cursor-pointer px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="menu-1-item-1"
        >
          Sort by Code
        </div>
      </div>
    </div>
  </div>
</template>
