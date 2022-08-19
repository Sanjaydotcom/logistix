<script>
import { URL } from "@/composables/api/index";
export default {
  props: ["state", "inputName", "inputId", "label", "callBackFunction"],
  setup(props) {
    const fileData = ref();
    const inputId = ref(null);
    const isFilePresent = ref(false);
    const fileName = ref(null);
    const noFileSelected = ref(
      isFilePresent.value ? isFilePresent.value : null
    );
    onMounted(() => {
      if (props.state[props.inputId]) {
        isFilePresent.value = true;
        inputId.value = props.state[props.inputId];
        fileName.value = props.state[props.inputName];
      }
    });
    const handleFile = async (e) => {
      const file = e.target.files[0];
      fileName.value = file.name;
      noFileSelected.value = false;
      const formData = new FormData();
      formData.append("inputStream", file);
      formData.append("fileName", file.name);
      formData.append("basePath", "attachments");
      formData.append("contentType", "documents");
      formData.append("documentType", "doc");
      fileData.value = formData;
      uploadFile();
    };
    const removeFile = () => {
      fileData.value = null;
      isFilePresent.value = false;
      props.state[props.inputId] = null;
      props.state[props.inputName] = "";
    };
    const uploadFile = async () => {
      if (fileData.value) {
        const fileId = await useFileUpload(fileData.value);
        props.state[props.inputId] = fileId;
        props.state[props.inputName] = fileName.value;
        isFilePresent.value = true;
        inputId.value = fileId;
      }
    };

    return {
      inputId,
      fileName,
      removeFile,
      URL,
      isFilePresent,
      noFileSelected,
      handleFile,
      uploadFile,
    };
  },
};
</script>

<template>
  <div>
    <label
      for="fileUpload"
      class="mb-1 block text-sm font-medium text-gray-700"
    >
      <div
        v-if="!isFilePresent"
        class="w-full cursor-pointer rounded-md border border-dashed border-gray-300 p-2 py-4"
      >
        <div class="flex items-center">
          <svg
            class="mr-2 h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p>Select {{ label }}</p>
        </div>
      </div>
    </label>
    <input
      class="hidden"
      type="file"
      id="fileUpload"
      accept="image/jpeg,image/jpg,image/png,application/pdf"
      @change="handleFile"
    />
    <span v-if="noFileSelected" class="font-small text-xs text-red-600">
      Please select a file to upload
    </span>
    <div
      v-if="isFilePresent"
      class="w-full rounded-md border border-l-8 border-solid border-gray-300 border-l-blue-400 p-2 py-2"
    >
      <div class="flex justify-between">
        <p class="overflow-hidden text-ellipsis pt-2 text-sm">
          {{ fileName }}
        </p>

        <div class="flex">
          <a
            :href="`${URL.Document.SHOW}/${inputId}`"
            target="blank"
            class="mr-2 ml-1 truncate pt-2 text-sm font-medium text-gray-900"
          >
            <button
              type="button"
              class="rounded-md text-blue-300 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
            >
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </a>
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
</template>
