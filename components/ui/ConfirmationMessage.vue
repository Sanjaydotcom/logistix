<script>
export default {
  props: ["deleteFunction", "toggleConfirmationModal", "confirmationMsg"],
  setup(props) {
    return {};
  },
};
</script>
<template>
  <div>
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-400 bg-opacity-25 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            p-4
            text-center
            sm:items-center sm:p-0
          "
        >
          <div
            class="
              relative
              transform
              overflow-hidden
              rounded-lg
              bg-white
              px-4
              pt-5
              pb-4
              text-left
              shadow-xl
              transition-all
              sm:my-8 sm:w-full sm:max-w-lg sm:p-6
            "
          >
            <div class="sm:flex sm:items-start">
              <div
                class="
                  mx-auto
                  flex
                  h-12
                  w-12
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-red-100
                  sm:mx-0 sm:h-10 sm:w-10
                "
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Confirmation
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{{ confirmationMsg }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                @click="deleteFunction()"
                type="button"
                class="
                  inline-flex
                  w-full
                  justify-center
                  rounded-md
                  border border-transparent
                  bg-red-600
                  px-4
                  py-2
                  text-base
                  font-medium
                  text-white
                  shadow-sm
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                  focus:ring-offset-2
                  sm:ml-3 sm:w-auto sm:text-sm
                "
              >
                Confirm
              </button>
              <button
                @click="toggleConfirmationModal()"
                type="button"
                class="
                  mt-3
                  inline-flex
                  w-full
                  justify-center
                  rounded-md
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-base
                  font-medium
                  text-gray-700
                  shadow-sm
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  sm:mt-0 sm:w-auto sm:text-sm
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
