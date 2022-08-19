<script>
import useValidate from "@vuelidate/core";
import { required, email, maxValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import BloodGroup from "@/components/BloodGroup.vue";
import { useEmployeesStore } from "@/store/employees";
import { ref, onMounted, watch } from "vue";
export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
    BloodGroup,
  },
  props: ["id", "editData", "closeSlider"],
  setup(props) {
    const router = useRouter();
    const isLoading = ref(false);
    const employeesStore = useEmployeesStore();
    const state = reactive({
      jobLevel: "",
      firstName: "",
      lastName: "",
      nationality: "",
      dob: "",
      bloodGroup: "",
      employeeType: "",
      martialStatus: "",
      companyMail: "",
      primaryContact: "+91",
      designation: "",
      department: "",
      branch: "",
      division: "",
      joiningDate: "",
      experience: "",
      reportingManager: "",
      code: "",
      tempAddress: "",
      perAddress: "",
      notes: "",
      gender: "",
      countryCode: "+91",
    });
    onMounted(() => {
      if (props.id) {
        const general = employeesStore.getGeneralDetailsById();
        state.jobLevel = general.jobLevel;
        state.firstName = general.firstName;
        state.lastName = general.lastName;
        state.dob = general.dob;
        state.bloodGroup = general.bloodGroup;
        state.martialStatus = general.martialStatus;
        state.designation = general.designation;
        state.division = general.division;
        state.department = general.department;
        state.branch = general.branch;
        state.joiningDate = general.joiningDate;
        state.experience = general.experience;
        state.reportingManager = general.reportingManager;
        state.nationality = general.nationality;
        state.employeeType = general.employeeType;
        state.code = general.code;
        state.notes = general.notes;
        state.companyMail = general.companyMail;
        state.primaryContact = general.primaryContact;
        state.tempAddress = general.tempAddress;
        state.perAddress = general.perAddress;
        state.gender = general.gender;
        state.countryCode = general.countryCode;
      }
    });
    const rules = computed(() => {
      return {
        jobLevel: { required },

        firstName: { required },
        lastName: { required },
        nationality: { required },
        dob: { required },
        gender: {},
        bloodGroup: { required },
        martialStatus: { required },
        designation: { required },
        employeeType: { required },
        department: { required },
        division: { required },
        branch: { required },
        joiningDate: { required },
        experience: { required, maxValue: maxValue(99) },
        notes: { required },
        code: { required },
        companyMail: { email },
        tempAddress: { required },
        primaryContact: { required },
      };
    });
    const v$ = useValidate(rules, state);
    const goback = () => {
      props.closeSlider();
    };
    const toggleNotification = () => {
      this.toggleNotification = !this.toggleNotification;
    };
    return {
      state,
      v$,
      employeesStore,
      toggleNotification,
      goback,
      rules,
      isLoading,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.id) {
          this.isLoading = true;
          await this.employeesStore.updateGeneralDetails(this.state, this.id);
        } else {
          this.isLoading = true;
          await this.employeesStore.addNewEmployee(this.state);
        }
        this.isLoading = false;
        this.goback();
      }
    },
  },
};
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
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
          class="sm-w-full flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
        >
          <div class="bg-gray-100 px-4 sm:px-6">
            <div class="mt-5 flex items-start justify-between">
              <div class="col-span-1 pb-6">
                <h3
                  class="text-sm font-medium leading-6 text-gray-900 sm:text-lg"
                >
                  General Details
                </h3>
              </div>
              <div class="ml-3 flex h-7 items-center">
                <div
                  class="bottom-0 flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-3"
                >
                  <div class="flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeSlider()"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <LoadingButton
                      :text="id ? 'Save' : 'Create'"
                      :onPress="submitForm"
                      :isLoading="isLoading"
                    />
                  </div>
                </div>
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
                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700"
                          >Date of Birth</label
                        >
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          autocomplete="address-level2"
                          max="2022-06-08"
                          :onfocus="
                            (this.max = new Date().toISOString().split('T')[0])
                          "
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

                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="joiningDate"
                          class="block text-sm font-medium text-gray-700"
                          >Date of Joining</label
                        >
                        <input
                          type="date"
                          name="JoiningDate"
                          id="joiningDate"
                          autocomplete="address-level2"
                          max="2022-06-08"
                          :onfocus="
                            (this.max = new Date().toISOString().split('T')[0])
                          "
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
                        <div>
                          <label class="block text-sm font-medium text-gray-700"
                            >Gender</label
                          >
                          <fieldset class="mt-4">
                            <legend class="sr-only">Notification method</legend>
                            <div
                              class="space-y-2 sm:flex sm:items-center sm:space-x-4 sm:space-y-0"
                            >
                              <div class="flex items-center">
                                <input
                                  id="email"
                                  name="notification-method"
                                  type="radio"
                                  value="Male"
                                  v-model="state.gender"
                                  class="h-4 w-4 border-gray-300 text-indigo-600"
                                />
                                <label
                                  for="email"
                                  class="ml-2 block text-sm font-medium text-gray-700"
                                >
                                  Male
                                </label>
                              </div>

                              <div class="flex items-center">
                                <input
                                  id="sms"
                                  name="notification-method"
                                  type="radio"
                                  value="Female"
                                  v-model="state.gender"
                                  class="h-4 w-4 border-gray-300 text-indigo-600"
                                />
                                <label
                                  for="sms"
                                  class="ml-2 block text-sm font-medium text-gray-700"
                                >
                                  Female
                                </label>
                              </div>

                              <div class="flex items-center">
                                <input
                                  id="push"
                                  name="notification-method"
                                  type="radio"
                                  value="Other"
                                  v-model="state.gender"
                                  class="h-4 w-4 border-gray-300 text-indigo-600"
                                />
                                <label
                                  for="push"
                                  class="ml-2 block text-sm font-medium text-gray-700"
                                >
                                  Other</label
                                >
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>

                      <div class="col-span-6 sm:col-span-2">
                        <BloodGroup :state="this.state" />
                        <span
                          v-if="v$.bloodGroup.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.bloodGroup.$errors[0].$message }}
                        </span>
                      </div>

                      <div class="col-span-6 sm:col-span-2">
                        <MartialStatus :state="this.state" />
                        <span
                          v-if="v$.martialStatus.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.martialStatus.$errors[0].$message }}
                        </span>
                      </div>

                      <!-- Employee -->
                      <div class="col-span-6 sm:col-span-2">
                        <InputSearchableSelect
                          inputName="nationality"
                          :state="state"
                          name="Nationality"
                        />
                        <span
                          v-if="v$.nationality.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.nationality.$errors[0].$message }}
                        </span>
                      </div>

                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="email"
                          class="block text-sm font-medium text-gray-700"
                          >Company Mail</label
                        >
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <!-- Heroicon name: solid/mail -->
                            <svg
                              class="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                              />
                              <path
                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                              />
                            </svg>
                          </div>
                          <input
                            type="email"
                            v-model="state.companyMail"
                            name="companyMail"
                            id="companyMail"
                            class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                        <span
                          v-if="v$.companyMail.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.companyMail.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <InputContactWithCountryCode
                          label="Mobile Number"
                          :state="state"
                          textFieldStateName="primaryContact"
                          countryCodeStateName="countryCode"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="code"
                          class="block text-sm font-medium text-gray-700"
                          >Employee Code</label
                        >
                        <input
                          v-model="state.code"
                          type="text"
                          name="code"
                          id="code"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span
                          v-if="v$.code.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.code.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <InputCodesDropDown
                          :state="state"
                          inputName="employeeType"
                          label="Employee Type"
                          kind="EmployeeType"
                          :v="this.v$"
                        />
                        <span
                          v-if="v$.employeeType.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.employeeType.$errors[0].$message }}
                        </span>
                      </div>
                      <DependentDropdown
                        :state="this.state"
                        :v="this.v$"
                        :editID="this.id"
                      />

                      <div class="col-span-6 sm:col-span-2">
                        <InputReportingManager
                          :state="state"
                          name="Reporting Manager"
                          inputName="reportingManager"
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="experience"
                          class="block text-sm font-medium text-gray-700"
                          >Total Years of Experience</label
                        >
                        <input
                          type="number"
                          v-model="state.experience"
                          name="experience"
                          max="99"
                          id="experience"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span
                          v-if="v$.experience.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.experience.$errors[0].$message }}
                        </span>
                      </div>
                      <!--  -->
                    </div>
                  </div>
                </div>
                <div class="grid gap-6 py-2 pt-5">
                  <div class="grid-cols-12">
                    <label
                      for="perAddress"
                      class="block text-sm font-medium text-gray-700"
                      >Permanent Address</label
                    >
                    <textarea
                      id="perAddress"
                      name="perAddress"
                      rows="3"
                      class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.perAddress"
                    ></textarea>
                  </div>
                  <div class="grid-cols-12">
                    <label
                      for="tempAddress"
                      class="block text-sm font-medium text-gray-700"
                      >Communication Address</label
                    >
                    <textarea
                      id="tempAddress"
                      name="tempAddress"
                      rows="3"
                      class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.tempAddress"
                    ></textarea>

                    <span
                      v-if="v$.tempAddress.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.tempAddress.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="grid-cols-12">
                    <label
                      for="joiningDate"
                      class="block text-sm font-medium text-gray-700"
                      >About</label
                    >
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.notes"
                    ></textarea>

                    <span
                      v-if="v$.notes.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.notes.$errors[0].$message }}
                    </span>
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
          <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
            <button
              type="button"
              class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="goback()"
            >
              Cancel
            </button>
            <LoadingButton
              :text="id ? 'Save' : 'Create'"
              :onPress="submitForm"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
