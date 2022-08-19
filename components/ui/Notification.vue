<script>
export default {
  name: "Notification",
  props: ["message", "description", "toggleNotification"],
  beforeMount() {
    setTimeout(() => this.toggleNotification(), 1500);
  },
};
</script>

<style lang="scss" scoped></style>
<template>
  <div
    aria-live="assertive"
    class="
      pointer-events-none
      fixed
      inset-0
      flex
      items-end
      px-4
      py-6
      sm:items-start sm:p-6
    "
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <div
        class="
          pointer-events-auto
          w-full
          max-w-sm
          overflow-hidden
          rounded-lg
          bg-white
          shadow-lg
          ring-1 ring-black ring-opacity-5
        "
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <!-- Heroicon name: outline/check-circle -->
              <svg
                class="h-6 w-6 text-green-400"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ this.message }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ this.description ? this.description : "" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
