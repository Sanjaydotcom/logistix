<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import { useEmployeesStore } from "@/store/employees";
export default {
  data() {
    return {
      EmpId: this.$route.params.id,
      showNotification: false,
      EmployeeData: [],
      Employee: [],
    };
  },
  props: ["profile"],
  components: {
    Notification,
  },
  setup(props) {
    const router = useRouter();
    const employeesStore = useEmployeesStore();
    const state = reactive({
      firstName: props.profile.firstName,
      lastName: "",
      nationality: "",
      dob: "",
      bloodGroup: "",
      martialStatus: "",
      designation: "",
      department: "",
      branch: "",
      division: "",
      joiningDate: "",
      experience: "",
      yearOfService: "",
      reportingManager: "",
      grossSalary: "",
      allowance: "",
    });

    const rules = computed(() => {
      return {
        firstName: { required },
        lastName: { required },
        nationality: { required },
        dob: { required },
        bloodGroup: { required },
        martialStatus: { required },
        designation: { required },
        department: { required },
        division: { required },
        branch: { required },
        joiningDate: { required },
        experience: { required },
        yearOfService: { required },
        reportingManager: { required },
        grossSalary: { required },
        allowance: { required },
      };
    });
    const v$ = useValidate(rules, state);

    const closeSlider = () => {
      router.back();
    };
    const toggleNotification = () => {
      this.toggleNotification = !this.toggleNotification;
    };

    return {
      state,
      v$,
      employeesStore,
      toggleNotification,
      closeSlider,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await this.employeesStore.addNewEmployee(this.state);
        this.closeSlider();
        this.showNotification = true;
        // GlobalEventEmitter.$emit('updateDirectory')
      }
    },
  },
};
</script>

<template>
  <div
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
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
          <div class="pointer-events-auto w-screen max-w-3xl">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="bg-gray-100 px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="md:col-span-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      General Details
                    </h3>
                    <p
                      class="mt-1 text-sm text-gray-500"
                      style="padding-bottom: 15px"
                    >
                     
                    </p>
                  </div>
                  <div class="ml-3 flex h-7 items-center bg-gray-200">
                    <button
                      type="button"
                      @click="closeSlider()"
                      class="rounded-md bg-gray-200 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: outline/x -->
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <!-- Replace with your content -->

                <div class="space-y-6">
                  <div class="bg-white px-4 py-2 sm:p-6">
                    <div class="md:grid md:grid-cols-2 md:gap-6">
                      <div class="mt-5 md:col-span-2 md:mt-0">
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="firstName"
                              class="block text-sm font-medium text-gray-700"
                              >First name</label
                            >
                            <input
                              type="text"
                              name="FirstName"
                              id="firstName"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.firstName"
                            />
                            <span
                              v-if="v$.firstName.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.firstName.$errors[0].$message }}
                            </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="lastName"
                              class="block text-sm font-medium text-gray-700"
                              >Last name</label
                            >
                            <input
                              v-model="state.lastName"
                              type="text"
                              name="lastName"
                              id="lastName"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <span
                              v-if="v$.lastName.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.lastName.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-4 lg:col-span-2">
                            <label
                              for="city"
                              class="block text-sm font-medium text-gray-700"
                              >Date of Birth</label
                            >
                            <input
                              type="date"
                              max="2022-06-08"
                              :onfocus="
                                (this.max = new Date()
                                  .toISOString()
                                  .split('T')[0])
                              "
                              name="dob"
                              id="dob"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.dob"
                            />
                            <span
                              v-if="v$.dob.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.dob.$errors[0].$message }}
                            </span>
                          </div>

                          <div class="col-span-6 sm:col-span-6">
                            <div>
                              <label
                                class="block text-sm font-medium text-gray-700"
                                >Gender</label
                              >
                              <fieldset class="mt-4">
                                <legend class="sr-only">
                                  Notification method
                                </legend>
                                <div
                                  class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10"
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="email"
                                      name="notification-method"
                                      type="radio"
                                      checked
                                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      for="email"
                                      class="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      Male
                                    </label>
                                  </div>

                                  <div class="flex items-center">
                                    <input
                                      id="sms"
                                      name="notification-method"
                                      type="radio"
                                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      for="sms"
                                      class="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      Female
                                    </label>
                                  </div>

                                  <div class="flex items-center">
                                    <input
                                      id="push"
                                      name="notification-method"
                                      type="radio"
                                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      for="push"
                                      class="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      Others</label
                                    >
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              for="bloodGroup"
                              class="block text-sm font-medium text-gray-700"
                              >Blood Group</label
                            >
                            <select
                              v-model="state.bloodGroup"
                              id="bloodGroup"
                              name="Blood Group"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Select</option>
                              <option>A+</option>
                              <option>B+</option>
                            </select>
                            <span
                              v-if="v$.bloodGroup.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.bloodGroup.$errors[0].$message }}
                            </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              for="martialStatus"
                              class="block text-sm font-medium text-gray-700"
                              >Martial Status</label
                            >
                            <select
                              v-model="state.martialStatus"
                              id="martialStatus"
                              name="Martial Status"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Single</option>
                              <option>Married</option>
                              <option>Others</option>
                            </select>
                            <span
                              v-if="v$.martialStatus.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.martialStatus.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              for="nationality"
                              class="block text-sm font-medium text-gray-700"
                              >Nationality</label
                            >
                            <input
                              type="text"
                              v-model="state.nationality"
                              name="nationality"
                              id="nationality"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <span
                              v-if="v$.nationality.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.nationality.$errors[0].$message }}
                            </span>
                          </div>
                          <!-- Employee -->
                          <div class="col-span-6 sm:col-span-4">
                            <label
                              for="designation"
                              class="block text-sm font-medium text-gray-700"
                              >Designation</label
                            >
                            <input
                              type="text"
                              name="designation"
                              id="designation"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.designation"
                            />
                            <span
                              v-if="v$.designation.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.designation.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-2">
                            <label
                              for="department"
                              class="block text-sm font-medium text-gray-700"
                              >Department</label
                            >
                            <select
                              v-model="state.department"
                              id="department"
                              name="Department"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>IT</option>
                              <option>HR</option>
                              <option>Marketing</option>
                            </select>
                            <span
                              v-if="v$.department.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.department.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="division"
                              class="block text-sm font-medium text-gray-700"
                              >Division</label
                            >
                            <select
                              v-model="state.division"
                              id="division"
                              name="division"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Division one</option>
                              <option>Division two</option>
                              <option>Division three</option>
                            </select>
                            <span
                              v-if="v$.division.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.division.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="branch"
                              class="block text-sm font-medium text-gray-700"
                              >Branch</label
                            >
                            <select
                              v-model="state.branch"
                              id="branch"
                              name="Branch"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>India</option>
                              <option>Dubai</option>
                              <option>America</option>
                            </select>
                            <span
                              v-if="v$.branch.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.branch.$errors[0].$message }}
                            </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="experience"
                              class="block text-sm font-medium text-gray-700"
                              >Experience</label
                            >
                            <select
                              v-model="state.experience"
                              id="experience"
                              name="Experience"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Option One</option>
                              <option>Option Two</option>
                              <option>Option Three</option>
                            </select>
                            <span
                              v-if="v$.experience.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.experience.$errors[0].$message }}
                            </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="reportingManager"
                              class="block text-sm font-medium text-gray-700"
                              >Reporting Manager</label
                            >
                            <select
                              v-model="state.reportingManager"
                              id="reportingManager"
                              name="Reporting Manager"
                              autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Option One</option>
                              <option>Option Two</option>
                              <option>Option Three</option>
                            </select>
                            <span
                              v-if="v$.reportingManager.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.reportingManager.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-2">
                            <label
                              for="joiningDate"
                              class="block text-sm font-medium text-gray-700"
                              >Date of Joining</label
                            >
                            <input
                              type="date"
                              name="JoiningDate"
                              max="2022-06-08"
                              :onfocus="
                                (this.max = new Date()
                                  .toISOString()
                                  .split('T')[0])
                              "
                              id="joiningDate"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.joiningDate"
                            />
                            <span
                              v-if="v$.joiningDate.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.joiningDate.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-2">
                            <label
                              for="yearOfService"
                              class="block text-sm font-medium text-gray-700"
                              >Year of Service</label
                            >
                            <input
                              type="number"
                              name="yearOfService"
                              id="yearOfService"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.yearOfService"
                            />
                            <span
                              v-if="v$.yearOfService.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.yearOfService.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="grossSalary"
                              class="block text-sm font-medium text-gray-700"
                              >Gross Salary</label
                            >
                            <input
                              type="number"
                              name="grossSalary"
                              id="grossSalary"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.grossSalary"
                            />
                            <span
                              v-if="v$.grossSalary.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.grossSalary.$errors[0].$message }}
                            </span>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="allowance"
                              class="block text-sm font-medium text-gray-700"
                              >Allowance</label
                            >
                            <input
                              type="number"
                              name="allowance"
                              id="allowance"
                              autocomplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              v-model="state.allowance"
                            />
                            <span
                              v-if="v$.allowance.$error"
                              class="font-small text-xs text-red-600"
                            >
                              {{ v$.allowance.$errors[0].$message }}
                            </span>
                          </div>
                          <!--  -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Privacy -->
                  <fieldset
                    class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                  >
                    <legend class="sr-only">Privacy</legend>
                    <div
                      class="text-sm font-medium text-gray-900"
                      aria-hidden="true"
                    >
                      Privacy
                    </div>
                    <div class="space-y-5 sm:col-span-2">
                      <div class="space-y-5 sm:mt-0">
                        <div class="relative flex items-start">
                          <div class="absolute flex h-5 items-center">
                            <input
                              id="public-access"
                              name="privacy"
                              aria-describedby="public-access-description"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked
                            />
                          </div>
                          <div class="pl-7 text-sm">
                            <label
                              for="public-access"
                              class="font-medium text-gray-900"
                            >
                              Public access
                            </label>
                            <p
                              id="public-access-description"
                              class="text-gray-500"
                            >
                              Everyone with the link will see this project
                            </p>
                          </div>
                        </div>
                        <div class="relative flex items-start">
                          <div class="absolute flex h-5 items-center">
                            <input
                              id="restricted-access"
                              name="privacy"
                              aria-describedby="restricted-access-description"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div class="pl-7 text-sm">
                            <label
                              for="restricted-access"
                              class="font-medium text-gray-900"
                            >
                              Private to Project Members
                            </label>
                            <p
                              id="restricted-access-description"
                              class="text-gray-500"
                            >
                              Only members of this project would be able to
                              access
                            </p>
                          </div>
                        </div>
                        <div class="relative flex items-start">
                          <div class="absolute flex h-5 items-center">
                            <input
                              id="private-access"
                              name="privacy"
                              aria-describedby="private-access-description"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div class="pl-7 text-sm">
                            <label
                              for="private-access"
                              class="font-medium text-gray-900"
                            >
                              Private to you
                            </label>
                            <p
                              id="private-access-description"
                              class="text-gray-500"
                            >
                              You are the only one able to access this project
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr class="border-gray-200" />
                      <div
                        class="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0"
                      >
                        <div class="flex-1">
                          <a
                            href="#"
                            class="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                          >
                            <!-- Heroicon name: solid/link -->
                            <svg
                              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span> Copy link </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            class="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900"
                          >
                            <!-- Heroicon name: solid/question-mark-circle -->
                            <svg
                              class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span> Learn more about sharing </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <!-- /End replace -->
              </div>
              <Notification
                message=" General Save Successfully"
                :toggleNotification="toggleNotification"
                v-if="showNotification"
              />
              <div
                class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6"
              >
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="closeSlider()"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    @click="submitForm"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
