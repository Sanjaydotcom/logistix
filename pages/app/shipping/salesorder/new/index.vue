<script>
import useValidate from "@vuelidate/core";
import { required, email, requiredIf } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import BloodGroup from "@/components/BloodGroup.vue";
import { useSalesOrderStore } from "@/store/shipping/salesorder";
import { ref, onMounted, watch } from "vue";
import Vessel from "./-components/Vessel.vue";
import Commodity from "./-components/Commodity.vue";
import Container from "./-components/Container.vue";
import Costing from "./-components/Costing.vue";
import Instruction from "./-components/Instruction.vue";
import Others from "./-components/Others.vue";
definePageMeta({
  layout: "freigtdashboard",
});
export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
    BloodGroup,
    Vessel,
    Commodity,
    Container,
    Costing,
    Instruction,
    Others,
  },
  props: ["id", "editData"],
  setup(props) {
    const router = useRouter();
    const isLoading = ref(false);
    const store = useSalesOrderStore();
    const IsImport = ref(false);
    const activeTab = ref("1");
    const serviceModeTypeId = ref(0);
    const salesOrderState = reactive({
      profile: [],
      id: null,
      showDirectory: false,
      activeTab: "1",
    });
    const state = reactive({
      serviceMode: "",
      serviceType: "",
      incoterms: "",
      frieghtTerms: "",
      originCountry: "",
      destinationCountry: "",
      pol: "",
      pod: "",
      salesman: "",
      pricingCordinator: "",
      originAgent: "",
      destinationAgent: "",
      transhipmentAgent: "",
      // customer: "",
      // customerId:"",
      attentionTo: "",
      shipper: "",
      consignee: "",
      custRefNo: "",
      //vessel
      line: "",
      vessel: "",
      etaDate: "test",
      etdDate: "test",
      voyage: "",
      rotationNo: "",
      //others
      cargoBy: "",
      jobRefNo: "",
      blRefNo: "",
      //instruction
      operations: "",
      documentation: "",
      transport: "",
      warehouse: "",
      siAms: "",
      commodity: [],
      costing: [],
      container: [],
    });
    onMounted(() => {
      if (props.id) {
        const general = props.editData.details;
        console.log(props.editData);
        state.serviceMode = general.serviceMode;
        state.serviceType = general.serviceType;
        state.incoterms = general.incoterms;
        state.frieghtTerms = general.frieghtTerms;
        state.originCountry = general.originCountry;
        state.destinationCountry = general.destinationCountry;
        state.pol = general.pol;
        state.pod = general.pod;
        state.salesman = general.salesman;
        state.pricingCordinator = general.pricingCordinator;
        state.originAgent = general.originAgent;
        state.destinationAgent = general.destinationAgent;
        state.transhipmentAgent = general.transhipmentAgent;
        // state.customer = general.customer;
        // state.customerId = general.customerId;
        state.attentionTo = general.attentionTo;
        state.shipper = general.shipper;
        state.consignee = general.consignee;
        state.custRefNo = general.custRefNo;
        //vessel
        state.line = general.line;
        state.vessel = general.vessel;
        state.etaDate = general.etaDate;
        state.etdDate = general.etdDate;
        state.voyage = general.voyage;
        state.rotationNo = general.rotationNo;
        //others
        state.cargoBy = general.cargoBy;
        state.jobRefNo = general.jobRefNo;
        state.blRefNo = general.blRefNo;
        //instruction
        state.operations = general.operations;
        state.documentation = general.documentation;
        state.transport = general.transport;
        state.warehouse = general.warehouse;
        state.siAms = general.siAms;
        state.commodity = general.commodity;
        state.costing = general.costing;
        state.container = general.container;
      }
    });
    const rules = computed(() => {
      return {
        serviceMode: { required },
        serviceType: { required },
        incoterms: { required },
        frieghtTerms: { required },
        originCountry: { required },
        destinationCountry: { required },
        pol: { required },
        pod: { required },
        salesman: { required },
        pricingCordinator: { required },
        destinationAgent: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },
        originAgent: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },
        transhipmentAgent: {
          required: requiredIf(function () {
            return this.IsImport; // return true if this field is required
          }),
        },

        // customer: { required },
        // customerId: {},
        attentionTo: {},
        shipper: {},
        consignee: {},
        custRefNo: { required },
        porToPol: {},
        polToPod: {},
        podToFpd: {},
        remarks: {},
        //vessel
        line: {},
        vessel: {},
        etaDate: {},
        etdDate: {},
        voyage: {},
        rotationNo: {},
        //others
        cargoBy: {},
        jobRefNo: {},
        blRefNo: {},
        //instruction
        operations: {},
        documentation: {},
        transport: {},
        warehouse: {},
        siAms: {},
        commodity: {},
        container: {},
        costing: {},
      };
    });
    const v$ = useValidate(rules, state);
    const goback = () => {};
    const toggleNotification = () => {
      this.toggleNotification = !this.toggleNotification;
    };
    async function serviceModeOnChange(id) {
      serviceModeTypeId.value = id;
    }
    async function serviceTypeOnChange(event) {
      const selectedMode = event.target.value;
      if (selectedMode == 1 || selectedMode == 3 || selectedMode == 5) {
        IsImport.value = true;
      } else {
        IsImport.value = false;
      }
    }
    return {
      state,
      v$,
      store,
      toggleNotification,
      goback,
      IsImport,
      serviceTypeOnChange,
      rules,
      activeTab,
      serviceModeOnChange,
      isLoading,
      salesOrderState,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.id) {
          this.isLoading = true;
          await this.store.updateGeneralDetails(this.state, this.id);
        } else {
          this.isLoading = true;
          await this.store.addNew(this.state);
        }
        this.isLoading = false;
        this.goback();
      }
    },
  },
};
</script>

<template>
  <div
    class="
      mx-auto
      h-full
      max-w-7xl
      flex-1
      overflow-y-scroll
      border-t border-gray-200
      py-2
      px-4
    "
  >
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="
              text-2xl
              font-bold
              leading-7
              text-gray-800
              sm:text-2xl sm:truncate
            "
          >
            Add New Sales Order
          </h2>
        </div>
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <button
            type="button"
            class="
              inline-flex
              items-center
              px-4
              py-2
              border border-gray-300
              rounded-md
              shadow-sm
              text-sm
              font-medium
              text-gray-700
              bg-white
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Cancel
          </button>
          <button
            type="button"
            class="
              ml-3
              inline-flex
              items-center
              px-4
              py-2
              border border-transparent
              rounded-md
              shadow-sm
              text-sm
              font-medium
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Save
          </button>
        </div>
      </div>
      <div>
        <nav class="sm:hidden" aria-label="Back">
          <a
            href="#"
            class="
              flex
              items-center
              text-sm
              font-medium
              text-gray-500
              hover:text-gray-700
            "
          >
            <!-- Heroicon name: solid/chevron-left -->
            <svg
              class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-4">
            <li>
              <div class="flex">
                <a
                  href="#"
                  class="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >Shipping</a
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <!-- Heroicon name: solid/chevron-right -->
                <svg
                  class="flex-shrink-0 h-5 w-5 text-gray-400"
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
                <a
                  href="#"
                  class="
                    ml-2
                    text-sm
                    font-medium
                    text-gray-500
                    hover:text-gray-700
                  "
                  >Sales Order</a
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <!-- Heroicon name: solid/chevron-right -->
                <svg
                  class="flex-shrink-0 h-5 w-5 text-gray-400"
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
                <a
                  href="#"
                  aria-current="page"
                  class="
                    ml-2
                    text-sm
                    font-medium
                    text-gray-500
                    hover:text-gray-700
                  "
                  >Add</a
                >
              </div>
            </li>
          </ol>
        </nav>
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
          />

          <div class="col-span-6 sm:col-span-2">
            <label
              for="incoterms"
              class="block text-sm font-medium text-gray-700"
              >Inco Terms Scope</label
            >
            <InputCodesDropDown
              :state="state"
              inputName="incoterms"
              kind="IncoTermsScope"
              :v="this.v$"
              id="incoterms"
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
              v-model="state.incoterms"
            />

            <span
              v-if="v$.incoterms.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.incoterms.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label
              for="frieghtTerms"
              class="block text-sm font-medium text-gray-700"
              >Frieght Terms
            </label>

            <InputCodesDropDown
              :state="state"
              inputName="frieghtTerms"
              kind="FreightTerm"
              :v="this.v$"
              id="frieghtTerms"
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
              v-model="state.frieghtTerms"
            />

            <span
              v-if="v$.frieghtTerms.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.frieghtTerms.$errors[0].$message }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-2">
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

          <div class="col-span-6 sm:col-span-2">
            <label for="pol" class="block text-sm font-medium text-gray-700"
              >POL
            </label>
            <InputPortSearchableText
              inputName="pol"
              :state="state"
              :serviceModeTypeId="serviceModeTypeId"
              id="pol"
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
              v-model="state.pol"
            />

            <span v-if="v$.pol.$error" class="font-small text-xs text-red-600">
              {{ v$.pol.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label for="pod" class="block text-sm font-medium text-gray-700"
              >POD
            </label>
            <InputPortSearchableText
              inputName="pod"
              :state="state"
              :serviceModeTypeId="serviceModeTypeId"
              id="pod"
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
              v-model="state.pod"
            />

            <span v-if="v$.pod.$error" class="font-small text-xs text-red-600">
              {{ v$.pod.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label
              for="salesman"
              class="block text-sm font-medium text-gray-700"
              >Salesman
            </label>
            <InputCodesDropDown
              :state="state"
              inputName="salesman"
              kind="Salesman"
              :v="this.v$"
              name="terms"
              id="salesman"
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
              v-model="state.salesman"
            />

            <span
              v-if="v$.salesman.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.salesman.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label
              for="pricingCordinator"
              class="block text-sm font-medium text-gray-700"
              >Pricing Cordinator
            </label>
            <input
              type="text"
              name="terms"
              id="pricingCordinator"
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
              v-model="state.pricingCordinator"
            />

            <span
              v-if="v$.pricingCordinator.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.pricingCordinator.$errors[0].$message }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-2">
            <InputCodesSearchableText
              inputName="originAgent"
              :state="state"
              name="Origin Agent"
              kind="Agent"
            />
            <span
              v-if="v$.originAgent.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.originAgent.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <InputCodesSearchableText
              inputName="destinationAgent"
              :state="state"
              name="Destination Agent"
              kind="Agent"
            />
            <span
              v-if="v$.destinationAgent.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.destinationAgent.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <InputCodesSearchableText
              inputName="transhipmentAgent"
              :state="state"
              name="Transhipment Agent"
              kind="Agent"
            />
            <span
              v-if="v$.transhipmentAgent.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.transhipmentAgent.$errors[0].$message }}
            </span>
          </div>
          <!-- <div class="col-span-6 sm:col-span-3">
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
                    </div> -->
          <div class="col-span-6 sm:col-span-2">
            <label
              for="attentionTo"
              class="block text-sm font-medium text-gray-700"
              >Attention To</label
            >
            <input
              type="text"
              name="terms"
              id="attentionTo"
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
              v-model="state.attentionTo"
            />

            <span
              v-if="v$.attentionTo.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.attentionTo.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label for="shipper" class="block text-sm font-medium text-gray-700"
              >Shipper</label
            >
            <InputCodesDropDown
              :state="state"
              inputName="shipper"
              kind="Shipper"
              :v="this.v$"
              id="shipper"
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
              v-model="state.shipper"
            />

            <span
              v-if="v$.shipper.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.shipper.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label
              for="consignee"
              class="block text-sm font-medium text-gray-700"
              >Consignee
            </label>
            <InputCodesDropDown
              :state="state"
              inputName="consignee"
              kind="Consignee"
              :v="this.v$"
              id="consignee"
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
              v-model="state.consignee"
            />
            <span
              v-if="v$.consignee.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.consignee.$errors[0].$message }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-2">
            <label
              for="custRefNo"
              class="block text-sm font-medium text-gray-700"
              >Customer Ref no</label
            >
            <input
              type="text"
              name="terms"
              id="custRefNo"
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
              v-model="state.custRefNo"
            />

            <span
              v-if="v$.custRefNo.$error"
              class="font-small text-xs text-red-600"
            >
              {{ v$.custRefNo.$errors[0].$message }}
            </span>
          </div>

          <!-- ...charges.. -->
        </div>

        <div class="my-5">
          <div class="border-gray-200">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav class="flex cursor-pointer space-x-4" aria-label="Tabs">
                <!-- Current: "bg-gray-100 text-gray-700", Default: "text-gray-500 hover:text-gray-700" -->
                <a
                  v-on:click="salesOrderState.activeTab = '1'"
                  v-bind:class="[
                    salesOrderState.activeTab === '1'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Vessel</a
                >
                <a
                  v-on:click="salesOrderState.activeTab = '2'"
                  v-bind:class="[
                    salesOrderState.activeTab === '2'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Commodity
                </a>

                <a
                  v-on:click="salesOrderState.activeTab = '3'"
                  v-bind:class="[
                    salesOrderState.activeTab === '3'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Container
                </a>
                <a
                  v-on:click="salesOrderState.activeTab = '4'"
                  v-bind:class="[
                    salesOrderState.activeTab === '4'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Costing
                </a>
                <a
                  v-on:click="salesOrderState.activeTab = '5'"
                  v-bind:class="[
                    salesOrderState.activeTab === '5'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Instruction
                </a>
                <a
                  v-on:click="salesOrderState.activeTab = '6'"
                  v-bind:class="[
                    salesOrderState.activeTab === '6'
                      ? 'border-blue-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Other
                </a>
              </nav>
            </div>
          </div>

          <div v-if="salesOrderState.activeTab === '1'">
            <Vessel :state="state" :v="v$" :id="salesOrderState.id" />
          </div>

          <div v-if="salesOrderState.activeTab === '2'">
            <Commodity :state="state" :v="v$" :id="salesOrderState.id" />
          </div>
          <div v-if="salesOrderState.activeTab === '3'">
            <Container :state="state" :v="v$" :id="salesOrderState.id" />
          </div>
          <div v-if="salesOrderState.activeTab === '4'">
            <Costing :state="state" :v="v$" :id="salesOrderState.id" />
          </div>
          <div v-if="salesOrderState.activeTab === '5'">
            <Instruction :state="state" :v="v$" :id="salesOrderState.id" />
          </div>
          <div v-if="salesOrderState.activeTab === '6'">
            <Others :state="state" :v="v$" :id="salesOrderState.id" />
          </div>
        </div>
      </div>
    </div>

    <Notification
      message=" General Save Successfully"
      :toggleNotification="toggleNotification"
      v-if="showNotification"
    />
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
        @click="goback()"
      >
        Cancel
      </button>
      <LoadingButton
        :text="id ? 'Save' : 'Save'"
        :onPress="submitForm"
        :isLoading="isLoading"
      />
    </div>
  </div>
</template>
