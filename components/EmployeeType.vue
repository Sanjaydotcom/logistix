<script>
export default {
  props: ["state"],
};
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <label for="employeeType" class="block text-sm font-medium text-gray-700"
      >Employee Type</label
    >
    <select
      v-model="state.employeeType"
      id="employeeType"
      name="Employee Type"
      autocomplete="employeeType"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option>Ful Time</option>
      <option>Part Time</option>
      <option>Remote</option>
      <option>Contract</option>
    </select>
  </div>
</template>
