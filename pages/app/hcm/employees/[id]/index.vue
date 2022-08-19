<script lang="ts">
import { useEmployeesStore } from "~~/store/employees";
import Directory from "../-components/Directory.vue";
import EmployeeTopbar from "../-components/EmployeeTopbar.vue";
import Education from "./-components/profile/Education.vue";
import Experience from "./-components/profile/Experience.vue";
import General from "./-components/profile/General.vue";
import StaffExit from "./-components/profile/StaffExit.vue";
import Contact from "./-components/profile/Contact.vue";
import Reference from "./-components/profile/Reference.vue";
import Profile from "./-components/profile/Profile.vue";
import Assets from "./-components/assets/Assets.vue";
import Appraisal from "./-components/appraisals/Appraisal.vue";
import Credential from "./-components/credentials/Credential.vue";
import Attachments from "./-components/attachments/Attachments.vue";
import Status from "./-components/Status.vue";
import SalaryModal from "./-components/modals/SalaryModal.vue";
import LifecycleModal from "./-components/modals/LifecycleModal.vue";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import Notification from "~~/components/ui/Notification.vue";

import { storeToRefs } from "pinia";

export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
    Directory,
    Profile,
    Assets,
    Attachments,
    Credential,
    Appraisal,
    Status,
    SalaryModal,
    LifecycleModal,
    EmployeeTopbar,
    Reference,
    Contact,
    StaffExit,
    General,
    Experience,
    Education,
    Notification,
  },
  setup() {
    const store = useEmployeesStore();
    const { params } = useRoute();
    const { profileUpdated } = storeToRefs(store);

    const showMore = ref(false);
    const showSalaryModal = ref(false);
    const showLifecycleModal = ref(false);
    const showNotification = ref(false);
    const notificationItem = ref("testing");

    const employeesState = reactive({
      profile: [],
      id: null,
      showDirectory: false,
      activeTab: "1",
    });
    onMounted(() => {
      getEmployee(params.id);
    });

    const getEmployee = async (id: string) => {
      if (!store.employeeData.length) {
        await store.fetchEmployeeList();
      }
      employeesState.profile = await store.getEmployeeById(Number(id));
      await store.getLifecycleByEmpID(Number(id));
    };

    watch(profileUpdated, () => {
      if (profileUpdated.value) {
        store.setProfileUpdatedStatus(false);
        getEmployee(params.id);
      }
    });
    const toggleMore = () => {
      showMore.value = !showMore.value;
    };

    const toggleSalaryModal = () => {
      showMore.value = false;
      showSalaryModal.value = !showSalaryModal.value;
    };

    const setNotificationItem = (item: string) => {
      if (item == "salary") {
        notificationItem.value = "Salary updated successfully";
      } else if (item == "history") {
        notificationItem.value = "Salary History updated successfully";
      } else if (item == "allowance") {
        notificationItem.value = "Variable Allowance updated successfully";
      } else {
        return;
      }
    };

    const toggleNotification = (item: string) => {
      if (item) {
        setNotificationItem(item);
      }
      showNotification.value = !showNotification.value;
    };

    const toggleLifecycleModal = () => {
      showMore.value = false;
      showLifecycleModal.value = !showLifecycleModal.value;
    };

    const toogleDirectory = () => {
      employeesState.showDirectory = !employeesState.showDirectory;
    };
    const openMenu = ref(true);
    const toggleMenu = () => {
      openMenu.value = !openMenu.value;
    };

    return {
      employeesState,
      toggleMore,
      showMore,
      toogleDirectory,
      showSalaryModal,
      toggleSalaryModal,
      showLifecycleModal,
      toggleLifecycleModal,
      toggleMenu,
      openMenu,
      profileUpdated,
      showNotification,
      toggleNotification,
      notificationItem,
      params,
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
      aria-labelledby="message-heading"
      class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
    >
      <nav
        class="flex items-start px-4 pt-2 sm:px-6 lg:px-8 xl:hidden"
        aria-label="Breadcrumb"
      >
        <NuxtLink to="/app/hcm/employees">
          <a
            class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <!-- Heroicon name: solid/chevron-left -->
            <svg
              class="-ml-2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Directory</span>
          </a>
        </NuxtLink>
      </nav>
      <!-- Top section -->
      <div class="border-b border-gray-200 bg-white">
        <!-- Toolbar-->
        <div class="flex h-12 flex-col justify-center sm:h-16">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between py-1 sm:py-3">
              <!-- Right buttons -->

              <div>
                <div class="relative z-0 inline-flex sm:space-x-3">
                  <span class="flex space-x-3">
                    <button
                      @click="toggleSalaryModal"
                      type="button"
                      class="relative -ml-px inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <!-- Heroicon name: solid/archive -->
                      <span>
                        <svg
                          class="mr-1 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                      </span>

                      <span>Salary</span>
                    </button>
                    <button
                      @click="toggleLifecycleModal"
                      type="button"
                      class="relative -ml-px inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <!-- Heroicon name: solid/folder-download -->

                      <span>
                        <svg
                          class="mr-1 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                      </span>

                      <span>Lifecycle</span>
                    </button>
                  </span>

                  <div class="relative -ml-px block sm:shadow-sm lg:hidden">
                    <!-- Dropdown menu, show/hide based on menu state. -->
                  </div>
                </div>

                <!-- Left buttons -->
                <nav aria-label="Pagination"></nav>
              </div>
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
                <ChangeProfile :id="params.id" />
                <div
                  class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                >
                  <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                    <h1 class="truncate text-2xl font-bold text-gray-900">
                      {{ employeesState.profile?.name }}
                    </h1>
                    <p class="text-sm text-gray-500">
                      {{ employeesState.profile?.designation }}
                    </p>
                  </div>
                  <div
                    class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <Status
                      :status="
                        employeesState.profile?.status
                          ? employeesState.profile?.status
                          : 'Active'
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                <h1 class="truncate text-2xl font-bold text-gray-900">
                  {{ employeesState.profile?.name }}
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
                  v-on:click="employeesState.activeTab = '1'"
                  v-bind:class="[
                    employeesState.activeTab === '1'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Profile</a
                >
                <a
                  v-on:click="employeesState.activeTab = '2'"
                  v-bind:class="[
                    employeesState.activeTab === '2'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Assets
                </a>

                <a
                  v-on:click="employeesState.activeTab = '3'"
                  v-bind:class="[
                    employeesState.activeTab === '3'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Documents
                </a>

                <a
                  v-on:click="employeesState.activeTab = '4'"
                  v-bind:class="[
                    employeesState.activeTab === '4'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Attachments
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div
          v-if="employeesState.activeTab === '1' && employeesState.profile?.id"
        >
          <General
            :general="employeesState.profile?.details?.general"
            :id="employeesState.profile?.id"
          />

          <Contact
            :contact="employeesState.profile?.details?.contact"
            :id="employeesState.profile?.id"
            :contactNo="employeesState.profile?.details?.general.primaryContact"
            :countryCode="employeesState.profile?.details?.general.countryCode"
          />
          <Education
            :educations="employeesState.profile?.details?.education"
            :id="employeesState.profile?.id"
          />

          <Experience
            :experience="employeesState.profile?.details?.WorkExperience"
            :id="employeesState.profile?.id"
          />

          <Reference
            :id="employeesState.profile?.id"
            :reference="employeesState.profile?.details?.reference"
          />

          <StaffExit
            :id="employeesState.profile?.id"
            :staffExit="employeesState?.profile?.details?.staffExit"
          />
        </div>
        <div v-if="employeesState.activeTab === '2'">
          <Assets
            :userAssets="employeesState?.profile?.details?.assets"
            :id="employeesState.profile?.id"
          />
        </div>
        <div v-if="employeesState.activeTab === '3'" class="tabcontent">
          <Credential
            :userCredentials="employeesState?.profile.details?.credentials"
            :id="employeesState.profile?.id"
          />
        </div>

        <div v-if="employeesState.activeTab === '4'" class="tabcontent">
          <Attachments
            :userAttachments="employeesState?.profile.details?.attachments"
            :id="employeesState.profile?.id"
          />
        </div>
      </div>
    </section>

    <!-- Message list-->
    <Directory :openMenu="openMenu" :toggleMenu="toggleMenu" />
    <SalaryModal
      v-if="showSalaryModal"
      :id="employeesState.profile?.id"
      :showSalaryModal="showSalaryModal"
      :toggleSalaryModal="toggleSalaryModal"
      :toggleNotification="toggleNotification"
    />
    <LifecycleModal
      v-if="showLifecycleModal"
      :id="employeesState.profile?.id"
      :showSalaryModal="showLifecycleModal"
      :toggleSalaryModal="toggleLifecycleModal"
    />
    <Notification
      v-if="showNotification"
      message="Update Successful"
      :description="notificationItem"
      :toggleNotification="toggleNotification"
    />
  </div>
</template>
