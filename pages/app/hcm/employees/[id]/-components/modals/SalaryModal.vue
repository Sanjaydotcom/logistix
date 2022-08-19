<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "~~/store/employees";
import SalaryHistory from "./-components/SalaryHistory.vue";
import VariableAllowance from "./-components/VariableAllowance.vue";
import { useDate } from "@/composables/useDate";
import { storeToRefs } from "pinia";

export default {
  props: ["showSalaryModal", "toggleSalaryModal", "id", "toggleNotification"],
  setup(props) {
    const isModalVisible = props.showSalaryModal;
    const toggleModal = props.toggleSalaryModal;
    const toggleNotification = props.toggleNotification;
    const employeesStore = useEmployeesStore();
    const { currentProfile } = storeToRefs(employeesStore);

    const salary = employeesStore.getCurrentEmployeeSalary();
    const history = employeesStore.getCurrentEmployeeSalaryHistory();
    const varAllowance = employeesStore.getCurrentEmployeeSalaryVarAllowance();
    const showForm = ref(false);

    const date = useDate();

    const toggleForm = () => {
      showForm.value = !showForm.value;
    };
    const mainTabState = reactive({
      tabs: [],
      activeTab: 1,
    });
    const tabState = reactive({
      tabs: [],
      activeTab: 1,
    });
    const state = reactive({
      basic: salary?.basic || "",
      hra: salary?.hra || "",
      va: salary?.va || "",
      oa: salary?.oa || "",
      transport: salary?.transport || "",
      food: salary?.food || "",
      fixed: salary?.fixed || "",
      date: salary?.date || "",
      cost: salary?.cost || "",
      gross: "",
    });
    const rules = computed(() => {
      return {
        basic: { required, minValue: minValue(0) },
        hra: { required, minValue: minValue(0) },
        va: { required, minValue: minValue(0) },
        oa: { required, minValue: minValue(0) },
        transport: { required, minValue: minValue(0) },
        food: { required, minValue: minValue(0) },
        fixed: { required, minValue: minValue(0) },
        date: { required },
        cost: { required },
      };
    });
    const v$ = useValidate(rules, state);
    const today = new Date().toISOString().split("T")[0];
    return {
      state,
      v$,
      isModalVisible,
      toggleModal,
      showForm,
      toggleForm,
      employeesStore,
      salary,
      mainTabState,
      tabState,
      history,
      varAllowance,
      toggleNotification,
      today,
      date,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const { basic, hra, va, oa, transport, food, fixed } = this.state;
        const gross = basic + hra + va + oa + transport + food + fixed;
        this.state["gross"] = gross;
        if (this.salary.date && this.salary.date !== this.state.date) {
          await this.updateHistory();
        } else {
          this.employeesStore.updateSalaryDetails(this.state, this.id);
        }
        this.toggleNotification("salary");
        this.toggleModal();
      }
    },

    async updateHistory() {
      const { basic, hra, va, oa, transport, food, fixed } = this.state;
      const gross = basic + hra + va + oa + transport + food + fixed;
      this.state["gross"] = gross;

      const historyItem = {
        ...this.salary,
        fromDate: this.salary.date,
        toDate: await this.date,
        amount:
          this.history && this.history.length > 0
            ? this.state.gross - this.history[0].gross
            : 0,
      };
      await this.employeesStore.SalaryIncrement(
        historyItem,
        this.id,
        this.state
      );
    },
  },
  components: {
    SalaryHistory,
    VariableAllowance,
  },
};
</script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
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
        class="
          flex
          min-h-full
          items-end
          justify-center
          p-4
          text-center
          sm:items-center sm:p-0
        "
      >
        <div
          v-if="isModalVisible"
          class="
            relative
            transform
            overflow-hidden
            rounded-lg
            bg-white
            px-4
            pt-5
            pb-4
            text-left
            shadow-xl
            transition-all
            sm:my-8 sm:w-full sm:max-w-4xl sm:p-6
          "
        >
          <div>
            <div class="px-4">
              <div class="flex justify-between sm:items-center">
                <div class="sm:flex-auto">
                  <h1 class="text-xl font-medium text-gray-900">
                    Salary Details
                  </h1>
                  <p class="mt-2 text-sm text-gray-700">
                    View and manage salary details of employee.
                  </p>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    @click="toggleModal"
                    type="button"
                    class="
                      inline-flex
                      items-center
                      justify-center
                      rounded-md
                      bg-gray-200
                      text-sm text-gray-400
                      shadow-sm
                      hover:text-gray-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:ring-offset-2
                      sm:w-auto
                    "
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
            </div>
            <!-- Parent tabs -->
            <div class="mt-6 sm:mt-2 2xl:mt-5">
              <div class="border-gray-200">
                <div class="mx-auto max-w-5xl px-4">
                  <nav class="flex cursor-pointer space-x-4" aria-label="Tabs">
                    <!-- Current: "bg-gray-100 text-gray-700", Default: "text-gray-500 hover:text-gray-700" -->
                    <a
                      v-on:click="mainTabState.activeTab = 1"
                      :class="[
                        mainTabState.activeTab === 1
                          ? 'border-blue-600 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                      ]"
                    >
                      Salary</a
                    >
                    <a
                      v-on:click="mainTabState.activeTab = 2"
                      :class="[
                        mainTabState.activeTab === 2
                          ? 'border-blue-600 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                      ]"
                    >
                      History</a
                    >
                  </nav>
                </div>
              </div>
            </div>

            <div v-if="mainTabState.activeTab == 1">
              <!-- Salary tabs -->
              <div class="mt-2 px-4 sm:mt-2">
                <div class="border-gray-200">
                  <div class="mx-auto max-w-5xl px-4">
                    <nav
                      class="flex cursor-pointer space-x-4"
                      aria-label="Tabs"
                    >
                      <!-- Current: "bg-gray-100 text-gray-700", Default: "text-gray-500 hover:text-gray-700" -->
                      <a
                        v-on:click="tabState.activeTab = 1"
                        :class="[
                          tabState.activeTab === 1
                            ? 'border-green-400 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                        ]"
                      >
                        Fixed</a
                      >
                      <a
                        v-on:click="tabState.activeTab = 2"
                        :class="[
                          tabState.activeTab === 2
                            ? 'border-green-400 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                        ]"
                      >
                        Variable</a
                      >
                    </nav>
                  </div>
                </div>
              </div>
              <!-- Fixed Salary -->
              <div v-if="tabState.activeTab == 1">
                <div v-if="salary?.basic" class="px-4">
                  <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto"></div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                      <button
                        @click="toggleForm"
                        type="button"
                        class="
                          inline-flex
                          items-center
                          justify-center
                          rounded-md
                          border border-gray-300
                          bg-white
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-gray-700
                          shadow-sm
                          focus:outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:ring-offset-2
                          sm:w-auto
                        "
                      >
                        {{ showForm ? "Cancel" : "Edit Salary" }}
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Salary Table -->
                <div v-if="salary?.basic && !showForm" class="px-4">
                  <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div
                        class="
                          inline-block
                          min-w-full
                          py-2
                          align-middle
                          md:px-6
                          lg:px-8
                        "
                      >
                        <div
                          class="
                            overflow-hidden
                            shadow
                            ring-1 ring-black ring-opacity-5
                            md:rounded-lg
                          "
                        >
                          <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="
                                    py-3
                                    pl-4
                                    pr-3
                                    text-left text-xs
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                    sm:pl-6
                                  "
                                ></th>
                                <th
                                  scope="col"
                                  class="
                                    px-3
                                    py-3
                                    text-left text-xs
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                  "
                                >
                                  Component
                                </th>
                                <th
                                  scope="col"
                                  class="
                                    px-3
                                    py-3
                                    text-left text-xs
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                  "
                                >
                                  Abbreviation
                                </th>
                                <th
                                  scope="col"
                                  class="
                                    px-3
                                    py-3
                                    text-left text-xs
                                    font-medium
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                  "
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  1
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  Basic
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  B
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.basic }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  2
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  House Rent Allowance
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  HRA
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.hra }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  3
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  Vehicle Allowance
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  VA
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.va }}
                                </td>
                              </tr>

                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  4
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  Transport Allowance
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  TA
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.transport }}
                                </td>
                              </tr>

                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  5
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  Food Allowance
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  FA
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.food }}
                                </td>
                              </tr>

                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  6
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  Fixed Allowance
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  FDA
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.fixed }}
                                </td>
                              </tr>

                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                >
                                  7
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  Other Allowance
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  OA
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm text-gray-500
                                  "
                                >
                                  {{ salary?.oa }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="
                                    whitespace-nowrap
                                    py-4
                                    pl-4
                                    pr-3
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    sm:pl-6
                                  "
                                ></td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  Gross Salary
                                </td>
                                <td
                                  class="
                                    text-s
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  GR
                                </td>
                                <td
                                  class="
                                    whitespace-nowrap
                                    px-3
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-900
                                  "
                                >
                                  {{ salary?.gross }}
                                </td>
                              </tr>
                              <!-- More people... -->
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--Salary Form -->
                <div
                  v-if="showForm || !salary?.basic"
                  class="mt-6 grid grid-cols-4 gap-y-4 gap-x-4 px-4"
                >
                  <div class="col-span-2">
                    <label
                      for="full-name"
                      class="block text-sm font-medium text-gray-700"
                      >Basic Salary</label
                    >
                    <input
                      v-model="state.basic"
                      type="number"
                      name="basic"
                      id="basic"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="Basic"
                    />
                    <span
                      v-if="v$.basic.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.basic.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-2">
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700"
                      >HRA</label
                    >
                    <input
                      v-model="state.hra"
                      id="hra"
                      name="hra"
                      type="number"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="HRA"
                    />
                    <span
                      v-if="v$.hra.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.hra.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-2">
                    <label
                      for="va"
                      class="block text-sm font-medium text-gray-700"
                      >Vehicle Allowance</label
                    >
                    <input
                      v-model="state.va"
                      id="va"
                      name="va"
                      type="number"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="Vehicle Allowance"
                    />
                    <span
                      v-if="v$.va.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.va.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="transport"
                      class="block text-sm font-medium text-gray-700"
                      >Transport Allowance</label
                    >
                    <input
                      v-model="state.transport"
                      id="transport"
                      name="transport"
                      type="number"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="Transport Allowance"
                    />
                    <span
                      v-if="v$.transport.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.transport.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-2">
                    <label
                      for="food"
                      class="block text-sm font-medium text-gray-700"
                      >Food Allowance</label
                    >
                    <input
                      v-model="state.food"
                      id="food"
                      name="food"
                      type="number"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="Food Allowance"
                    />
                    <span
                      v-if="v$.food.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.food.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-2">
                    <label
                      for="fixed"
                      class="block text-sm font-medium text-gray-700"
                      >Fixed Allowance</label
                    >
                    <input
                      v-model="state.fixed"
                      id="fixed"
                      name="fixed"
                      type="number"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="Fixed Allowance"
                    />
                    <span
                      v-if="v$.fixed.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.fixed.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="oa"
                      class="block text-sm font-medium text-gray-700"
                      >Other Allowance</label
                    >
                    <input
                      v-model="state.oa"
                      id="oa"
                      name="oa"
                      type="number"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
                      placeholder="Other Allowance"
                    />
                    <span
                      v-if="v$.oa.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.oa.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="cost"
                      class="block text-sm font-medium text-gray-700"
                      >Cost center</label
                    >
                    <select
                      id="cost"
                      name="cost"
                      autocomplete="country-name"
                      v-model="state.cost"
                      class="
                        mt-1
                        block
                        w-full
                        rounded-md
                        border border-gray-300
                        bg-white
                        py-2
                        px-3
                        shadow-sm
                        focus:border-indigo-500
                        focus:outline-none
                        focus:ring-indigo-500
                        sm:text-sm
                      "
                    >
                      <option>NVOCC</option>
                      <option>FORWARDING</option>
                      <option>50 NVOCC/50 FORWARDING</option>
                    </select>
                    <span
                      v-if="v$.cost.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.cost.$errors[0].$message }}
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
                      :min="state.date ? state.date : null"
                      id="date"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        text-sm
                        placeholder-gray-500
                        shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500
                      "
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

                <div class="mt-5 text-right sm:mt-6">
                  <button
                    @click="toggleModal"
                    type="button"
                    class="
                      mt-3
                      mr-4
                      inline-flex
                      w-max
                      justify-center
                      rounded-md
                      border border-gray-300
                      bg-white
                      px-4
                      py-2
                      text-base
                      font-medium
                      text-gray-700
                      shadow-sm
                      hover:bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:ring-offset-2
                      sm:col-start-1 sm:mt-0 sm:text-sm
                    "
                  >
                    Exit
                  </button>
                  <button
                    v-if="showForm || !salary?.basic"
                    @click="submitForm"
                    type="button"
                    class="
                      mr-8
                      inline-flex
                      w-max
                      justify-center
                      rounded-md
                      border border-transparent
                      bg-blue-600
                      px-4
                      py-2
                      text-base
                      font-medium
                      text-white
                      shadow-sm
                      hover:bg-blue-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:ring-offset-2
                      sm:col-start-2 sm:text-sm
                    "
                  >
                    Save
                  </button>
                </div>
              </div>
              <div v-if="tabState.activeTab === 2">
                <VariableAllowance
                  :id="id"
                  :varAllowance="varAllowance"
                  :toggleModal="toggleModal"
                  :toggleNotification="toggleNotification"
                />
              </div>
            </div>

            <div v-if="mainTabState.activeTab === 2">
              <SalaryHistory
                :id="id"
                :toggleModal="toggleModal"
                :toggleNotification="toggleNotification"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
