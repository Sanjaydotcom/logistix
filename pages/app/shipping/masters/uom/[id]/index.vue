<script lang="ts">
import Directory from "../-components/Directory.vue";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import useCommodityStore from "~~/store/masters/vessel";
import AddEditSlideOver from "../-components/AddEditSlideOver.vue";
export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
    Directory,
    AddEditSlideOver,
  },
  setup() {
    const store = useCommodityStore();
    const { params } = useRoute();
    const { commodityUpdated } = storeToRefs(store);

    const showEdit = ref(false);
    const editData = ref([]);
    const router = useRouter();

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
      router.push("/app/shipping/masters/commodity/");
    };
    watch(commodityUpdated, () => {
      if (commodityUpdated.value) {
        store.setUpdatedStatus(false);
        getData(params.id);
      }
    });

    const toogleDirectory = () => {
      state.showDirectory = !state.showDirectory;
    };
    const openMenu = ref(true);
    const toggleMenu = () => {
      openMenu.value = !openMenu.value;
    };
    const showNextItem = () => {
      router.push(`/app/shipping/masters/commodity/${Number(state.id) + 1}`);
    };
    const showPrevItem = () => {
      router.push(`/app/shipping/masters/commodity/${Number(state.id) - 1}`);
    };
    return {
      state,
      editData,
      showNextItem,
      showPrevItem,
      toogleDirectory,
      toggleMenu,
      openMenu,
      commodityUpdated,
      toogleEdit,
      showEdit,
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
      class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
    >
      <!-- Top section -->
      <div class="flex-shrink-0 bg-white border-b border-gray-200">
        <!-- Toolbar-->
        <div class="h-16 flex flex-col justify-center">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="py-3 flex justify-between">
              <!-- Left buttons -->
              <div>
                <div
                  class="
                    relative
                    z-0
                    inline-flex
                    shadow-sm
                    rounded-md
                    sm:shadow-none sm:space-x-3
                  "
                >
                  <span class="hidden lg:flex space-x-3">
                    <button
                      type="button"
                      class="
                        hidden
                        sm:inline-flex
                        -ml-px
                        relative
                        items-center
                        px-4
                        py-2
                        rounded-md
                        border border-gray-300
                        bg-white
                        text-sm
                        font-medium
                        text-gray-900
                        hover:bg-gray-50
                        focus:z-10
                        focus:outline-none
                        focus:ring-1
                        focus:ring-blue-600
                        focus:border-blue-600
                      "
                      @click="toogleEdit"
                    >
                      <!-- Heroicon name: solid/archive -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2"
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

                  <div class="-ml-px relative block sm:shadow-sm lg:hidden">
                    <div>
                      <button
                        type="button"
                        class="
                          relative
                          inline-flex
                          items-center
                          px-2
                          py-2
                          rounded-r-md
                          border border-gray-300
                          bg-white
                          text-sm
                          font-medium
                          text-gray-900
                          hover:bg-gray-50
                          focus:z-10
                          focus:outline-none
                          focus:ring-1
                          focus:ring-blue-600
                          focus:border-blue-600
                          sm:rounded-md sm:px-3
                        "
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
                      class="
                        origin-top-right
                        absolute
                        right-0
                        mt-2
                        w-36
                        rounded-md
                        shadow-lg
                        bg-white
                        ring-1 ring-black ring-opacity-5
                        focus:outline-none
                      "
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-2-button"
                      tabindex="-1"
                    >
                      <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a
                          href="#"
                          class="
                            text-gray-700
                            block
                            sm:hidden
                            px-4
                            py-2
                            text-sm
                          "
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-0"
                        >
                          Note
                        </a>
                        <a
                          href="#"
                          class="
                            text-gray-700
                            block
                            sm:hidden
                            px-4
                            py-2
                            text-sm
                          "
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-1"
                        >
                          Assign
                        </a>
                        <a
                          href="#"
                          class="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-2-item-2"
                        >
                          Archive
                        </a>
                        <a
                          href="#"
                          class="text-gray-700 block px-4 py-2 text-sm"
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
              <nav aria-label="Pagination">
                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                  <a
                    href="#"
                    class="
                      relative
                      inline-flex
                      items-center
                      px-4
                      py-2
                      rounded-l-md
                      border border-gray-300
                      bg-white
                      text-sm
                      font-medium
                      text-gray-500
                      hover:bg-gray-50
                      focus:z-10
                      focus:outline-none
                      focus:ring-1
                      focus:ring-blue-600
                      focus:border-blue-600
                    "
                    @click="showNextItem"
                  >
                    <span class="sr-only">Next</span>
                    <!-- Heroicon name: solid/chevron-up -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="
                      -ml-px
                      relative
                      inline-flex
                      items-center
                      px-4
                      py-2
                      rounded-r-md
                      border border-gray-300
                      bg-white
                      text-sm
                      font-medium
                      text-gray-500
                      hover:bg-gray-50
                      focus:z-10
                      focus:outline-none
                      focus:ring-1
                      focus:ring-blue-600
                      focus:border-blue-600
                    "
                    @click="showPrevItem"
                  >
                    <span class="sr-only">Previous</span>
                    <!-- Heroicon name: solid/chevron-down -->
                    <svg
                      class="h-5 w-5"
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
                  </a>
                </span>
              </nav>
            </div>
          </div>
        </div>
        <!-- Message header -->
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto">
        <!-- Thread section-->
        <ul role="list" class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
          <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
            <div class="sm:flex sm:justify-between sm:items-baseline">
              <h3 class="text-base">
                <span class="text-gray-900"
                  ><p>Commodity Name : {{ state.data.name }}</p>
                  <p>Commodity Kind : {{ state.data.kind }}</p>
                  <p>Commodity Code : {{ state.data.code }}</p>
                  <p>Commodity Description : {{ state.data.description }}</p>
                  <p></p
                ></span>
              </h3>
              <p
                class="
                  mt-1
                  text-sm text-gray-600
                  whitespace-nowrap
                  sm:mt-0 sm:ml-3
                "
              >
                <!-- <time datetime="2021-01-28T19:24">Yesterday at 7:24am</time> -->
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section
      v-else
      class="
        flex
        h-full
        flex-1 flex-col
        justify-center
        overflow-hidden
        xl:order-last
      "
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
          <p class="mt-5 text-sm text-gray-500">Select a Commodity</p>
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
        <add-edit-slide-over
          :id="state.id"
          :editData="editData"
          :closeSlider="toogleEdit"
        />
      </div>
    </div>
  </div>
</template>
