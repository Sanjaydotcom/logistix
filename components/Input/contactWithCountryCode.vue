<script>
export default {
  name: "contactWithCountryCode",
  props: ["label", "textFieldStateName", "state", "countryCodeStateName"],
  setup(props) {
    const countryCode = [
      { name: "IN", id: "+91" },
      { name: "US", id: "+1" },
      { name: "AU", id: "+61" },
      { name: "AE", id: "+971" },
      { name: "QA", id: "+974" },
      { name: "KW", id: "+965" },
    ];
    const countryCodeSelectionChanged = (data) => {
      props.state[props.textFieldStateName] = data.target.value;
    };

    return { countryCode, countryCodeSelectionChanged };
  },
};
</script>

<template>
  <div>
    <label
      for="secondaryContact"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >

    <div class="relative mt-1 rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 flex items-center">
        <label for="primaryContact-country" class="sr-only">Country</label>
        <select
          v-model="state[countryCodeStateName]"
          @change="countryCodeSelectionChanged"
          id="primaryContact-country"
          name="primaryContact-country"
          autocomplete="primaryContact-country"
          class="
            h-full
            rounded-md
            border-transparent
            bg-transparent
            py-0
            pl-3
            pr-7
            text-gray-500
            focus:border-indigo-500 focus:ring-indigo-500
            sm:text-sm
          "
        >
          <option v-for="data in countryCode" :value="data.id" :key="data.id">
            {{ data.name }}
          </option>
        </select>
      </div>
      <input
        type="text"
        v-model="state[textFieldStateName]"
        name="primaryContact"
        id="primaryContact"
        class="
          block
          w-full
          rounded-md
          border-gray-300
          pl-16
          focus:border-indigo-500 focus:ring-indigo-500
          sm:text-sm
        "
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
