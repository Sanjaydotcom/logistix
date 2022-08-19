<script>
import ContactsForm from "./ContactsForm.vue";
import Notification from "@/components/ui/Notification.vue";
import { useCustomerStore } from "~~/store/crm/customers";
import DeleteConfirmationMessage from "~~/components/ui/DeleteConfirmationMessage";

export default {
  name: "Contacts",
  props: ["id", "contacts"],
  components: {
    ContactsForm,
    Notification,
    DeleteConfirmationMessage,
  },
  data() {
    return {
      toogleForm: false,
      showNotification: false,
      editData: null,
    };
  },
  setup() {
    const store = useCustomerStore();
    const deleteMessageStatus = ref(false);
    const selectedContactsId = ref(null);

    async function toggleDeleteConfirmation(id) {
      selectedContactsId.value = await id;
      deleteMessageStatus.value = !deleteMessageStatus.value;
    }
    return {
      store,
      toggleDeleteConfirmation,
      deleteMessageStatus,
      selectedContactsId,
    };
  },
  methods: {
    async tooggleFormAction() {
      this.toogleForm = !this.toogleForm;
      this.$emit("updateState");
      this.editData = null;
    },
    toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    async editContacts(list) {
      this.toogleForm = !this.toogleForm;
      this.editData = list;
    },
    async deleteArray() {
      this.toggleDeleteConfirmation();
      this.store.deleteContacts(this.id, this.selectedContactsId.value);
    },
  },
};
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white px-4 py-5 sm:px-6">
      <div
        class="
          -ml-4
          -mt-2
          flex flex-wrap
          items-center
          justify-between
          sm:flex-nowrap
        "
      >
        <div class="mt-2">
          <h2 class="text-md font-medium text-gray-500">Contacts</h2>
        </div>
      </div>
    </div>
    <button
      v-if="!contacts.length && !toogleForm"
      type="button"
      class="
        relative
        block
        w-full
        rounded-lg
        border-2 border-dashed border-gray-300
        p-6
        text-center
        hover:border-gray-400
        focus:outline-none
        focus:ring-1
        focus:ring-indigo-500
        focus:ring-offset-1
      "
      @click="tooggleFormAction"
    >
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
        <path
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        ></path>
      </svg>
      <span class="mt-2 block text-sm font-medium text-gray-900">
        Add Contacts
      </span>
    </button>

    <div
      class="overflow-hidden bg-white pt-2 shadow sm:rounded-md"
      v-if="contacts && contacts.length > 0"
    >
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="list in contacts" :key="list.name">
          <a class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div
                class="
                  min-w-0
                  flex-1
                  sm:flex sm:items-center sm:justify-between
                "
              >
                <div class="truncate">
                  <div class="flex text-sm">
                    <p class="truncate font-medium text-indigo-600">
                      {{ list.name }}
                    </p>
                    <p class="ml-1 flex-shrink-0 font-normal text-gray-500"></p>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500">
                      <!-- Heroicon name: solid/calendar -->
                      <svg
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        ></path>
                      </svg>
                      <p>
                        <time datetime="2020-01-07">
                          {{ list.designation }}</time
                        >
                      </p>
                      <p
                        class="
                          mt-2
                          flex
                          items-center
                          text-sm text-gray-500
                          sm:mt-0 sm:ml-6
                        "
                      >
                        <!-- Heroicon name: solid/location-marker -->
                        <svg
                          class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{ list.department }}
                        {{ list.contactNo }}
                        {{ list.emailId }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-5 flex flex-shrink-0">
                <!-- Heroicon name: solid/chevron-right -->
                <div @click="editContacts(list)" class="cursor-pointer px-2">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>

                <div
                  @click="toggleDeleteConfirmation(list.id)"
                  class="cursor-pointer"
                >
                  <span class="sr-only">Delete</span>
                  <!-- Heroicon name: solid/dots-horizontal -->
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="ml-4 mt-2 flex justify-end py-2">
      <button
        type="button"
        class="
          inline-flex
          items-center
          rounded
          border border-gray-300
          bg-white
          px-2.5
          py-1.5
          text-xs
          font-medium
          text-gray-700
          shadow-sm
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
        "
        v-if="contacts.length >= 1 && !toogleForm"
        @click="tooggleFormAction"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add New
      </button>
    </div>
    <ContactsForm
      v-if="toogleForm"
      :id="id"
      :editData="editData"
      :tooggleFormAction="tooggleFormAction"
      :toggleNotification="toggleNotification"
    />
    <Notification
      message="Contacts added successfully"
      :toggleNotification="toggleNotification"
      v-if="showNotification"
    />
    <DeleteConfirmationMessage
      v-if="deleteMessageStatus"
      :deleteFunction="deleteArray"
      :toggleDeleteConfirmation="toggleDeleteConfirmation"
    />
  </div>
</template>
