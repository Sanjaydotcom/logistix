<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "~~/store/employees";
import { useFetch } from "@vueuse/core";
import { URL } from "@/composables/api/index";

export default {
  name: "AttachmentForm",
  props: [
    "id",
    "toggleForm",
    "toggleNotification",
    "formType",
    "IsEdit",
    "attachmentId",
  ],
  data() {
    return {
      DataById: {},
      titleText: "Add",
    };
  },
  setup(props) {
    const fileData = ref();
    const isFilePresent = ref(false);
    const noFileSelected = ref(
      isFilePresent.value ? isFilePresent.value : null
    );
    const fileName = ref(null);
    const getDate = () => {
      var date = new Date();
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0");
      var yyyy = date.getFullYear();
      return (date = dd + "/" + mm + "/" + yyyy);
    };

    const employeesStore = useEmployeesStore();

    const handleFile = async (e) => {
      const file = e.target.files[0];
      fileName.value = file.name;
      isFilePresent.value = true;
      noFileSelected.value = false;
      const formData = new FormData();
      formData.append("inputStream", file);
      formData.append("fileName", file.name);
      formData.append("basePath", "attachments");
      formData.append("contentType", "documents");
      formData.append("documentType", "doc");
      fileData.value = formData;
    };

    const removeFile = () => {
      fileData.value = null;
      isFilePresent.value = false;
    };

    const uploadFile = async () => {
      try {
        const fileUpload = await useFetch(`${URL.Document.UPLOAD}`)
          .post(fileData.value)
          .json();
        return fileUpload.data.value;
      } catch (err) {
        console.log(err);
      }
    };

    const validateFile = () => {
      !isFilePresent.value ? (noFileSelected.value = true) : false;
    };

    const state = reactive({
      fileName: "",
      name: "",
      type: props.formType,
      fileId: "",
      date: getDate(),
    });
    const rules = computed(() => {
      return {
        name: { required },
        type: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
      employeesStore,
      handleFile,
      uploadFile,
      isFilePresent,
      removeFile,
      fileName,
      noFileSelected,
      validateFile,
    };
  },
  created() {
    this.UpdateFields();
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      this.validateFile();
      if (!this.v$.$error && this.isFilePresent) {
        if (this.IsEdit) {
          const fileId = await this.uploadFile();
          this.state["fileId"] = fileId;
          this.state["fileName"] = this.fileName;
          await this.employeesStore.updateAttachments(
            { ...this.state, id: this.attachmentId },
            this.id,
            this.attachmentId
          );
        } else {
          const fileId = await this.uploadFile();
          this.state["fileId"] = fileId;
          this.state["fileName"] = this.fileName;
          await this.employeesStore.addAttachments(this.state, this.id);
        }
        this.toggleNotification();
        this.toggleForm();
      }
    },
    async UpdateFields() {
      if (this.IsEdit) {
        this.titleText = "Edit";
        this.DataById = await this.employeesStore.getAttachmentsByAttachmentsId(
          this.id,
          this.attachmentId
        );
        this.state.name = this.DataById.name;
        this.state.fileName = this.DataById.fileName;
        this.DataById.fileId ? (this.isFilePresent = true) : null;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <div
      class="relative z-10"
      aria-labelledby="slide-over-title"
      status="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
      ></div>
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0"></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full"
          >
            <div class="pointer-events-auto w-screen sm:max-w-md">
              <div
                class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
              >
                <div class="h-0 flex-1 overflow-y-auto">
                  <div class="py-6 px-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <h2
                        class="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        {{ titleText }} {{ this.formType }}
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md text-gray-700 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                          @click="toggleForm"
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
                    <div class="mt-1"></div>
                  </div>
                  <div class="flex flex-1 flex-col justify-between">
                    <div class="divide-y divide-gray-200 px-4 sm:px-6">
                      <!--  -->
                      <div class="space-y-6 pt-6 pb-5">
                        <div>
                          <label
                            for="experience"
                            class="block text-sm font-medium text-gray-700"
                            >Attachment Type</label
                          >
                          <select
                            disabled
                            id="experience"
                            name="experience"
                            autocomplete="country-name"
                            v-model="state.type"
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option>Resume</option>
                            <option>Certificate</option>
                            <option>Contract</option>
                            <option>Other</option>
                          </select>
                          <span
                            v-if="v$.type.$error"
                            class="font-small text-xs text-red-600"
                          >
                            {{ v$.type.$errors[0].$message }}
                          </span>
                        </div>

                        <div>
                          <label
                            for="nationality"
                            class="block text-sm font-medium text-gray-700"
                            >Attachment Name</label
                          >
                          <input
                            type="text"
                            v-model="state.name"
                            name="qualification"
                            id="qualification"
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
                        <div>
                          <label
                            for="document"
                            class="mb-1 block text-sm font-medium text-gray-700"
                            >Document</label
                          >
                          <input
                            v-if="!isFilePresent"
                            class="w-full rounded-md border border-dashed border-gray-300 p-2 py-4"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            aria-label="upload image button"
                            @change="handleFile"
                          />
                          <span
                            v-if="noFileSelected"
                            class="font-small text-xs text-red-600"
                          >
                            Please select a file to upload
                          </span>
                          <div
                            v-if="isFilePresent"
                            class="w-full rounded-md border border-l-8 border-solid border-gray-300 border-l-blue-400 p-2 py-4"
                          >
                            <div class="flex justify-between">
                              <p class="text-sm">
                                {{ fileName || state.fileName }}
                              </p>
                              <button
                                type="button"
                                class="rounded-md text-gray-700 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                                @click="removeFile"
                              >
                                <svg
                                  class="mr-2 h-5 w-5 text-red-400 hover:text-red-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--  -->
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-shrink-0 justify-end bg-gray-100 px-4 py-2"
                >
                  <button
                    type="button"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    @click="toggleForm"
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
  </div>
</template>
