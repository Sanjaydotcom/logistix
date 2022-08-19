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
      businessType: "",
      licenceName: "",
      licenceNo: "",
      contractNo: "",
      contactNo: "",
      validity: "",
    });
    onMounted(() => {
      if (props.id) {
        const kycDetails = store.getProfileKycDetails();
        state.businessType = kycDetails.businessType;
        state.licenceName = kycDetails.licenceName;
        state.licenceNo = kycDetails.licenceNo;
        state.contractNo = kycDetails.contractNo;
        state.contactNo = kycDetails.contactNo;
        state.validity = kycDetails.validity;
      }
    });
    const rules = computed(() => {
      return {
        businessType: { required },
        licenceName: { required },
        licenceNo: { required },
        contractNo: { required },
        contactNo: { required },
        validity: { required },
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
          await this.store.updateKycDetails(this.state, this.id);
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
          class="
            sm-w-full
            flex
            h-full
            flex-col
            overflow-y-scroll
            bg-white
            shadow-xl
          "
        >
          <div class="bg-gray-100 px-4 sm:px-6">
            <div class="mt-5 flex items-start justify-between">
              <div class="col-span-1 pb-6">
                <h3
                  class="text-sm font-medium leading-6 text-gray-900 sm:text-lg"
                >
                  Add KYC
                </h3>
              </div>
              <div class="ml-3 flex h-7 items-center">
                <div
                  class="
                    bottom-0
                    flex-shrink-0
                    border-t border-gray-200
                    px-4
                    py-5
                    sm:px-3
                  "
                >
                  <div class="flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeSlider()"
                      class="
                        rounded-md
                        border border-gray-300
                        bg-white
                        py-2
                        px-4
                        text-sm
                        font-medium
                        text-gray-700
                        shadow-sm
                        hover:bg-gray-50
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:ring-offset-2
                      "
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
                          for="businessType"
                          class="block text-sm font-medium text-gray-700"
                          >Business Type</label
                        >
                        <input
                          type="text"
                          name="businessType"
                          id="businessType"
                          autocomplete="address-level2"
                          class="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                          v-model="state.businessType"
                        />
                        <span
                          v-if="v$.businessType.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.businessType.$errors[0].$message }}
                        </span>
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="licenceName"
                          class="block text-sm font-medium text-gray-700"
                          >Licence Name</label
                        >
                        <input
                          v-model="state.licenceName"
                          type="text"
                          name="licenceName"
                          id="licenceName"
                          autocomplete="address-level2"
                          class="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                        />
                        <span
                          v-if="v$.licenceName.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.licenceName.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="licenceNo"
                          class="block text-sm font-medium text-gray-700"
                          >Licence No</label
                        >
                        <input
                          v-model="state.licenceNo"
                          type="text"
                          name="licenceNo"
                          id="licenceNo"
                          autocomplete="address-level2"
                          class="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                        />
                        <span
                          v-if="v$.licenceNo.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.licenceNo.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="contractNo"
                          class="block text-sm font-medium text-gray-700"
                          >Contract No</label
                        >
                        <input
                          v-model="state.contractNo"
                          type="text"
                          name="contractNo"
                          id="contractNo"
                          autocomplete="address-level2"
                          class="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                        />
                        <span
                          v-if="v$.contractNo.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.contractNo.$errors[0].$message }}
                        </span>
                      </div>
                       <div class="col-span-6 sm:col-span-3">
                        <label
                          for="contractNo"
                          class="block text-sm font-medium text-gray-700"
                          > Validity</label
                        >
                        <input
                          v-model="state.validity"
                          type="date"
                          name="validity"
                          id="validity"
                          autocomplete="address-level2"
                          class="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                        />
                        <span
                          v-if="v$.validity.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.validity.$errors[0].$message }}
                        </span>
                      </div>
                      <div class="col-span-6 sm:col-span-2">
                        <InputContactWithCountryCode
                          label="Mobile Number"
                          :state="state"
                          textFieldStateName="contactNo"
                          countryCodeStateName="countryCode"
                        />
                        <span
                          v-if="v$.contactNo.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.contactNo.$errors[0].$message }}
                        </span>
                      </div>

                      <!--  -->
                    </div>
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
              class="
                rounded-md
                border border-gray-300
                bg-white
                py-2
                px-4
                text-sm
                font-medium
                text-gray-700
                shadow-sm
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
              "
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
