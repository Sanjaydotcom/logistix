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
import useQuotationStore from "~~/store/shipping/quotation";
import useEnquiryStore from "~~/store/crm/enquiry";
export default {
  components: {
    Notification,
  },
  props: ["closeSidebar", "id", "editData"],
  setup(props) {
    const store = useQuotationStore();
    const enquiryStore = useEnquiryStore();
    const showNotification = ref(false);
    const closeSidebar = props.closeSidebar;
    const id = props.id;
    const toggleNotification = () => {
      showNotification.value = !showNotification.value;
    };
    async function getDataById() {
      const QuotationDataById = await store.getQuotationById(props.id);
      state.serviceMode = QuotationDataById.value.details.general.serviceMode;
      state.serviceType = QuotationDataById.value.details.general.serviceType;
      state.enquiryId = QuotationDataById.value.details.general.enquiryId;
      state.termsOfService =
        QuotationDataById.value.details.general.termsOfService;
      state.customer = QuotationDataById.value.details.general.customer;
      state.contactEmail = QuotationDataById.value.details.general.contactEmail;
      state.contactName = QuotationDataById.value.details.general.contactName;
      state.contactPhone = QuotationDataById.value.details.general.contactPhone;
      state.shipper = QuotationDataById.value.details.general.shipper;
      state.consignee = QuotationDataById.value.details.general.consignee;
      state.salesman = QuotationDataById.value.details.general.salesman;
      state.salesCoordinator =
        QuotationDataById.value.details.general.salesCoordinator;
      state.agent = QuotationDataById.value.details.general.agent;
      state.QTValidityDate =
        QuotationDataById.value.details.general.QTValidityDate;
      state.preCarriageLocation =
        QuotationDataById.value.details.general.preCarriageLocation;
      state.preCarriageCountry =
        QuotationDataById.value.details.general.preCarriageCountry;
      state.originCountry =
        QuotationDataById.value.details.general.originCountry;
      state.originPort = QuotationDataById.value.details.general.originPort;
      state.destinationCountry =
        QuotationDataById.value.details.general.destinationCountry;
      state.destinationPort =
        QuotationDataById.value.details.general.destinationPort;
      state.finalLocation =
        QuotationDataById.value.details.general.finalLocation;
      state.finalCountry = QuotationDataById.value.details.general.finalCountry;
      state.commodityType =
        QuotationDataById.value.details.general.commodityType;
      state.cargoDescription =
        QuotationDataById.value.details.general.cargoDescription;
      state.isOOG = QuotationDataById.value.details.general.isOOG;
      state.freightTerm = QuotationDataById.value.details.general.freightTerm;
      state.incoTermScope =
        QuotationDataById.value.details.general.incoTermScope;
      state.containerType =
        QuotationDataById.value.details.general.containerType;
      state.numberOfContainers =
        QuotationDataById.value.details.general.numberOfContainers;
      state.totalVolume = QuotationDataById.value.details.general.totalVolume;
      state.totalWeight = QuotationDataById.value.details.general.totalWeight;
      state.packages = QuotationDataById.value.details.general.packages;
      state.HSCode = QuotationDataById.value.details.general.HSCode;
      state.referenceNumber =
        QuotationDataById.value.details.general.referenceNumber;
      state.freightTerm = QuotationDataById.value.details.general.freightTerm;
      state.UNCode = QuotationDataById.value.details.general.UNCode;
      state.class = QuotationDataById.value.details.general.class;
    }
    async function getEnquiryDataById() {
      const EnquiryDataById = await enquiryStore.getEById(props.id);
      state.serviceMode = EnquiryDataById.value.details.general.serviceMode;
      state.serviceType = EnquiryDataById.value.details.general.serviceType;
      state.enquiryId = EnquiryDataById.value.id;
      state.termsOfService =
        EnquiryDataById.value.details.general.termsOfService;
      state.customer = EnquiryDataById.value.details.general.customer;
      state.contactEmail = EnquiryDataById.value.details.general.contactEmail;
      state.contactName = EnquiryDataById.value.details.general.contactName;
      state.contactPhone = EnquiryDataById.value.details.general.contactPhone;
      state.shipper = EnquiryDataById.value.details.general.shipper;
      state.consignee = EnquiryDataById.value.details.general.consignee;
      state.salesman = EnquiryDataById.value.details.general.salesman;
      state.salesCoordinator =
        EnquiryDataById.value.details.general.salesCoordinator;
      state.agent = EnquiryDataById.value.details.general.agent;
      state.QTValidityDate =
        EnquiryDataById.value.details.general.QTValidityDate;
      state.preCarriageLocation =
        EnquiryDataById.value.details.general.preCarriageLocation;
      state.preCarriageCountry =
        EnquiryDataById.value.details.general.preCarriageCountry;
      state.originCountry = EnquiryDataById.value.details.general.originCountry;
      state.originPort = EnquiryDataById.value.details.general.originPort;
      state.destinationCountry =
        EnquiryDataById.value.details.general.destinationCountry;
      state.destinationPort =
        EnquiryDataById.value.details.general.destinationPort;
      state.finalLocation = EnquiryDataById.value.details.general.finalLocation;
      state.finalCountry = EnquiryDataById.value.details.general.finalCountry;
      state.commodityType = EnquiryDataById.value.details.general.commodityType;
      state.cargoDescription =
        EnquiryDataById.value.details.general.cargoDescription;
      state.isOOG = EnquiryDataById.value.details.general.isOOG;
      state.freightTerm = EnquiryDataById.value.details.general.freightTerm;
      state.incoTermScope = EnquiryDataById.value.details.general.incoTermScope;
      state.containerType = EnquiryDataById.value.details.general.containerType;
      state.numberOfContainers =
        EnquiryDataById.value.details.general.numberOfContainers;
      state.totalVolume = EnquiryDataById.value.details.general.totalVolume;
      state.totalWeight = EnquiryDataById.value.details.general.totalWeight;
      state.packages = EnquiryDataById.value.details.general.packages;
      state.HSCode = EnquiryDataById.value.details.general.HSCode;
      state.referenceNumber =
        EnquiryDataById.value.details.general.referenceNumber;
      state.freightTerm = EnquiryDataById.value.details.general.freightTerm;
      state.UNCode = EnquiryDataById.value.details.general.UNCode;
      state.class = EnquiryDataById.value.details.general.class;
    }
    const state = reactive({
      serviceMode: "",
      serviceType: "",
      enquiryId: 0,
      termsOfService: "",
      customer: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      shipper: "",
      consignee: "",
      salesman: "",
      salesCoordinator: "",
      agent: "",
      QTValidityDate: "",
      preCarriageLocation: "",
      preCarriageCountry: "",
      originCountry: "",
      originPort: "",
      destinationCountry: "",
      destinationPort: "",
      finalLocation: "",
      finalCountry: "",
      commodityType: "",
      cargoDescription: "",
      isOOG: false,
      freightTerm: "",
      incoTermScope: "",
      containerType: "",
      numberOfContainers: 0,
      totalVolume: "",
      totalWeight: "",
      packages: "",
      HSCode: "",
      referenceNumber: "",
      freightTerm: "",
      UNCode: "",
      class: "",
    });

    onMounted(() => {
      if (props.id && props.editData) {
        getDataById();
      } else if (props.id && props.editData == false) {
        getEnquiryDataById();
      }
    });

    const rules = computed(() => {
      return {
        serviceMode: { required },
        serviceType: { required },
        termsOfService: {},
        customer: { required },
        contactName: { required },
        contactPhone: {
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(12),
        },
        contactEmail: { required, email },
        shipper: {},
        consignee: {},
        salesman: { required },
        salesCoordinator: { required },
        agent: {},
        QTValidityDate: {},
        preCarriageLocation: {},
        preCarriageCountry: {},
        originCountry: {},
        originPort: {},
        destinationCountry: {},
        destinationPort: {},
        finalLocation: {},
        finalCountry: {},
        commodityType: {},
        cargoDescription: {},
        isOOG: false,
        freightTerm: {},
        incoTermScope: {},
        containerType: {},
        numberOfContainers: { numeric },
        totalVolume: {},
        totalWeight: { required },
        packages: {},
        HSCode: {},
        referenceNumber: {},
        freightTerm: {},
        UNCode: {},
        class: {},
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      id,
      v$,
      store,
      showNotification,
      toggleNotification,
      closeSidebar,
      enquiryStore,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();

      if (!this.v$.$error) {
        if (this.id && this.editData) {
          await this.store.updateQuotation(this.state, this.id);
        } else {
          await this.store.newQuotation(this.state);
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
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="
            pointer-events-none
            fixed
            inset-y-0
            right-0
            flex
            max-w-full
            pl-10
          "
        >
          <div class="pointer-events-auto w-screen max-w-2xl">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="md:col-span-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      {{ id && editData ? "Edit Quotation" : "Add Quotation" }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500"></p>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      @click="this.closeSidebar"
                      class="
                        rounded-md
                        bg-white
                        text-gray-400
                        hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:ring-offset-2
                      "
                    >
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: outline/x -->
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex flex-1 flex-col justify-between">
                <div class="px-4 sm:px-6">
                  <div class="grid grid-cols-6 gap-6">
                    <InputServiceTypeServiceModeDependent
                      :state="state"
                      :v="v$"
                    />

                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="termsOfService"
                        label="Terms of Service"
                        kind="termsOfService"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.termsOfService.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.termsOfService.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="shipper"
                        label="Shipper"
                        kind="Shipper"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.shipper.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.shipper.$errors[0].$message }}
                      </span>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="consignee"
                        label="Consignee"
                        kind="Consignee"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.consignee.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.consignee.$errors[0].$message }}
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
                        inputName="salesCoordinator"
                        label="Sales Coordinator"
                        kind="SalesCoordinator"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.salesCoordinator.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.salesCoordinator.$errors[0].$message }}
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
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="validityDate"
                        class="block text-sm font-medium text-gray-700"
                        >Quotation Validity date</label
                      >
                      <input
                        type="date"
                        name="validityDate"
                        id="validityDate"
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
                        v-model="state.QTValidityDate"
                      />

                      <span
                        v-if="v$.QTValidityDate.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.QTValidityDate.$errors[0].$message }}
                      </span>
                    </div>
                  </div>

                  <div class="text-m pt-8 font-medium text-gray-900">
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
                      <label
                        for="contactPhone"
                        class="block text-sm font-medium text-gray-700"
                        >Phone</label
                      >
                      <input
                        type="text"
                        name="contactPhone"
                        id="contactPhone"
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
                        v-model="state.contactPhone"
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
                        >Email</label
                      >
                      <input
                        type="text"
                        name="contactEmail"
                        id="contactEmail"
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

                  <div class="text-m pt-8 font-medium text-gray-900">
                    Movement Details
                  </div>
                  <div class="grid mt-5 grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="preCarriageLocation"
                        label="Precarriage Location"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.preCarriageLocation.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.preCarriageLocation.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="preCarriageCountry"
                        label="Precarriage Country"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.preCarriageCountry.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.preCarriageCountry.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="originCountry"
                        label="Origin Country"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.originCountry.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.originCountry.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="originPort"
                        label="Origin Port"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.originPort.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.originPort.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="destinationCountry"
                        label="Destination Country"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.destinationCountry.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.destinationCountry.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="destinationPort"
                        label="Destination Port"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.destinationPort.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.destinationPort.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="finalLocation"
                        label="Final Destination Location"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.finalLocation.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.finalLocation.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="finalCountry"
                        label="Final Destination country"
                        kind="Country"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.finalCountry.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.finalCountry.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                  <div class="text-m pt-8 font-medium text-gray-900">
                    Shipment Details
                  </div>
                  <div class="grid mt-5 grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="commodityType"
                        label="Commodity Type"
                        kind="CommodityType"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.commodityType.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.commodityType.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="cargoDescription"
                        class="block text-sm font-medium text-gray-700"
                        >Cargo Description</label
                      >
                      <input
                        type="text"
                        name="cargoDescription"
                        id="cargoDescription"
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
                        v-model="state.cargoDescription"
                      />
                      <span
                        v-if="v$.cargoDescription.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.cargoDescription.$errors[0].$message }}
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
                        inputName="incoTermScope"
                        label="Incoterm Scope"
                        kind="IncoTermsScope"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.incoTermScope.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.incoTermScope.$errors[0].$message }}
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
                      <label
                        for="numberOfContainers"
                        class="block text-sm font-medium text-gray-700"
                        >Number of Containers</label
                      >
                      <input
                        type="number"
                        name="numberOfContainers"
                        id="numberOfContainers"
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
                        v-model="state.numberOfContainers"
                      />
                      <span
                        v-if="v$.numberOfContainers.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.numberOfContainers.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="totalVolume"
                        class="block text-sm font-medium text-gray-700"
                        >Total Volume</label
                      >
                      <input
                        type="text"
                        name="totalVolume"
                        id="totalVolume"
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
                        v-model="state.totalVolume"
                      />
                      <span
                        v-if="v$.totalVolume.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.totalVolume.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="totalWeight"
                        class="block text-sm font-medium text-gray-700"
                        >Total Weight</label
                      >
                      <input
                        type="text"
                        name="totalWeight"
                        id="totalWeight"
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
                        v-model="state.totalWeight"
                      />
                      <span
                        v-if="v$.totalWeight.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.totalWeight.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="packages"
                        class="block text-sm font-medium text-gray-700"
                        >Packages</label
                      >
                      <input
                        type="text"
                        name="packages"
                        id="packages"
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
                        v-model="state.packages"
                      />
                      <span
                        v-if="v$.packages.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.packages.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="HSCode"
                        class="block text-sm font-medium text-gray-700"
                        >HS Code</label
                      >
                      <input
                        type="text"
                        name="HSCode"
                        id="HSCode"
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
                        v-model="state.HSCode"
                      />
                      <span
                        v-if="v$.HSCode.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.HSCode.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="referenceNumber"
                        class="block text-sm font-medium text-gray-700"
                        >Reference Number</label
                      >
                      <input
                        type="text"
                        name="referenceNumber"
                        id="referenceNumber"
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
                        v-model="state.referenceNumber"
                      />
                      <span
                        v-if="v$.referenceNumber.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.referenceNumber.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                  <div class="text-m pt-8 font-medium text-gray-900">IMDG</div>
                  <div class="grid mt-5 mb-5 grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="UNCode"
                        class="block text-sm font-medium text-gray-700"
                        >UN Code</label
                      >
                      <input
                        type="text"
                        name="UNCode"
                        id="UNCode"
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
                        v-model="state.UNCode"
                      />
                      <span
                        v-if="v$.UNCode.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.UNCode.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label
                        for="class"
                        class="block text-sm font-medium text-gray-700"
                        >Class</label
                      >
                      <input
                        type="text"
                        name="class"
                        id="class"
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
                        v-model="state.class"
                      />
                      <span
                        v-if="v$.class.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.class.$errors[0].$message }}
                      </span>
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
                  <button
                    type="submit"
                    @click="submitForm"
                    class="
                      inline-flex
                      justify-center
                      rounded-md
                      border border-transparent
                      bg-indigo-600
                      py-2
                      px-4
                      text-sm
                      font-medium
                      text-white
                      shadow-sm
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      focus:ring-offset-2
                    "
                  >
                    {{ id && editData ? "Update" : "Save" }}
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
