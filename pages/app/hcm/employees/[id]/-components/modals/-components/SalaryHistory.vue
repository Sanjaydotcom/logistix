<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "~~/store/employees";
export default {
  props: ["toggleModal", "id", "toggleNotification"],
  setup(props) {
    const employeesStore = useEmployeesStore();
    const history = employeesStore.getCurrentEmployeeSalaryHistory();
    const historySorted = computed(() => {
      return history.sort((a, b) => {
        return new Date(b.fromDate) - new Date(a.fromDate);
      });
    });
    const showForm = ref(false);
    const toggleModal = props.toggleModal;
    const toggleNotification = props.toggleNotification;
    const historyId = ref(null);
    const toggleForm = (data, id) => {
      if (data) {
        historyId.value = id;
        setForm(data);
        showForm.value = !showForm.value;
      } else {
        historyId.value = null;
        showForm.value = !showForm.value;
      }
    };

    const setForm = (data) => {
      for (var item in data) state[item] = data[item];
    };

    let state = reactive({
      basic: "",
      hra: "",
      va: "",
      oa: "",
      transport: "",
      food: "",
      fixed: "",
      fromDate: "",
      toDate: "",
      cost: "",
      amount: "",
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
        fromDate: { required },
        toDate: { required },
        cost: { required },
        amount: { required },
      };
    });
    const v$ = useValidate(rules, state);
    const today = new Date().toISOString().split("T")[0];
    return {
      state,
      v$,
      showForm,
      toggleForm,
      employeesStore,
      history,
      toggleModal,
      toggleNotification,
      historySorted,
      today,
      historyId,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const { basic, hra, va, oa, transport, food, fixed } = this.state;
        const gross = basic + hra + va + oa + transport + food + fixed;
        this.state["gross"] = gross;
        if (this.historyId) {
          await this.employeesStore.updateSalaryHistory(
            this.state,
            this.id,
            this.historyId
          );
        } else {
          await this.employeesStore.addSalaryHistory(this.state, this.id);
        }
        this.toggleNotification("history");
        this.toggleModal();
      }
    },
  },
};
</script>
<template>
  <div>
    <div v-if="history && history[0]?.id" class="px-4">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto"></div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="toggleForm"
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            {{ showForm ? "Cancel" : "Add Salary History" }}
          </button>
        </div>
      </div>
    </div>
    <!-- Salary History Table -->
    <div v-if="history && history.length > 0 && !showForm" class="px-4">
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Effective From
                    </th>
                    <th
                      scope="col"
                      class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Effective To
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Basic
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      HRA
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Vehicle
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Transport
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Food
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Fixed
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Other
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Gross
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Difference
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="item in historySorted" :key="item.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      {{ item.fromDate }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.toDate }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.basic }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.hra }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.va }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.transport }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.food }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.fixed }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.oa }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ item.gross }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      :class="[
                        item.amount > 0
                          ? 'text-green-500'
                          : item.amount < 0
                          ? 'text-red-500'
                          : 'text-gray-500',
                      ]"
                    >
                      {{ item.amount }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <svg
                        @click="toggleForm(item, item.id)"
                        class="h-4 w-4 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Salary History Form -->
    <div v-else class="mt-6 grid grid-cols-4 gap-y-4 gap-x-4 px-4">
      <div class="col-span-2">
        <label for="full-name" class="block text-sm font-medium text-gray-700"
          >Basic Salary</label
        >
        <input
          v-model="state.basic"
          type="number"
          min="0"
          name="basic"
          id="basic"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Basic"
        />
        <span v-if="v$.basic.$error" class="font-small text-xs text-red-600">
          {{ v$.basic.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >HRA</label
        >
        <input
          v-model="state.hra"
          id="hra"
          name="hra"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="HRA"
        />
        <span v-if="v$.hra.$error" class="font-small text-xs text-red-600">
          {{ v$.hra.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label for="va" class="block text-sm font-medium text-gray-700"
          >Vehicle Allowance</label
        >
        <input
          v-model="state.va"
          id="va"
          name="va"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Vehicle Allowance"
        />
        <span v-if="v$.va.$error" class="font-small text-xs text-red-600">
          {{ v$.va.$errors[0].$message }}
        </span>
      </div>

      <div class="col-span-2">
        <label for="transport" class="block text-sm font-medium text-gray-700"
          >Transport Allowance</label
        >
        <input
          v-model="state.transport"
          id="transport"
          name="transport"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
        <label for="food" class="block text-sm font-medium text-gray-700"
          >Food Allowance</label
        >
        <input
          v-model="state.food"
          id="food"
          name="food"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Food Allowance"
        />
        <span v-if="v$.food.$error" class="font-small text-xs text-red-600">
          {{ v$.food.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label for="fixed" class="block text-sm font-medium text-gray-700"
          >Fixed Allowance</label
        >
        <input
          v-model="state.fixed"
          id="fixed"
          name="fixed"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Fixed Allowance"
        />
        <span v-if="v$.fixed.$error" class="font-small text-xs text-red-600">
          {{ v$.fixed.$errors[0].$message }}
        </span>
      </div>

      <div class="col-span-2">
        <label for="oa" class="block text-sm font-medium text-gray-700"
          >Other Allowance</label
        >
        <input
          v-model="state.oa"
          id="oa"
          name="oa"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Other Allowance"
        />
        <span v-if="v$.oa.$error" class="font-small text-xs text-red-600">
          {{ v$.oa.$errors[0].$message }}
        </span>
      </div>

      <div class="col-span-2">
        <label for="amount" class="block text-sm font-medium text-gray-700"
          >Difference</label
        >
        <input
          v-model="state.amount"
          type="number"
          name="amount"
          id="amount"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Increment or Decrement Amount"
        />
        <span v-if="v$.amount.$error" class="font-small text-xs text-red-600">
          {{ v$.amount.$errors[0].$message }}
        </span>
      </div>

      <div class="col-span-2">
        <label for="fromDate" class="block text-sm font-medium text-gray-700"
          >Effective From</label
        >
        <input
          v-model="state.fromDate"
          type="date"
          :max="today"
          name="fromDate"
          id="fromDate"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Effective Date"
        />
        <span v-if="v$.fromDate.$error" class="font-small text-xs text-red-600">
          {{ v$.fromDate.$errors[0].$message }}
        </span>
      </div>

      <div class="col-span-2">
        <label for="toDate" class="block text-sm font-medium text-gray-700"
          >Effective To</label
        >
        <input
          v-model="state.toDate"
          type="date"
          name="toDate"
          :min="state.fromDate"
          :max="today"
          id="toDate"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Effective Date"
        />
        <span v-if="v$.toDate.$error" class="font-small text-xs text-red-600">
          {{ v$.toDate.$errors[0].$message }}
        </span>
      </div>

      <div class="col-span-2">
        <label for="cost" class="block text-sm font-medium text-gray-700"
          >Cost center</label
        >
        <select
          id="cost"
          name="cost"
          autocomplete="country-name"
          v-model="state.cost"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option>NVOCC</option>
          <option>FORWARDING</option>
          <option>50 NVOCC/50 FORWARDING</option>
        </select>
        <span v-if="v$.cost.$error" class="font-small text-xs text-red-600">
          {{ v$.cost.$errors[0].$message }}
        </span>
      </div>
    </div>

    <div class="mt-5 text-right sm:mt-6">
      <button
        @click="toggleModal"
        type="button"
        class="mt-3 mr-4 inline-flex w-max justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
      >
        Exit
      </button>
      <button
        v-if="showForm || !history[0]?.id"
        @click="submitForm"
        type="button"
        class="mr-8 inline-flex w-max justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
      >
        Save
      </button>
    </div>
  </div>
</template>
