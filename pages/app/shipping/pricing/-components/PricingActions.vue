<script>
export default {
  props: ["editPricing", "deletePricing", "item"],

  setup(props) {
    const inner_ref_pricing = ref(null);
    const openMenu = ref(false);
    useClickOutSide(inner_ref_pricing, () => {
      openMenu.value = false;
    });
    const openMenuHandler = () => {
      openMenu.value = !openMenu.value;
    };
    const edit = (id) => {
      props.editPricing(id);  
       openMenu.value = false;
    };
    const deleteRow = (id) => {
      props.deletePricing(id);
       openMenu.value = false;
    };
    return {
      inner_ref_pricing,
      openMenu,
      edit,
      deleteRow,
      openMenuHandler,
    };
  },
};
</script>

<template>
  <div class="relative inline-block text-left" ref="inner_ref_pricing">
    <div>
      <button
        type="button"
        @click="openMenuHandler"
        class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <span class="sr-only">Open options</span>
        <!-- Heroicon name: solid/dots-vertical -->
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="openMenu"
      class="absolute right-0 top-0 z-40 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <button
        @click="edit(item.id)"
        type="submit"
        class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        tabindex="-1"
        id="menu-item-3"
      >
        Edit
      </button>
      <button
        @click="deleteRow(item.id)"
        type="submit"
        class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        tabindex="-1"
        id="menu-item-3"
      >
        Delete
      </button>

      <!-- <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a> -->
    </div>
  </div>
</template>
