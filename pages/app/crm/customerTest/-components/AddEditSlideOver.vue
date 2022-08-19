<script>
import useValidate from "@vuelidate/core";
import { required, email, maxValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import BloodGroup from "@/components/BloodGroup.vue";
import { useCustomerStore } from "@/store/crm/customers";
import { ref, onMounted, watch } from "vue";
export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
    BloodGroup,
  },
  props: ["id", "editData", "closeSlider"],
  setup(props) {
    const router = useRouter();
    const isLoading = ref(false);
    const store = useCustomerStore();
    const state = reactive({
      customerName: "",

      nationality: "",
      city: "",
      pinCode: "",
      tempAddress: "",
      perAddress: "",
      countryCode: "+91",
      primaryContact: "+91 ",
      mailID: "",
      customerType: "",
      roadNumber: "",
      blockNumber: "",
      about: "",
    });
    onMounted(() => {
      if (props.id) {
        const general = store.getProfileGeneralDetails();
        state.customerName = general.customerName;

        state.nationality = general.nationality;
        state.city = general.city;
        state.pinCode = general.pinCode;
        state.tempAddress = general.tempAddress;
        state.perAddress = general.perAddress;
        state.countryCode = general.countryCode;
        state.primaryContact = general.primaryContact;
        state.mailID = general.mailID;
        state.customerType = general.customerType;
        state.roadNumber = general.roadNumber;
        state.blockNumber = general.blockNumber;
        state.about = general.about;
      }
    });
    const rules = computed(() => {
      return {
        customerName: { required },

        nationality: { required },
        city: { required },
        pinCode: { required },
        mailID: { required, email },
        tempAddress: { required },
        perAddress: { required },
        primaryContact: { required },
        customerType: { required },
        roadNumber: { required },
        blockNumber: { required },
        about: { required },
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
      v$,
      store,
      toggleNotification,
      goback,
      rules,
      isLoading,
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
  <div class="absolute inset-0 overflow-hidden">
    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
      <div class="pointer-events-auto w-screen max-w-3xl">
        <div
          class="sm-w-full flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
        >
          <div class="bg-gray-100 px-4 sm:px-6">
            <div class="mt-5 flex items-start justify-between">
              <div class="col-span-1 pb-6">
                <h3
                  class="text-sm font-medium leading-6 text-gray-900 sm:text-lg"
                >
                  Add Customer
                </h3>
              </div>
              <div class="ml-3 flex h-7 items-center">
                <div
                  class="bottom-0 flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-3"
                >
                  <div class="flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeSlider()"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <LoadingButton
                      :text="id ? 'Save' : 'Create'"
                      :onPress="submitForm"
                      :isLoading="isLoading"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative mt-6 flex-1 px-4 sm:px-6">
            <!-- Replace with your content -->

            <div class="space-y-6">
              <div class="bg-white px-4 py-2 sm:p-6">
                <div class="md:grid md:grid-cols-2 md:gap-6">
                  <div class="mt-5 md:col-span-2 md:mt-0">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="customerName"
                          class="block text-sm font-medium text-gray-700"
                          >Customer name
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          id="customerName"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          v-model="state.customerName"
                        />
                        <span
                          v-if="v$.customerName.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.customerName.$errors[0].$message }}
                        </span>
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="email"
                          class="block text-sm font-medium text-gray-700"
                          >Email Id</label
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
                            v-model="state.mailID"
                            name="mailID"
                            id="mailID"
                            class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                        <span
                          v-if="v$.mailID.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.mailID.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <InputContactWithCountryCode
                          label="Mobile Number"
                          :state="state"
                          textFieldStateName="primaryContact"
                          countryCodeStateName="countryCode"
                        />
                        <span
                          v-if="v$.primaryContact.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.primaryContact.$errors[0].$message }}
                        </span>
                      </div>

                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="lastName"
                          class="block text-sm font-medium text-gray-700"
                          >Customer Type</label
                        >
                        <select
                          v-model="state.customerType"
                          id="customerType"
                          name="Customer Type"
                          autocomplete="country-name"
                          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>NON_CREDIT</option>
                          <option>CREDIT_CUSTOMERS</option>
                          <option>TEMPORARY_CREDIT</option>
                        </select>
                        <!-- <InputCodesDropDown
                          :state="state"
                          inputName="customerType"
                          label="CustomerT ype"
                          kind="CustomerType"
                          :v="this.v$"
                        /> -->
                        <span
                          v-if="v$.customerType.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.customerType.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <InputSearchableSelect
                          inputName="nationality"
                          :state="state"
                          name="Nationality"
                        />
                        <span
                          v-if="v$.nationality.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.nationality.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="code"
                          class="block text-sm font-medium text-gray-700"
                          >City</label
                        >
                        <input
                          v-model="state.city"
                          type="text"
                          name="city"
                          id="city"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span
                          v-if="v$.city.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.city.$errors[0].$message }}
                        </span>
                      </div>

                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="code"
                          class="block text-sm font-medium text-gray-700"
                          >Road Number</label
                        >
                        <input
                          v-model="state.roadNumber"
                          type="text"
                          name="roadNumber"
                          id="roadNumber"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span
                          v-if="v$.roadNumber.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.roadNumber.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="code"
                          class="block text-sm font-medium text-gray-700"
                          >Block Number</label
                        >
                        <input
                          v-model="state.blockNumber"
                          type="text"
                          name="blockNumber"
                          id="blockNumber"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span
                          v-if="v$.blockNumber.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.blockNumber.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <label
                          for="code"
                          class="block text-sm font-medium text-gray-700"
                          >Pin Code</label
                        >
                        <input
                          v-model="state.pinCode"
                          type="text"
                          name="pinCode"
                          id="pinCode"
                          autocomplete="address-level2"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span
                          v-if="v$.pinCode.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.pinCode.$errors[0].$message }}
                        </span>
                      </div>

                      <!--  -->
                    </div>
                  </div>
                </div>
                <div class="grid gap-6 py-2 pt-5">
                  <div class="grid-cols-12">
                    <label
                      for="perAddress"
                      class="block text-sm font-medium text-gray-700"
                      >Permanent Address</label
                    >
                    <textarea
                      id="perAddress"
                      name="perAddress"
                      rows="3"
                      class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.perAddress"
                    ></textarea>
                  </div>
                  <div class="grid-cols-12">
                    <label
                      for="tempAddress"
                      class="block text-sm font-medium text-gray-700"
                      >Communication Address</label
                    >
                    <textarea
                      id="tempAddress"
                      name="tempAddress"
                      rows="3"
                      class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.tempAddress"
                    ></textarea>

                    <span
                      v-if="v$.tempAddress.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.tempAddress.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="grid-cols-12">
                    <label
                      for="joiningDate"
                      class="block text-sm font-medium text-gray-700"
                      >About</label
                    >
                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      class="block w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.about"
                    ></textarea>

                    <span
                      v-if="v$.about.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.about.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- /End replace -->
          </div>
          <Notification
            message=" General Save Successfully"
            :toggleNotification="toggleNotification"
            v-if="showNotification"
          />
          <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
            <button
              type="button"
              class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="goback()"
            >
              Cancel
            </button>
            <LoadingButton
              :text="id ? 'Save' : 'Create'"
              :onPress="submitForm"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
