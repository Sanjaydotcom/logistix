<script>
import { useCommonDropDownStore } from "~~/store/commonDropDowns";

export default {
  props: [
    "state",
    "v",
    "callBackServiceModeOnChange",
    "callBackServiceTypeOnChange",
    "IsFilter",
    "serviceModeChange",
    "isPricing",
  ],
  setup(props) {
    const store = useCommonDropDownStore();
    const ServiceModeList = ref({});
    const ServiceTypeList = ref({});
    const isPricing = ref(props.isPricing);

    onMounted(() => {
      GetAllServiceModeServiceTypeData();
    });
    async function GetAllServiceModeServiceTypeData() {
      ServiceModeList.value = await store.getServiceModeList();
      ServiceTypeList.value = await store.getServiceTypeData();
    }
    async function serviceModeOnChange(e) {
      props.serviceModeChange(e.id);
      if (isPricing.value) {
        ServiceTypeList.value = await store.getServiceTypeListByModeKind(
          e.id,
          "PricingServiceType"
        );
      } else {
        ServiceTypeList.value = await store.getServiceTypeListByMode(e.id);
      }
      props.callBackServiceModeOnChange
        ? props.callBackServiceModeOnChange(e.id)
        : "";
    }

    return { ServiceModeList, ServiceTypeList, serviceModeOnChange, isPricing };
  },
};
</script>

<template>
  <div :class="[IsFilter ? '' : 'col-span-6 sm:col-span-3']">
    <label for="designation" class="block text-sm font-medium text-gray-700"
      >Service Mode</label
    >
    <select
      v-model="state.serviceMode"
      @change="serviceModeOnChange(state.serviceMode)"
      id="serviceMode"
      name="serviceMode"
      autocomplete="jobLevel"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option disabled value="">Select</option>
      <option
        v-for="data in ServiceModeList.value"
        :key="data.id"
        :value="{ name: data.name, id: data.id }"
      >
        {{ data.name }}
      </option>
    </select>

    <span v-if="v?.serviceMode.$error" class="font-small text-xs text-red-600">
      {{ v?.serviceMode.$errors[0].$message }}
    </span>
  </div>
  <div :class="[IsFilter ? '' : 'col-span-6 sm:col-span-3']">
    <label for="branch" class="block text-sm font-medium text-gray-700"
      >Service Type</label
    >
    <select
      v-model="state.serviceType"
      @change="callBackServiceTypeOnChange(state.serviceType)"
      id="branch"
      name="Branch"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option disabled value="">Select</option>
      <option
        v-for="option in ServiceTypeList.value"
        :key="option.id"
        :value="{ name: option.name, id: option.id }"
      >
        {{ option.name.toUpperCase() }}
      </option>
    </select>
    <span v-if="v?.serviceType.$error" class="font-small text-xs text-red-600">
      {{ v?.serviceType.$errors[0].$message }}
    </span>
  </div>
</template>
