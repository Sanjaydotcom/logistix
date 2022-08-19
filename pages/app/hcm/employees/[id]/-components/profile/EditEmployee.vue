<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "@/store/employees";
import Notification from "@/components/ui/Notification.vue";
export default {
  data() {
    return {
      IsToggleSlider: false,
      showNotification: false,
    };
  },
  created() {
    this.IsToggleSlider = true;
  },
  components: {
    Notification,
  },
  props: ["editEmployeeButtonClick"],
  setup() {
    const employeesStore = useEmployeesStore();
    const state = reactive({
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
    return { state, v$, employeesStore };
  },
  methods: {
    IsSliderClosed() {
      this.IsToggleSlider = false;
      this.$router.back();
    },
    async toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    submitForm() {
      this.showNotification = true;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        // const employeesStore = useEmployeeStore();
        // employeesStore.SaveEmployeeGeneralDetails(this.state);
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
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
              <div class="px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="md:col-span-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Edit Employee info
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                     
                    </p>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      @click="this.editEmployeeButtonClick"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                          <div class="col-span-6 sm:col-span-3">
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
                              <option>Option One</option>
                              <option>Option Two</option>
                              <option>Option Three</option>
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
                              <option>Option One</option>
                              <option>Option Two</option>
                              <option>Option Three</option>
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
                    @click="editEmployeeButtonClick"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    @click="submitForm"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
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
