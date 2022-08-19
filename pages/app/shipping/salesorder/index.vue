<script>
definePageMeta({
  layout: "freigtdashboard",
});
import AddEditSliderOver from "./-components/AddEditSlideOver.vue";
import { useSalesOrderStore } from "~~/store/shipping/salesorder";
import { useLinerStore } from "~~/store/masters/liner";
import { storeToRefs } from "pinia";
import SalesOrderActions from "./-components/SalesOrderActions.vue";
export default {
  components: { AddEditSliderOver, SalesOrderActions },
  setup() {

    const store = useSalesOrderStore();
    const linerStore = useLinerStore();
    const showSlideOver = ref(false);
    const showFilters = ref(false);
    const ActionButtonIndex = ref(null);
    const DeleteMessagePopUpStatus = ref(false);
    const CurrentRowId = ref(null);
    const editData = ref(null);
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
      state.data = await store.getSalesOrderListsFromState();
      if (IsAdd) {
        CurrentRowId.value = null;
      }
      showSlideOver.value = !showSlideOver.value;
    };
    const toggleDeleteMessagePopUp = async (id) => {
      CurrentRowId.value = await id;
      DeleteMessagePopUpStatus.value = !DeleteMessagePopUpStatus.value;
    };
    const DeleteButtonClick = async () => {
      await store.delete(CurrentRowId.value);
      toggleTableActionButton(null);
      state.data = await store.getSalesOrderListsFromState();
      toggleDeleteMessagePopUp();
      CurrentRowId.value = null;
    };
    const editButtonClick = async (data) => {
      CurrentRowId.value = await data.id;
      editData.value = await data;
      toggleTableActionButton(null);
      AddEditSliderToggle();
    };
    const RefreshButtonClick = async () => {
      (state.serviceMode = ""),
        (state.serviceType = ""),
        (state.carrier = ""),
        (state.originCountry = ""),
        (state.destinationCountry = ""),
        await store.fetchSalesOrderList();
      state.data = await store.getSalesOrderListsFromState();
    };

    const state = reactive({
      data: [],
      searchKeyword: null,
      showAddNew: false,
      serviceMode: "",
      serviceType: "",
      carrier: "",
      originCountry: "",
      destinationCountry: "",
    });
    const { listFetchStatus, SalesOrderList } = storeToRefs(store);
    onMounted(() => {
      if (!store.SalesOrderList.length) {
        store.fetchSalesOrderList();
      } else {
        state.data = store.getSalesOrderListsFromState();
      }
    });
    watch(listFetchStatus, () => {
      if (listFetchStatus.value) {
        state.data = store.getSalesOrderListsFromState();
        store.setFetchStatus(false);
      }
    });
    const addNew = () => {
      showSlideOver.value = !showSlideOver.value;
    };
    const FilterButtonOnClick = async () => {
      await store.listDataByFilter(state);
      state.data = await store.getSalesOrderListsFromState();
    };
    return {
      CurrentRowId,
      showFilters,
      editData,
      toggleFilter,
      showSlideOver,
      AddEditSliderToggle,
        state,
      store,
      addNew,
      toggleTableActionButton,
      ActionButtonIndex,
      editButtonClick,
      DeleteButtonClick,
      toggleDeleteMessagePopUp,
      DeleteMessagePopUpStatus,
      FilterButtonOnClick,
      RefreshButtonClick,
    };
  },
};
</script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="mx-auto h-full max-w-7xl flex-1 overflow-x-scroll border-t border-gray-200 py-2 px-4"
  >
    <AddEditSliderOver
      v-if="showSlideOver"
      :editData="editData"
      :id="CurrentRowId"
      :closeSidebar="AddEditSliderToggle"
    />
    <div class="pt-2 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Sales Order</h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="AddEditSliderToggle(true)"
        >
          New Sales Order
        </button>
           <a
          href="/app/shipping/salesorder/new"
          class="inline-flex items-center rounded border border-gray-300 bg-white mx-2 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
     
        >
          Sales Order Add Page
        </a>
      </div>
    </div>

    <div
      class="-mx-4 mt-3 shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
    >
      <div class="min-w-0 flex-1 pt-1">
        <div class="relative flex justify-between">
          <div
            class="relative max-w-2xl text-gray-400 focus-within:text-gray-500"
          >
            <label for="desktop-search" class="sr-only">Search...</label>
            <input
              id="desktop-search"
              type="search"
              placeholder="Search..."
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
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <div class="divide-y divide-gray-200 px-4 sm:px-6 md:px-6">
              <div class="grid grid-cols-2 gap-4">
                <InputServiceTypeServiceModeDependent
                  :state="state"
                  :IsFilter="true"
                />
                <InputSearchableSelect
                  inputName="originCountry"
                  :state="state"
                  name="Origin Country"
                />
                <InputSearchableSelect
                  inputName="destinationCountry"
                  :state="state"
                  name="Destination Country"
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
        class="-mx-4 mt-4 shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Origin
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Destination
              </th>

              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Salesman
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Pricing Cordinator
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Origin Agent
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Destination Agent
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Transhipment Agent
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Shipper
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Consignee
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(data, index) in state.data" :key="data.id">
              <td
                class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:underline sm:w-auto sm:max-w-none sm:pl-6"
              >
                {{ data.details.originCountry }}
              </td>

              <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {{ data.details.destinationCountry }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.salesman }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.pricingCordinator }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.originAgent }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.destinationAgent }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.transhipmentAgent }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.shipper }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.details.consignee }}
              </td>
              <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <!-- ActionButton -->
                <SalesOrderActions
                  :data="data"
                  :deleteButtonClick="toggleDeleteMessagePopUp"
                  :editButtonClick="editButtonClick"
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
