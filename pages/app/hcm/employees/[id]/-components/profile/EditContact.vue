<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import { useEmployeesStore } from "~~/store/employees";
export default {
  data() {
    return {
      IsToggleSlider: false,
      showNotification: false,
    };
  },
  props: [
    "closeSidebar",
    "id",
    "updateContact",
    "editData",
    "contactNo",
    "countryCode",
  ],
  created() {
    this.IsToggleSlider = true;
  },
  components: {
    Notification,
  },

  setup(props) {
    const employeesStore = useEmployeesStore();
    const state = reactive({
      primaryContact: "",
      secondaryContact: "",
      secondaryMail: "",
      personalMail: "",
      PrimaryCountryCode: "IN",
      SecondaryCountryCode: "IN",
    });

    const rules = computed(() => {
      return {
        primaryContact: { required },
        secondaryContact: {},
        secondaryMail: { email },
        personalMail: { required, email },
      };
    });

    watchEffect(() => {
      if (props.editData) {
        state.primaryContact = props.contactNo
          ? props.contactNo
          : props.editData.primaryContact;
        state.secondaryContact = props.editData.secondaryContact;
        state.secondaryMail = props.editData.secondaryMail;
        state.personalMail = props.editData.personalMail;
        state.PrimaryCountryCode = props.countryCode;
        state.SecondaryCountryCode = props.editData.SecondaryCountryCode;
      }
    });
    const v$ = useValidate(rules, state);
    return { state, v$, employeesStore };
  },
  methods: {
    IsSliderClosed() {
      this.IsToggleSlider = false;
      this.$router.back();
    },
    async toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    async submitForm() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        await this.employeesStore.updateContactDetails(this.state, this.id);

        this.closeSidebar();
        this.updateContact();
        this.showNotification = true;
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
    <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full"
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
          <div class="pointer-events-auto w-screen sm:max-w-md">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="md:col-span-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Contact Details
                    </h3>
                    <p class="mt-1 text-sm text-gray-500"></p>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      @click="this.closeSidebar"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
              <div class="flex flex-1 flex-col justify-between">
                <div class="divide-y divide-gray-200 px-4 sm:px-6">
                  <div class="space-y-6 pt-6 pb-5">
                    <div>
                      <InputContactWithCountryCode
                        label="Primary Contact"
                        :state="state"
                        textFieldStateName="primaryContact"
                        countryCodeStateName="PrimaryCountryCode"
                      />
                      <span
                        v-if="v$.primaryContact.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.primaryContact.$errors[0].$message }}
                      </span>
                    </div>
                    <div>
                      <InputContactWithCountryCode
                        label="Secondary Contact"
                        :state="state"
                        textFieldStateName="secondaryContact"
                        countryCodeStateName="SecondaryCountryCode"
                      />
                      <span
                        v-if="v$.secondaryContact.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.secondaryContact.$errors[0].$message }}
                      </span>
                    </div>

                    <div>
                      <label
                        for="personalMail"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Personal mail</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div
                          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                          <!-- Heroicon name: solid/mail -->
                          <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                            />
                            <path
                              d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          v-model="state.personalMail"
                          name="personalMail"
                          id="personalMail"
                          class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                      <span
                        v-if="v$.personalMail.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.personalMail.$errors[0].$message }}
                      </span>
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Seconday Mail</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div
                          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                          <!-- Heroicon name: solid/mail -->
                          <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                            />
                            <path
                              d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          v-model="state.secondaryMail"
                          name="secondaryMail"
                          id="secondaryMail"
                          class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="you@example.com"
                        />
                        <span
                          v-if="v$.secondaryMail.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.secondaryMail.$errors[0].$message }}
                        </span>
                      </div>
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
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    @click="submitForm"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
  </div>
</template>
