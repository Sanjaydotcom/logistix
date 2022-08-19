<script>
import { FilterIcon, SearchIcon } from "@heroicons/vue/solid";
import { useEmployeesStore } from "~~/store/employees";
import { storeToRefs } from "pinia";
import GeneralAndEmployment from "./GeneralAndEmployment.vue";
import EmployeeFilter from "./EmployeeFilter.vue";
export default {
  props: ["openMenu", "toggleMenu"],
  components: {
    SearchIcon,
    FilterIcon,
    GeneralAndEmployment,
    EmployeeFilter,
  },
  setup() {
    const store = useEmployeesStore();
    const { employeesFetchStatus, employeeData } = storeToRefs(store);

    const employees = reactive({
      data: [],
      searchKeyword: null,
      showAddNew: false,
    });
    const isLoading = ref(true);

    const router = useRouter();
    onMounted(() => {
      if (store.employeeData.length) {
        employees.data = store.getEmployeesState();
      }
    });
    watch(employeesFetchStatus, () => {
      if (employeesFetchStatus.value) {
        employees.data = store.getEmployeesState();
        store.setEmployeeFetchStatus(false);
      }
    });

    const filterEmployees = (search) => {
      employees.data = store.getEmployeesState().filter((employee) => {
        return employee.name.toLowerCase().includes(search.toLowerCase());
      });
    };
    const sortByName = async () => {};
    const sortByDate = () => {};
    const prevPage = () => {
      store.prevEmployeesList();
    };
    const nextPage = () => {
      store.nextEmployeesList();
    };

    const addNewEmployee = () => {
      employees.showAddNew = !employees.showAddNew;
    };

    return {
      testdata: computed(() => employeeData),
      store,
      employees,
      isLoading,
      filterEmployees,
      addNewEmployee,
      sortByName,
      sortByDate,
      nextPage,
      prevPage,
    };
  },
};
</script>
<template>
  <div class="sm:hidden xl:order-2 xl:block xl:flex-shrink-0">
    <div
      class="bg-themeBackground relative flex w-96 flex-col border-r border-gray-200"
    >
      <div class="flex-shrink-0">
        <div class="bg-themeBackground flex h-16 flex-col justify-center px-6">
          <div class="flex items-center space-x-3">
            <button
              type="button"
              @click="toggleMenu"
              class="hidden items-center justify-center rounded-md bg-gray-100 p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:inline-flex"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Heroicon name: outline/menu -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 class="text-lg font-medium text-gray-900">Employees</h2>

            <button
              type="button"
              @click="addNewEmployee"
              class="absolute right-6 mr-2 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <!-- Heroicon name: solid/archive -->

              <span class="mx-2">Add</span>
              <svg
                class="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <EmployeeFilter
          :sortByName="sortByName"
          :sortByDate="sortByDate"
          :nextPage="nextPage"
          :prevPage="prevPage"
        />
      </div>
      <div>
        <ul role="list" class="relative z-0 divide-y divide-gray-200">
          <li>
            <div class="min-w-0 flex-1 py-2">
              <div
                class="relative max-w-2xl text-gray-400 focus-within:text-gray-500"
              >
                <label for="desktop-search" class="sr-only">Search</label>
                <input
                  id="search"
                  v-model="employees.searchKeyword"
                  v-on:input="filterEmployees(employees.searchKeyword)"
                  type="search"
                  name="search"
                  placeholder="Search employees"
                  class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent focus:ring-0 sm:text-sm"
                />
                <div
                  class="absolute inset-y-0 left-0 flex cursor-pointer items-center justify-center pl-4"
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
            </div>
          </li>
        </ul>
      </div>

      <div class="h-[72vh] min-h-0 overflow-y-auto" aria-label="Directory">
        <ul v-if="employees.data.length > 0">
          <li v-for="person in employees.data" :key="person.id">
            <NuxtLink :to="`/app/hcm/employees/${person.id}`">
              <div
                class="relative flex space-x-3 rounded-md px-6 py-3"
                :class="[
                  $route.path == `/employees/${person.id}`
                    ? ' bg-gray-100 hover:bg-gray-100'
                    : 'bg-white hover:bg-gray-50',
                ]"
              >
                <img
                  class="h-10 w-10 rounded-full"
                  :src="[
                    person.details?.profilePicFileId
                      ? `https://api.logistix.dev/document/document/documents/show/${person.details?.profilePicFileId}`
                      : 'data:image/png;base64,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',
                  ]"
                  alt="user-img"
                />

                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ person.name }}
                  </p>
                  <p class="truncate text-sm text-gray-500">
                    {{ person.designation }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <ul v-if="employees.data.length == 0 && !store.$state.isLoding">
          <li>
            <div
              class="relative flex justify-center space-x-3 rounded-md px-6 py-3"
            >
              <p class="truncate text-sm text-gray-500">No Employees Found</p>
            </div>
          </li>
        </ul>
        <div v-if="store.$state.isLoding">
          <DirectoryLoading variant="userProfile" />
        </div>
      </div>
    </div>
  </div>
  <div class="hidden xl:order-first xl:block xl:flex-shrink-0" v-if="openMenu">
    <LayoutEmployeeSidebar />
  </div>
  <div
    v-if="employees.showAddNew"
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>
    <div class="fixed inset-0 overflow-hidden">
      <GeneralAndEmployment :closeSlider="addNewEmployee" />
    </div>
  </div>
</template>
<style></style>
