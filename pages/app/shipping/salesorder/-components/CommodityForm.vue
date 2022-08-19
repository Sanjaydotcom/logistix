<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useCustomerStore } from "@/store/crm/customers";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CommodityForm",
  props: ["id", "tooggleFormAction", "toggleNotification", "editData", "state"],
  setup(props) {
    const store = useCustomerStore();
    const commodityForm = reactive({
      itemCode: "",
      itemDesc: "",
      grossWeight: "",
      weight: "",
      volume: "",
      packages: "",
      hazardous: "",
      tos: "",
      oog: false,
      totalWeight: "",
      totalVolume: "",
    });

    watchEffect(() => {
      if (props.editData) {
        commodityForm.itemCode = props.editData.itemCode;
        commodityForm.itemDesc = props.editData.itemDesc;
        commodityForm.grossWeight = props.editData.grossWeight;
        commodityForm.weight = props.editData.weight;
        commodityForm.volume = props.editData.volume;
        commodityForm.packages = props.editData.packages;
        commodityForm.hazardous = props.editData.hazardous;
        commodityForm.tos = props.editData.tos;
        commodityForm.totalWeight = props.editData.totalWeight;
        commodityForm.totalVolume = props.editData.totalVolume;
      }
    });
    const rules = computed(() => {
      return {
        itemCode: { required },
        itemDesc: { required },
        grossWeight: { required },
        weight: { required },
        volume: { required },
        packages: { required },
        hazardous: { required },
        tos: { required },
        totalWeight: { required },
        totalVolume: { required },
      };
    });
    const v$ = useValidate(rules, commodityForm);
    return { commodityForm, v$, store };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.editData) {
          const updatedArr = await this.state.commodity.map((item) =>
            item.id == this.editData.id
              ? { id: this.editData.id, ...this.commodityForm }
              : item
          );

          this.state.commodity = [...updatedArr];
        } else {
          let newId = uuidv4();
          console.log(newId);
          let newCommmodity = { ...this.commodityForm, id: newId };
          this.state.commodity = [...this.state.commodity, newCommmodity];
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
      <label for="itemCode" class="block text-sm font-medium text-gray-700"
        >Item Code</label
      >
      <input
        type="text"
        v-model="commodityForm.itemCode"
        name="itemCode"
        id="itemCode"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.itemCode.$error" class="font-small text-xs text-red-600">
        {{ v$.itemCode.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="itemDesc" class="block text-sm font-medium text-gray-700"
        >Item Description</label
      >
      <input
        type="text"
        v-model="commodityForm.itemDesc"
        name="itemDesc"
        id="itemDesc"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.itemDesc.$error" class="font-small text-xs text-red-600">
        {{ v$.itemDesc.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="grossWeight" class="block text-sm font-medium text-gray-700"
        >Gross Weight</label
      >
      <input
        type="number"
        v-model="commodityForm.grossWeight"
        name="grossWeight"
        id="grossWeight"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span
        v-if="v$.grossWeight.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v$.grossWeight.$errors[0].$message }}
      </span>
    </div>

    <div class="col-span-6 sm:col-span-2">
      <label for="weight" class="block text-sm font-medium text-gray-700">
        Weight</label
      >
      <input
        type="number"
        v-model="commodityForm.weight"
        name="weight"
        id="weight"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.weight.$error" class="font-small text-xs text-red-600">
        {{ v$.weight.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="volume" class="block text-sm font-medium text-gray-700"
        >Volume</label
      >
      <input
        type="number"
        v-model="commodityForm.volume"
        name="volume"
        id="volume"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.volume.$error" class="font-small text-xs text-red-600">
        {{ v$.volume.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="packages" class="block text-sm font-medium text-gray-700"
        >Packages</label
      >
      <input
        type="number"
        v-model="commodityForm.packages"
        name="packages"
        id="packages"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.packages.$error" class="font-small text-xs text-red-600">
        {{ v$.packages.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="hazardous" class="block text-sm font-medium text-gray-700"
        >Hazardous</label
      >
      <select
        v-model="commodityForm.hazardous"
        id="stackable"
        name="stalable"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <span v-if="v$.hazardous.$error" class="font-small text-xs text-red-600">
        {{ v$.hazardous.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="tos" class="block text-sm font-medium text-gray-700"
        >Tos</label
      >
      <input
        type="number"
        v-model="commodityForm.tos"
        name="tos"
        id="tos"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span v-if="v$.tos.$error" class="font-small text-xs text-red-600">
        {{ v$.tos.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="totalWeight" class="block text-sm font-medium text-gray-700"
        >Total Weight</label
      >
      <input
        type="number"
        v-model="commodityForm.totalWeight"
        name="totalWeight"
        id="totalWeight"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span
        v-if="v$.totalWeight.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v$.totalWeight.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="totalVolume" class="block text-sm font-medium text-gray-700"
        >Total Volume</label
      >
      <input
        type="number"
        v-model="commodityForm.totalVolume"
        name="totalVolume"
        id="totalVolume"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span
        v-if="v$.totalVolume.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v$.totalVolume.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <input
        class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label
        class="form-check-label inline-block text-gray-800"
        for="flexCheckDefault"
      >
        Is OOG
      </label>
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
      {{ editData && editData.id ? "Edit Commodity" : "Add Commodity" }}
    </button>
  </div>
</template>
