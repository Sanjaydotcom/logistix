<script>
import ExperienceForm from "./ExperienceForm.vue";
import Notification from "@/components/ui/Notification.vue";
import { useEmployeesStore } from "~~/store/employees";
import DeleteConfirmationMessage from "~~/components/ui/DeleteConfirmationMessage";

export default {
  name: "Experience",
  props: ["id", "experience"],
  components: {
    ExperienceForm,
    Notification,
    DeleteConfirmationMessage
  },
  data() {
    return {
      toogleForm: false,
      showNotification: false,
    };
  },
  setup() {
    const employeesStore = useEmployeesStore();
    const deleteMessageStatus = ref(false);
    const selectedExperienceId = ref(null);

     async function toggleDeleteConfirmation(id) {
      selectedExperienceId.value =await id;
      deleteMessageStatus.value = !deleteMessageStatus.value;
    }

    return {
      employeesStore, toggleDeleteConfirmation,
      deleteMessageStatus,selectedExperienceId
    };
  },
  methods: {
    async tooggleFormAction() {
      this.toogleForm = !this.toogleForm;
      this.editData = null;
    },
    async editExperience(list) {
      this.editData = list;
      this.toogleForm = !this.toogleForm;
    },
    async deleteExperience() {
      this.toggleDeleteConfirmation();
      this.employeesStore.deleteExperience(this.id, this.selectedExperienceId.value);
    },
    toggleNotification() {
      this.showNotification = !this.showNotification;
    },
  },
};
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white px-4 py-5 sm:px-6">
      <div
        class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="mt-2">
          <h2 class="text-md font-medium text-gray-500">Experience</h2>
        </div>
      </div>
    </div>
    <button
      v-if="!experience.length && !toogleForm"
      type="button"
      class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1"
      @click="tooggleFormAction"
    >
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
          stroke-width="1.2"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        ></path>
      </svg>
      <span class="mt-2 block text-sm font-medium text-gray-900">
        Add Experience
      </span>
    </button>

    <div
      class="overflow-hidden bg-white pt-2 shadow sm:rounded-md"
      v-if="experience && experience.length > 0"
    >
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="list in experience" :key="list.companyName">
          <a class="block cursor-pointer hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex">
                  <p class="truncate text-sm font-medium text-indigo-600">
                    {{ list.designation }}
                  </p>
                  <p
                    class="mx-2 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                  >
                    {{ list.employeeType }}
                  </p>
                </div>

                <div class="ml-2 flex flex-shrink-0">
                  <!-- Heroicon name: solid/chevron-right -->
                  <div
                    @click="editExperience(list)"
                    class="cursor-pointer px-2"
                  >
                    <svg
                      class="h-5 w-5 pt-0.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    @click="toggleDeleteConfirmation(list.id)"
                    class="cursor-pointer"
                  >
                    <span class="sr-only">Delete</span>
                    <!-- Heroicon name: solid/dots-horizontal -->
                    <svg
                      class="h-5 w-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <!-- Heroicon name: solid/users -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span class="px-2"> {{ list.companyName }}</span>
                  </p>
                  <p
                    class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                  >
                    <!-- Heroicon name: solid/location-marker -->
                    <svg
                      class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ list.location }}
                  </p>
                </div>
                <div
                  class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                >
                  <!-- Heroicon name: solid/calendar -->
                  <svg
                    class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p>
                    <time datetime="2020-01-07">{{ list.experience }} </time>
                    Years
                  </p>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="ml-4 mt-2 flex justify-end py-2">
      <button
        type="button"
        class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        v-if="experience.length >= 1 && !toogleForm"
        @click="tooggleFormAction"
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
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add New
      </button>
    </div>
    <ExperienceForm
      v-if="toogleForm"
      :id="id"
      :editData="editData"
      :tooggleFormAction="tooggleFormAction"
      :toggleNotification="toggleNotification"
    />
    <Notification
      message="Experience added successfully"
      :toggleNotification="toggleNotification"
      v-if="showNotification"
    />
     <DeleteConfirmationMessage
      v-if="deleteMessageStatus"
      :deleteFunction="deleteExperience"
      :toggleDeleteConfirmation="toggleDeleteConfirmation"
    />

  </div>
</template>
