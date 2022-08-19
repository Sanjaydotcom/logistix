<script>
import GeneralAndEmployment from "../../../-components/GeneralAndEmployment.vue";
import { formatDistance, intervalToDuration, formatDuration } from "date-fns";
import { useEmployeesStore } from "~~/store/employees";
import { ref } from "vue";

export default {
  data() {
    return {
      toggleEdit: false,
      edidData: null,
    };
  },
  components: {
    GeneralAndEmployment,
  },
  name: "General",
  props: ["id", "general", "editEmployeeButtonClick"],
  setup(props) {
    const employeesStore = useEmployeesStore();
    const OrgDataById = ref("");
    const DivisionDataById = ref("");
    const DepartmentDataById = ref("");
    watch(employeesStore,()=>{
      getNamesById();
    })  
    onMounted(() => {
      getNamesById();
    })
    async function getNamesById() {
      OrgDataById.value = await employeesStore.getOrganizationByOrgIdID(
        props.general.branch
      );
       DivisionDataById.value = await employeesStore.getDivisionByDivId(
        props.general.division
      );
       DepartmentDataById.value = await employeesStore.getDepartmentByDepId(
        props.general.department
      );
   
    }
    return { OrgDataById, DivisionDataById, DepartmentDataById };
  },
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
          class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
        >
          <div></div>
          <div class="ml-4 mt-3 flex-shrink-0">
            <button
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
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.dob }}</dd>
          </div>
          <div class="sm:col-span-1" v-if="general.companyMail">
            <dt class="text-sm font-medium text-gray-500">Company mail</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.companyMail }}
            </dd>
          </div>

          <div class="sm:col-span-1" v-if="general.primaryContact">
            <dt class="text-sm font-medium text-gray-500">Contact Number</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.primaryContact }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Joining Date</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.joiningDate }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Employee Code</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.code }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Employee Type</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.employeeType }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Job Level</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.jobLevel }}</dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">
              Organization/Branch
            </dt>
            <dd class="mt-1 text-sm text-gray-900">{{  OrgDataById.value?.name }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Division</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ DivisionDataById.value?.name }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Department</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ DepartmentDataById.value?.name }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Designation</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.designation }}
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">
              Total Years of Service
            </dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ this.checkDiffYears() }}
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Reporting manager</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.reportingManager }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">
              Total Years of Experience
            </dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.experience }} year
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Gender</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.gender }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Blood Group</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ general.bloodGroup }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Marital Status</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.martialStatus }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Nationality</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ general.nationality }}
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
            <dd class="mt-1 text-sm text-gray-900">{{ general.notes }}</dd>
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
        <GeneralAndEmployment
          :id="id"
          :edidData="edidData"
          :closeSlider="closeSlider"
        />
      </div>
    </div>
  </div>
</template>
