<script>
import useValidate from "@vuelidate/core";
import { required, email, maxValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import { useTermsStore } from "~~/store/masters/terms";
import { ref, onMounted, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
  },
  props: ["id", "closeSlider", "data"],
  setup(props) {
    const store = useTermsStore();
    const id = props.id;
    const state = reactive({
      country: "",
    });
    onMounted(() => {
      if (props.id && props.editData) {
        state.country = props.editData.country;
      }
    });
    const rules = computed(() => {
      return {
        country: { required },
      };
    });
    const v$ = useValidate(rules, state);
    const goback = () => {
      props.closeSlider();
    };
    const toggleNotification = () => {
      this.toggleNotification = !this.toggleNotification;
    };
    return {
      state,
      id,
      v$,
      store,
      toggleNotification,
      goback,
      rules,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await this.store.addCountry(this.state, this.id);
        this.goback();
      }
    },
  },
};
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
        >
          <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
            >
              <div class="h-0 flex-1 overflow-y-auto">
                <div class="bg-gray-100 py-6 px-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <h3
                      class="text-sm font-medium leading-6 text-gray-900 sm:text-lg"
                    >
                      Country
                    </h3>
                    <div class="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        @click="goback()"
                        class="rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: outline/x -->
                        <svg
                          class="h-6 w-6"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex flex-1 flex-col justify-between">
                  <div class="divide-y divide-gray-200 px-4 sm:px-6">
                    <div class="space-y-6 pt-6 pb-5">
                      <div>
                        <InputNationality
                          inputName="country"
                          :state="state"
                          name="Country"
                        />
                        <span
                          v-if="v$.country.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.country.$errors[0].$message }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
                <button
                  type="button"
                  class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="goback()"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="submitForm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
