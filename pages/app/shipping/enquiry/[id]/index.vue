<script lang="ts">
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";

import { useEnquiryStore } from "~~/store/crm/enquiry";
export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
  },
  setup() {
    const store = useEnquiryStore();
    const { params } = useRoute();

    const deleteMessageStatus = ref(false);

    const showEdit = ref(false);
    const editData = ref([]);
    const router = useRouter();

    const state = reactive({
      id: null,
      showData: {},
      general: {},
      serviceMode: {},
      serviceType: {},
    });
    onMounted(() => {
      getDataById(params.id);
    });
    async function getDataById(id) {
      const EDataById = await store.getEById(id);
      state.showData = EDataById.value;
      state.general = state.showData.details.general;
      state.serviceMode = state.general.serviceMode;
      state.serviceType = state.general.serviceType;
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
                  <a href="/app/shipping/enquiry">
                    <button
                      type="button"
                      class="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-1.5 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                    >
                      <!-- Heroicon name: solid/archive -->

                      <span>Back</span>
                    </button>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card -->
      <div class="min-h-0 flex-1 overflow-y-auto px-4 py-2">
        <div class="bg-white border-solid sm:rounded-lg">
          <div
            class="px-4 py-5 sm:px-6"
            style="display: flex; justify-content: space-between"
          >
            <div>
              <h3 class="text-xl font-medium leading-6 text-gray-900">
                Enquiry Details
              </h3>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div class="max-w overflow-hidden rounded-lg lg:border-t lg:border-b sm:border-l sm:border-r border-gray-300 border-solid">
              <dl
                class="mt-10 mb-10 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-2"
              >
                <div class="ml-10 sm:col-span-1">
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
                    <span class="text-gray-500 uppercase">
                      {{ state.serviceType.name }}</span
                    >
                  </dt>
                </div>
                <div class="ml-10 sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Expected hand over date :
                    <span class="text-gray-500">{{
                      state.general.expectedDate
                    }}</span>
                  </dt>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Enquiry Validity date :
                    <span class="text-gray-500">
                      {{ state.general.validityDate }}
                    </span>
                  </dt>
                </div>
                <div class="ml-10 sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Salesman :
                    <span class="text-gray-500">
                      {{ state.general.salesman }}
                    </span>
                  </dt>
                </div>

                <div class="sm:col-span-1">
                  <dt class="text-base font-medium text-gray-700">
                    Agent :
                    <span class="text-gray-500">
                      {{ state.general.agent }}
                    </span>
                  </dt>
                </div>
              </dl>
            </div>

            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 pt-5 sm:grid-cols-2">
              <div class="py-3 pb-8 text-lg font-medium text-gray-700">
                Movement and Shipment Details
              </div>
            </dl>
            <dl
              class="max-w grid grid-cols-3 gap-x-6 gap-y-6 overflow-hidden rounded-lg lg:border-t lg:border-b sm:border-l sm:border-r border-gray-300 sm:grid-cols-2"
            >
              <div class="ml-10 mt-5 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Origin :
                  <span class="text-base text-gray-500">
                    {{ state.showData.origin }}
                  </span>
                </dt>
              </div>
              <div class="mt-5 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Destination :
                  <span class="text-gray-500">
                    {{ state.showData.destination }}
                  </span>
                </dt>
              </div>
              <div class="ml-10 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Cargo Description :
                  <span class="text-gray-500">
                    {{ state.general.cargoDescription }}
                  </span>
                </dt>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Commodity Type :
                  <span class="text-gray-500">
                    {{ state.general.commodityType }}
                  </span>
                </dt>
              </div>
              <div class="ml-10 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Freight Term :
                  <span class="text-gray-500">
                    {{ state.general.freightTerm }}
                  </span>
                </dt>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Inco Terms Scope :
                  <span class="text-gray-500">
                    {{ state.general.incoTerms }}
                  </span>
                </dt>
              </div>
              <div class="ml-10 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  HS Code :
                  <span class="text-gray-500">
                    {{ state.general.hsCode }}
                  </span>
                </dt>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Container Type :
                  <span class="text-gray-500">
                    {{ state.general.containerType}}
                  </span>
                </dt>
              </div>
              <div class="ml-10 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Total Volume :
                  <span class="text-gray-500">
                    {{ state.general.totalVolume }}
                  </span>
                </dt>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Total Weight :
                  <span class="text-gray-500">
                    {{ state.general.totalWeight }}
                  </span>
                </dt>
              </div>
              <div class="ml-10 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Number of Packages :
                  <span class="text-gray-500">
                    {{ state.general.totalPackages }}
                  </span>
                </dt>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  OOG :
                  <span class="text-gray-500 uppercase">
                    {{ state.general.oog == "true" ? "YES" : "NO" }}
                  </span>
                </dt>
              </div>
              <div class="ml-10 mb-5 sm:col-span-2">
                <dt class="text-base font-medium text-gray-700">
                  Remarks :
                  <span class="text-gray-500 uppercase">
                    {{ state.general.remarks }}
                  </span>
                </dt>
              </div>
            </dl>
            <dl class="grid grid-cols-3 gap-x-4 gap-y-8 pt-5 sm:grid-cols-2">
              <div class="py-3 pb-8 text-lg font-medium text-gray-700">
                Contact Details
              </div>
            </dl>
            <dl
              class="max-w grid grid-cols-3 gap-x-4 gap-y-8 overflow-hidden rounded-lg lg:border-t lg:border-b sm:border-l sm:border-r border-gray-300 sm:grid-cols-2"
            >
              <div class="ml-10 mt-5 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Customer :
                  <span class="text-gray-500 uppercase">
                    {{ state.showData.name }}
                  </span>
                </dt>
              </div>
              <div class="mt-5 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Contact Person Name :
                  <span class="text-gray-500 uppercase">
                    {{ state.general.contactName }}
                  </span>
                </dt>
              </div>
              <div class="ml-10 mb-5 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Phone :
                  <span class="text-gray-500">
                    {{ state.general.contactPhone }}
                  </span>
                </dt>
              </div>
              <div class="mb-5 sm:col-span-1">
                <dt class="text-base font-medium text-gray-700">
                  Email :
                  <span class="text-gray-500 uppercase">
                    {{ state.general.contactEmail }}
                  </span>
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <!--card  -->
    </section>
  </div>
</template>
