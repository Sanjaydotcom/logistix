<script>
import { iso31661 } from "iso-3166";

export default {
  props: ["state", "inputName", "name"],
  setup() {
    onMounted(() => {});
    return {
      iso31661,
    };
  },
};
</script>

<template>
  <div>
    <label :for="inputName" class="block text-sm font-medium text-gray-900">{{
      name
    }}</label>
    <select
      v-model="state[inputName]"
      :name="inputName"
      :id="inputName"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option v-for="country in iso31661" :key="country.name">
        {{ country.name.toUpperCase() }}
      </option>
    </select>
  </div>
</template>
