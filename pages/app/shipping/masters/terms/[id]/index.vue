<script lang="ts">
import Directory from "../-components/Directory.vue";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import useTermsStore from "~~/store/masters/terms";
import AddEditSlideOver from "../-components/AddEditSlideOver.vue";
import CountrySlideOver from "../-components/CountrySlideOver.vue";
import TermForm from "./-components/TermForm.vue";
import CountryTerms from "./-components/CountryTerms.vue";
export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
    Directory,
    AddEditSlideOver,
    TermForm,
    CountryTerms,
    CountrySlideOver,
  },
  setup() {
    const terms = [];
    const store = useTermsStore();
    const { params } = useRoute();
    const { termsUpdated } = storeToRefs(store);
    const formVisible = ref(false);
    const showEdit = ref(false);
    const hide = ref(false);
    const showCountrySlide = ref(false);
    const editData = ref([]);
    const countryData = ref([]);
    const router = useRouter();
    const termData = ref();
    const deleteWarning = ref(false);
    const showTerms = ref(false);

    const toggleForm = () => {
      formVisible.value = !formVisible.value;
    };

    const toggleTerms = () => {
      showTerms.value = !showTerms.value;
    };

    const toggleCountrySlide = () => {
      showCountrySlide.value = !showCountrySlide.value;
    };

    const toggleDeleteWarning = () => {
      deleteWarning.value = !deleteWarning.value;
    };

    const addTerms = (item: any) => {
      const ID = terms.length + 1;
      const data = { ...item, id: ID };
      terms.push(data);
    };

    const updateTerms = (item: any) => {
      const ID = terms.length + 1;
      const data = { ...item, id: ID };
      terms.push(data);
    };

    const deleteTerms = (item: any) => {
      const ID = terms.length + 1;
      const data = { ...item, id: ID };
      terms.push(data);
    };

    const state = reactive({
      data: [],
      id: null,
      showDirectory: false,
      activeTab: "1",
      editData: {},
    });
    onMounted(() => {
      getData(params.id);
    });

    const addTerm = () => {
      state.editData = null;
      toggleForm();
    };

    const editTerm = (data: any) => {
      state.editData = data;
      toggleForm();
    };

    const deleteTerm = (data: any) => {
      store.deleteTerm(data.id, state.id);
    };
    const getData = async (id: string) => {
      state.id = id;
      if (!store.directorylist.length) {
        await store.fetchList();
      }
      state.data = await store.getById(Number(id));
    };
    const toogleEdit = async () => {
      editData.value = state.data;
      showEdit.value = !showEdit.value;
    };
    const deleteList = async () => {
      await store.delete(state.id);
      router.push("/app/shipping/masters/terms/");
    };
    watch(termsUpdated, () => {
      if (termsUpdated.value) {
        store.setUpdatedStatus(false);
        getData(params.id);
      }
    });

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

    const toogleDirectory = () => {
      state.showDirectory = !state.showDirectory;
    };
    const openMenu = ref(true);
    const toggleMenu = () => {
      openMenu.value = !openMenu.value;
    };
    const showNextItem = () => {
      router.push(`/app/shipping/masters/terms/${Number(state.id) + 1}`);
    };
    const showPrevItem = () => {
      router.push(`/app/shipping/masters/terms/${Number(state.id) - 1}`);
    };

    return {
      state,
      editData,
      deleteList,
      showNextItem,
      showPrevItem,
      toogleDirectory,
      toggleMenu,
      openMenu,
      termsUpdated,
      toogleEdit,
      showEdit,
      toggleForm,
      formVisible,
      terms,
      addTerms,
      updateTerms,
      deleteTerms,
      termData,
      addTerm,
      editTerm,
      deleteTerm,
      handleDrag,
      handleDragOver,
      handleDrop,
      deleteWarning,
      toggleDeleteWarning,
      showTerms,
      toggleTerms,
      showCountrySlide,
      toggleCountrySlide,
      countryData,
      hide,
    };
  },
};
definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <div class="min-w-0 flex-1 border-t border-gray-200 xl:flex">
    <section
      v-if="state.data"
      aria-labelledby="message-heading"
      class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
    >
      <!-- Top section -->
      <div class="flex-shrink-0 border-b border-gray-200 bg-white">
        <!-- Toolbar-->
        <div class="flex h-16 flex-col justify-center">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between py-3">
              <!-- Left buttons -->
              <div>
                <div
                  class="relative z-0 inline-flex rounded-md shadow-sm sm:space-x-3 sm:shadow-none"
                >
                  <span class="hidden space-x-3 lg:flex">
                    <button
                      type="button"
                      class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                      @click="toogleEdit"
                    >
                      <!-- Heroicon name: solid/archive -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>Edit</span>
                    </button>
                  </span>
                  <span class="hidden space-x-3 px-4 lg:flex">
                    <button
                      type="button"
                      class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                      @click="toggleDeleteWarning"
                    >
                      <!-- Heroicon name: solid/archive -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </span>
                  <span
                    v-if="state.activeTab === '2'"
                    class="hidden space-x-3 lg:flex"
                  >
                    <button
                      type="button"
                      class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                      @click="toggleCountrySlide"
                    >
                      <svg
                        class="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      <span>Add Country</span>
                    </button>
                  </span>
                  <div class="relative -ml-px block sm:shadow-sm lg:hidden">
                    <div>
                      <button
                        type="button"
                        class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:rounded-md sm:px-3"
                        id="menu-2-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span class="sr-only sm:hidden">More</span>
                        <span class="hidden sm:inline">More</span>
                        <!-- Heroicon name: solid/chevron-down -->
                        <svg
                          class="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
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

                    <!--
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                          From: "transform opacity-0 scale-95"
                          To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                          From: "transform opacity-100 scale-100"
                          To: "transform opacity-0 scale-95"
                      -->
                    <div
                      class="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-2-button"
                      tabindex="-1"
                    >
                      <div v-if="hide" class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 sm:hidden"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-0"
                        >
                          Note
                        </a>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 sm:hidden"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-1"
                        >
                          Assign
                        </a>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-2"
                        >
                          Archive
                        </a>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-3"
                        >
                          Move
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right buttons -->
            </div>
          </div>
        </div>
        <!-- Message header -->
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto">
        <!-- Thread section-->
        <div class="min-h-0 flex-1 overflow-y-auto px-4 py-2">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  {{ state.data.termValue }}
                </h3>
              </div>
              <!-- Terms tab switch -->
              <div class="mx-auto mt-2 max-w-5xl">
                <nav class="flex cursor-pointer space-x-4" aria-label="Tabs">
                  <div
                    @click="state.activeTab = '1'"
                    :class="[
                      state.activeTab === '1'
                        ? 'border-blue-600 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'cursor-pointer whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                    ]"
                  >
                    General Terms
                  </div>
                  <div
                    @click="state.activeTab = '2'"
                    :class="[
                      state.activeTab === '2'
                        ? 'border-blue-600 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'cursor-pointer whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                    ]"
                  >
                    Country Terms
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <!-- General terms section -->
          <div v-if="state.activeTab === '1'" class="mt-4 shadow sm:rounded-md">
            <div class="my-2 flex justify-end p-4">
              <div>
                <button
                  type="button"
                  class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                  @click="addTerm"
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

            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="item in state.data.details?.terms" :key="item.id">
                <div
                  draggable="true"
                  @drag="handleDrag"
                  @dragover="handleDragOver"
                  @drop="handleDrop"
                  class="block cursor-move hover:bg-gray-50"
                  :id="item.id"
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
                              item?.isHeading ? 'font-medium' : 'font-normal',
                            ]"
                          >
                            {{ item.description }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="ml-5 flex flex-row">
                      <div @click="editTerm(item)" class="cursor-pointer px-2">
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

                      <div @click="deleteTerm(item)" class="cursor-pointer">
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
            <div
              v-if="state.data.details?.terms < 1 && !formVisible"
              @click="addTerm"
              class="my-4 cursor-pointer border border-dashed border-gray-300 py-2 text-center"
            >
              <h3 class="mt-1 text-sm font-medium text-gray-900">No terms</h3>
              <p class="my-1 text-sm text-gray-500">
                Get started by adding a new term.
              </p>
            </div>
            <div v-if="formVisible">
              <TermForm
                :id="state.id"
                :toggleForm="toggleForm"
                :addTerms="addTerms"
                :deleteTerms="deleteTerms"
                :updateTerms="updateTerms"
                :editData="state.editData"
              />
            </div>
          </div>
          <!-- Country terms section -->
          <div v-if="state.activeTab === '2'" class="mt-4 shadow sm:rounded-md">
            <CountryTerms
              :id="state.id"
              :data="state.data"
              :toggleCountrySlide="toggleCountrySlide"
            />
          </div>
        </div>
      </div>
    </section>
    <section
      v-else
      class="flex h-full flex-1 flex-col justify-center overflow-hidden xl:order-last"
    >
      <div class="flex h-full items-center justify-center">
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div class="text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            ></path>
          </svg>
          <p class="mt-5 text-sm text-gray-500">Select a Term</p>
        </div>
      </div>
    </section>
    <!-- Message list-->
    <Directory :openMenu="openMenu" :toggleMenu="toggleMenu" />
    <div
      v-if="showEdit && editData"
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      <div class="fixed inset-0 overflow-hidden">
        <add-edit-slide-over
          :id="state.id"
          :editData="editData"
          :closeSlider="toogleEdit"
        />
      </div>
    </div>
    <div
      v-if="showCountrySlide"
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      <div class="fixed inset-0 overflow-hidden">
        <CountrySlideOver
          :data="state.data"
          :id="state.id"
          :closeSlider="toggleCountrySlide"
        />
      </div>
    </div>
    <UiDeleteConfirmationMessage
      v-if="deleteWarning"
      :deleteFunction="deleteList"
      :toggleDeleteConfirmation="toggleDeleteWarning"
      :title="state.data.termValue"
    />
  </div>
</template>
