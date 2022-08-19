<script>
definePageMeta({
  layout: "freigtdashboard",
});
import AddEditSlider from "./-components/AddEditSlider.vue";
import useEnquiryStore from "~~/store/crm/enquiry";
import AddEditQuotationSlider from "../quotation/-components/AddEditSlider.vue";
// Directory from "../../crm/customers/-components/Directory.vue";
import FilterBy from "~~/components/ui/FilterBy.vue";
import EnquiryActions from "./-components/EnquiryActions.vue";
import { storeToRefs } from "pinia";
export default {
  components: { AddEditSlider, FilterBy, AddEditQuotationSlider, EnquiryActions },
  setup() {
    const store = useEnquiryStore();
    const showSlideOver = ref(false);
    const ActionButtonIndex = ref(null);
    const DeleteMessagePopUpStatus = ref(false);
    const showQuotationSlideOver = ref(false);
    const CurrentRowId = ref(null);
    const showFilters = ref(false);
    const isLoading = false;
    const filterBy = ref("");
    const inner_ref = ref(null);
    const array = ref([]);
    const serviceModeTypeId = ref(0);
    const state = reactive({
      data: [],
      searchText: null,
      editData: false,
      duplicate: {},
    });
    const filterState = reactive({
      serviceMode: "",
      serviceType: "",
      customerId: "",
      origin: "",
      destination: "",
      name: "",
    });
    const { enquiryFetchStatus } = storeToRefs(store);
    onMounted(async () => {
      if (!store.enquiryList.length) {
        await store.fetchEnquiry();
        state.data = computed(() => store.enquiryList);
      }
    });
    watch(enquiryFetchStatus, async () => {
      if (enquiryFetchStatus.value) {
        await store.fetchEnquiry();
        state.data = computed(() => store.enquiryList);

        store.setFetchStatus(false);
      }
    });
    const searchList = (search) => {
      store.searchList(search);
    };
    useClickOutSide(inner_ref, () => {
      showFilters.value = false;
    });
    const FilterButtonOnClick = async () => {
      //RefreshButtonClick;
      state.data = await store.listDataByFilter(filterState);
      filterArray(filterState);
      toggleFilter();
    };
    const removeFilter = async (item) => {
      array.value = array.value.filter((i) => i != item);
      if (filterState.serviceMode.name == item) filterState.serviceMode = "";
      if (filterState.serviceType.name == item) filterState.serviceType = "";
      if (filterState.customerId == item) filterState.customerId = "";
      if (filterState.name == item) filterState.name = "";
      if (filterState.origin == item) filterState.origin = "";
      if (filterState.destination == item) filterState.destination = "";
      state.data = await store.listDataByFilter(filterState);
      filterArray(filterState);
    };
    const toggleQuotationSlideOver = () => {
      showQuotationSlideOver.value = !showQuotationSlideOver.value;
    };
    const addDuplicate = async (id) => {
      CurrentRowId.value = id;

      toggleTableActionButton(null);

      const EDataById = await store.getEById(id);
      await store.newEnquiry(EDataById.value.details.general);
    };
    const addQuotation = (id) => {
      CurrentRowId.value = id;
      state.editData = false;
      toggleTableActionButton(null);
      toggleQuotationSlideOver();
    };
    const filterArray = (s) => {
      while (array.value.length > 0) {
        array.value.pop();
      }
      if (s.serviceMode) array.value.push(s.serviceMode.name);
      if (s.serviceType) array.value.push(s.serviceType.name);
      if (s.customerId) array.value.push(s.customerId);
      if (s.origin) array.value.push(s.origin);
      if (s.destination) array.value.push(s.destination);
      if (s.name) array.value.push(s.name);
    };
    const RefreshButtonClick = async () => {
      while (array.value.length > 0) {
        array.value.pop();
      }
      (filterState.serviceMode = ""),
        (filterState.serviceType = ""),
        (filterState.customerId = ""),
        (filterState.name = ""),
        (filterState.origin = ""),
        (filterState.destination = ""),
        await store.fetchEnquiry();
      state.data = store.enquiryList;
      showFilters.value = false;
      filterBy.value = "";
    };
    const toggleDeleteMessagePopUp = async (id) => {
      CurrentRowId.value = id;
      DeleteMessagePopUpStatus.value = !DeleteMessagePopUpStatus.value;
    };
    const DeleteButtonClick = async () => {
      await store.deleteEnquiry(CurrentRowId.value);
      toggleTableActionButton(null);
      state.data = computed(() => store.enquiryList);
      toggleDeleteMessagePopUp();
    };
    const toggleFilter = () => {
      showFilters.value = !showFilters.value;
    };
    const toggleSlideOver = () => {
      showSlideOver.value = !showSlideOver.value;
    };
    const editEnquiry = (id) => {
      CurrentRowId.value = id;
      toggleTableActionButton(null);
      state.editData = true;
      toggleSlideOver();
    };
    const addEnquiry = () => {
      CurrentRowId.value = null;
      toggleTableActionButton(null);
      state.editData = false;
      toggleSlideOver();
    };
    const deleteEnquiry = () => {
    };
    async function serviceModeOnChange(id) {
      serviceModeTypeId.value = id;
    }
    async function serviceTypeOnChange(id) {
     
    }
    const toggleTableActionButton = async (data) => {
      if (ActionButtonIndex.value == data) {
        ActionButtonIndex.value = null;
      } else {
        ActionButtonIndex.value = data;
      }
    };
    return {
      showFilters,
      toggleFilter,
      showSlideOver,
      toggleSlideOver,
      searchList,
      DeleteMessagePopUpStatus,
      CurrentRowId,
      addEnquiry,
      editEnquiry,
      deleteEnquiry,
      store,
      state,
      isLoading,
      toggleTableActionButton,
      toggleDeleteMessagePopUp,
      ActionButtonIndex,
      DeleteButtonClick,
      FilterButtonOnClick,
      RefreshButtonClick,
      filterBy,
      array,
      filterState,
      filterArray,
      showQuotationSlideOver,
      toggleQuotationSlideOver,
      addQuotation,
      removeFilter,
      inner_ref,
      addDuplicate,
      serviceModeOnChange,
      serviceTypeOnChange,
      serviceModeTypeId,
    };
  },
};
</script>
<template>
  <div
    class="mx-auto h-full overflow-y-auto max-w-7xl flex-1 border-t border-gray-200 py-2 px-4"
  >
    <AddEditSlider
      v-if="showSlideOver"
      :closeSidebar="toggleSlideOver"
      :id="CurrentRowId"
      :editData="state.editData"
    />
    <AddEditQuotationSlider
      v-if="showQuotationSlideOver"
      :closeSidebar="toggleQuotationSlideOver"
      :id="CurrentRowId"
      :editData="state.editData"
    />
    <div class="pt-2 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Enquiries</h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <a href="/app/shipping/pricing">
          <button
            type="button"
            class="mr-2 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Get Pricing
          </button>
        </a>
        <button
          type="button"
          class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="addEnquiry"
        >
          New Enquiry
        </button>
      </div>
    </div>

    <div
      class="-mx-4 mt-3 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
    >
      <div class="min-w-0 flex-1 pt-1" ref="inner_ref">
        <div class="relative flex justify-between">
          <div
            class="relative max-w-2xl text-gray-400 focus-within:text-gray-500"
          >
            <label for="desktop-search" class="sr-only">Search...</label>
            <input
              id="desktop-search"
              type="search"
              placeholder="Search..."
              v-model="state.searchText"
              v-on:input="searchList(state.searchText)"
              class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent focus:ring-0 sm:text-sm"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4"
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
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="relative flex justify-between">
            <!-- <div class="px-4 py-2 text-sm font-medium text-gray-500">
              {{ filterBy }}
            </div> -->
            <FilterBy v-if="array.length>0"  :filterData="array" :removeFilter="removeFilter" />
            <button
              class="px-4 py-2 text-sm font-medium text-gray-500"
              @click="toggleFilter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
            <UiRefreshSpinner
              @click="RefreshButtonClick"
              :isLoading="isLoading"
            />
          </div>
        </div>
        <div
          v-if="showFilters"
          class="absolute right-0 z-30 mt-2 w-4/5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:px-0 lg:max-w-3xl"
          role="menu"
          style="max-width: 600px; margin-right: 20px"
          aria-orientation="vertical"
          aria-labelledby="menu-1-button"
          tabindex="-1"
        >
          <p class="ml-4 px-2 py-4 text-base font-medium text-gray-700">
            Filter By
          </p>
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <div class="divide-y divide-gray-200 px-4 sm:px-6 md:px-6">
              <div class="grid grid-cols-2 gap-4">
                <InputServiceTypeServiceModeDependent
                  :state="filterState"
                  IsFilter="true"
                  :callBackServiceTypeOnChange="serviceTypeOnChange"
                  :serviceModeChange="serviceModeOnChange"
                />
                <div>
                  <label
                    for="destination"
                    class="block text-sm font-medium text-gray-700"
                    >Origin</label
                  >
                  <InputPortSearchableText
                    inputName="origin"
                    :state="filterState"
                    name="Origin"
                    :serviceModeTypeId="serviceModeTypeId"
                  />
                </div>
                <div>
                  <label
                    for="destination"
                    class="block text-sm font-medium text-gray-700"
                    >Destination</label
                  >
                  <InputPortSearchableText
                    inputName="destination"
                    :state="filterState"
                     name="destination"
                    :serviceModeTypeId="serviceModeTypeId"
                  />
                </div>
                <div>
                  <label
                    for="contactPhone"
                    class="block text-sm font-medium text-gray-700"
                    >Name</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="filterState.name"
                  />
                </div>

                <div>
                  <label
                    for="contactPhone"
                    class="block text-sm font-medium text-gray-700"
                    >Customer ID</label
                  >
                  <input
                    type="number"
                    name="customerId"
                    id="customerId"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="filterState.customerId"
                  />
                </div>
              </div>
            </div>
            <div style="padding: 20px; direction: rtl">
              <button
                type="submit"
                @click="FilterButtonOnClick"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Enquiry No
            </th>
            <th
              scope="col"
              class="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Customer
            </th>
            <th
              scope="col"
              class="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Service Mode
            </th>
            <th
              @click="deleteEnquiry"
              scope="col"
              class="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Service Type
            </th>

            <th
              scope="col"
              class="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Origin
            </th>
            <th
              scope="col"
              class="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Destination
            </th>
            <th
              scope="col"
              class="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Remarks
            </th>
            <th scope="col" class="relative py-2 pl-3 pr-4 sm:pr-6">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, index) in state.data" :key="item.id">
            <NuxtLink :to="`/app/shipping/enquiry/` + item.id">
              <td
                class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:underline sm:w-auto sm:max-w-none sm:pl-6"
              >
                {{ item.id }}
              </td>
            </NuxtLink>
            <td
              class="hidden px-3 py-2 text-sm text-gray-500 lg:table-cell"
            >
            {{ item.name }}
              
            </td>
            <td class="hidden px-3 py-2 text-sm text-gray-500 lg:table-cell">
              {{ item.details.general.serviceMode.name }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.serviceType.name }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.origin }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.destination }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.remarks }}
            </td>

            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <!-- ActionButton -->
              <EnquiryActions
                  :item="item"
                  :editEnquiry="editEnquiry"
                  :deleteEnquiry="toggleDeleteMessagePopUp"
                  :addQuotation="addQuotation"
                  :addDuplicate="addDuplicate"
                />
              <!-- e -->
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="store.isLoading">
        <DirectoryLoading variant="table" />
      </div>
    </div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">1</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">10</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ state.data.length }}</span>
          {{ " " }}
          results
        </p>
      </div>

      <div class="flex flex-1 justify-between sm:justify-end">
        <button
          @click="store.prevList()"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          @click="store.nextList()"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>

    <UiDeleteConfirmationMessage
      v-if="DeleteMessagePopUpStatus"
      :deleteFunction="DeleteButtonClick"
      :toggleDeleteConfirmation="toggleDeleteMessagePopUp"
    />
  </div>
</template>
