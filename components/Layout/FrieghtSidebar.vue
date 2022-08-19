<script>
export default {
  setup() {
    const route = useRoute();
    const isMenuOpen = ref(route.path.includes("/masters") ? true : false);
    const isTermsOpen = ref(
      route.path.includes("/masters/terms") ? true : false
    );
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const toggleTerms = () => {
      isTermsOpen.value = !isTermsOpen.value;
    };

    return {
      isMenuOpen,
      toggleMenu,
      isTermsOpen,
      toggleTerms,
    };
  },
};
</script>

<template>
  <div
    class="bg-themeBackground hidden h-full w-56 overflow-y-auto border-r border-t border-gray-200 pt-5 pb-4 md:flex md:flex-grow md:flex-col"
  >
    <div class="mt-5 flex flex-grow flex-col">
      <nav class="flex-1 space-y-8 px-2" aria-label="Sidebar">
        <div class="space-y-1">
          <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
          <a
            href="/app/shipping"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            :class="[
              $route.path == '/app/shipping'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
              ,
            ]"
          >
            <svg
              class="mr-3 h-6 w-6 flex-shrink-0"
              :class="[
                $route.path == '/app/shipping'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </a>

          <div @click="toggleMenu" class="flex cursor-pointer justify-between">
            <div
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium"
              :class="[
                $route.path.includes('/app/shipping/masters')
                  ? ' text-gray-800'
                  : 'bg-white text-gray-600',
                ,
              ]"
            >
              <svg
                class="mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
              Masters
            </div>
            <div class="flex items-center rounded-md px-2 py-2">
              <div v-if="!isMenuOpen">
                <svg
                  class="h-4 w-4 flex-shrink-0 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>

              <div v-if="isMenuOpen">
                <svg
                  class="h-4 w-4 flex-shrink-0 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <transition
            enter-active-class="duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isMenuOpen"
              class="group ml-2 transform transition ease-in"
            >
              <a
                href="/app/shipping/masters/commodity"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/commodity')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Commodity
              </a>
              <a
                href="/app/shipping/masters/port"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/port')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Port
              </a>
              <a
                href="/app/shipping/masters/liner"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/liner')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Carrier / Liner
              </a>

              <a
                href="/app/shipping/masters/costelement"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/costelement')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Cost Element
              </a>
              <a
                href="/app/shipping/masters/vessel"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/vessel')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Vessel
              </a>
              <a
                href="/app/shipping/masters/terms"
                class="font-regular group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/terms')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Terms
              </a>
              <a
                href="/app/shipping/masters/territory"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/territory')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Territory
              </a>
              <a
                href="/app/shipping/masters/servicetype"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/servicetype')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                <!-- Heroicon name: outline/users -->

                Service Catalogue
              </a>
              <!--
              <a
                href="/app/shipping/masters/codes"
                class="font-regular group flex items-center rounded-md px-2 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                :class="[
                  $route.path.includes('/codes')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-white text-gray-500',
                ]"
              >
                

                Codes
              </a>-->
            </div>
          </transition>
          <a
            href="/app/shipping/enquiry"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            :class="[
              $route.path == '/app/shipping/enquiry'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
              ,
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-3 h-6 w-6 flex-shrink-0"
              :class="[
                $route.path == '/app/shipping/enquiry'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            Enquiry
          </a>
          <a
            href="/app/shipping/pricing"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            :class="[
              $route.path == '/app/shipping/pricing'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
              ,
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-3 h-6 w-6 flex-shrink-0"
              :class="[
                $route.path == '/app/shipping/pricing'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            Pricing
          </a>
          <a
            href="/app/shipping/quotation"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            :class="[
              $route.path == '/app/shipping/quotation'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
              ,
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-3 h-6 w-6 flex-shrink-0"
              :class="[
                $route.path == '/app/shipping/quotation'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>

            Quotation
          </a>

          <a
            href="/app/shipping/salesorder"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            :class="[
              $route.path == '/app/shipping/salesorder'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
              ,
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-3 h-6 w-6 flex-shrink-0"
              :class="[
                $route.path == '/app/shipping/salesorder'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            Sales Order
          </a>
        </div>
        <div class="space-y-1"></div>
      </nav>
    </div>
  </div>
</template>
