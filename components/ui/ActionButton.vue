<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { DotsVerticalIcon } from "@heroicons/vue/solid";

export default {
  data() {
    return {
      IsOpen: false,
    };
  },
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
  },
  methods: {
    ActionButtonClick() {
      this.IsOpen = !this.IsOpen;
    },
  },
};
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <span class="sr-only">Open options</span>
        <DotsVerticalIcon
          class="h-5 w-5"
          aria-hidden="false"
          @click="ActionButtonClick"
        />
      </MenuButton>
    </div>

    <div v-if="IsOpen">
      <div
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            >Edit</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            id="menu-item-1"
            >View</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            id="menu-item-2"
            >Delete</a
          >
          <form method="POST" action="#" role="none"></form>
        </div>
      </div>
    </div>
  </Menu>
</template>
