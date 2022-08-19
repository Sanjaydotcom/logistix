<script>
import AddEditSlideOver from "../../../-components/AddEditSlideOver.vue";
import { formatDistance, intervalToDuration, formatDuration } from "date-fns";

export default {
  data() {
    return {
      toggleEdit: false,
      edidData: null,
    };
  },
  components: {
    AddEditSlideOver,
  },
  name: "General",
  props: ["id", "general", "editEmployeeButtonClick"],
  methods: {
    checkDiffYears() {
      const date = new Date();
      const diffYear = new Date(this.general.joiningDate);
      const DiffDate = formatDuration(
        intervalToDuration({
          start: diffYear,
          end: date,
        }),
        { format: ["years", "months", "days"] }
      );
      return DiffDate;
    },
    editButtonClick() {
      this.toggleEdit = !this.toggleEdit;
      this.edidData = this.general;
    },
    closeSlider() {
      this.toggleEdit = !this.toggleEdit;
      this.edidData = null;
    },
  },
};
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="overflow-hidden bg-white sm:rounded-lg">
      <div class="px-4 sm:px-6">
        <div
          class="
            -ml-4
            -mt-2
            flex flex-wrap
            items-center
            justify-between
            sm:flex-nowrap
          "
        >
          <div></div>
          <div class="ml-4 mt-3 flex-shrink-0">
            <button
              type="button"
              @click="editButtonClick"
              class="
                inline-flex
                items-center
                rounded
                bg-white
                px-2.5
                py-1.5
                text-xs
                font-medium
                text-gray-700
                shadow-sm
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
              "
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
          </div>
        </div>
      </div>
      <div class="border-gray-200 px-4 pb-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.firstName }} {{ general.lastName }}
            </dd>
          </div>

          <div class="sm:col-span-1" v-if="general.mailID">
            <dt class="text-sm font-medium text-gray-500">MailId</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.mailID }}
            </dd>
          </div>

          <div class="sm:col-span-1" v-if="general.primaryContact">
            <dt class="text-sm font-medium text-gray-500">Contact Number</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.primaryContact }}
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Customer Type</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.customerType }}
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Nationality</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.nationality }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">City</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.city }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">PinCode</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.pinCode }}</dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Road Number</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.roadNumber }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Block Number</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.blockNumber }}
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Permanent Address</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.perAddress }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">
              Communication Address
            </dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.tempAddress }}
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">About</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.about }}</dd>
          </div>
        </dl>
      </div>
    </div>
    <div
      v-if="toggleEdit && edidData"
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
        <AddEditSlideOver
          :id="id"
          :edidData="edidData"
          :closeSlider="closeSlider"
        />
      </div>
    </div>
  </div>
</template>
