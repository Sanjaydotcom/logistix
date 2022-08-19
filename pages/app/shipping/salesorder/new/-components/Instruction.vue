<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, numeric, requiredIf } from "@vuelidate/validators";
import { useEnquiryStore } from "~~/store/crm/enquiry";
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
    <div class="col-span-6 sm:col-span-3">
      <label for="operations" class="block text-sm font-medium text-gray-700"
        >Operations</label
      >
      <textarea
        id="operations"
        name="operations"
        rows="3"
        class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.operations"
      ></textarea>
      <span v-if="v.operations.$error" class="font-small text-xs text-red-600">
        {{ v.operations.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="vessel" class="block text-sm font-medium text-gray-700"
        >Documentation
      </label>

      <textarea
        id="documentation"
        name="documentation"
        rows="3"
        class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.documentation"
      ></textarea>
      <span
        v-if="v.documentation.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v.documentation.$errors[0].$message }}
      </span>
    </div>

    <div class="col-span-6 sm:col-span-3">
      <label for="pol" class="block text-sm font-medium text-gray-700"
        >Transport
      </label>

      <textarea
        id="transport"
        name="transport"
        rows="3"
        class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.transport"
      ></textarea>
      <span v-if="v.transport.$error" class="font-small text-xs text-red-600">
        {{ v.transport.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="warehouse" class="block text-sm font-medium text-gray-700"
        >Ware house
      </label>

      <textarea
        id="warehouse"
        name="warehouse"
        rows="3"
        class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.warehouse"
      ></textarea>
      <span v-if="v.warehouse.$error" class="font-small text-xs text-red-600">
        {{ v.warehouse.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="siAms" class="block text-sm font-medium text-gray-700"
        >S/I and AMS
      </label>
      <textarea
        id="voyage"
        name="voyage"
        rows="3"
        class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-model="state.voyage"
      ></textarea>

      <span v-if="v.siAms.$error" class="font-small text-xs text-red-600">
        {{ v.siAms.$errors[0].$message }}
      </span>
    </div>

    <!-- ...charges.. -->
  </div>
</template>
