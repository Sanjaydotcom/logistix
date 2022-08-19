<script>
export default {
  data() {
    return {
      dropDownList: [
        {
          id: "3",
          name: "Suspended",
          Description: "Is one of the best",
          active: false,
        },
        {
          id: "4",
          name: "Terminated",
          Description: "Is one of the best",
          active: false,
        },
      ],
      IsDropDownOpen: false,
      selectData: "Change Status",
    };
  },
  methods: {
    changeStatusOnClick(id) {
      this.dropDownList = this.dropDownList.map((object) => {
        if (object.id === id) {
          // 👇️ change value of name property
          this.selectData = object.name;
          return { ...object, active: true };
        } else {
          return { ...object, active: false };
        }
        return object;
      });
      this.toggleDropDownStatus();
    },
    toggleDropDownStatus() {
      this.IsDropDownOpen = !this.IsDropDownOpen;
    },
  },
};
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <label id="listbox-label" class="sr-only"> Change published status </label>
    <div class="relative">
      <div class="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
        <div
          class="relative z-0 inline-flex divide-x divide-indigo-600 rounded-md shadow-sm"
        >
          <div
            class="relative inline-flex items-center rounded-l-md border border-transparent bg-indigo-500 py-2 pl-3 pr-4 text-white shadow-sm"
          >
            <!-- Heroicon name: solid/check -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="ml-2.5 text-sm font-medium">{{ selectData }}</p>
          </div>
          <button
            type="button"
            class="relative inline-flex items-center rounded-l-none rounded-r-md bg-indigo-500 p-2 text-sm font-medium text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            @click="toggleDropDownStatus"
          >
            <span class="sr-only">Change status</span>
            <!-- Heroicon name: solid/chevron-down -->
            <svg
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <ul
        v-if="IsDropDownOpen"
        class="static right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-0"
      >
        <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-indigo-500", Not Highlighted: "text-gray-900"
      -->
        <li
          v-for="data in dropDownList"
          :key="data.id"
          @click="changeStatusOnClick(data.id)"
          :class="[
            data.active
              ? 'bg-indigo-500 text-white hover:cursor-pointer hover:bg-indigo-300'
              : 'bg-gray-100 text-gray-900 hover:cursor-pointer hover:bg-indigo-500',
            'relative cursor-default select-none p-4 text-sm hover:cursor-pointer',
          ]"
          id="listbox-option-0"
          role="option"
        >
          <div class="flex flex-col">
            <div class="flex justify-between">
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <p :class="data.active ? 'font-semibold' : 'font-normal'">
                {{ data.name }}
              </p>
              <span :class="data.active ? 'text-white' : 'text-indigo-500'">
                <!-- Heroicon name: solid/check -->
                <svg
                  :class="[data.active ? 'visible' : 'invisible', 'h-5 w-5']"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </li>

        <!-- More items... -->
      </ul>
    </div>
  </div>
</template>
