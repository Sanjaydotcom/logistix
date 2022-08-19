<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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
  props: ["editButtonClick", "id", "updateStaffExitDetails", "editData"],
  created() {
    this.IsToggleSlider = true;
  },
  components: {
    Notification,
  },

  setup(props) {
    const StaffExitStatus = ref([]);
    const employeesStore = useEmployeesStore();

    const state = reactive({
      resignationDate: "",
      interviewDateExit: "",
      relivingdate: "",
      reasonForLeaving: "",
      interviewExitSummary: "",
      status: "",
    });

    const rules = computed(() => {
      return {
        resignationDate: { required },
        interviewDateExit: { required },
        relivingdate: { required },
        reasonForLeaving: { required },
        interviewExitSummary: { required },
        status: { required },
      };
    });

    watchEffect(() => {
      if (props.editData) {
        state.resignationDate = props.editData.resignationDate;
        state.interviewDateExit = props.editData.interviewDateExit;
        state.relivingdate = props.editData.relivingdate;
        state.reasonForLeaving = props.editData.reasonForLeaving;
        state.interviewExitSummary = props.editData.interviewExitSummary;
        state.status = props.editData.status;
      }
    });
    const v$ = useValidate(rules, state);
    return { state, v$, employeesStore, StaffExitStatus };
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
        await this.employeesStore.updateStaffExitDetails(this.state, this.id);

        this.editButtonClick();
        this.updateStaffExitDetails();
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
                      Staff Exit Details
                    </h3>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      @click="this.editButtonClick"
                      class="
                        rounded-md
                        bg-white
                        text-gray-400
                        hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:ring-offset-2
                      "
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
                      <label
                        for="firstName"
                        class="block text-sm font-medium text-gray-700"
                        >Resignation Date</label
                      >

                      <div class="mt-1">
                        <input
                          type="date"
                          max="2022-06-08"
                          :onfocus="
                            (this.max = new Date().toISOString().split('T')[0])
                          "
                          name="resignationDate"
                          id="resignationDate"
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
                          v-model="state.resignationDate"
                        />
                        <span
                          v-if="v$.resignationDate.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.resignationDate.$errors[0].$message }}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-900"
                      >
                        Reason For Leaving
                      </label>
                      <div class="mt-1">
                        <textarea
                          id="reasonForLeaving"
                          name="reasonForLeaving"
                          rows="4"
                          class="
                            block
                            w-full
                            rounded-md
                            border border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                          v-model="state.reasonForLeaving"
                        ></textarea>
                        <span
                          v-if="v$.reasonForLeaving.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.reasonForLeaving.$errors[0].$message }}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        for="interviewDateExit"
                        class="block text-sm font-medium text-gray-700"
                        >Exit Interview Date</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.interviewDateExit"
                          type="DATE"
                          name="interviewDateExit"
                          id="interviewDateExit"
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
                          v-if="v$.interviewDateExit.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.interviewDateExit.$errors[0].$message }}
                        </span>
                      </div>
                    </div>

                    <div class="mt-1">
                      <label
                        for="dob"
                        class="block text-sm font-medium text-gray-700"
                        >Reliving Date</label
                      >

                      <div class="mt-1">
                        <input
                          type="date"
                          name="relivingdate"
                          id="relivingdate"
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
                          v-model="state.relivingdate"
                        />
                        <span
                          v-if="v$.relivingdate.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.relivingdate.$errors[0].$message }}
                        </span>
                      </div>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <InputCodesDropDown
                        :state="state"
                        inputName="status"
                        label="Status"
                        kind="StaffExitStatus"
                        :v="this.v$"
                      />
                      <span
                        v-if="v$.status.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.status.$errors[0].$message }}
                      </span>
                    </div>

                    <div>
                      <label
                        for="interviewExitSummary"
                        class="block text-sm font-medium text-gray-900"
                      >
                        Exit Interview Summary
                      </label>
                      <div class="mt-1">
                        <textarea
                          id="interviewExitSummary"
                          name="interviewExitSummary"
                          rows="4"
                          class="
                            block
                            w-full
                            rounded-md
                            border border-gray-300
                            shadow-sm
                            focus:border-indigo-500 focus:ring-indigo-500
                            sm:text-sm
                          "
                          v-model="state.interviewExitSummary"
                        ></textarea>
                        <span
                          v-if="v$.interviewExitSummary.$error"
                          class="font-small text-xs text-red-600"
                        >
                          {{ v$.interviewExitSummary.$errors[0].$message }}
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
                    @click="this.editButtonClick"
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
                  <button
                    type="submit"
                    @click="submitForm"
                    class="
                      inline-flex
                      justify-center
                      rounded-md
                      border border-transparent
                      bg-indigo-600
                      py-2
                      px-4
                      text-sm
                      font-medium
                      text-white
                      shadow-sm
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      focus:ring-offset-2
                    "
                  >
                    Update
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
