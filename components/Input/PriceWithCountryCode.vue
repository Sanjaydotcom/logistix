<script>
export default {
  props: ["state", "inputPriceName", "inputCodeName", "label"],
  setup(props) {
    onMounted(() => {
      if (props.state[props.inputCodeName] == "") {
        props.state[props.inputCodeName] = "AED";
      }
    });
  },
};
</script>
<template>
  <div>
    <label for="price" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        type="text"
        v-model="state[inputPriceName]"
        name="price"
        id="price"
        class="
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          pr-12
          sm:text-sm
          border-gray-300
          rounded-md
        "
        placeholder="0.00"
      />
      <div class="absolute inset-y-0 right-0 flex items-center">
        <label for="currency" class="sr-only">Currency</label>
        <select
          id="currency"
          v-model="state[inputCodeName]"
          name="currency"
          class="
            focus:ring-indigo-500 focus:border-indigo-500
            h-full
            py-0
            pl-2
            pr-7
            border-transparent
            bg-transparent
            text-gray-500
            sm:text-sm
            rounded-md
          "
        >
          <option>INR</option>
          <option>AED</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
</style>