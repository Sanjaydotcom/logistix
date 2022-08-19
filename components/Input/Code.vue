<script>
export default {
  props: ["state", "inputName", "name", "v"],
};
</script>

<template>
  <div>
    <label :for="inputName" class="block text-sm font-medium text-gray-700">{{
      name
    }}</label>
    <input
      type="text"
      v-model="state[inputName]"
      :name="inputName"
      :id="inputName"
      autocomplete="address-level2"
      class="
        mt-1
        block
        w-full
        rounded-md
        border-gray-300
        shadow-sm
        focus:border-indigo-500 focus:ring-indigo-500
        sm:text-sm
      "
    />
  </div>
</template>
