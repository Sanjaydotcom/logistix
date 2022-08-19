<script>
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/solid";
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/vue/outline";

const actions = [
  {
    icon: UsersIcon,
    name: "Masters",
    href: "/app/shipping/masters/commodity",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    isActive: true,
    content:
      "Manage and Update cost codes, job codes, terms, commodity groups, liners, vessels, customer details etc.",
  },
  {
    icon: BadgeCheckIcon,
    name: "Enquiry",
    href: "/app/shipping/enquiry",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    isActive: true,
    content:
      "Collect Shipment mode, service type, item, origin, destination, and contact details from the customer.",
  },
  {
    icon: ClockIcon,
    name: "Quotation",
    href: "#",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    isActive: false,
    content:
      "Quote, manage and update schedules, price, and terms for the enquiries. Send quotation confirmation email.",
  },
  {
    icon: CashIcon,
    name: "Sales order",
    href: "#",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
    isActive: false,
    content:
      "Update documentation, collection and storage details for confirmed export and import shipments. Share incoming tasks with other departments.",
  },
];

export default {
  components: {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
  },
  setup() {
    return {
      actions,
    };
  },
};
</script>
<template>
  <div>
    <section aria-labelledby="quick-links-title">
      <div
        class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0"
      >
        <h2 class="sr-only" id="quick-links-title">Quick links</h2>
        <div
          v-for="action in actions"
          :key="action.name"
          :class="[
            action.isActive
              ? 'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
              : 'group relative cursor-default bg-gray-100 p-6 text-gray-500',
          ]"
        >
          <div>
            <span
              :class="[
                action.iconBackground,
                action.iconForeground,
                'inline-flex rounded-lg p-3 ring-4 ring-white',
              ]"
            >
              <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div class="mt-8">
            <h3 class="text-lg font-medium">
              <a
                :href="action.href"
                :class="[
                  action.isActive
                    ? 'focus:outline-none'
                    : 'cursor-default focus:outline-none',
                ]"
              >
                <!-- Extend touch target to entire panel -->
                <span class="absolute inset-0" aria-hidden="true" />
                {{ action.name }}
              </a>
            </h3>
            <p class="mt-2 text-sm text-gray-500">
              {{ action.content }}
            </p>
          </div>
          <span
            class="pointer-events-none absolute top-6 right-6"
            :class="[action.isActive ? 'text-gray-400' : 'text-gray-300']"
            aria-hidden="true"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
