<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useCustomerStore } from "@/store/crm/customers";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CostingForm",
  props: ["id", "tooggleFormAction", "toggleNotification", "editData", "state"],
  setup(props) {
    const store = useCustomerStore();
    const costingForm = reactive({
         code: "",
          description: "",
          unit: "",
          retePerUnit: "",
          fcProv: "",
          currency: "",
          exRate: "",
          provisionAmount: "",
          // oog:false,   checkbox
          vat: "",
 
    });

    watchEffect(() => {
      if (props.editData) {
        costingForm.code = props.editData.code;
        costingForm.unit = props.editData.unit;
        costingForm.retePerUnit = props.editData.retePerUnit;
        costingForm.fcProv = props.editData.fcProv;
        costingForm.currency = props.editData.currency;
        costingForm.exRate = props.editData.exRate;
        costingForm.provisionAmount = props.editData.provisionAmount;
        costingForm.vat = props.editData.vat;
        costingForm.description = props.editData.description;
        costingForm.totalVolume = props.editData.totalVolume;
      }
    });
    const rules = computed(() => {
      return {
        code: { required },
        unit: { required },
        retePerUnit: { required },
        fcProv: { required },
        currency: { required },
        exRate: { required },
        provisionAmount: { required },
        vat: { required },
        description: { required },
    
      };
    });
    const v$ = useValidate(rules, costingForm);
    return { costingForm, v$, store };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.editData) {
 
          const updatedArr = await this.state.costing.map((item) =>
            item.id == this.editData.id ? {id:this.editData.id,...this.costingForm} : item
          );
    
          this.state.costing = [...updatedArr];
        } else {
          let newId = uuidv4()
          console.log(newId)
          let newCommmodity = { ...this.costingForm, id:newId };
          this.state.costing = [...this.state.costing, newCommmodity];
        }
        this.toggleNotification();
        this.tooggleFormAction();
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
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
            >
              <div class="h-0 flex-1 overflow-y-auto">
                <div class="bg-gray-100 py-6 px-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <h3
                      class="text-sm font-medium leading-6 text-gray-900 sm:text-lg"
                    >
                      {{
                        editData && editData.id
                          ? "Edit Costing"
                          : "Add Costing"
                      }}
                    </h3>
                    <div class="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        @click="tooggleFormAction"
                        class="rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: outline/x -->
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
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
                <div class="flex flex-1 flex-col justify-between">
                  <div class="divide-y divide-gray-200 px-4 sm:px-6">
                    <div class="space-y-6 pt-6 pb-5">
                      <div>
      <label for="code" class="block text-sm font-medium text-gray-700"
        >Code</label
      >
      <input
        type="text"
        v-model="costingForm.code"
        name="code"
        id="code"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.code.$error" class="font-small text-xs text-red-600">
        {{ v$.code.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="unit" class="block text-sm font-medium text-gray-700"
        >Unit</label
      >
      <input
        type="text"
        v-model="costingForm.unit"
        name="unit"
        id="unit"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.unit.$error" class="font-small text-xs text-red-600">
        {{ v$.unit.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="retePerUnit" class="block text-sm font-medium text-gray-700"
        >Rate / Unit</label
      >
      <input
        type="number"
        v-model="costingForm.retePerUnit"
        name="retePerUnit"
        id="retePerUnit"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span
        v-if="v$.retePerUnit.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v$.retePerUnit.$errors[0].$message }}
      </span>
    </div>

    <div>
      <label for="fcProv" class="block text-sm font-medium text-gray-700">
        FC Provision</label
      >
      <input
        type="number"
        v-model="costingForm.fcProv"
        name="fcProv"
        id="fcProv"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.fcProv.$error" class="font-small text-xs text-red-600">
        {{ v$.fcProv.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="currency" class="block text-sm font-medium text-gray-700"
        >Currency</label
      >
      <input
        type="number"
        v-model="costingForm.currency"
        name="currency"
        id="currency"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.currency.$error" class="font-small text-xs text-red-600">
        {{ v$.currency.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="exRate" class="block text-sm font-medium text-gray-700"
        >Ex Rate</label
      >
      <input
        type="number"
        v-model="costingForm.exRate"
        name="exRate"
        id="exRate"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.exRate.$error" class="font-small text-xs text-red-600">
        {{ v$.exRate.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="provisionAmount" class="block text-sm font-medium text-gray-700"
        >Provision Amount</label
      >
      <input
        type="number"
        v-model="costingForm.provisionAmount"
        name="provisionAmount"
        id="provisionAmount"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.provisionAmount.$error" class="font-small text-xs text-red-600">
        {{ v$.provisionAmount.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="vat" class="block text-sm font-medium text-gray-700"
        >Vat</label
      >
      <input
        type="number"
        v-model="costingForm.vat"
        name="vat"
        id="vat"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.vat.$error" class="font-small text-xs text-red-600">
        {{ v$.vat.$errors[0].$message }}
      </span>
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <input
        type="number"
        v-model="costingForm.description"
        name="description"
        id="description"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span
        v-if="v$.description.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v$.description.$errors[0].$message }}
      </span>
    </div>
 </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
                <button
                  type="button"
                  class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="tooggleFormAction"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="submitForm"
                >
                  {{
                    editData && editData.id ? "Edit Costing" : "Add Costing"
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
