<script>
import { ref, reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { useEmployeesStore } from "~~/store/employees";
export default {
  props: ["showSalaryModal", "toggleSalaryModal", "id"],
  setup(props) {
    const isModalVisible = props.showSalaryModal;
    const isFormVisible = ref(false);
    const id = ref(props.id);
    const toggleModal = props.toggleSalaryModal;
    const employeesStore = useEmployeesStore();
    const lifecycle = employeesStore.getLifecycle();
    const lifecycleSorted = computed(() => {
      if (lifecycle) {
        return lifecycle.sort((a, b) => {
          return new Date(b.appraisalDate) - new Date(a.appraisalDate);
        });
      }
    });
    const toggleForm = () => {
      isFormVisible.value = !isFormVisible.value;
    };
    const state = reactive({
      type: "",
      date: "",
      department: "",
      position: "",
    });
    const rules = computed(() => {
      return {
        type: { required },
        date: { required },
        department: { required },
        position: { required },
      };
    });
    const today = new Date().toISOString().split("T")[0];
    const v$ = useValidate(rules, state);
    return {
      employeesStore,
      isModalVisible,
      isFormVisible,
      toggleModal,
      toggleForm,
      lifecycleSorted,
      today,
      rules,
      state,
      id,
      v$,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.employeesStore.saveLifecycle(this.state, this.id);
        this.toggleModal();
      }
    },
  },
};
</script>

<template>
  <div
    v-if="isModalVisible"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      v-if="isModalVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          v-if="isModalVisible"
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
        >
          <div class="px-4 sm:px-4 lg:px-4">
            <div class="flex justify-between sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-xl font-medium text-gray-900">
                  Employee Lifecycle
                </h1>
                <p class="mt-2 text-sm text-gray-700">
                  View lifecycle of employee over time.
                </p>
              </div>
              <div class="mt-4 sm:mt-0">
                <button
                  @click="toggleModal"
                  type="button"
                  class="inline-flex items-center justify-center rounded-md bg-gray-200 text-sm text-gray-400 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                >
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

            <div
              v-if="lifecycleSorted && lifecycleSorted.length > 0"
              class="pt-4"
            >
              <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto"></div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    @click="toggleForm"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                  >
                    {{ isFormVisible ? "Cancel" : "Add" }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Lifecycle Tree -->
            <div
              v-if="
                !isFormVisible && lifecycleSorted && lifecycleSorted.length > 0
              "
              class="my-6 flow-root"
            >
              <ul
                v-for="item in lifecycleSorted"
                :key="item.id"
                role="list"
                class="divide-y divide-gray-200"
              >
                <li>
                  <div class="relative pb-8">
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                          class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white"
                        >
                          <svg
                            class="h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div
                        class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                      >
                        <div>
                          <p class="text-sm text-gray-500">
                            {{ item.branch }}
                            <a class="font-medium text-gray-900">
                              {{ item.organization }}</a
                            >
                          </p>
                        </div>
                        <div
                          class="whitespace-nowrap text-right text-sm text-gray-500"
                        >
                          <date>
                            {{ item.appraisalDate.slice(0, 10) }}
                          </date>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <!-- More items... -->
              </ul>
            </div>

            <!--Lifecycle Form -->
            <div
              v-if="isFormVisible || !lifecycleSorted"
              class="mt-6 grid grid-cols-4 gap-y-4 gap-x-4"
            >
              <div class="col-span-2">
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-700"
                  >Type</label
                >
                <select
                  id="type"
                  name="type"
                  v-model="state.type"
                  placeholder="Lifecycle type"
                  class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Promotion</option>
                  <option>Salary Hike</option>
                  <option>Onboarding</option>
                </select>
                <span
                  v-if="v$.type.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.type.$errors[0].$message }}
                </span>
              </div>
              <div class="col-span-6 sm:col-span-2">
                <label
                  for="department"
                  class="block text-sm font-medium text-gray-700"
                  >Department</label
                >
                <input
                  type="text"
                  v-model="state.department"
                  name="department"
                  id="department"
                  placeholder="Department"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <span
                  v-if="v$.department.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.department.$errors[0].$message }}
                </span>
              </div>
              <div class="col-span-2">
                <label
                  for="position"
                  class="block text-sm font-medium text-gray-700"
                  >Position</label
                >
                <input
                  v-model="state.position"
                  id="position"
                  name="position"
                  type="text"
                  class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Job Position"
                />
                <span
                  v-if="v$.position.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.position.$errors[0].$message }}
                </span>
              </div>

              <div class="col-span-2">
                <label
                  for="date"
                  class="block text-sm font-medium text-gray-700"
                  >Effective Date</label
                >
                <input
                  v-model="state.date"
                  type="date"
                  name="date"
                  :max="today"
                  id="date"
                  class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Effective Date"
                />
                <span
                  v-if="v$.date.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.date.$errors[0].$message }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-5 mr-4 text-right sm:mt-6">
            <button
              @click="toggleModal"
              type="button"
              class="mt-3 mr-2 inline-flex w-max justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
            >
              Exit
            </button>
            <button
              v-if="isFormVisible || !lifecycleSorted"
              @click="submitForm"
              type="button"
              class="inline-flex w-max justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
