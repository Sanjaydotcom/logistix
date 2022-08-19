<script lang="ts">
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";

import { useQuotationStore } from "~~/store/shipping/quotation";
export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
  },
  setup() {
    const store = useQuotationStore();
    const { params } = useRoute();

    const deleteMessageStatus = ref(false);

    const showEdit = ref(false);
    const editData = ref([]);
    const router = useRouter();

    const state = reactive({
      id: null,
      showData: {},
      general: {},
    });
    onMounted(() => {
      getDataById(params.id);
    });
    async function getDataById(id) {
      const QuotationDataById = await store.getQuotationById(id);
      state.showData = QuotationDataById.value;
      state.general = QuotationDataById.value.details;
    }

    const goBack = () => {
      router.back();
    };

    return {
      state,

      goBack,
    };
  },
};
definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <div class="min-w-0 flex-1 border-t border-gray-200 xl:flex">
    <section
      aria-labelledby="message-heading"
      class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
    >
      <!-- Top section -->
      <div class="flex-shrink-0 border-b border-gray-200 bg-white">
        <!-- Toolbar-->
        <div class="flex h-16 flex-col justify-center">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between py-3">
              <!-- Left buttons -->
              <div class="flex">
                <span class="hidden space-x-3 pr-3 lg:flex">
                  <button
                    type="button"
                    class="
                      relative
                      -ml-px
                      hidden
                      items-center
                      rounded-md
                      border border-gray-300
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-gray-900
                      hover:bg-gray-50
                      focus:z-10
                      focus:border-blue-600
                      focus:outline-none
                      focus:ring-1
                      focus:ring-blue-600
                      sm:inline-flex
                    "
                    @click="goBack"
                  >
                    <!-- Heroicon name: solid/archive -->

                    <span>Back</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card -->
      <div class="min-h-0 flex-1 overflow-y-auto px-4 py-2">
        <div class="bg-white shadow sm:rounded-lg">
          <div
            class="px-4 py-5 sm:px-6"
            style="display: flex; justify-content: space-between"
          >
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Quotation Details
              </h3>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Service Mode</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.serviceMode }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Service Type</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.serviceType }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Salesman</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.salesman }}
                </dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Agent</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.agent }}
                </dd>
              </div>
            </dl>
            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="text-m font-small py-3 text-gray-600">
                Contact Details
              </div>
            </dl>
            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Customer</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.customer }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Contact Person Name
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.contactName }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Phone</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.contactPhone }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.contactEmail }}
                </dd>
              </div>
            </dl>
            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="text-m font-small py-3 text-gray-600">
                Movement and Shipment Details
              </div>
            </dl>
            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Precarriage Location
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.preCarriageLocation }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Precarriage Country
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.preCarriageCountry }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Origin Country
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.originCountry }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Origin Port</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.originPort }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Destination Country
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.destinationCountry }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Destination Port
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.destinationPort }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Final Destination Location
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.finalLocation }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Final Destination country
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.showData.finalCountry }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Cargo Description
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.cargoDescription }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Commodity Type
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.commodityType }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Freight Term</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.freightTerm }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Inco Terms Scope
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.incoTermScope }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">HS Code</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.hsCode }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Container Type
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.containerType }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Total Volume</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.totalVolume }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Total Weight</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.totalWeight }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Number of Packages
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ state.general.totalPackages }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <!--card  -->
    </section>
  </div>
</template>
