<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
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
      <label for="incoterms" class="block text-sm font-medium text-gray-700"
        >Line</label
      >
      <input
        type="text"
        name="terms"
        id="line"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.line"
      />

      <span v-if="v.line.$error" class="font-small text-xs text-red-600">
        {{ v.line.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="vessel" class="block text-sm font-medium text-gray-700"
        >Vessel
      </label>

      <input
        type="text"
        name="terms"
        id="frieghtTerms"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.vessel"
      />

      <span v-if="v.vessel.$error" class="font-small text-xs text-red-600">
        {{ v.vessel.$errors[0].$message }}
      </span>
    </div>

    <div class="col-span-6 sm:col-span-2">
      <label for="pol" class="block text-sm font-medium text-gray-700"
        >ETA Date
      </label>
      <input
        type="date"
        name="terms"
        id="etaDate"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.etaDate"
      />

      <span v-if="v.etaDate.$error" class="font-small text-xs text-red-600">
        {{ v.etaDate.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="pod" class="block text-sm font-medium text-gray-700"
        >ETD Date
      </label>
      <input
        type="date"
        name="terms"
        id="etdDate"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.etdDate"
      />

      <span v-if="v.etdDate.$error" class="font-small text-xs text-red-600">
        {{ v.etdDate.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="salesman" class="block text-sm font-medium text-gray-700"
        >Voyage
      </label>
      <input
        type="text"
        name="terms"
        id="voyage"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.voyage"
      />

      <span v-if="v.voyage.$error" class="font-small text-xs text-red-600">
        {{ v.voyage.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label
        for="pricingCordinator"
        class="block text-sm font-medium text-gray-700"
        >Rotation Number
      </label>
      <input
        type="text"
        name="terms"
        id="rotationNo"
        autocomplete="address-level2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.rotationNo"
      />

      <span v-if="v.rotationNo.$error" class="font-small text-xs text-red-600">
        {{ v.rotationNo.$errors[0].$message }}
      </span>
    </div>

    <!-- ...charges.. -->
  </div>
</template>
