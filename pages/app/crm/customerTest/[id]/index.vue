<script lang="ts">
import Directory from "../-components/Directory.vue";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import useCustomerStore from "@/store/crm/customers";
import AddEditSlideOver from "../-components/AddEditSlideOver.vue";
import Credential from "./-components/credentials/Credential.vue";
import Attachments from "./-components/attachments/Attachments.vue";
import General from "./-components/profile/General.vue";
import Contacts from "./-components/profile/Contacts.vue";
import Kyc from "./-components/kyc/Kyc.vue";
import ConfirmationMessage from "@/components/ui/ConfirmationMessage.vue";
import ChangeCustProfile from "@/components/ui/ChangeCustProfile.vue";

export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
    Directory,
    AddEditSlideOver,
    Attachments,
    Credential,
    General,
    Contacts,
    Kyc,
    ConfirmationMessage,
    ChangeCustProfile,
  },
  setup() {
    const store = useCustomerStore();
    const { params } = useRoute();
    const { customerUpdated } = storeToRefs(store);
    const showEdit = ref(false);
    const editData = ref([]);
    const router = useRouter();
    const changeCustStatus = ref(false);

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
    const toggleConfirmationModal = () => {
      changeCustStatus.value = !changeCustStatus.value;
    };
    const getData = async (id: string) => {
      state.id = id;
      if (!store.directorylist.length) {
        await store.fetchList();
      }
      state.data = await store.getById(Number(id));
    };
    const migrateToCreditCust = async () => {
      toggleConfirmationModal();
      await store.migrateToCreditCust(state.id);
      state.activeTab = "2";
    };
    const deleteList = async () => {
      await store.delete(state.id);
      router.push("/app/crm/customer/");
    };
    watch(customerUpdated, () => {
      if (customerUpdated.value) {
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
      router.push(`/app/crm/customer/${Number(state.id) + 1}`);
    };
    const showPrevItem = () => {
      router.push(`/app/crm/customer/${Number(state.id) - 1}`);
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
      customerUpdated,
      migrateToCreditCust,
      toggleConfirmationModal,
      changeCustStatus,
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
                  <span
                    class="hidden space-x-3 lg:flex"
                    v-if="
                      state.data?.details?.general?.customerType !== 'CREDIT'
                    "
                  >
                    <button
                      type="button"
                      class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                      @click="toggleConfirmationModal"
                    >
                      <!-- Heroicon name: solid/archive -->

                      <span>Migrate to Credit Customer</span>
                    </button>
                  </span>
                  <span class="hidden space-x-3 px-4 lg:flex">
                    <button
                      type="button"
                      class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                      @click="deleteList"
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
                      <div class="py-1" role="none">
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
              <nav aria-label="Pagination">
                <span class="relative z-0 inline-flex rounded-md shadow-sm">
                  <a
                    href="#"
                    class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                    class="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
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
        <div class="bg-white pb-6 shadow">
          <div>
            <div>
              <img
                class="h-20 w-full object-cover lg:h-28"
                src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a"
                alt=""
              />
            </div>
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <ChangeCustProfile v-if="state.data.id" :id="state.data.id" />
                <div
                  class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                >
                  <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                    <h1 class="truncate text-2xl font-bold text-gray-900">
                      {{ state.data?.name }}
                    </h1>
                    <p class="text-sm text-gray-500">
                      {{ state.data.details?.general?.customerType }}
                    </p>
                  </div>
                  <div
                    class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <!-- <Status
                      :status="
                        state.data?.status ? state.data?.status : 'Active'
                      "
                    /> -->
                  </div>
                </div>
              </div>
              <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                <h1 class="truncate text-2xl font-bold text-gray-900">
                  {{ state.data?.name }}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <!-- Thread section-->
        <div class="mt-6 sm:mt-2 2xl:mt-5">
          <div class="border-gray-200">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav class="flex cursor-pointer space-x-4" aria-label="Tabs">
                <!-- Current: "bg-gray-100 text-gray-700", Default: "text-gray-500 hover:text-gray-700" -->
                <a
                  v-on:click="state.activeTab = '1'"
                  v-bind:class="[
                    state.activeTab === '1'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Profile</a
                >
                <a
                  v-if="state.data?.details?.general?.customerType == 'CREDIT'"
                  v-on:click="state.activeTab = '2'"
                  v-bind:class="[
                    state.activeTab === '2'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  KYC
                </a>

                <a
                  v-if="state.data?.details?.general?.customerType == 'CREDIT'"
                  v-on:click="state.activeTab = '3'"
                  v-bind:class="[
                    state.activeTab === '3'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Documents
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div v-if="state.activeTab === '1' && state.data?.id">
          <General
            :general="state.data?.details?.general"
            :id="state.data?.id"
          />
          <Contacts
            :contacts="state.data?.details?.contacts"
            :id="state.data?.id"
          />
        </div>

        <div
          v-if="state.activeTab === '2' && state.data?.details?.kyc"
          class="tabcontent"
        >
          <Kyc :general="state.data?.details?.kyc" :id="state.data?.id" />
        </div>

        <div
          v-if="state.activeTab === '3' && state?.data.details?.attachments"
          class="tabcontent"
        >
          <Attachments
            :userAttachments="state?.data.details?.attachments"
            :id="state.data?.id"
          />
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
          <p class="mt-5 text-sm text-gray-500">Select a Customer</p>
        </div>
      </div>
    </section>
    <!-- Message list-->
    <Directory :openMenu="openMenu" :toggleMenu="toggleMenu" />
    <ConfirmationMessage
      v-if="changeCustStatus"
      :deleteFunction="migrateToCreditCust"
      :toggleConfirmationModal="toggleConfirmationModal"
      confirmationMsg="Are you
    sure you want to migrate this customer to Credit Customer?"
    />
    <div
      v-if="showEdit && editData"
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <!--
    Background backdrop, show/hide based o n slide-over state.

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
