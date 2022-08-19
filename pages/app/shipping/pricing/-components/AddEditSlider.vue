<script>
import useValidate from "@vuelidate/core";
import { required, email, requiredIf, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import { usePriceStore } from "~~/store/shipping/price";
export default {
  data() {
    return {
      IsToggleSlider: false,
      showNotification: false,
    };
  },
  props: ["closeSidebar", "id", "updateContact"],
  created() {
    this.IsToggleSlider = true;
  },
  components: {
    Notification,
  },
  setup(props) {
    const IsImport = ref(false);
    const currentDate = new Date().toISOString().split("T")[0];
    const serviceModeTypeId = ref(0);
    const IsOtherCharges = ref(false);
    const store = usePriceStore();
    const fileData = ref();
    const isFilePresent = ref(false);
    const dropDownData = ref([]);
    const noFileSelected = ref(
      isFilePresent.value ? isFilePresent.value : null
    );
    const fileName = ref(null);
    onMounted(() => {
      removeData();
      if (props.id) {
        getDataById();
      }
    });
    async function getDataById() {
      const priceDataById = await store.getById(props.id);
      fileName.value = priceDataById.value.details.fileName;
      isFilePresent.value = true;
      state.fileName = await priceDataById.value.details.fileName;
      state.fileId = await priceDataById.value.details.fileId;
      state.serviceMode = await priceDataById.value.details.serviceMode;
      state.serviceType = await priceDataById.value.details.serviceType;
      state.dischargingPort = await priceDataById.value.details.dischargingPort;
      state.loadingPort = await priceDataById.value.details.loadingPort;
      state.receiptPort = await priceDataById.value.details.receiptPort;
      state.destinationCountry = await priceDataById.value.details
        .destinationCountry;
      state.originCountry = await priceDataById.value.details.originCountry;
      state.deliveryPlace = await priceDataById.value.details.deliveryPlace;
      state.bookingAgent = await priceDataById.value.details.bookingAgent;
      state.terms = await priceDataById.value.details.terms;
      state.carrier = await priceDataById.value.details.carrier;
      state.commodity = await priceDataById.value.details.commodity;
      state.surcharge = await priceDataById.value.details.surcharge;
      state.transitTime = await priceDataById.value.details.transitTime;
      state.contractNumber = await priceDataById.value.details.contractNumber;
      state.portToPort = await priceDataById.value.details.portToPort;
      state.remarks = await priceDataById.value.details.remarks;
      state.validity = await priceDataById.value.details.validity;
      state.WRS = await priceDataById.value.details.WRS;
      state.BRAF = await priceDataById.value.details.BRAF;
      state.ISPS = await priceDataById.value.details.ISPS;
      state.CSF = await priceDataById.value.details.CSF;
      state.SCS = await priceDataById.value.details.SCS;
      state.DG = await priceDataById.value.details.DG;

      state.porToPol = await priceDataById.value.details.porToPol;
      state.polToPod = await priceDataById.value.details.polToPod;
      state.podToFpd = await priceDataById.value.details.podToFpd;
      state.podToFpdCurrencyCode = await priceDataById.value.details
        .podToFpdCurrencyCode;
      state.polToPodCurrencyCode = await priceDataById.value.details
        .polToPodCurrencyCode;
      state.porToPolCurrencyCode = await priceDataById.value.details
        .porToPolCurrencyCode;
      state.surchargeCurrencyCode = await priceDataById.value.details
        .surchargeCurrencyCode;
      state.frightCharge40hc = await priceDataById.value.details
        .frightCharge40hc;
      state.frightCharge40hcCurrencyCode = await priceDataById.value.details
        .frightCharge40hcCurrencyCode;
      state.frightCharge40gp = await priceDataById.value.details
        .frightCharge40gp;
      state.frightCharge40gpCurrencyCode = await priceDataById.value.details
        .frightCharge40gpCurrencyCode;
      state.frightCharge20gp = await priceDataById.value.details
        .frightCharge20gp;
      state.frightCharge20gpCurrencyCode = await priceDataById.value.details
        .frightCharge20gpCurrencyCode;
      if (state.WRS || state.ISPS || state.CSF || state.SCS || state.DG) {
        //If Other Charges Occurs
        IsOtherCharges.value = false;
      }
    }
    function removeData() {
      state.fileName = "";
      state.fileId = "";
      state.serviceMode = "";
      state.serviceType = "";
      state.dischargingPort = "";
      state.loadingPort = "";
      state.receiptPort = "";
      state.destinationCountry = "";
      state.originCountry = "";
      state.deliveryPlace = "";
      state.bookingAgent = "";
      state.terms = "";
      state.carrier = "";
      state.equipmentType = "";
      state.commodity = "";
      state.frightCharge40hc = "";
      state.frightCharge40gp = "";
      state.frightCharge20gp = "";
      state.surcharge = "";
      state.transitTime = "";
      state.contractNumber = "";
      state.portToPort = "";
      state.remarks = "";
      state.validity = "";
      state.WRS = "";
      state.BRAF = "";
      state.ISPS = "";
      state.CSF = "";
      state.SCS = "";
      state.DG = "";
    }
    const state = reactive({
      fileName: "",
      fileId: "",
      serviceMode: "",
      serviceType: "",
      dischargingPort: "",
      loadingPort: "",
      receiptPort: "",
      destinationCountry: "",
      originCountry: "",
      deliveryPlace: "",
      bookingAgent: "",
      terms: "",
      carrier: 0,
      equipmentType: "",
      commodity: "",
      transitTime: "",
      contractNumber: "",
      porToPol: "",
      polToPod: "",
      podToFpd: "",
      remarks: "",
      validity: "",
      WRS: "",
      BRAF: "",
      ISPS: "",
      CSF: "",
      SCS: "",
      DG: "",
      podToFpdCurrencyCode: "",
      polToPodCurrencyCode: "",
      porToPolCurrencyCode: "",
      surchargeCurrencyCode: "",
      frightCharge40hc: "",
      frightCharge40hcCurrencyCode: "",
      frightCharge40gp: "",
      frightCharge40gpCurrencyCode: "",
      frightCharge20gp: "",
      frightCharge20gpCurrencyCode: "",
    });
    const rules = computed(() => {
      return {
        serviceMode: { required },
        serviceType: { required },
        dischargingPort: { required },
        loadingPort: { required },
        receiptPort: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },
        originCountry: { required },
        destinationCountry: { required },
        carrier: { required },
        deliveryPlace: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },
        bookingAgent: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },
        terms: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },
        commodity: { required },
        frightCharge40hc: { numeric },
        frightCharge40gp: { numeric },
        frightCharge20gp: { numeric },
        surcharge: { numeric },
        transitTime: {},
        contractNumber: { numeric },
        validity: { required },
        porToPol: { numeric },
        polToPod: { numeric },
        podToFpd: { numeric },
        remarks: {},
      };
    });

    async function serviceModeOnChange(id) {
      serviceModeTypeId.value = id;
    }
    async function serviceTypeOnChange(event) {
      const selectedMode = event.id;
      if (selectedMode == 1 || selectedMode == 3 || selectedMode == 5) {
        IsImport.value = true;
      } else {
        IsImport.value = false;
      }
    }

    async function OtherChargesClick(event) {
      IsOtherCharges.value = false;
    }
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
      fileName.value = null;
    };
    const uploadFile = async () => {
      useFileUpload(fileData.value);
    };
    const validateFile = () => {
      !isFilePresent.value ? (noFileSelected.value = true) : false;
    };
    watchEffect(() => {});
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
      store,
      IsImport,
      currentDate,
      serviceTypeOnChange,
      IsOtherCharges,
      OtherChargesClick,
      props,
      handleFile,
      uploadFile,
      isFilePresent,
      removeFile,
      fileName,
      noFileSelected,
      validateFile,
      dropDownData,
      serviceModeOnChange,
      serviceModeTypeId,
    };
  },
  methods: {
    IsSliderClosed() {
      this.IsToggleSlider = false;
    },
    async toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    async submitForm() {
      this.v$.$validate(); // checks all inputs
      this.IsSliderClosed();
      // this.showNotification = true;
      if (!this.v$.$error) {
        // const fileId = await this.uploadFile();
        // this.state["fileId"] = fileId;
        // this.state["fileName"] = this.fileName;
        const SavedData = {
          details: { ...this.state },
          organizationId: 1,
          code: this.state.remarks,
          name: this.state.remarks,
          country: this.state.destinationCountry,
          containerType: this.state.equipmentType,
          serviceMode: this.state.serviceMode.id,
          serviceType: this.state.serviceType.id,
          carrier: this.state.carrier,
          origin: this.state.originCountry,
          destination: this.state.destinationCountry,
        };
        if (this.props.id) {
          await this.store.update(SavedData, this.props.id);
        } else {
          await this.store.addNew(SavedData);
        }
        this.props.closeSidebar();
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
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div class="pointer-events-auto w-screen max-w-4xl">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="bg-gray-100 px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="col-span-1 pb-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      {{ id ? "Edit Pricing" : "Add Pricing" }}
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
                <div class="divide-y divide-gray-200 px-4 sm:px-6">
                  <div class="grid grid-cols-6 gap-6">
                    <InputServiceTypeServiceModeDependent
                      :state="state"
                      :v="v$"
                      :callBackServiceTypeOnChange="serviceTypeOnChange"
                      :serviceModeChange="serviceModeOnChange"
                      isPricing="true"
                    />
                    <div
                      :class="[
                        IsImport
                          ? 'col-span-6 sm:col-span-2'
                          : 'col-span-6 sm:col-span-3',
                      ]"
                    >
                      <InputPortSearchableText
                        inputName="loadingPort"
                        :state="state"
                        label="Port of Loading"
                        :serviceModeTypeId="serviceModeTypeId"
                      />
                      <span
                        v-if="v$.loadingPort.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.loadingPort.$errors[0].$message }}
                      </span>
                    </div>
                    <div
                      :class="[
                        IsImport
                          ? 'col-span-6 sm:col-span-2'
                          : 'col-span-6 sm:col-span-3',
                      ]"
                    >
                      <InputPortSearchableText
                        inputName="dischargingPort"
                        :state="state"
                        label="Port of Discharge"
                        :serviceModeTypeId="serviceModeTypeId"
                      />
                      <span
                        v-if="v$.dischargingPort.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.dischargingPort.$errors[0].$message }}
                      </span>
                    </div>
                    <div
                      v-if="IsImport || state.receiptPort"
                      :class="[
                        IsImport
                          ? 'col-span-6 sm:col-span-2'
                          : 'col-span-6 sm:col-span-3',
                      ]"
                    >
                      <InputPortSearchableText
                        inputName="receiptPort"
                        :state="state"
                        label="Port of Receipt"
                        :serviceModeTypeId="serviceModeTypeId"
                      />
                      <span
                        v-if="v$.receiptPort.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.receiptPort.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputLinerDropDown
                        label="Carrier"
                        :state="this.state"
                        inputName="carrier"
                      />

                      <span
                        v-if="v$.carrier.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.carrier.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputSearchableSelect
                        inputName="originCountry"
                        :state="state"
                        name="Origin Country"
                      />
                      <span
                        v-if="v$.originCountry.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.originCountry.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <InputSearchableSelect
                        inputName="destinationCountry"
                        :state="state"
                        name="Destination Country"
                      />
                      <span
                        v-if="v$.destinationCountry.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.destinationCountry.$errors[0].$message }}
                      </span>
                    </div>
                    <div v-if="IsImport || state.deliveryPlace" class="col-span-6 sm:col-span-2">
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-700"
                        >Final Place of Delivery</label
                      >
                      <input
                        type="text"
                        name="deliveryPlace"
                        id="deliveryPlace"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.deliveryPlace"
                      />

                      <span
                        v-if="v$.deliveryPlace.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.deliveryPlace.$errors[0].$message }}
                      </span>
                    </div>
                    <div v-if="IsImport || state.bookingAgent" class="col-span-6 sm:col-span-2">
                      <InputCodesSearchableText
                        inputName="bookingAgent"
                        :state="state"
                        name="Booking Agent"
                        kind="Agent"
                      />
                      <span
                        v-if="v$.bookingAgent.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.bookingAgent.$errors[0].$message }}
                      </span>
                    </div>
                    <div v-if="IsImport || state.terms" class="col-span-12 sm:col-span-6">
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-700"
                        >Quote terms</label
                      >
                      <textarea
                        id="terms"
                        name="terms"
                        rows="3"
                        class="block w-full max-w-7xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.terms"
                      ></textarea>

                      <span
                        v-if="v$.terms.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.terms.$errors[0].$message }}
                      </span>
                    </div>
                    <!-- ...charges.. -->
                    <div
                      class="text-m col-span-6 pt-3 font-bold text-gray-800 sm:col-span-6"
                    >
                      Charges
                    </div>

                    <!-- charges -->
                    <div class="col-span-6 sm:col-span-6">
                      <div class="grid grid-cols-4 gap-5">
                        <div v-if="!IsImport" class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="Total Freight 20'GP"
                            :state="this.state"
                            inputPriceName="frightCharge20gp"
                            inputCodeName="frightCharge20gpCurrencyCode"
                          />
                          <span
                            v-if="v$.frightCharge20gp.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.frightCharge20gp.$errors[0].$message }}
                          </span>
                        </div>
                        <div v-if="!IsImport" class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="Total Freight 40'GP"
                            :state="this.state"
                            inputPriceName="frightCharge40gp"
                            inputCodeName="frightCharge40gpCurrencyCode"
                          />
                          <span
                            v-if="v$.frightCharge40gp.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.frightCharge40gp.$errors[0].$message }}
                          </span>
                        </div>
                        <div v-if="!IsImport" class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="Total Freight 40'HC"
                            :state="this.state"
                            inputPriceName="frightCharge40hc"
                            inputCodeName="frightCharge40hcCurrencyCode"
                          />
                          <span
                            v-if="v$.frightCharge40hc.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.frightCharge40hc.$errors[0].$message }}
                          </span>
                        </div>
                        <div class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="Surcharges pr BL"
                            :state="this.state"
                            inputPriceName="surcharge"
                            inputCodeName="surchargeCurrencyCode"
                          />
                          <span
                            v-if="v$.surcharge.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.surcharge.$errors[0].$message }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                      <div class="grid grid-cols-3 gap-4">
                        <div v-if="IsImport" class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="POR to POL"
                            :state="this.state"
                            inputPriceName="porToPol"
                            inputCodeName="porToPolCurrencyCode"
                          />
                          <span
                            v-if="v$.porToPol.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.porToPol.$errors[0].$message }}
                          </span>
                        </div>
                        <div v-if="IsImport" class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="POL to POD"
                            :state="this.state"
                            inputPriceName="polToPod"
                            inputCodeName="polToPodCurrencyCode"
                          />
                          <span
                            v-if="v$.polToPod.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.polToPod.$errors[0].$message }}
                          </span>
                        </div>
                        <div v-if="IsImport" class="col-span-6 sm:col-span-1">
                          <InputPriceWithCountryCode
                            label="POD to FPD"
                            :state="this.state"
                            inputPriceName="podToFpd"
                            inputCodeName="podToFpdCurrencyCode"
                          />

                          <span
                            v-if="v$.podToFpd.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.podToFpd.$errors[0].$message }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- charges -->
                    <div class="col-span-6 sm:col-span-2">
                      <!-- <InputCommoditiesDropDown
                        label="Commodity"
                        :state="this.state"
                        inputName="commodity"
                      /> -->
                      <InputCodesDropDown
                        :state="this.state"
                        inputName="commodity"
                        label="Price Commodity"
                        kind="Pricecommodity"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.commodity.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.commodity.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="Validity"
                        class="block text-sm font-medium text-gray-700"
                        >Validity</label
                      >
                      <input
                        type="date"
                        name="Validity"
                        id="kind"
                        :min="currentDate"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.validity"
                      />

                      <span
                        v-if="v$.validity.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.validity.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-700"
                        >Transit Time</label
                      >
                      <input
                        type="text"
                        name="validityDate"
                        id="kind"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.transitTime"
                      />

                      <span
                        v-if="v$.transitTime.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.transitTime.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-6"></div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-700"
                        >Contract Number</label
                      >
                      <input
                        type="text"
                        name="validityDate"
                        id="kind"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.contractNumber"
                      />

                      <span
                        v-if="v$.contractNumber.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.contractNumber.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputFileUpload
                        :state="state"
                        inputName="fileName"
                        inputId="fileId"
                        label="Contract Document"
                      />
                    </div>

                    <div class="col-span-12 sm:col-span-6">
                      <label
                        for="joiningDate"
                        class="block text-sm font-medium text-gray-700"
                        >Remarks</label
                      >
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        class="block w-full max-w-7xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.remarks"
                      ></textarea>

                      <span
                        v-if="v$.remarks.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.remarks.$errors[0].$message }}
                      </span>
                    </div>
                    <div
                      v-if="IsOtherCharges"
                      class="text-m col-span-6 pt-3 font-bold text-gray-800 sm:col-span-6"
                      @click="OtherChargesClick"
                      style="cursor: pointer"
                    >
                      Other Charges
                    </div>
                    <div class="col-span-6 sm:col-span-6">
                      <div v-if="IsOtherCharges" class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-1">
                          <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >WRS</label
                          >
                          <input
                            type="text"
                            v-model="state.WRS"
                            name="validityDate"
                            id="kind"
                            autocomplete="address-level2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-1">
                          <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >BRAF</label
                          >
                          <input
                            type="text"
                            v-model="state.BRAF"
                            name="validityDate"
                            id="kind"
                            autocomplete="address-level2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-1">
                          <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >ISPS</label
                          >
                          <input
                            v-model="state.ISPS"
                            type="text"
                            name="validityDate"
                            id="kind"
                            autocomplete="address-level2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-1">
                          <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >CSF</label
                          >
                          <input
                            type="text"
                            v-model="state.CSF"
                            name="validityDate"
                            id="kind"
                            autocomplete="address-level2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-1">
                          <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >SCS</label
                          >
                          <input
                            v-model="state.SCS"
                            type="text"
                            name="validityDate"
                            id="kind"
                            autocomplete="address-level2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 mb-5 sm:col-span-1">
                          <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >DG Surcharge</label
                          >
                          <input
                            v-model="state.DG"
                            type="text"
                            name="validityDate"
                            id="kind"
                            autocomplete="address-level2"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />

                          <span
                            v-if="v$.validity.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.validity.$errors[0].$message }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- ------------- -->
                  </div>
                </div>
              </div>

              <Notification
                message=" Price Save Successfully"
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
