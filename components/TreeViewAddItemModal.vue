<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, reactive, computed } from "vue";

export default {
  props: ["toggleModal", "addItem", "editData", "editItem", "levelId"],
  setup(props) {
    const isEdit = ref(false);
    const fieldLabelText=ref(""); 
    const currentLevel = ref(0);
    const state = reactive({
      name: "",
      jobName: "",
      jobDescription: "",
      miscellaneousCharges: "",
      miscellaneousChargesCode: "",
      groupLevel: "",
      IsGroup: false,
    });

    onMounted(() => {
      if (props.editData.IsEdit) {
        isEdit.value = true;
        state.name = props.editData.name;
        state.jobName = props.editData.jobName;
        state.jobDescription = props.editData.jobDescription;
        state.groupLevel = props.editData?.groupLevel;
        state.miscellaneousCharges = props.editData?.miscellaneousCharges;
        state.miscellaneousChargesCode =
          props.editData?.miscellaneousChargesCode;

        state.IsGroup = props.editData.IsGroup;
      } else {
        isEdit.value = false;
      }
      formText();
    });
    const rules = computed(() => {
      return {
        name: { required },
        jobName: { },
        jobDescription: { },
        groupLevel: { },
        miscellaneousCharges: {  },
      };
    });
    const formText = () => {
      let formLabelText = "";
      if (isEdit.value) {
        currentLevel.value=props.levelId;
        if (props.levelId == 0) {
          fieldLabelText.value = "Branch";
          formLabelText = "Edit Branch";
        } else if (props.levelId == 1) {
          fieldLabelText.value = "Group";
          formLabelText = "Edit Group";
        } else {
          fieldLabelText.value = "Job Types";
          formLabelText = "Edit Job Types";
        }
        return formLabelText;
      }else{
        currentLevel.value=props.levelId+1;
         if (props.levelId == 0) {
          fieldLabelText.value = "Group";
          formLabelText = "Add Group";
        } else if (props.levelId == 1) {
          fieldLabelText.value = "Job Type";
          formLabelText = "Add Job Type";
        }
        return formLabelText;
      }
    };
    const v$ = useValidate(rules, state);
    return { state, v$, isEdit, formText,fieldLabelText,currentLevel };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.toggleModal();
        if (this.editData.name) {
          this.editItem(this.state);
        } else {
          this.addItem(this.state);
        }
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
    <div
      class="fixed inset-0 bg-gray-300 bg-opacity-25 transition-opacity"
    ></div>
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
            >
              <div class="px-4 sm:px-8">
                <div class="flex items-start justify-between">
                  <h2
                    class="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    {{ formText() }}
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      @click="toggleModal"
                      type="button"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

              <div class="relative mt-6 px-4 sm:px-6">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >{{fieldLabelText}} Name
                  </label>
                  <input
                    type="text"
                    v-model="state.name"
                    autocomplete="address-level2"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span
                    v-if="v$.name.$error"
                    class="font-small text-xs text-red-600"
                  >
                    {{ v$.name.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div v-if="condition" class="relative mt-6 px-4 sm:px-6">
                <div>
                  <label
                    for="jobName"
                    class="block text-sm font-medium text-gray-700"
                    >Job Name</label
                  >
                  <input
                    type="text"
                    v-model="state.jobName"
                    autocomplete="address-level2"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span
                    v-if="v$.jobName.$error"
                    class="font-small text-xs text-red-600"
                  >
                    {{ v$.jobName.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="relative mt-6 px-4 sm:px-6">
                <div>
                  <label
                    for="jobDescription"
                    class="block text-sm font-medium text-gray-700"
                    >{{fieldLabelText}} Description</label
                  >
                  <textarea
                    type="text"
                    v-model="state.jobDescription"
                    autocomplete="address-level2"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                  <span
                    v-if="v$.jobDescription.$error"
                    class="font-small text-xs text-red-600"
                  >
                    {{ v$.jobDescription.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div v-if="currentLevel==2" class="relative mt-6 px-4 text-gray-700 sm:px-6">
                <InputOrganization
                  :state="state"
                  inputName="groupLevel"
                  label="Branch Level"
                />
                <span
                  v-if="v$.groupLevel.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.groupLevel.$errors[0].$message }}
                </span>
              </div>
              <div class="relative mt-6 px-4 sm:px-6">
                <InputPriceWithCountryCode
                  label="Miscellaneous Charges"
                  :state="this.state"
                  inputPriceName="miscellaneousCharges"
                  inputCodeName="miscellaneousChargesCode"
                />
                <span
                  v-if="v$.miscellaneousCharges.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.miscellaneousCharges.$errors[0].$message }}
                </span>
              </div>

              <div class="mt-3 flex flex-shrink-0 justify-end px-4 py-2">
                <button
                  type="button"
                  class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="toggleModal"
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

<style lang="scss" scoped></style>
