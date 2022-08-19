<script>
definePageMeta({
  layout: "freigtdashboard",
});
import AddEditSlider from "./-components/AddEditSlider.vue";
import useQuotationStore from "~~/store/shipping/quotation";

export default {
  components: { AddEditSlider },
  setup() {
    const store = useQuotationStore();
    const showSlideOver = ref(false);
    const ActionButtonIndex = ref(null);
    const DeleteMessagePopUpStatus = ref(false);
    const CurrentRowId = ref(null);
    const showFilters = ref(false);
    const isLoading = false;
    const state = reactive({
      data: [],
      editData: false,
    });

    onMounted(async () => {
      if (!store.quotationList.length) {
        await store.fetchQuotation();
        state.data = computed(() => store.quotationList);
      }
    });
    const toggleDeleteMessagePopUp = async (id) => {
      CurrentRowId.value = id;
      DeleteMessagePopUpStatus.value = !DeleteMessagePopUpStatus.value;
    };
    const DeleteButtonClick = async () => {
      await store.deleteQuotation(CurrentRowId.value);
      toggleTableActionButton(null);
      state.data = computed(() => store.quotationList);
      toggleDeleteMessagePopUp();
    };

    const toggleFilter = () => {
      showFilters.value = !showFilters.value;
    };
    const toggleSlideOver = () => {
      showSlideOver.value = !showSlideOver.value;
    };
    const editQuotation = (id) => {
      CurrentRowId.value = id;
      toggleTableActionButton(null);
      state.editData = true;

      toggleSlideOver();
    };
    const deleteQuotation = () => {
    };
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
      DeleteMessagePopUpStatus,
      CurrentRowId,
      editQuotation,
      deleteQuotation,
      state,
      store,
      isLoading,
      toggleTableActionButton,
      toggleDeleteMessagePopUp,
      ActionButtonIndex,
      DeleteButtonClick,
    };
  },
};
</script>
<template>
  <div class="mx-auto h-full max-w-7xl flex-1 border-t border-gray-200 py-2 px-4">
    <AddEditSlider v-if="showSlideOver" :closeSidebar="toggleSlideOver" :id="CurrentRowId" :editData="state.editData" />
    <div class="pt-2 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Quotation</h1>
      </div>
    </div>

    <div class="
        -mx-4
        mt-3
        overflow-hidden
        shadow
        ring-1 ring-black ring-opacity-5
        sm:-mx-6
        md:mx-0 md:rounded-lg
      ">
      <div class="min-w-0 flex-1 pt-1">
        <div class="relative flex justify-between">
          <div class="relative max-w-2xl text-gray-400 focus-within:text-gray-500">
            <label for="desktop-search" class="sr-only">Search...</label>
            <input id="desktop-search" type="search" placeholder="Search..." class="
                block
                w-full
                border-transparent
                pl-12
                placeholder-gray-500
                focus:border-transparent focus:ring-0
                sm:text-sm
              " />
            <div class="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                flex
                items-center
                justify-center
                pl-4
              ">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="relative flex justify-between">
            <button class="px-4 py-2 text-sm font-medium text-gray-500" @click="toggleFilter">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <UiRefreshSpinner :isLoading="isLoading" />
          </div>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="
                py-2
                pl-4
                pr-3
                text-left text-sm
                font-semibold
                text-gray-900
                sm:pl-6
              ">
              Service Mode
            </th>
            <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-gray-900">
              Service Type
            </th>
            <th @click="deleteQuotation" scope="col" class="
                hidden
                px-3
                py-2
                text-left text-sm
                font-semibold
                text-gray-900
                lg:table-cell
              ">
              Customer
            </th>

            <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-gray-900">
              Salesman
            </th>
            <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-gray-900">
              Sales Coordinator
            </th>
            <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-gray-900">
              Total Weight
            </th>
            <th scope="col" class="relative py-2 pl-3 pr-4 sm:pr-6">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, index) in state.data" :key="item.id">
            <NuxtLink :to="`/app/shipping/quotation/` + item.id">
              <td class="
                  w-full
                  max-w-0
                  py-3
                  pl-4
                  pr-3
                  text-sm
                  font-medium
                  text-gray-900
                  sm:w-auto sm:max-w-none sm:pl-6
                ">
                {{ item.details.general.serviceMode.name }}
              </td>
            </NuxtLink>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.serviceType.name }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.customer }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.salesman }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.salesCoordinator }}
            </td>
            <td class="px-3 py-2 text-sm text-gray-500">
              {{ item.details.general.totalWeight }}
            </td>

            <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <!-- ActionButton -->
              <div class="relative inline-block text-left">
                <div>
                  <button type="button" @click="toggleTableActionButton(index)" class="
                      flex
                      items-center
                      rounded-full
                      bg-gray-100
                      text-gray-400
                      hover:text-gray-600
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      focus:ring-offset-2
                      focus:ring-offset-gray-100
                    " id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <span class="sr-only">Open options</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                      aria-hidden="true">
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                <div v-if="index == ActionButtonIndex" class="
                    fixed
                    right-0
                    mt-2
                    w-44
                    origin-top-right
                    rounded-md
                    bg-white
                    shadow-lg
                    ring-1 ring-black ring-opacity-5
                    focus:outline-none
                  " style="z-index: 999; margin-right: 20px" role="menu" aria-orientation="vertical"
                  aria-labelledby="menu-button" tabindex="-1">
                  <div class="w-7 py-1" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <button @click="editQuotation(item.id)" type="submit" class="
                        block
                        w-full
                        px-4
                        py-2
                        text-left text-sm text-gray-700
                      " role="menuitem" tabindex="-1" id="menu-item-3">
                      Edit
                    </button>
                    <button @click="toggleDeleteMessagePopUp(item.id)" type="submit" class="
                        block
                        w-full
                        px-4
                        py-2
                        text-left text-sm text-gray-700
                      " role="menuitem" tabindex="-1" id="menu-item-3">
                      Delete
                    </button>

                    <!-- <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a> -->
                  </div>
                </div>
              </div>
              <!-- e -->
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="store.isLoading">
        <DirectoryLoading variant="table" />
      </div>
    </div>
    <UiDeleteConfirmationMessage v-if="DeleteMessagePopUpStatus" :deleteFunction="DeleteButtonClick"
      :toggleDeleteConfirmation="toggleDeleteMessagePopUp" />
  </div>
</template>
