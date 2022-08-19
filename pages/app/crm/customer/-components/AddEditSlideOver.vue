<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  requiredIf,
  numeric,
  maxLength,
  minLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import General from "./General.vue";
import KYC_Details from "./KYC_Details.vue";
import { useCustomerStore } from "@/store/crm/customers";

export default {
  props: ["closeSlider", "id"],

  components: {
    General,
    KYC_Details,
  },
  setup(props) {
    const store = useCustomerStore();
    const customerState = reactive({
      profile: [],
      id: null,
      showDirectory: false,
      activeTab: "1",
    });
    async function removeData() {
      state.firstName = "";
      state.mailID = "";
      state.countryCode = "+91";
      state.primaryContact = "+91 ";
      state.customerType = "NON_CREDIT";
      state.nationality = "";
      state.city = "";
      state.street = "";
      state.zipCode = "";
      state.perAddress = "";
      state.about = "";
      state.businessType = "";
      state.licenseName = "";
      state.licenseNumber = "";
      state.contractNumber = "";
      state.paymentModes = [];
      state.fsInvoicePayment = "";
      state.ddTax = "";
      state.shipmentType = "";
      state.storagePeriod = "";
      state.freeStorageFrom = "";
      state.creditPeriod = "";
      state.creditAmount = "";
      state.creditAmountCode = "";
      state.terms = "";
      state.validity = "";
    }
    const state = reactive({
      firstName: "",
      mailID: "",
      countryCode: "+91",
      primaryContact: "+91 ",
      customerType: "NON_CREDIT",
      nationality: "",
      city: "",
      street: "",
      zipCode: "",
      perAddress: "",
      about: "",
      businessType: "",
      licenseName: "",
      licenseNumber: "",
      contractNumber: "",
      paymentModes: [],
      fsInvoicePayment: "",
      ddTax: "",
      shipmentType: "",
      storagePeriod: "",
      freeStorageFrom: "",
      creditPeriod: "",
      creditAmount: "",
      creditAmountCode: "",
      terms: "",
      validity: "",
      contractDocument: "",
      contractDocumentId: "",
      attachment: "",
      attachmentId: "",
      internalAttachment: "",
      internalAttachmentId: "",
      customerCategory: "",

      contact_Name: "",
      contact_Designation: "",
      contact_Number: "+91 ",
      contact_Email: "",
      contact_NumberCode: "+91",
      contact_Department: "",
      contactList: [
        {
          name: "",
          department: "",
          designation: "",
          email: "",
          number: "",
          countryCode: "+91",
        },
      ],
      creditApproval: {
        request: true,
        approvalRequestDescription: "",
        financeHeadDescription: "",
        depManagerDescription: "",
        depManager: false,
        financeHead: false,
        approvalStatus: false,
        ApprovalStatusDescription: "",
      },
    });
    onMounted(() => {
      removeData();
      if (props.id) {
        editDataFetching();
      }
    });
    async function editDataFetching() {
      const data = await store.getById(props.id);
      state.firstName = await data.value.details.general.firstName;
      state.nationality = await data.value.details.general.nationality;
      state.city = await data.value.details.general.city;
      state.street = await data.value.details.general.street;
      state.zipCode = await data.value.details.general.zipCode;
      state.perAddress = await data.value.details.general.perAddress;
      state.countryCode = await data.value.details.general.countryCode;
      state.primaryContact = await data.value.details.general.primaryContact;
      state.mailID = await data.value.details.general.mailID;
      state.customerType = await data.value.details.general.customerType;
      state.about = await data.value.details.general.about;
      state.contactList = await data.value.details.general.contactDetails;
      state.customerCategory = data.value.details.general.customerCategory;
      //
      if (data.value.details.kyc) {
        state.businessType = await data.value.details.kyc.businessType;
        state.licenseName = await data.value.details.kyc.licenseName;
        state.licenseNumber = await data.value.details.kyc.licenseNumber;
        state.contractNumber = await data.value.details.kyc.contractNumber;
        state.paymentModes = await data.value.details.kyc.paymentModes;
        state.fsInvoicePayment = await data.value.details.kyc.fsInvoicePayment;
        state.ddTax = await data.value.details.kyc.ddTax;
        state.shipmentType = await data.value.details.kyc.shipmentType;
        state.storagePeriod = await data.value.details.kyc.storagePeriod;
        state.freeStorageFrom = await data.value.details.kyc.freeStorageFrom;
        state.creditPeriod = await data.value.details.kyc.creditPeriod;
        state.creditAmount = await data.value.details.kyc.creditAmount;
        state.creditAmountCode = await data.value.details.kyc.creditAmountCode;
        state.terms = await data.value.details.kyc.terms;
        state.validity = await data.value.details.kyc.validity;
        state.contractDocument = await data.value.details.kyc.contractDocument;
        state.contractDocumentId = await data.value.details.kyc
          .contractDocumentId;

        state.attachment = await data.value.details.kyc.attachment;
        state.attachmentId = await data.value.details.kyc.attachmentId;
        state.internalAttachment = await data.value.details.kyc
          .internalAttachment;
        state.internalAttachmentId = await data.value.details.kyc
          .internalAttachmentId;
        state.creditApproval = data.value.details.kyc.creditApproval;
      }
    }
    const rules = computed(() => {
      return {
        firstName: { required },
        nationality: { required },
        city: { required },
        street: {required},
        zipCode: {},
        mailID: { required, email },
        perAddress: {},
        primaryContact: {
          required,

          minLength: minLength(8),
          maxLength: maxLength(12),
        },
        customerType: { required },
        about: {},
        businessType: {
          required: requiredIf(function () {
            return state.customerType != "NON_CREDIT"; // return true if this field is required
          }),
        },
        licenseName: {},
        licenseNumber: {
          required: requiredIf(function () {
            return state.customerType != "NON_CREDIT"; // return true if this field is required
          }),
        },
        contractNumber: {
          required: requiredIf(function () {
            return state.customerType != "NON_CREDIT"; // return true if this field is required
          }),
        },
        paymentModes: {},
        fsInvoicePayment: {},
        ddTax: {},
        shipmentType: {},
        storagePeriod: {},
        freeStorageFrom: {},
        creditPeriod: {},
        creditAmount: {},
        creditAmountCode: {},
        terms: {},
        validity: {
          required: requiredIf(function () {
            return state.customerType != "NON_CREDIT"; // return true if this field is required
          }),
        },
        customerCategory: { required },
      };
    });
    const v$ = useValidate(rules, state);
    async function setActiveTab(id) {
      customerState.activeTab = await id;
    }
    const handleFile = async (e, fileType) => {
      const file = e.target.files[0];
      fileName.value = file.name;
      isFilePresent.value = true;
      noFileSelected.value = false;
      const formData = new FormData();
      formData.append("inputStream", file);
      formData.append("fileName", file.name);
      formData.append("basePath", "attachments");
      formData.append("contentType", "documents");
      formData.append("documentType", "doc");
      fileData.value = formData;
    };
    const removeFile = () => {
      fileData.value = null;
      isFilePresent.value = false;
    };
    const uploadFile = async () => {
      useFileUpload(fileData.value);
    };
    return {
      customerState,
      setActiveTab,
      v$,
      state,
      store,
      handleFile,
      removeFile,
      uploadFile,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (
        this.state.customerType == "TEMPORARY_CREDIT" ||
        this.state.customerType == "CREDIT_CUSTOMERS"
      ) {
        if (this.state.contractNumber == "") {
          this.setActiveTab(2);
          return;
        }
      }

      if (!this.v$.$error) {
        const saveData = {
          details: {
            general: {
              firstName: this.state.firstName,
              mailID: this.state.mailID,
              countryCode: this.state.countryCode,
              primaryContact: this.state.primaryContact,
              customerType: this.state.customerType,
              nationality: this.state.nationality,
              city: this.state.city,
              street: this.state.street,
              zipCode: this.state.zipCode,
              perAddress: this.state.perAddress,
              about: this.state.about,
              contactDetails: this.state.contactList,
              customerCategory: this.state.customerCategory,
            },
            kyc: {
              businessType: this.state.businessType,
              licenseName: this.state.licenseName,
              licenseNumber: this.state.licenseNumber,
              contractNumber: this.state.contractNumber,
              paymentModes: this.state.paymentModes,
              fsInvoicePayment: this.state.fsInvoicePayment,
              ddTax: this.state.ddTax,
              shipmentType: this.state.shipmentType,
              storagePeriod: this.state.storagePeriod,
              freeStorageFrom: this.state.freeStorageFrom,
              creditPeriod: this.state.creditPeriod,
              creditAmount: this.state.creditAmount,
              creditAmountCode: this.state.creditAmountCode,
              terms: this.state.terms,
              validity: this.state.validity,
              contractDocument: this.state.contractDocument,
              contractDocumentId: this.state.contractDocumentId,

              attachment: this.state.attachment,
              attachmentId: this.state.attachmentId,
              internalAttachment: this.state.internalAttachment,
              internalAttachmentId: this.state.internalAttachmentId,
              creditApproval: this.state.creditApproval,
            },
          },
          name: this.state.firstName,
          kind: this.state.customerType,
        };
        if (this.id) {
          this.isLoading = true;
          await this.store.updateCustomer(saveData, this.id);
        } else {
          this.isLoading = true;
          await this.store.addNew(saveData);
        }
        this.isLoading = false;
        this.closeSlider();
      }
    },
  },
};
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-30"
      ></div>
      <div
        class="pointer-events-none fixed inset-y-0 right-0 z-50 flex max-w-full"
      >
        <div class="pointer-events-auto w-screen max-w-4xl">
          <div
            class="
              sm-w-full
              flex
              h-full
              flex-col
              overflow-y-scroll
              bg-white
              shadow-xl
            "
          >
            <div class="bg-gray-100 px-4 sm:px-3">
              <div class="mt-3 flex items-start justify-between">
                <div class="col-span-1 pb-6">
                  <h3
                    class="
                      text-sm
                      font-medium
                      leading-6
                      text-gray-900
                      sm:text-lg
                    "
                  >
                    Add Customer
                  </h3>
                </div>
                <div class="ml-3 flex h-7 items-center">
                  <div
                    class="
                      bottom-0
                      flex-shrink-0
                      border-t border-gray-200
                      px-4
                      py-5
                      sm:px-3
                    "
                  >
                    <div class="flex justify-end space-x-3">
                      <button
                        type="button"
                        @click="closeSlider()"
                        class="
                          rounded-md
                          border border-gray-300
                          bg-white
                          py-2
                          px-4
                          text-sm
                          font-medium
                          text-gray-700
                          shadow-sm
                          hover:bg-gray-50
                          focus:outline-none
                          focus:ring-2
                          focus:ring-indigo-500
                          focus:ring-offset-2
                        "
                      >
                        Cancel
                      </button>
                      <LoadingButton
                        :text="id ? 'Update' : 'Save'"
                        :onPress="submitForm"
                        :isLoading="isLoading"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 sm:mt-2 2xl:mt-5">
              <div class="border-gray-200">
                <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                  <nav class="flex cursor-pointer space-x-4" aria-label="Tabs">
                    <!-- Current: "bg-gray-100 text-gray-700", Default: "text-gray-500 hover:text-gray-700" -->
                    <a
                      v-on:click="setActiveTab(1)"
                      v-bind:class="[
                        customerState.activeTab == '1'
                          ? 'border-blue-600 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                      ]"
                    >
                      General</a
                    >
                    <a
                      v-if="state.customerType != 'NON_CREDIT'"
                      v-on:click="setActiveTab(2)"
                      v-bind:class="[
                        customerState.activeTab == '2'
                          ? 'border-blue-600 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                      ]"
                    >
                      KYC
                    </a>
                  </nav>
                </div>
              </div>
            </div>
            <div v-if="customerState.activeTab == '1'">
              <General :id="customerState.profile?.id" :state="state" :v="v$" />
            </div>
            <div
              v-if="customerState.activeTab == '2'"
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <KYC_Details
                :kyc="customerState?.profile?.details?.kyc"
                :id="customerState.profile?.id"
                :state="state"
                :v="v$"
              />
            </div>
            <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
              <button
                type="button"
                class="
                  rounded-md
                  border border-gray-300
                  bg-white
                  py-2
                  px-4
                  text-sm
                  font-medium
                  text-gray-700
                  shadow-sm
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                "
                @click="closeSlider()"
              >
                Cancel
              </button>
              <LoadingButton
                :text="id ? 'Update' : 'Save'"
                :onPress="submitForm"
                :isLoading="isLoading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
