<script>
export default {
  props: ["state"],
};
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <label for="martialStatus" class="block text-sm font-medium text-gray-700"
      >Marital Status</label
    >
    <select
      v-model="state.martialStatus"
      id="martialStatus"
      name="Marital Status"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option>Single</option>
      <option>Married</option>
    </select>
  </div>
</template>
