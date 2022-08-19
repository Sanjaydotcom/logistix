<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "~~/store/employees";
import Notification from "@/components/ui/Notification.vue";

export default {
  data() {
    return {
      IsSliderClicked: false,
      showNotification: false,
      appraisals: [],
      AppraisalEditData: {},
      IsEdit: false,
      AddButtonText: "Add Appraisal",
    };
  },
  setup() {
    const employeesStore = useEmployeesStore();

    const state = reactive({
      designation: "",
      branch: "",
      department: "",
      dateOfAppraisal: "",
      typeOfAppraisal: "",
      appraisalAmount: "",
    });

    const rules = computed(() => {
      return {
        designation: { required },

        branch: { required },
        department: { required },
        dateOfAppraisal: { required },
        typeOfAppraisal: { required },
        appraisalAmount: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$, employeesStore };
  },
  props: ["id"],
  mounted() {
    this.appraisals = this.employeesStore.getAppraisalById(this.id); //getters
  },
  methods: {
    async EditButtonClick(id, Edit) {
      this.clearAppraisal();
      this.AppraisalEditData = {};
      this.IsEdit = false;
      if (Edit) {
        this.IsEdit = Edit;
        this.AddButtonText = "Edit Appraisal";
        await this.updateState(id);
      }
      this.IsSliderClicked = !this.IsSliderClicked;
    },
    async toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    async submit() {
      this.showNotification = true;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        this.IsEdit
          ? await this.employeesStore.updateAppraisal(
              { ...this.state, id: this.AppraisalEditData.id },
              this.id,
              this.AppraisalEditData.id
            )
          : await this.employeesStore.addAppraisal(this.state, this.id);

        this.appraisals = this.employeesStore.getAppraisalById(this.id); //getters
        this.EditButtonClick();
      }
    },
    async updateState(appraisalCode) {
      if (this.IsEdit) {
        this.AppraisalEditData =
          await this.employeesStore.getAppraisalByAppraisalId(
            this.id,
            appraisalCode
          ); //getters

        this.state.designation = this.AppraisalEditData.designation;
        this.state.branch = this.AppraisalEditData.branch;
        this.state.department = this.AppraisalEditData.department;
        this.state.dateOfAppraisal = this.AppraisalEditData.dateOfAppraisal;
        this.state.typeOfAppraisal = this.AppraisalEditData.typeOfAppraisal;
        this.state.appraisalAmount = this.AppraisalEditData.appraisalAmount;
      }
    },
    async clearAppraisal() {
      this.state.designation = "";
      this.state.branch = "";
      this.state.department = "";
      this.state.dateOfAppraisal = "";
      this.state.typeOfAppraisal = "";
      this.state.appraisalAmount = "";
    },
  },
};
</script>

<template>
  <div class="mx-auto mt-3 max-w-5xl px-4 sm:px-6 lg:px-8">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <div style="display: flex; justify-content: flex-end">
        <button
          type="button"
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="EditButtonClick()"
        >
          <svg
            class="-ml-0.5 mr-2 h-4 w-4"
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
          Appraisal
        </button>
      </div>
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="appraisal in this.appraisals" :key="appraisal.branch">
          <a class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="flex min-w-0 flex-1 items-center">
                <div
                  class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4"
                >
                  <div>
                    <p class="truncate text-sm font-medium text-indigo-600">
                      Date Of Appraisal :
                      <time datetime="2020-01-07">{{
                        appraisal.dateOfAppraisal
                      }}</time>
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <!-- Heroicon name: solid/mail -->
                      Appraisal Amount:
                      {{ appraisal.appraisalAmount }}
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900">
                        {{ appraisal.designation }}
                      </p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        <!-- Heroicon name: solid/check-circle -->
                        {{ appraisal.branch }} branch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <!-- Heroicon name: solid/chevron-right -->
                <button
                  type="button"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="EditButtonClick(appraisal.id, true)"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!-- add appraisal Slider -->
    <div v-if="IsSliderClicked">
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        status="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
        ></div>
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
            >
              <div class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="py-6 px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <h2
                          class="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          {{ AddButtonText }}
                        </h2>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            @click="EditButtonClick"
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
                      <div class="mt-1">
                        <p class="text-sm text-gray-500">
                          Get started by filling in the information below to
                          create your new project.
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              for="project-name"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Designation
                            </label>
                            <div class="mt-1">
                              <input
                                type="text"
                                name="code"
                                id="code"
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
                          </div>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Department
                            </label>
                            <div class="mt-1">
                              <select
                                v-model="state.department"
                                id="blood-group"
                                name="type"
                                autocomplete="martial-status"
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>Developer</option>
                                <option>HR</option>
                                <option>Accounts</option>
                              </select>
                              <span
                                v-if="v$.department.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.department.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="project-name"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Date Of Appraisal
                            </label>
                            <div class="mt-1">
                              <input
                                type="date"
                                max="2022-06-08"
                                :onfocus="
                                  (this.max = new Date()
                                    .toISOString()
                                    .split('T')[0])
                                "
                                name="issueDate"
                                id="project-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="state.dateOfAppraisal"
                              />
                              <span
                                v-if="v$.dateOfAppraisal.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.dateOfAppraisal.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Branch
                            </label>
                            <div class="mt-1">
                              <select
                                v-model="state.branch"
                                id="blood-group"
                                name="status"
                                autocomplete="martial-status"
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>Kerala</option>
                                <option>Bangalore</option>
                              </select>
                              <span
                                v-if="v$.branch.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.branch.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Type Of Appraisal
                            </label>
                            <div class="mt-1">
                              <select
                                v-model="state.typeOfAppraisal"
                                id="blood-group"
                                name="status"
                                autocomplete="martial-status"
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>3 Month</option>
                                <option>6 Month</option>
                                <option>1 Year</option>
                              </select>
                              <span
                                v-if="v$.typeOfAppraisal.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.typeOfAppraisal.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Appraisal Amount
                            </label>
                            <div class="mt-1">
                              <input
                                type="text"
                                name="code"
                                id="code"
                                autocomplete="address-level2"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="state.appraisalAmount"
                              />
                              <span
                                v-if="v$.appraisalAmount.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.appraisalAmount.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex flex-shrink-0 justify-end bg-gray-100 px-4 py-2"
                  >
                    <button
                      type="button"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="EditButtonClick"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
