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
         code: "dsdsd",
          description: "dsdsd",
          unit: "dss",
          retePerUnit: "3",
          fcProv: "2332",
          currency: "33",
          exRate: "33",
          provisionAmount: "33",
          // oog:false,   checkbox
          vat: "33",
 
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
  <div class="grid grid-cols-6 gap-6">
    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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

    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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
    <div class="col-span-6 sm:col-span-2">
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

  <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
    <button
      type="button"
       @click="tooggleFormAction"
      class="mr-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancel
    </button>
    <button
      type="submit"
      class="justify-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      @click="submitForm"
    >
     {{editData&&editData.id?"Edit Costing": "Add Costing"}}
    </button>
  </div>
</template>
