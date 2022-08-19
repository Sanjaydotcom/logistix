<script>
import Notification from "@/components/ui/Notification.vue";
import BloodGroup from "@/components/BloodGroup.vue";
import { useCustomerStore } from "@/store/crm/customers";
import { ref, onMounted, watch } from "vue";
import KYC_Approval from "./KYC_Approval.vue";

export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
    BloodGroup,
    KYC_Approval,
  },
  props: ["id", "editData", "state", "v"],
  setup(props) {
    const isLoading = ref(false);
    const isActiveTab = ref(0);
    const store = useCustomerStore();
    const goback = () => {
      props.closeSlider();
    };
    const setActiveTab = (id) => {
      if (isActiveTab.value == id) {
        isActiveTab.value = 0;
      } else {
        isActiveTab.value = id;
      }
    };

    const toggleNotification = () => {
      this.toggleNotification = !this.toggleNotification;
    };
    return {
      store,
      isActiveTab,
      toggleNotification,
      goback,
      isLoading,
      setActiveTab,
    };
  },
  methods: {},
};
</script>
<template>
  <div class="space-y-6 px-3">
    <div class="bg-white px-4 py-2 sm:p-3">
      <div class="md:grid md:grid-cols-2 md:gap-6">
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-2">
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700"
                >Type of Business
              </label>
              <input
                type="text"
                name="FirstName"
                id="firstName"
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
                v-model="state.businessType"
              />
              <span
                v-if="v.businessType.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.businessType.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
                >Trade License Name</label
              >
              <input
                v-model="state.licenseName"
                type="text"
                name="lastName"
                id="lastName"
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
              <span
                v-if="v.licenseName.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.licenseName.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
                >Trade License Number</label
              >
              <input
                v-model="state.licenseNumber"
                type="text"
                name="lastName"
                id="lastName"
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
              <span
                v-if="v.licenseNumber.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.licenseNumber.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
                >Contract number
              </label>
              <input
                v-model="state.contractNumber"
                type="text"
                name="lastName"
                id="lastName"
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
              <span
                v-if="v.contractNumber.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.contractNumber.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="code" class="block text-sm font-medium text-gray-700"
                >Validity</label
              >
              <input
                v-model="state.validity"
                type="date"
                name="city"
                id="city"
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
              <span
                v-if="v.validity.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.validity.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <InputFileUpload
                :state="state"
                inputName="contractDocument"
                inputId="contractDocumentId"
                label="Contract Document"
              />
            </div>
            <div class="col-span-6 sm:col-span-2">
              <InputPaymentModeMultiSelect
                :state="state"
                inputName="paymentModes"
              />
            </div>

            <div class="col-span-6 sm:col-span-6">
              <div
                class="
                  accordion-item
                  col-span-6
                  border-b border-gray-200
                  bg-white
                  sm:col-span-6
                "
              >
                <h2 class="accordion-header mb-0" id="headingTwo">
                  <button
                    class="
                      accordion-button
                      collapsed
                      relative
                      flex
                      w-full
                      items-center
                      rounded-none
                      border-0
                      bg-white
                      py-4
                      px-5
                      text-left text-base
                      font-medium
                      text-gray-700
                      transition
                      focus:outline-none
                    "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    @click="setActiveTab(1)"
                  >
                    <svg
                      v-if="isActiveTab != 1"
                      class="h-5 w-5 pr-1 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-if="isActiveTab == 1"
                      class="h-5 w-5 pr-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                    Payment Terms
                  </button>
                </h2>
              </div>
              <div
                v-if="isActiveTab == 1"
                class="
                  col-span-6
                  block
                  pb-4
                  text-sm
                  font-medium
                  text-gray-700
                  sm:col-span-6
                "
              >
                <div class="grid grid-cols-6 gap-4 pt-5">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      For Freight/Service Invoice Payments</label
                    >
                    <input
                      v-model="state.fsInvoicePayment"
                      type="text"
                      name="blockNumber"
                      id="blockNumber"
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
                    <span
                      v-if="v.fsInvoicePayment.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.fsInvoicePayment.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      For Duty/Deposit/Tax</label
                    >
                    <input
                      v-model="state.ddTax"
                      type="text"
                      name="blockNumber"
                      id="blockNumber"
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
                    <span
                      v-if="v.ddTax.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.ddTax.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <InputCodesDropDown
                      v-model="state.shipmentType"
                      :state="state"
                      inputName="shipmentType"
                      label=" Free Storage Shipment Type"
                      kind="ShipmentType"
                      :v="this.v$"
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
                    <span
                      v-if="v.shipmentType.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.shipmentType.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label
                      for="code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Free Storage Period
                    </label>
                    <input
                      v-model="state.storagePeriod"
                      type="text"
                      name="blockNumber"
                      id="blockNumber"
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
                    <span
                      v-if="v.storagePeriod.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.storagePeriod.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label
                      for="code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Free Storage From
                    </label>
                    <input
                      v-model="state.freeStorageFrom"
                      type="date"
                      name="blockNumber"
                      id="blockNumber"
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
                    <span
                      v-if="v.freeStorageFrom.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.freeStorageFrom.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label
                      for="code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Credit Period
                    </label>
                    <input
                      v-model="state.creditPeriod"
                      type="text"
                      name="blockNumber"
                      id="blockNumber"
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
                    <span
                      v-if="v.creditPeriod.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.creditPeriod.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <InputPriceWithCountryCode
                      v-model="state.creditAmount"
                      label="Credit Amount"
                      :state="this.state"
                      inputPriceName="creditAmount"
                      inputCodeName="creditAmountCode"
                    />
                    <span
                      v-if="v.creditAmount.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.creditAmount.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label
                      for="code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Terms & Conditions
                    </label>
                    <input
                      v-model="state.terms"
                      type="text"
                      name="blockNumber"
                      id="blockNumber"
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
                    <span
                      v-if="v.terms.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v.terms.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <InputFileUpload
                      :state="state"
                      inputName="attachment"
                      inputId="attachmentId"
                      label="Attachment"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <InputFileUpload
                      :state="state"
                      inputName="internalAttachment"
                      inputId="internalAttachmentId"
                      label="Internal Use Attachment"
                    />
                  </div>
                </div>
              </div>
              <!--  -->
              <div
                class="
                  accordion-item
                  col-span-6
                  mt-1
                  border-b border-gray-200
                  bg-white
                  sm:col-span-6
                "
              >
                <h2 class="accordion-header mb-0" id="headingTwo">
                  <button
                    class="
                      accordion-button
                      collapsed
                      relative
                      flex
                      w-full
                      items-center
                      rounded-none
                      border-0
                      bg-white
                      py-4
                      px-5
                      text-left text-base
                      font-medium
                      text-gray-700
                      transition
                      focus:outline-none
                    "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    @click="setActiveTab(2)"
                  >
                    <svg
                      v-if="isActiveTab != 2"
                      class="h-5 w-5 pr-1 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-if="isActiveTab == 2"
                      class="h-5 w-5 pr-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                    Credit Approval
                  </button>
                </h2>
              </div>
              <div
                v-if="isActiveTab == 2"
                class="
                  col-span-6
                  block
                  pb-4
                  text-sm
                  font-medium
                  text-gray-700
                  sm:col-span-6
                "
              >
                <KYC_Approval :state="this.state" />
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <Notification
    message=" General Save Successfully"
    :toggleNotification="toggleNotification"
    v-if="showNotification"
  />
</template>

<style lang="scss" scoped></style>
