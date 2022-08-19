<script>
import CountryTermForm from "./CountryTermForm.vue";
import useTermsStore from "~~/store/masters/terms";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";
export default {
  components: {
    CountryTermForm,
  },
  props: ["id", "data", "toggleCountrySlide"],
  setup(props) {
    const store = useTermsStore();
    const toggleSlideOver = props.toggleCountrySlide;
    const currentItem = ref(0);
    const editData = ref(null);
    const formVisible = ref(false);

    const state = computed(() => {
      return {
        data: props.data,
        id: props.data.id,
        terms: props.data.details.countryTerms,
      };
    });

    const setCurrentItem = (itemNo) => {
      if (currentItem.value != itemNo) {
        formVisible.value = false;
        currentItem.value = itemNo;
      } else if (currentItem.value == itemNo) {
        currentItem.value = 0;
      } else {
        currentItem.value = itemNo;
      }
    };

    const toggleForm = () => {
      formVisible.value = !formVisible.value;
    };

    const addTerm = () => {
      editData.value = null;
      toggleForm();
    };

    const editTerm = (item) => {
      editData.value = item;
      toggleForm();
    };

    const deleteTerm = (termId, countryId) => {
      store.deleteCountryTerm(termId, countryId, state.value.id);
    };

    const handleDrag = (e) => {
      const test = e.target.id;
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      const test = e.target;
    };

    const handleDrop = (e) => {
      const test = e.target.id;
    };

    return {
      state,
      addTerm,
      editTerm,
      deleteTerm,
      currentItem,
      setCurrentItem,
      formVisible,
      toggleForm,
      editData,
      toggleSlideOver,
      handleDrag,
      handleDragOver,
      handleDrop,
    };
  },
};
</script>

<template>
  <div>
    <div
      v-if="state.terms && state.terms.length < 1"
      @click="toggleSlideOver"
      class="my-4 cursor-pointer border border-dashed border-gray-300 py-2 text-center"
    >
      <h3 class="mt-1 text-sm font-medium text-gray-900">No Countries</h3>
      <p class="my-1 text-sm text-gray-500">
        Get started by adding a new Country.
      </p>
    </div>
    <div
      v-for="item in state.terms"
      :key="item.id"
      class="mb-2 cursor-pointer bg-white shadow sm:rounded-lg"
    >
      <div
        @click="setCurrentItem(item.id)"
        class="flex justify-between px-4 py-5 sm:px-6"
      >
        <div>
          <h3 class="text-md font-medium leading-6 text-gray-900">
            {{ item.country }}
          </h3>
        </div>
        <div>
          <div v-if="currentItem !== item.id">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          <div v-if="currentItem === item.id">
            <button
              type="button"
              class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none"
              @click.stop="addTerm"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Term
            </button>
          </div>
        </div>
      </div>
      <!-- Terms section -->
      <div v-if="currentItem === item.id" class="px-4 py-2 sm:px-6">
        <div v-if="item.terms.length < 1 && !formVisible" class="text-center">
          <p class="py-4 text-sm text-gray-500">
            Get started by adding a new term
          </p>
        </div>
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="term in item.terms" :key="term.id">
            <div
              draggable="true"
              @drag="handleDrag"
              @dragover="handleDragOver"
              @drop="handleDrop"
              class="block cursor-move hover:bg-gray-50"
              :id="term.id"
            >
              <div class="flex items-center px-4 py-4 sm:px-6">
                <div
                  class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <div class="flex text-sm">
                      <p
                        class="ml-1 text-gray-600"
                        :class="[
                          term.isHeading ? 'font-medium' : 'font-normal',
                        ]"
                      >
                        {{ term.description }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="ml-5 flex flex-row">
                  <div @click="editTerm(term)" class="cursor-pointer px-2">
                    <svg
                      class="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </div>

                  <div
                    @click="deleteTerm(term.id, item.id)"
                    class="cursor-pointer"
                  >
                    <svg
                      class="h-5 w-5 text-red-400 hover:text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- Terms form -->
      <div v-if="formVisible && currentItem === item.id">
        <CountryTermForm
          :id="state.data.id"
          :countryId="item.id"
          :toggleForm="toggleForm"
          :addTerms="addTerm"
          :updateTerms="editTerm"
          :editData="editData"
        />
      </div>
    </div>
  </div>
</template>
