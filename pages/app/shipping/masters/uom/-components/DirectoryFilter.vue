<script>
import { FilterIcon } from "@heroicons/vue/solid";
import { useCommodityStore } from "~~/store/masters/commodity";

import { storeToRefs } from "pinia";
export default {
  props: ["sortByName", "sortByDate", "prevPage", "nextPage"],
  setup(props) {
    const store = useCommodityStore();

    const { pageNum } = storeToRefs(store);
    const showFilters = ref(false);
    const inner_ref = ref(null);
    const sortByName = props.sortByName;
    const sortByDate = props.sortByDate;
    const toggleFilter = () => {
      showFilters.value = !showFilters.value;
    };
    useClickOutSide(inner_ref, () => {
      showFilters.value = false;
    });
    const handleFilter = (filterType) => {
      toggleFilter();

      store.sortList(filterType);
    };
    return {
      showFilters,
      toggleFilter,
      sortByName,
      inner_ref,
      sortByDate,
      handleFilter,
      pageNum,
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
        class="px-6 py-2 text-sm font-medium text-gray-500"
      >
        <p>Sort</p>
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
          @click="handleFilter('name')"
          class="block cursor-pointer px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="menu-1-item-0"
        >
          Sort by name
        </div>
        <div
          @click="handleFilter('createdAt')"
          class="block cursor-pointer px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="menu-1-item-1"
        >
          Sort by joining date
        </div>
      </div>
    </div>
  </div>
</template>
