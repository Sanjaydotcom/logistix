<script>
import { useEmployeesStore } from "~~/store/employees";

export default {
  props: ["state", "inputName", "name"],
  setup() {
    const employeeList = ref(true);

    const store = useEmployeesStore();
    employeeList.value = store.employeeData;

    return {
      employeeList,
    };
  },
};
</script>

<template>
  <div>
    <label :for="inputName" class="block text-sm font-medium text-gray-700">{{
      name
    }}</label>
    <select
      v-model="state[inputName]"
      :name="inputName"
      :id="inputName"
      :autocomplete="inputName"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option v-for="emp in employeeList" :key="emp.name">
        {{ emp.name }}
      </option>
    </select>
  </div>
</template>
