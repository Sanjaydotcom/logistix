<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  maxLength,
  minLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import { useEnquiryStore } from "~~/store/crm/enquiry";
import Dimension from "./Dimension.vue";
import AirDimension from "./AirDimension.vue";
export default {
  components: {
    Notification,
    Dimension,
    AirDimension,
},
  props: ["closeSidebar", "id", "editData"],
  setup(props) {
    const store = useEnquiryStore();
    const showNotification = ref(false);
    const showDimension = ref(false);
    const fileData = ref();
    const isFilePresent = ref(false);
    const fileName = ref(null);
    const serviceModeTypeId = ref(0);
    const currentDate = new Date().toISOString().split("T")[0];

    const showFileUpload = ref(false);
    const noFileSelected = ref(
      isFilePresent.value ? isFilePresent.value : null
    );
    const closeSidebar = props.closeSidebar;
    const id = props.id;
    const toggleNotification = () => {
      showNotification.value = !showNotification.value;
    };
    const toggleDimension = () => {
      showDimension.value = !showDimension.value;
    };
    const setDimension = (table, vol, pkg, wgt) => {
      state.dimension = table;
      state.totalVolume = vol;
      state.totalPackages = pkg;
      state.totalWeight = wgt;
    };
    async function getDataById() {
      const EDataById = await store.getEById(props.id);
      isFilePresent.value = true;
      state.fileName = EDataById.value.details.general.fileName;
      state.fileId = EDataById.value.details.general.fileId;
      state.agent = EDataById.value.details.general.agent;
      state.cargoDescription = EDataById.value.details.general.cargoDescription;
      state.commodityType = EDataById.value.details.general.commodityType;
      state.contactEmail = EDataById.value.details.general.contactEmail;
      state.contactName = EDataById.value.details.general.contactName;
      state.contactPhone = EDataById.value.details.general.contactPhone;
      state.countryCode = EDataById.value.details.general.countryCode;
      state.containerType = EDataById.value.details.general.containerType;
      state.customer = EDataById.value.details.general.customer;
      state.destination = EDataById.value.details.general.destination;
      state.dimension = EDataById.value.details.general.dimension;
      state.expectedDate = EDataById.value.details.general.expectedDate;
      state.freightTerm = EDataById.value.details.general.freightTerm;
      state.hsCode = EDataById.value.details.general.hsCode;
      state.incoTerms = EDataById.value.details.general.incoTerms;
      state.oog = EDataById.value.details.general.oog;
      state.origin = EDataById.value.details.general.origin;
      state.remarks = EDataById.value.details.general.remarks;
      state.salesman = EDataById.value.details.general.salesman;
      state.serviceMode = EDataById.value.details.general.serviceMode;
      state.serviceType = EDataById.value.details.general.serviceType;
      state.totalPackages = EDataById.value.details.general.totalPackages;
      state.totalVolume = EDataById.value.details.general.totalVolume;
      state.totalWeight = EDataById.value.details.general.totalWeight;
      state.validityDate = EDataById.value.details.general.validityDate;
      state.customerId = EDataById.value.details.general.customerId;
      showFileUpload.value = true;
    }
    const state = reactive({
      customer: "",
      customerId: "",
      serviceMode: "",
      serviceType: "",
      expectedDate: "",
      validityDate: "",
      origin: "",
      contactName: "",
      contactPhone: "",
      countryCode: "",
      contactEmail: "",
      destination: "",
      cargoDescription: "",
      containerType: "",
      salesman: "",
      agent: "",
      commodityType: "",
      freightTerm: "",
      incoTerms: "",
      hsCode: [],
      totalVolume: "",
      totalWeight: "",
      totalPackages: "",
      oog: "",
      dimension: [],
      remarks: "",
      fileName: "",
      fileId: "",
    });

    const handleFile = async (e) => {
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
    const validateFile = () => {
      !isFilePresent.value ? (noFileSelected.value = true) : false;
    };
    onMounted(() => {
      if (props.id && props.editData) {
        getDataById();
      } else {
        showFileUpload.value = true;
      }
    });
    async function serviceModeOnChange(id) {
      serviceModeTypeId.value = id;
    }
   async function serviceTypeOnChange(id) {
     
    }

    const rules = computed(() => {
      return {
        customer: { required },
        customerId: {},
        serviceMode: { required },
        serviceType: { required },
        expectedDate: { required },
        validityDate: { required },
        origin: { required },
        contactName: { required },
        contactPhone: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(12),
        },
        countryCode:{},
        contactEmail: { required, email },
        destination: { required },
        cargoDescription: { },
        containerType: { },
        salesman: { required },
        agent: { },
        commodityType: { required },
        freightTerm: { },
        incoTerms: { },
        hsCode: { },
        totalVolume: { required },
        totalWeight: { required },
        totalPackages: { required },
        dimension: {},
        remarks: {},
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      id,
      v$,
      store,
      currentDate,
      serviceModeOnChange,
      serviceTypeOnChange,
      serviceModeTypeId,
      showNotification,
      toggleNotification,
      showDimension,
      toggleDimension,
      closeSidebar,
      setDimension,
      isFilePresent,
      noFileSelected,
      handleFile,
      removeFile,
      fileName,
      uploadFile,
      validateFile,
      showFileUpload,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.id) {
          await this.store.updateEnquiry(this.state, this.id);
        } else {
          await this.store.newEnquiry(this.state);
        }
        this.closeSidebar();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
<template>
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div v-if="showDimension && state.serviceMode.name != 'AIR'">
      <Dimension
        :showDimension="showDimension"
        :toggleDimension="toggleDimension"
        :state="state"
        :setDimension="setDimension"
      />
    </div>
    <div v-if="showDimension && state.serviceMode.name == 'AIR'">
      <AirDimension
        :showDimension="showDimension"
        :toggleDimension="toggleDimension"
        :state="state"
        :setDimension="setDimension"
      />
    </div>

    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div class="pointer-events-auto w-screen max-w-3xl">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="bg-gray-100 px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="col-span-1 pb-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      {{ id ? "Edit Enquiry" : "Add Enquiry" }}
                    </h3>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <div
                        class="bottom-0 flex-shrink-0 border-t border-gray-200 py-5"
                    >
                      <div class="flex justify-end space-x-3">
                        <button
                          type="button"
                          @click="closeSidebar"
                          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          @click="submitForm"
                          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          {{ id ? "Update" : "Save" }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex flex-1 flex-col justify-between">
                <div class="px-4 sm:px-6">
                  <div class="grid grid-cols-6 gap-6">
                    <InputServiceTypeServiceModeDependent
                      :state="state"
                      :v="v$"
                      :callBackServiceTypeOnChange="serviceTypeOnChange"
                      :serviceModeChange="serviceModeOnChange"
                    />
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="expectedDate"
                        class="block text-sm font-medium text-gray-700"
                        >Expected Hand Over Date</label
                      >
                      <input
                        type="date"
                        name="expectedDate"
                        :min= "(currentDate)"
                        id="expectedDate"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.expectedDate"
                      />
                      <span
                        v-if="v$.expectedDate.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.expectedDate.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="validityDate"
                        class="block text-sm font-medium text-gray-700"
                        >Enquiry Validity Date</label
                      >
                      <input
                        type="date"
                        name="validityDate"
                        :min= "(currentDate)"
                        id="validityDate"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.validityDate"
                      />

                      <span
                        v-if="v$.validityDate.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.validityDate.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="salesman"
                        label="Salesman"
                        kind="Salesman"
                        :v="this.v$"
                      />

                      <span
                        v-if="v$.salesman.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.salesman.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="agent"
                        label="Agent"
                        kind="Agent"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.agent.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.agent.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                  <div class="text-m pt-5 font-medium text-gray-900">
                    Contact Details
                  </div>
                  <div class="mt-5 grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <InputCustomer
                        :state="state"
                        name="Customer"
                        inputName="customer"
                        inputId="customerId"
                      />
                      <span
                        v-if="v$.customer.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.customer.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="contactName"
                        class="block text-sm font-medium text-gray-700"
                        >Contact Person Name</label
                      >
                      <input
                        type="text"
                        name="contactName"
                        id="contactName"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.contactName"
                      />
                      <span
                        v-if="v$.contactName.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.contactName.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <InputContactWithCountryCode
                        label="Phone"
                        :state="state"
                        textFieldStateName="contactPhone"
                        countryCodeStateName="countryCode"
                      />
                      <span
                        v-if="v$.contactPhone.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.contactPhone.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="contactEmail"
                        class="block text-sm font-medium text-gray-700"
                        >Email
                      </label>
                      <input
                        type="text"
                        name="contactEmail"
                        id="contactEmail"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.contactEmail"
                      />
                      <span
                        v-if="v$.contactEmail.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.contactEmail.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                  <div class="text-m pt-5 font-medium text-gray-900">
                    Movement and Shipment Details
                  </div>

                  <div
                    class="mt-5 grid grid-cols-6 gap-6"
                   
                  >
                    <div class="col-span-6 sm:col-span-3"  >
                      <label
                        for="destination"
                        class="block text-sm font-medium text-gray-700"
                        >Origin</label
                      >
                      <InputPortSearchableText
                        inputName="origin"
                        :state="state"
                        name="Origin"
                        :serviceModeTypeId="serviceModeTypeId"
                      />
                      <span
                        v-if="v$.origin.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.origin.$errors[0].$message }}
                      </span>
                    </div>

                    <div
                     
                      class="col-span-6 sm:col-span-3"
                    >
                      <label
                        for="destination"
                        class="block text-sm font-medium text-gray-700"
                        >Destination</label
                      >
                      <InputPortSearchableText
                        inputName="destination"
                        :state="state"
                        name="destination"
                        :serviceModeTypeId="serviceModeTypeId"
                      />
                      <span
                        v-if="v$.destination.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.destination.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                      <label
                        for="cargoDescription"
                        class="block text-sm font-medium text-gray-700"
                        >Cargo Description</label
                      >
                      <textarea
                        type="text"
                        name="cargoDescription"
                        id="cargoDescription"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.cargoDescription"
                      >
                      </textarea>
                      <span
                        v-if="v$.cargoDescription.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.cargoDescription.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCommoditiesDropDown
                        label="Commodity"
                        :state="this.state"
                        inputName="commodityType"
                      />
                      <span
                        v-if="v$.commodityType.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.commodityType.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="freightTerm"
                        label="Freight Term"
                        kind="FreightTerm"
                        :v="this.v$"
                      />

                      <span
                        v-if="v$.freightTerm.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.freightTerm.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="incoTerms"
                        label="Inco Terms Scope"
                        kind="IncoTermsScope"
                        :v="this.v$"
                      />

                      <span
                        v-if="v$.incoTerms.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.incoTerms.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <InputHsCode
                        :state="state"
                        inputName="hsCode"
                        label="HS Code"
                      />
                      <span
                        v-if="v$.hsCode.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.hsCode.$errors[0].$message }}
                      </span>
                    </div>
                    
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="containerType"
                        label="Container Type"
                        kind="ContainerType"
                        :v="this.v$"
                      />

                      <span
                        v-if="v$.containerType.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.containerType.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                     
                   
                      <button
                        @click="toggleDimension"
                        type="button"
                        class="mt-6 flex  items-center rounded border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                      Add  Dimensions
                        <svg
                          class="ml-2 mt-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    </div>
         <div class="col-span-6 sm:col-span-6 py-4">
                      <div class="grid grid-cols-4 gap-6">
                    <div class="col-span-6 sm:col-span-1">
                      <label
                        for="totalVolume"
                        class="block text-sm font-medium text-gray-700"
                        >Total Volume</label
                      >
                      <input
                        type="number"
                        readonly
                        name="totalVolume"
                        id="totalVolume"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                        v-model="state.totalVolume"
                      />
                      <span
                        v-if="v$.totalVolume.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.totalVolume.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-1">
                      <label
                        for="totalWeight"
                        class="block text-sm font-medium text-gray-700"
                        >Total Weight</label
                      >
                      <input
                        type="number"
                        name="totalWeight"
                        readonly
                        id="totalWeight"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                        v-model="state.totalWeight"
                      />
                      <span
                        v-if="v$.totalWeight.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.totalWeight.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-1">
                      <label
                        for="totalPackages"
                        class="block text-sm font-medium text-gray-700"
                        >Number of Packages</label
                      >
                      <input
                        type="number"
                        readonly
                        name="totalPackages"
                        id="totalPackages"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                        v-model="state.totalPackages"
                      />
                      <span
                        v-if="v$.totalPackages.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.totalPackages.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6   sm:col-span-3">
                      <label
                        class="block px-2 text-sm font-medium text-gray-700"
                        >OOG</label
                      >

                      <select
                        v-model="state.oog"
                        id="OOG"
                        name="OOG"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                 

                    <div v-if="showFileUpload" class="col-span-6 sm:col-span-6">
                      <InputFileUpload
                        :state="state"
                        inputName="fileName"
                        inputId="fileId"
                        label="Documents"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                      <label
                        for="remarks"
                        class="block text-sm font-medium text-gray-700"
                        >Remarks</label
                      >
                      <textarea
                        id="tempAddress"
                        name="tempAddress"
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.remarks"
                      ></textarea>
                      <span
                        v-if="v$.remarks.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.remarks.$errors[0].$message }}
                      </span>
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
              <div
                class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6"
              >
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="closeSidebar"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    @click="submitForm"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {{ id ? "Update" : "Save" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
