<script>
import { computed, ref } from "vue";
import { iso31661 } from "iso-3166";
export default {
  props: ["state", "inputName", "name"],
  setup(props) {
    const showOptions = ref(false);
    const inner_ref = ref(null);

    const setValue = (option) => {
      props.state[String(props.inputName)] = option.name.toUpperCase();
      showOptions.value = false;
    };
    useClickOutSide(inner_ref, () => {
      showOptions.value = false;
    });
    const filteredOptions = computed(() =>
      props.state[props.inputName].value === ""
        ? iso31661
        : iso31661.filter((option) => {
            return option.name
              .toLowerCase()
              .includes(props.state[props.inputName]);
          })
    );
    return {
      filteredOptions,
      setValue,
      showOptions,
      inner_ref,
      iso31661,
    };
  },
};
</script>

<template>
  <div ref="inner_ref">
    <label :for="inputName" class="block text-sm font-medium text-gray-700">{{
      name
    }}</label>
    <div class="relative mt-1">
      <input
        :name="inputName"
        :id="inputName"
        v-model="state[inputName]"
        type="text"
        class="
          w-full
          rounded-md
          border border-gray-300
          bg-white
          py-2
          pl-3
          pr-12
          shadow-sm
          focus:border-indigo-500
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          sm:text-sm
        "
        @focus="showOptions = true"
        role="combobox"
        aria-controls="options"
        aria-expanded="false"
      />
      <button
        type="button"
        @click="showOptions = true"
        class="
          absolute
          inset-y-0
          right-0
          flex
          items-center
          rounded-r-md
          px-2
          focus:outline-none
        "
      >
        <!-- Heroicon name: solid/selector -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <ul
        v-if="showOptions"
        class="
          absolute
          z-10
          mt-1
          max-h-60
          w-full
          overflow-auto
          rounded-md
          bg-white
          py-1
          text-base
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          sm:text-sm
        "
      >
        <!--
        Combobox option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Active: "text-white bg-indigo-600", Not Active: "text-gray-900"
      -->
        <li
          class="
            relative
            cursor-pointer
            select-none
            py-2
            pl-3
            pr-9
            text-gray-900
          "
          v-for="option in filteredOptions"
          :key="option.id"
          :id="option.id"
          role="option"
          @click="setValue(option)"
        >
          <!-- Selected: "font-semibold" -->
          <span class="block truncate">{{ option.name.toUpperCase() }}</span>

          <!--
          Checkmark, only display for selected option.

          Active: "text-white", Not Active: "text-indigo-600"
        -->
          <span
            v-if="state[inputName] == option.name"
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-4
              text-indigo-600
            "
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
          </span>
        </li>

        <!-- More items... -->
      </ul>
    </div>
  </div>
</template>
