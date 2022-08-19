<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, numeric, requiredIf } from "@vuelidate/validators";
import { useSalesOrderStore } from "@/store/shipping/salesorder";
import { reactive, computed, watchEffect } from "vue";
import { storeToRefs } from "pinia";
export default {
  props: ["id", "state", "v"],
  setup(props) {
    onMounted(() => {});

    watchEffect(() => {});
    onMounted(() => {});

    return {};
  },
};
</script>

<template>
  <div class="grid grid-cols-6 gap-6 py-2">
    <div class="col-span-6 sm:col-span-2">
      <InputCodesSearchableText
        inputName="cargoBy"
        :state="state"
        name="Cargo by"
        kind="Agent"
      />
      <span v-if="v.cargoBy.$error" class="font-small text-xs text-red-600">
        {{ v.cargoBy.$errors[0].$message }}
      </span>
    </div>

    <div class="col-span-6 sm:col-span-2">
      <label for="jobRefNo" class="block text-sm font-medium text-gray-700"
        >Job Reference No</label
      >
      <input
        type="text"
        name="jobRefNo"
        id="jobRefNo"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.jobRefNo"
      />

      <span v-if="v.jobRefNo.$error" class="font-small text-xs text-red-600">
        {{ v.jobRefNo.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="blRefNo" class="block text-sm font-medium text-gray-700"
        >BL Reference No
      </label>

      <input
        type="text"
        name="blRefNo"
        id="blRefNo"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.blRefNo"
      />

      <span v-if="v.blRefNo.$error" class="font-small text-xs text-red-600">
        {{ v.blRefNo.$errors[0].$message }}
      </span>
    </div>
  </div>
</template>
