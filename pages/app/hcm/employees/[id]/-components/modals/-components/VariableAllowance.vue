<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "~~/store/employees";

export default {
  props: ["varAllowance", "toggleModal", "id", "toggleNotification"],
  setup(props) {
    const employeesStore = useEmployeesStore();
    const varAllowance = props.varAllowance;
    const showTooltip = ref(false);
    const showForm = ref(false);
    const toggleModal = props.toggleModal;
    const toggleNotification = props.toggleNotification;
    const toggleForm = () => {
      showForm.value = !showForm.value;
    };
    const state = reactive({
      tripAllowance: varAllowance?.tripAllowance || "",
      tripRemarks: varAllowance?.tripRemarks || "",
      fuelAllowance: varAllowance?.fuelAllowance || "",
      fuelRemarks: varAllowance?.fuelRemarks || "",
      annualTicket: varAllowance?.annualTicket || "",
      ticketRemarks: varAllowance?.ticketRemarks || "",
      annualLeave: varAllowance?.annualLeave || "",
      leaveRemarks: varAllowance?.leaveRemarks || "",
      marriageContribution: varAllowance?.marriageContribution || "",
      marriageRemarks: varAllowance?.marriageRemarks || "",
    });
    const toggleTooltip = () => {
      showTooltip.value = !showTooltip.value;
    };
    const rules = computed(() => {
      return {
        tripAllowance: { required, minValue: minValue(0) },
        annualTicket: { required, minValue: minValue(0) },
        annualLeave: { required , minValue: minValue(0)},
        fuelAllowance: { required, minValue: minValue(0) },
        marriageContribution: { required, minValue: minValue(0) },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
      showForm,
      toggleForm,
      employeesStore,
      varAllowance,
      toggleModal,
      toggleTooltip,
      showTooltip,
      toggleNotification,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await this.employeesStore.updateVarAllowance(this.state, this.id);
        this.toggleNotification("allowance");
        this.toggleModal();
      }
    },
  },
};
</script>

<template>
  <div>
    <div v-if="varAllowance?.tripAllowance" class="px-4">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto"></div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="toggleForm"
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            {{ showForm ? "Cancel" : "Edit Allowance" }}
          </button>
        </div>
      </div>
    </div>
    <!-- Salary Table -->
    <div v-if="varAllowance?.tripAllowance && !showForm" class="px-4">
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
                    ></th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Component
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Abbreviation
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      1
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      Monthly Trip Allowance
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      TA
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.tripAllowance }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.tripRemarks }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      2
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      Monthly Fuel Allowance
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      FA
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.fuelAllowance }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.fuelRemarks }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      3
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      Ticket Allowance
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      TA
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.annualTicket }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.ticketRemarks }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      4
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      Annual Leave Allowance
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      ALA
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.annualLeave }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.leaveRemarks }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      5
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      Marriage Contribution
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      MC
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.marriageContribution }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ varAllowance?.marriageRemarks }}
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
      v-if="showForm || !varAllowance?.tripAllowance"
      class="mt-6 grid grid-cols-4 gap-y-4 gap-x-4 px-4"
    >
      <div class="col-span-2">
        <label
          for="tripAllowance"
          class="block text-sm font-medium text-gray-700"
          >Monthly Trip Allowance</label
        >
        <input
          v-model="state.tripAllowance"
          type="number"
          name="tripAllowance"
          id="tripAllowance"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Trip Allowance"
        />
        <span
          v-if="v$.tripAllowance.$error"
          class="font-small text-xs text-red-600"
        >
          {{ v$.tripAllowance.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label for="tripRemarks" class="block text-sm font-medium text-gray-700"
          >Remarks</label
        >
        <input
          v-model="state.tripRemarks"
          type="text"
          name="tripRemarks"
          id="tripRemarks"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Remarks"
        />
      </div>
      <div class="col-span-2">
        <label
          for="fuelAllowance"
          class="block text-sm font-medium text-gray-700"
          >Monthly Fuel Allowance</label
        >
        <input
          v-model="state.fuelAllowance"
          type="number"
          name="fuelAllowance"
          id="fuelAllowance"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Fuel Allowance"
        />
        <span
          v-if="v$.fuelAllowance.$error"
          class="font-small text-xs text-red-600"
        >
          {{ v$.fuelAllowance.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label for="fuelRemarks" class="block text-sm font-medium text-gray-700"
          >Remarks</label
        >
        <input
          v-model="state.fuelRemarks"
          type="text"
          name="fuelRemarks"
          id="fuelRemarks"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Remarks"
        />
      </div>
      <div class="col-span-2">
        <label
          for="annualTicket"
          class="block text-sm font-medium text-gray-700"
          >Ticket Allowance</label
        >
        <input
          v-model="state.annualTicket"
          id="annualTicket"
          name="annualTicket"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Annual Ticket Allowance"
        />
        <span
          v-if="v$.annualTicket.$error"
          class="font-small text-xs text-red-600"
        >
          {{ v$.annualTicket.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label
          for="ticketRemarks"
          class="block text-sm font-medium text-gray-700"
          >Remarks</label
        >
        <input
          v-model="state.ticketRemarks"
          type="text"
          name="ticketRemarks"
          id="ticketRemarks"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Remarks"
        />
      </div>
      <div class="col-span-2">
        <label for="annualLeave" class="block text-sm font-medium text-gray-700"
          >Annual Leave Allowance</label
        >
        <input
          v-model="state.annualLeave"
          id="annualLeave"
          name="annualLeave"
          type="number"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Annual Leave Allowance"
        />
        <span
          v-if="v$.annualLeave.$error"
          class="font-small text-xs text-red-600"
        >
          {{ v$.annualLeave.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label
          for="leaveRemarks"
          class="block text-sm font-medium text-gray-700"
          >Remarks</label
        >
        <input
          v-model="state.leaveRemarks"
          type="text"
          name="leaveRemarks"
          id="leaveRemarks"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Remarks"
        />
      </div>

      <div class="col-span-2">
        <label
          for="marriageContribution"
          class="block text-sm font-medium text-gray-700"
          >Marriage Contribution</label
        >
        <input
          v-model="state.marriageContribution"
          type="number"
          name="marriageContribution"
          id="marriageContribution"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Marriage Contribution"
        />
        <span
          v-if="v$.marriageContribution.$error"
          class="font-small text-xs text-red-600"
        >
          {{ v$.marriageContribution.$errors[0].$message }}
        </span>
      </div>
      <div class="col-span-2">
        <label
          for="marriageRemarks"
          class="block text-sm font-medium text-gray-700"
          >Remarks</label
        >
        <input
          v-model="state.marriageRemarks"
          type="text"
          name="marriageRemarks"
          id="marriageRemarks"
          class="block w-full rounded-md border-gray-300 text-sm placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Remarks"
        />
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
        v-if="showForm || !varAllowance?.tripAllowance"
        @click="submitForm"
        type="button"
        class="mr-8 inline-flex w-max justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
      >
        Save
      </button>
    </div>
  </div>
</template>
