<script>
import { useEmployeesStore } from "~~/store/employees";
import EditContact from "./EditContact.vue";
export default {
  name: "Reference",
  props: ["id", "contact", "contactNo", "countryCode"],
  components: {
    EditContact,
  },
  data() {
    return {
      isEditClicked: false,
      editData: null,
    };
  },
  setup() {
    const employeesStore = useEmployeesStore();
    return { employeesStore };
  },

  methods: {
    async editContactDetails() {
      this.isEditClicked = !this.isEditClicked;
      this.editData = this.contact;
    },
  },
};
</script>

<template>
  <div class="mx-auto mt-6 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
    <EditContact
      v-if="isEditClicked"
      :editData="contact"
      :contactNo="contactNo"
      :closeSidebar="editContactDetails"
      :updateContact="updateContactDetails"
      :id="id"
      :countryCode="countryCode"
    />
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="overflow-hidden bg-white sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <div
          class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
        >
          <div>
            <h2 class="text-md font-medium text-gray-500">Contact Details</h2>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Contact details of employee.
            </p>
          </div>
          <div class="ml-3 flex h-7 items-center">
            <button
              type="button"
              @click="editContactDetails"
              class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="border-gray-200 px-4 py-5 sm:px-6">
        <ul class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <li class="col-span-1 flex rounded-md shadow-sm">
              <div
                class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-green-400 text-sm font-medium text-white"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div
                class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white"
              >
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href="#"
                    class="font-medium text-gray-900 hover:text-gray-600"
                    >Primary Contact</a
                  >
                  <p class="text-gray-500">
                    {{
                      contactNo
                        ? contactNo
                        : contact?.primaryContact
                        ? contact?.primaryContact
                        : "Please add primary contact..."
                    }}
                  </p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Open options</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </div>
          <div class="sm:col-span-1">
            <li class="col-span-1 flex rounded-md shadow-sm">
              <div
                class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-green-400 text-sm font-medium text-white"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div
                class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white"
              >
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href="#"
                    class="font-medium text-gray-900 hover:text-gray-600"
                    >Personal Mail</a
                  >
                  <p class="text-gray-500">
                    {{
                      contact?.personalMail
                        ? contact?.personalMail
                        : "Please add personal mail..."
                    }}
                  </p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Open options</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </div>
          <div class="sm:col-span-1">
            <li class="col-span-1 flex rounded-md shadow-sm">
              <div
                class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-blue-400 text-sm font-medium text-white"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div
                class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white"
              >
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href="#"
                    class="font-medium text-gray-900 hover:text-gray-600"
                    >Secondary Contact</a
                  >
                  <p class="text-gray-500">
                    {{
                      contact?.secondaryContact
                        ? contact?.secondaryContact
                        : "Please add secondary contact..."
                    }}
                  </p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Open options</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </div>
          <div class="sm:col-span-1">
            <li class="col-span-1 flex rounded-md shadow-sm">
              <div
                class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-blue-400 text-sm font-medium text-white"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
              <div
                class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white"
              >
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href="#"
                    class="font-medium text-gray-900 hover:text-gray-600"
                    >Secondary Mail</a
                  >
                  <p class="text-gray-500">
                    {{
                      contact?.secondaryMail
                        ? contact?.secondaryMail
                        : "Please add personal mail..."
                    }}
                  </p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Open options</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
