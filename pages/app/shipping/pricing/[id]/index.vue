<script lang="ts">
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import usePriceStore from "~~/store/shipping/price";
import { URL } from "@/composables/api/index";
export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
  },
  setup() {
    const store = usePriceStore();
    const { params } = useRoute();
    const deleteMessageStatus = ref(false);

    const showEdit = ref(false);
    const editData = ref([]);
    const router = useRouter();

    const state = reactive({
      id: null,
      showData: {},
      details: {},
      serviceMode: {},
      serviceType: {},
    });
    onMounted(() => {
      getDataById(params.id);
    });
    async function getDataById(id) {
      const DataById = await store.getById(id);
      state.showData = DataById.value;
      state.details = state.showData.details;
      state.serviceMode = state.details.serviceMode;
      state.serviceType = state.details.serviceType;
    }

    const goBack = () => {
      router.back();
    };

    return {
      state,
      goBack,
      URL,
    };
  },
};
definePageMeta({
  layout: "freigtdashboard",
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
                    class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-1.5 py-1 text-base font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
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
                Pricing Details
              </h3>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div
              class="max-w overflow-hidden rounded-lg border-solid border-gray-300 sm:border-l sm:border-r lg:border-t lg:border-b"
            >
              <dl
                class="ml-5 grid grid-cols-3 gap-x-4 gap-y-8 pt-5 pb-5 sm:grid-cols-2"
              >
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Service Mode :
                    <span class="text-gray-500">
                      {{ state.serviceMode.name }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Service Type :
                    <span class="text-gray-500">
                      {{ state.serviceType.name }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Port of loading :
                    <span class="text-gray-500">
                      {{ state.details.loadingPort }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Port of Discharge :
                    <span class="text-gray-500">
                      {{ state.details.dischargingPort }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Carrier :
                    <span class="text-gray-500">
                      {{ state.details.carrier }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Origin Country :
                    <span class="text-gray-500">
                      {{ state.details.originCountry }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Destination Country :
                    <span class="text-gray-500">
                      {{ state.details.destinationCountry }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Final Place of delivery :
                    <span class="text-gray-500">
                      {{ state.details.deliveryPlace }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Booking Agent :
                    <span class="text-gray-500">
                      {{ state.details.bookingAgent }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Quote terms :
                    <span class="text-gray-500">
                      {{ state.details.terms }}</span
                    >
                  </dt>
                </div>
              </dl>
            </div>
            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 pt-5 sm:grid-cols-2">
              <div class="py-3 pb-8 text-lg font-medium text-gray-700">
                Charges
              </div>
            </dl>
            <div
              class="max-w mb-10 overflow-hidden rounded-lg border-solid border-gray-300 sm:border-l sm:border-r lg:border-t lg:border-b"
            >
              <dl
                class="ml-5 grid grid-cols-3 gap-x-4 gap-y-8 pt-5 pb-5 sm:grid-cols-2"
              >
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Total Freight 20'GP :
                    <span class="text-gray-500">
                      {{ state.details.frightCharge20gp }}
                      {{ state.details.frightCharge20gpCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Total Freight 40'GP :
                    <span class="text-gray-500">
                      {{ state.details.frightCharge40gp }}
                      {{ state.details.frightCharge40gpCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Total Freight 40'HC :
                    <span class="text-gray-500">
                      {{ state.details.frightCharge40hc }}
                      {{ state.details.frightCharge40hcCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Surcharges pr BL :
                    <span class="text-gray-500">
                      {{ state.details.surcharge }}
                      {{ state.details.surchargeCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    POR to POL :
                    <span class="text-gray-500">
                      {{ state.details.porToPol }}
                      {{ state.details.porToPolCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    POL to POD :
                    <span class="text-gray-500">
                      {{ state.details.polToPod }}
                      {{ state.details.polToPodCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    POD to FPD :
                    <span class="text-gray-500">
                      {{ state.details.podToFpd }}
                      {{ state.details.podToFpdCurrencyCode }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Commodity :
                    <span class="text-gray-500">
                      {{ state.details.commodity }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Validity :
                    <span class="text-gray-500">
                      {{ state.details.validity }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Transit Time :
                    <span class="text-gray-500">
                      {{ state.details.transitTime }}</span
                    >
                  </dt>
                </div>
              </dl>
            </div>
            <div
              class="max-w overflow-hidden rounded-lg border-solid border-gray-300 sm:border-l sm:border-r lg:border-t lg:border-b"
            >
              <dl
                class="ml-5 grid grid-cols-3 gap-x-4 gap-y-8 pt-5 pb-5 sm:grid-cols-2"
              >
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Contract Number :
                    <span class="text-gray-500">
                      {{ state.details.contractNumber }}</span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Contract Document :
                    <span class="text-gray-500">
                      {{ state.details.fileName }}
                      <a
                        :href="`${URL.Document.SHOW}/${state.details.fileId}`"
                        target="blank"
                        class="mr-2 ml-1 truncate pt-2 text-sm font-medium text-gray-900"
                        ><button
                          class="bg-gray-400 hover:bg-gray-600 text-white text-s font-bold py-1 px-2 rounded-full "
                        >View</button></a
                      ></span
                    >
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Remarks :
                    <span class="text-gray-500">
                      {{ state.details.remarks }}</span
                    >
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <!--card  -->
    </section>
  </div>
</template>
