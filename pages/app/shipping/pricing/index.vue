<script>
definePageMeta({
  layout: "freigtdashboard",
});
import AddEditSlider from "./-components/AddEditSlider.vue";
import { usePriceStore } from "~~/store/shipping/price";
import { useLinerStore } from "~~/store/masters/liner";
import { storeToRefs } from "pinia";
import FilterBy from "~~/components/ui/FilterBy.vue";
import PricingActions from "./-components/PricingActions.vue";
export default {
  components: { AddEditSlider, FilterBy, PricingActions },
  setup() {
    const people = [
      {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
      },
      // More people...
    ];
    const store = usePriceStore();
    const linerStore = useLinerStore();
    const showSlideOver = ref(false);
    const showFilters = ref(false);
    const ActionButtonIndex = ref(null);
    const DeleteMessagePopUpStatus = ref(false);
    const CurrentRowId = ref(null);
    const filterBy = ref("");
    const inner_ref = ref(null);
    const array = ref([]);
    const serviceModeTypeId = ref(0);
    const DataById = ref({});
    const LinerDataById = ref({});
    const toggleFilter = (index) => {
      showFilters.value = !showFilters.value;
    };
    const toggleTableActionButton = async (data) => {
      if (ActionButtonIndex.value == data) {
        ActionButtonIndex.value = await null;
      } else {
        ActionButtonIndex.value = await data;
      }
    };
    const AddEditSliderToggle = async (IsAdd) => {
      state.data = await store.getPriceListsFromState();
      if (IsAdd) {
        CurrentRowId.value = null;
      }
      showSlideOver.value = !showSlideOver.value;
    };
    async function serviceModeOnChange(id) {
      serviceModeTypeId.value = id;
    }
    async function serviceTypeOnChange(event) {}
    const toggleDeleteMessagePopUp = async (id) => {
      CurrentRowId.value = await id;
      DeleteMessagePopUpStatus.value = !DeleteMessagePopUpStatus.value;
    };
    const DeleteButtonClick = async () => {
      await store.delete(CurrentRowId.value);
      toggleTableActionButton(null);
      state.data = await store.getPriceListsFromState();
      toggleDeleteMessagePopUp();
      CurrentRowId.value = null;
    };
    const RefreshButtonClick = async () => {
      while (array.value.length > 0) {
        array.value.pop();
      }
      (state.serviceMode = ""),
        (state.serviceType = ""),
        (state.carrier = ""),
        (state.originCountry = ""),
        (state.destinationCountry = ""),
        await store.fetchPriceList();
      state.data = await store.getPriceListsFromState();
      showFilters.value = false;
      filterBy.value = "";
    };
    const removeFilter = async (item) => {
      array.value = array.value.filter((i) => i != item);
      if (state.serviceMode.name == item) state.serviceMode = "";
      if (state.serviceType.name == item) state.serviceType = "";
      if (state.carrier == item) state.carrier = "";
      if (state.originCountry == item) state.originCountry = "";
      if (state.destinationCountry == item) state.destinationCountry = "";
      await store.listDataByFilter(state);
      state.data = await store.getPriceListsFromState();
      filterArray(state);
    };
    const editPricing = (id) => {
      CurrentRowId.value = id;
      toggleTableActionButton(null);
      state.editData = true;
      AddEditSliderToggle();
    };

    const state = reactive({
      data: [],
      searchText: null,
      searchKeyword: null,
      showAddNew: false,
      serviceMode: "",
      serviceType: "",
      carrier: "",
      originCountry: "",
      destinationCountry: "",
    });
    const { listFetchStatus, PriceList } = storeToRefs(store);
    onMounted(() => {
      if (!store.PriceList.length) {
        store.fetchPriceList();
      } else {
        state.data = store.getPriceListsFromState();
      }
    });
    useClickOutSide(inner_ref, () => {
      showFilters.value = false;
    });
    watch(listFetchStatus, () => {
      if (listFetchStatus.value) {
        state.data = store.getPriceListsFromState();
        store.setFetchStatus(false);
      }
    });
    const searchList = (search) => {
      store.searchList(search);
    };
    const FilterButtonOnClick = async () => {
      await store.listDataByFilter(state);
      state.data = await store.getPriceListsFromState();
      filterArray(state);
      toggleFilter();
    };
    const filterArray = (s) => {
      while (array.value.length > 0) {
        array.value.pop();
      }
      if (s.serviceMode) array.value.push(s.serviceMode.name);
      if (s.serviceType) array.value.push(s.serviceType.name);
      if (s.carrier) array.value.push(s.carrier);
      if (s.originCountry) array.value.push(s.originCountry);
      if (s.destinationCountry) array.value.push(s.destinationCountry);
    };
    return {
      CurrentRowId,
      showFilters,
      toggleFilter,
      searchList,
      showSlideOver,
      AddEditSliderToggle,
      people,
      state,
      store,
      toggleTableActionButton,
      ActionButtonIndex,
      editPricing,
      DeleteButtonClick,
      toggleDeleteMessagePopUp,
      DeleteMessagePopUpStatus,
      FilterButtonOnClick,
      RefreshButtonClick,
      filterBy,
      inner_ref,
      array,
      filterArray,
      removeFilter,
      serviceModeOnChange,
      serviceModeTypeId,
      serviceTypeOnChange,
    };
  },
};
</script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="mx-auto h-full max-w-7xl flex-1 overflow-x-scroll border-t border-gray-200 py-2 px-4"
  >
    <AddEditSlider
      v-if="showSlideOver"
      :id="CurrentRowId"
      :closeSidebar="AddEditSliderToggle"
    />
    <div class="pt-2 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Pricing</h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="AddEditSliderToggle(true)"
        >
          New Pricing
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
              <!-- Heroicon name: solid/search -->
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
            <FilterBy
              v-if="array.length > 0"
              :filterData="array"
              :removeFilter="removeFilter"
            />
            <button
              class="px-4 py-1 text-sm font-medium text-gray-500"
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
            <button
              @click="RefreshButtonClick"
              class="px-4 py-2 text-sm font-medium text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- FFF -->
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
                  :state="state"
                  :IsFilter="true"
                  :callBackServiceTypeOnChange="serviceTypeOnChange"
                  :serviceModeChange="serviceModeOnChange"
                  isPricing="true"
                />
                <InputSearchableSelect
                  inputName="loadingPort"
                  :state="state"
                  name="Origin Country"
                  :hidden="true"
                />
                <InputSearchableSelect
                  inputName="destinationCountry"
                  :state="state"
                  name="Destination Country"
                  :hidden="true"
                />
                <InputLinerDropDown
                  label="Carrier"
                  :state="this.state"
                  inputName="carrier"
                />
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
      <!-- table -->
      <div
        class="-mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Port of loading
              </th>

              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Port of Discharge
              </th>

              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Carrier
              </th>

              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Total Freight 20GP
              </th>

              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Total Freight 40GP
              </th>

              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Validity
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Remarks
              </th>
              <th scope="col" class="relative py-2 pl-3 pr-4 sm:pr-6">
              <span class="sr-only">Edit</span>
            </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(data, index) in state.data" :key="data.id">
              <a :href="`/app/shipping/pricing/${Number(data.id)}`">
                <td
                  class="w-full max-w-0 py-4 pl-4 pt-6 pr-3 text-sm font-medium text-gray-900 hover:underline sm:w-auto sm:max-w-none sm:pl-6"
                >
                  {{ data.details.loadingPort }}
                </td>
              </a>

              <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {{ data.details.dischargingPort }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.carrier.toUpperCase() }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.frightCharge20gp }}
                {{ data.details.frightCharge20gpCurrencyCode }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.frightCharge40gp }}
                {{ data.details.frightCharge40gpCurrencyCode }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.validity }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.remarks }}
              </td>
             <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <!-- ActionButton -->
              <PricingActions
                  :item="data"
                  :editPricing="editPricing"
                  :deletePricing="toggleDeleteMessagePopUp"
                />
              <!-- e -->
            </td> 
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="store.isLoding">
        <DirectoryLoading variant="table" />
      </div>
      <!--  -->
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
    <!--  -->
  </div>
</template>
