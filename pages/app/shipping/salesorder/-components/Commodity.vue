<script>
import CommodityForm from "./CommodityForm.vue";
import Notification from "@/components/ui/Notification.vue";
import { useCustomerStore } from "@/store/crm/customers";
import CommodityActions from "./CommodityActions.vue";
import DeleteConfirmationMessage from "~~/components/ui/DeleteConfirmationMessage";

export default {
  name: "Commodity",
  props: ["id", "state", "v"],
  components: {
    CommodityForm,
    Notification,
    DeleteConfirmationMessage,
    CommodityActions,
  },
  data() {
    return {
      showNotification: false,
    };
  },
  setup(props) {
    const store = useCustomerStore();
    const deleteMessageStatus = ref(false);
    const selectedCommodityId = ref(null);
    const editData = ref(null);
    const toogleForm = ref(false);
    const deleteMessagePopUpStatus = ref(false);

    async function toggleDeleteConfirmation() {
      selectedCommodityId.value = null;
      deleteMessageStatus.value = !deleteMessageStatus.value;
    }
    const toggleDeleteMessagePopUp = async (id) => {
      selectedCommodityId.value = await id;
      deleteMessagePopUpStatus.value = !deleteMessagePopUpStatus.value;
    };
    const deleteButtonClick = async () => {
      props.state.commodity = props.state.commodity.filter(
        (item) => item.id != selectedCommodityId.value
      );
      toggleDeleteMessagePopUp();
    };
    const tooggleFormAction = () => {
      toogleForm.value = !toogleForm.value;
      editData.value = null;

    };

    const editButtonClick = async (data) => {
      editData.value = data;
      tooggleFormAction();
    };

    return {
      store,
      editData,
      toogleForm,
      toggleDeleteConfirmation,
      toggleDeleteMessagePopUp,
      editButtonClick,
      deleteMessageStatus,
      selectedCommodityId,
      deleteButtonClick,
      tooggleFormAction,
      deleteMessagePopUpStatus,
    };
  },
  methods: {
    toggleNotification() {
      this.showNotification = !this.showNotification;
    },

  },
};
</script>

<template>
  <div class="mx-auto max-w-5xl py-2">
    <!-- This example req uires Tailwind CSS v2.0+ -->

    <button
      v-if="!state.commodity.length && !toogleForm"
      type="button"
      class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1"
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
        Add Commodity
      </span>
    </button>

    <div class="bg-white pt-2 ">
      <div
        class="-mx-4 mt-4 shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
        v-if="state && state.commodity && state.commodity.length > 0"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Item Code
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Item Description
              </th>

              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Gross Weight
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Weight
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Volume
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Packages
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Total Weight
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Total Volume
              </th>

              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(data, index) in state.commodity" :key="data.id">
              <td
                class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:underline sm:w-auto sm:max-w-none sm:pl-6"
              >
                {{ data.itemCode }}
              </td>

              <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {{ data.itemDesc }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.grossWeight }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.weight }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.volume }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.packages }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.totalWeight }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                {{ data.totalVolume }}
              </td>

              <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <!-- ActionButton -->

                <CommodityActions
                  :data="data"
                  :deleteButtonClick="toggleDeleteMessagePopUp"
                  :editButtonClick="editButtonClick"
                />

                <!-- e -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="ml-4 mt-2 flex justify-end py-2">
      <button
        type="button"
        class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        v-if="state.commodity.length >= 1 && !toogleForm"
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
    <CommodityForm
      v-if="toogleForm"
      :id="id"
      :editData="editData"
      :state="state"
      :tooggleFormAction="tooggleFormAction"
      :toggleNotification="toggleNotification"
    />
    <Notification
      message="Commodity added successfully"
      :toggleNotification="toggleNotification"
      v-if="showNotification"
    />
    <DeleteConfirmationMessage
      v-if="deleteMessagePopUpStatus"
      :deleteFunction="deleteButtonClick"
      :toggleDeleteConfirmation="toggleDeleteConfirmation"
    />
  </div>
</template>
