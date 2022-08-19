<script>
import useValidate from "@vuelidate/core";
import { required, email, maxValue } from "@vuelidate/validators";

import { reactive, computed } from "vue";

definePageMeta({
  layout: "freigtdashboard",
});

export default {
  components: {},
  setup() {
    const isLoading = ref(false);

    const state = reactive({
      name: "",
      kind: "",
      code: "",
    });
    const rules = computed(() => {
      return {
        name: { required },
        code: { required },
        kind: { required },
      };
    });
    const v$ = useValidate(rules, state);
    onMounted(() => {
     isLoading.value = true;
    });
    return {
      state,
      rules,
      v$,
    };
  },
    methods: {
    async submitForm() {
      this.v$.$validate();
        let saveData = { ...this.state, details: {} };

  console.log(saveData);
    },
  },
};
</script>

<template v-if="isLoading ">
  <div
    class="mx-auto h-full max-w-7xl flex-1 overflow-y-scroll border-t border-gray-200 py-2 px-4"
  >
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-gray-800 sm:truncate sm:text-2xl"
          >
              Sales Order
          </h2>
        </div>
        <div class="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
          @click="submitForm"
            type="button"
            class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
      <div>
        <nav class="sm:hidden" aria-label="Back">
          <a
            href="#"
            class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <!-- Heroicon name: solid/chevron-left -->
            <svg
              class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-4">
            <li>
              <div class="flex">
                <a
                  href="#"
                  class="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >Shipping</a
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <!-- Heroicon name: solid/chevron-right -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <a
                  href="#"
                  class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >Sales Order</a
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <!-- Heroicon name: solid/chevron-right -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <a
                  href="#"
                  aria-current="page"
                  class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >Add</a
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="flex flex-1 flex-col justify-between">
        <div class="divide-y divide-gray-200 px-4 sm:px-6">
          <div class="space-y-6 pt-6 pb-5">
            <div class="col-span-6 sm:col-span-3">
         
              <label  class="block text-sm font-medium text-gray-700"
                >Namsss</label
              >
              <input
                type="text"
            
                     autocomplete="address-level2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                v-model="v$.name.$model"
              />
              <span
                v-if="v$.name.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.name.$errors[0].$message }}
              </span>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
