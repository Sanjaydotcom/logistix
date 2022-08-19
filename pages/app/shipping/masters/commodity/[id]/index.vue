<script lang="ts">
import Directory from "../-components/Directory.vue";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import useCommodityStore from "~~/store/masters/commodity";
import DeleteConfirmationMessage from "~~/components/ui/DeleteConfirmationMessage";
import AddEditSlideOver from "../-components/AddEditSlideOver.vue";
export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
    Directory,
    AddEditSlideOver,
    DeleteConfirmationMessage,
  },
  setup() {
    const store = useCommodityStore();
    const { params } = useRoute();
    const { commodityUpdated } = storeToRefs(store);
    const deleteMessageStatus = ref(false);

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

    function toggleDeleteConfirmation() {
      deleteMessageStatus.value = !deleteMessageStatus.value;
    }
    const deleteList = async () => {
      toggleDeleteConfirmation();
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
      deleteList,
      showNextItem,
      showPrevItem,
      toogleDirectory,
      toggleMenu,
      openMenu,
      commodityUpdated,
      toogleEdit,
      showEdit,

      deleteMessageStatus,
      toggleDeleteConfirmation,
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
              <div class="flex">
                <span class="hidden space-x-3 lg:flex">
                  <button
                    type="button"
                    class="
                      relative
                      -ml-px
                      hidden
                      items-center
                      rounded-md
                      border border-gray-300
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
                      sm:inline-flex
                    "
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
                    class="
                      relative
                      -ml-px
                      hidden
                      items-center
                      rounded-md
                      border border-gray-300
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
                      sm:inline-flex
                    "
                    @click="toggleDeleteConfirmation()"
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
              </div>
              <!-- delete confirmation Message popUp -->
              <DeleteConfirmationMessage
                v-if="deleteMessageStatus"
                :deleteFunction="deleteList"
                :toggleDeleteConfirmation="toggleDeleteConfirmation"
                :title="state.data.name"
              />
              <!-- Right buttons -->
            </div>
          </div>
        </div>
        <!-- Message header -->
      </div>
      <!-- card -->
      <div class="min-h-0 flex-1 overflow-y-auto px-4 py-2">
        <div class="bg-white shadow sm:rounded-lg">
          <div
            class="px-4 py-5 sm:px-6"
            style="display: flex; justify-content: space-between"
          >
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ state.data.name }}
              </h3>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Commodity Name</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.data.name }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Commodity Code</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.data.code }}
                </dd>
              </div>

              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.data.description }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <!--card  -->
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
