<script>
import { FilterIcon, SearchIcon } from "@heroicons/vue/solid";
import { useCommodityStore } from "~~/store/masters/commodity";
import { storeToRefs } from "pinia";
import AddEditSlideOver from "./AddEditSlideOver.vue";
import DirectoryFilter from "./DirectoryFilter.vue";
export default {
  props: ["openMenu", "toggleMenu"],
  components: {
    SearchIcon,
    FilterIcon,
    AddEditSlideOver,
    DirectoryFilter,
  },
  setup() {
    const store = useCommodityStore();
    const { listFetchStatus, directorylist } = storeToRefs(store);

    const state = reactive({
      data: [],
      searchKeyword: null,
      showAddNew: false,
    });
    const isLoading = ref(true);
    const router = useRouter();
    onMounted(() => {
      if (store.directorylist.length) {
        state.data = store.getDirectoryLists();
      }
    });
    watch(listFetchStatus, () => {
      if (listFetchStatus.value) {
        state.data = store.getDirectoryLists();
        store.setFetchStatus(false);
      }
    });

    const filterList = (search) => {
      store.searchList(search);
    };
    const sortByName = async () => {};
    const sortByDate = () => {};
    const prevPage = () => {
      store.prevList();
    };
    const nextPage = () => {
      store.nextList();
    };

    const addNew = () => {
      state.showAddNew = !state.showAddNew;
    };

    return {
      store,
      state,
      isLoading,
      filterList,
      addNew,
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
      class="
        bg-themeBackground
        relative
        flex
        min-h-screen
        w-96
        flex-col
        border-r border-gray-200
      "
    >
      <div class="flex-shrink-0">
        <div class="bg-themeBackground flex h-16 flex-col justify-center px-6">
          <div class="flex items-center space-x-3">
            <button
              type="button"
              @click="toggleMenu"
              class="
                hidden
                items-center
                justify-center
                rounded-md
                bg-gray-100
                p-1.5
                text-gray-400
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-blue-500
                md:inline-flex
              "
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
            <h2 class="text-lg font-medium text-gray-900">Commodities</h2>

            <button
              type="button"
              @click="addNew"
              class="
                absolute
                right-6
                mr-2
                inline-flex
                items-center
                rounded-md
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-900
                hover:bg-gray-50
                focus:z-10
                focus:border-blue-600
                focus:outline-none
                focus:ring-1
                focus:ring-blue-600
              "
            >
              <!-- Heroicon name: solid/archive -->

              <span class="mx-2">Add</span>
            </button>
          </div>
        </div>
        <DirectoryFilter
          :sortByName="sortByName"
          :sortByDate="sortByDate"
          :nextPage="nextPage"
          :prevPage="prevPage"
        />
      </div>
      <nav class="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
        <ul role="list" class="relative z-0 divide-y divide-gray-200">
          <li>
            <div class="min-w-0 flex-1 py-2">
              <div
                class="
                  relative
                  max-w-2xl
                  text-gray-400
                  focus-within:text-gray-500
                "
              >
                <label for="desktop-search" class="sr-only">Search</label>
                <input
                  id="search"
                  v-model="state.searchKeyword"
                  v-on:input="filterList(state.searchKeyword)"
                  type="search"
                  name="search"
                  :placeholder="`Search in ${state.data?.length} directory`"
                  class="
                    block
                    w-full
                    border-transparent
                    pl-12
                    placeholder-gray-500
                    focus:border-transparent focus:ring-0
                    sm:text-sm
                  "
                />
                <div
                  class="
                    absolute
                    inset-y-0
                    left-0
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    pl-4
                  "
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
          <li v-for="data in state.data" :key="data.id">
            <NuxtLink :to="`/app/shipping/masters/commodity/${data.id}`">
              <div
                class="relative flex space-x-3 rounded-md px-6 py-3"
                :class="[
                  $route.path == `/state/${data.id}`
                    ? ' bg-gray-100 hover:bg-gray-100'
                    : 'bg-white hover:bg-gray-50',
                ]"
              >
                <div>
                  <!-- Extend touch target to entire panel -->
                  <p class="text-sm font-medium text-gray-900">
                    {{ data.name.toUpperCase() }}
                  </p>
                  <p class="truncate text-sm text-gray-500">
                    {{ data.designation }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <ul v-if="state.data.length == 0 && !store.$state.isLoding">
          <li>
            <div
              class="
                relative
                flex
                justify-center
                space-x-3
                rounded-md
                px-6
                py-3
              "
            >
              <p class="truncate text-sm text-gray-500">No Commodities Found</p>
            </div>
          </li>
        </ul>
        <div v-if="store.$state.isLoding">
          <DirectoryLoading variant="simpleList" />
        </div>
      </nav>
    </div>
  </div>
  <div class="hidden xl:order-first xl:block xl:flex-shrink-0" v-if="openMenu">
    <LayoutFrieghtSidebar />
  </div>
  <div
    v-if="state.showAddNew"
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
      <AddEditSlideOver :closeSlider="addNew" />
    </div>
  </div>
</template>
<style></style>
