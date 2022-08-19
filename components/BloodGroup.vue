<script>
export default {
  name: "BloodGroup",
  props: ["state"],
};
</script>

<template>
  <div>
    <label for="bloodGroup" class="block text-sm font-medium text-gray-700"
      >Blood Group</label
    >
    <select
      v-model="state.bloodGroup"
      id="bloodGroup"
      name="Blood Group"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option>A+ve</option>
      <option>A-ve</option>
      <option>B+ve</option>
      <option>B-ve</option>
      <option>O+ve</option>
      <option>O-ve</option>
      <option>AB+ve</option>
      <option>AB-ve</option>
    </select>
  </div>
</template>
