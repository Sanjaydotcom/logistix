<script>
import { useCommonDropDownStore } from "~~/store/commonDropDowns";

export default {
  name: "LinerDropDown",
  props: ["state", "inputName", "label"],
  setup(props) {
    const store = useCommonDropDownStore();
    const dropDownData = ref([]);
    onMounted(() => {
      FetchDropDownData();
    });
    async function FetchDropDownData() {
      dropDownData.value = await store.getLinerList();
    }

    return { dropDownData, FetchDropDownData };
  },
};
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <label for="employeeType" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <select
      v-model="state[inputName]"
      :name="inputName"
      :id="inputName"
      class="
        mt-1
        block
        w-full
        rounded-md
        border border-gray-300
        bg-white
        py-2
        px-3
        shadow-sm
        focus:border-indigo-500 focus:outline-none focus:ring-indigo-500
        sm:text-sm
      "
    >
      <option
        v-for="data in dropDownData.value"
        :value="data.name"
        :key="data.id"
      >
        {{ data.name.toUpperCase() }}
      </option>
    </select>
  </div>
</template>
