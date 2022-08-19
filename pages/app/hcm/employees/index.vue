<script lang="ts" setup>
import { useEmployeesStore } from "~~/store/employees";
import Directory from "./-components/Directory.vue";
import { storeToRefs } from "pinia";

const store = useEmployeesStore();
const openMenu = ref(true);
const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};
const { employeesFetchStatus, employeeData } = storeToRefs(store);
onMounted(() => {
  if (!store.employeeData.length) {
    store.fetchEmployeeList();
  }
});
const employees = computed(() => store.employeeData);
definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <div>
    <Head>
      <Title>Employee / Dashboard</Title>
      <link rel="icon" type="image/svg" href="/favicon.svg" />
    </Head>
    <div
      class="h-full w-screen min-w-full flex-1 border-t border-gray-200 xl:flex"
    >
      <Directory
        :openMenu="openMenu"
        :toggleMenu="toggleMenu"
        :employees="employees"
      />
      <section
        class="flex h-full flex-1 flex-col justify-center overflow-hidden xl:order-last"
       >
        <div class="flex h-full items-center justify-center">
          <!-- This example requires Tailwind CSS v2.0+ -->
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              ></path>
            </svg>
            <p class="mt-5 text-sm text-gray-500">
              Select an employee to view profile
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
