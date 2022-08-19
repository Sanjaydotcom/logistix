<script>
import { useEmployeesStore } from "~~/store/employees";
import EditStaffExit from "./EditStaffExit.vue";

export default {
  data() {
    return {
      isEditClicked: false,
      staffExitDetails: {},
      editData: null,
    };
  },
  components: {
    EditStaffExit,
  },
  name: "StaffExit",
  props: ["id", "staffExit"],
  setup() {
    const employeesStore = useEmployeesStore();

    return { employeesStore };
  },

  methods: {
    editButtonClick() {
      this.isEditClicked = !this.isEditClicked;
      this.editData = this.staffExitDetails;
    },
    addNewOnclick() {
      this.isEditClicked = !this.isEditClicked;
    },
    updateStaffExitDetails() {
      this.staffExitDetails = this.employeesStore.getStaffExitDetailsById(
        this.id
      );
    },
  },
};
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
    <EditStaffExit
      v-if="isEditClicked"
      :editData="staffExit"
      :editButtonClick="editButtonClick"
      :updateStaffExitDetails="updateStaffExitDetails"
      :id="this.id"
    />
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="mx-auto mt-8 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
      <div class="overflow-hidden bg-white sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <div
            class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
          >
            <div>
              <h2 class="text-md font-medium text-gray-500">
                Staff Exit Details
              </h2>
            </div>
            <div class="ml-4 mt-2 flex-shrink-0">
              <button
                v-if="staffExit?.resignationDate"
                type="button"
                @click="editButtonClick"
                class="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </button>
              <button
                type="button"
                v-if="!staffExit?.resignationDate"
                @click="addNewOnclick()"
                class="rounded-md border border-red-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Exit details
              </button>
            </div>
          </div>
        </div>
        <div
          class="border-gray-200 px-4 py-5 sm:px-6"
          v-if="staffExit?.resignationDate"
        >
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                Resignation Date
              </dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ staffExit.resignationDate }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                Exit Interview Date
              </dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ staffExit.interviewDateExit }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Reliving date</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ staffExit.relivingdate }}
              </dd>
            </div>
          </dl>
        </div>
        <div
          class="border-gray-200 px-4 py-5 sm:px-6"
          v-if="staffExit.resignationDate"
        >
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                Reason For Leaving
              </dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ staffExit.reasonForLeaving }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                Exit Interview Summary
              </dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ staffExit.interviewExitSummary }}
              </dd>
            </div>
            <div class="sm:col-span-1"></div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
