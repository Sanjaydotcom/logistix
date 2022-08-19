<script>
import { ref } from "vue";
export default {
  props: ["showSalaryModal", "toggleSalaryModal"],
  setup(props) {
    const isModalVisible = props.showSalaryModal;
    const toggleModal = props.toggleSalaryModal;

    return {
      isModalVisible,
      toggleModal,
    };
  },
};
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    v-if="isModalVisible"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      v-if="isModalVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          v-if="isModalVisible"
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
        >
          <div>
            <!-- Allowance table -->

            <div class="px-4 sm:px-6 lg:px-8">
              <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                  <h1 class="text-xl font-medium text-gray-900">
                    Allowance Details
                  </h1>
                  <p class="mt-2 text-sm text-gray-700">
                    View and manage allowance details of employee.
                  </p>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div class="mt-8 flex flex-col">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div
                    class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                  >
                    <div
                      class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                    >
                      <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Role
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                          <tr>
                            <td
                              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                            >
                              Lindsay Walton
                            </td>
                            <td
                              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              Front-end Developer
                            </td>
                            <td
                              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              lindsay.walton@example.com
                            </td>
                            <td
                              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              Member
                            </td>
                          </tr>

                          <!-- More people... -->
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 text-right sm:mt-6">
            <button
              @click="toggleModal"
              type="button"
              class="mt-3 mr-4 inline-flex w-max justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
            >
              Cancel
            </button>
            <button
              @click="submitForm"
              type="button"
              class="mr-8 inline-flex w-max justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
