<script>
import AttachmentForm from "./AttachmentForm.vue";
import Notification from "@/components/ui/Notification.vue";
import { useEmployeesStore } from "~~/store/employees";
import { URL } from "@/composables/api/index";
import { ref } from "vue";
import DeleteConfirmationMessage from "~~/components/ui/DeleteConfirmationMessage";

export default {
  props: ["id", "userAttachments"],
  components: {
    AttachmentForm,
    Notification,
    DeleteConfirmationMessage,
  },
  setup(props) {
    const isFormVisible = ref(false);
    const showNotification = ref(false);
    const formType = ref("");
    const data = ref(props.userAttachments);
    const IsEdit = ref(false);
    const attachmentId = ref(null);
    const employeesStore = useEmployeesStore();

    const deleteMessageStatus = ref(false);
    const selectedAttachmentId = ref(null);

    const toggleForm = (type, status, Id) => {
      status ? (IsEdit.value = true) : (IsEdit.value = false);
      status ? (attachmentId.value = Id) : (attachmentId.value = null);
      formType.value = type;
      isFormVisible.value = !isFormVisible.value;
      // fetchAttachments();
    };
    const toggleNotification = () => {
      showNotification.value = !showNotification.value;
    };
    function toggleDeleteConfirmation(id) {
      selectedAttachmentId.value = id;
      deleteMessageStatus.value = !deleteMessageStatus.value;
    }
    const fetchDocIcon = (docType) => {
      const icon = attachments.filter(
        (attachment) => attachment.type === docType
      );
      return icon[0].img;
    };
    const deleteAttachment = async () => {
      toggleDeleteConfirmation();

      await employeesStore.deleteAttachments(
        props.id,
        selectedAttachmentId.value
      );
    };
    watch(useEmployeesStore(), () => {
      fetchAttachments();
    });
    const fetchAttachments = async () => {
      // await employeesStore.getEmployeeById(props.id);
      data.value = await employeesStore.getAttachmentsById();
    };

    return {
      toggleForm,
      isFormVisible,
      attachments,
      fetchDocIcon,
      formType,
      showNotification,
      toggleNotification,
      data,
      deleteAttachment,
      attachmentId,
      IsEdit,
      URL,
      toggleDeleteConfirmation,
      deleteMessageStatus,
    };
  },
};

const attachments = [
  {
    id: 1,
    name: "Resume",
    type: "Resume",
    img: "https://cdn-icons-png.flaticon.com/512/7550/7550834.png",
  },
  {
    id: 2,
    name: "Graduation Certificate",
    type: "Certificate",
    img: "https://cdn-icons-png.flaticon.com/512/7550/7550926.png",
  },
  {
    id: 3,
    name: "Employment Contract",
    type: "Contract",
    img: "https://cdn-icons-png.flaticon.com/512/7551/7551075.png",
  },
  {
    id: 4,
    name: "Other Attachments",
    type: "Other",
    img: "https://cdn-icons-png.flaticon.com/512/7550/7550911.png",
  },
];
</script>

<template>
  <div>
    <div class="mx-auto mt-3 mb-10 max-w-5xl px-4 sm:px-6 lg:px-8">
      <div>
        <p class="mt-10 text-sm font-medium text-gray-500">Add Attachments</p>
      </div>
      <div class="mt-6">
        <ul role="list" class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div v-for="doc in attachments" :key="doc.id">
            <li>
              <button
                @click="toggleForm(doc.type)"
                type="button"
                class="group flex w-full items-center justify-between space-x-3 rounded-xl border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="flex min-w-0 flex-1 items-center space-x-3">
                  <span class="block flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" :src="doc.img" alt="" />
                  </span>
                  <span class="block min-w-0 flex-1">
                    <span
                      class="block truncate text-sm font-medium text-gray-900"
                    >
                      {{ doc.name }}
                    </span>
                  </span>
                </span>
                <span
                  class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center"
                >
                  <svg
                    class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </li>
          </div>
        </ul>
      </div>
      <AttachmentForm
        v-if="isFormVisible"
        :formType="formType"
        :toggleForm="toggleForm"
        :toggleNotification="toggleNotification"
        :id="id"
        :IsEdit="IsEdit"
        :attachmentId="attachmentId"
      />
      <Notification
        message="Attachment added successfully"
        :toggleNotification="toggleNotification"
        v-if="showNotification"
      />
    </div>
    <DeleteConfirmationMessage
      v-if="deleteMessageStatus"
      :deleteFunction="deleteAttachment"
      :toggleDeleteConfirmation="toggleDeleteConfirmation"
    />
    <!-- Saved attachments section -->

    <div
      v-if="data.length >= 1"
      class="mx-auto mt-3 mb-10 max-w-5xl px-4 sm:px-6 lg:px-8"
    >
      <div>
        <p class="mt-10 text-sm font-medium text-gray-500">Saved Attachments</p>
      </div>
      <ul role="list" class="divide-y divide-gray-200">
        <div class="mt-6" v-for="doc in data" :key="doc.id">
          <li>
            <div class="block hover:bg-gray-50">
              <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="flex min-w-0 flex-1 items-center">
                  <div class="flex-shrink-0">
                    <img
                      class="h-12 w-12 rounded-full"
                      :src="fetchDocIcon(doc.type)"
                      alt=""
                    />
                  </div>
                  <div
                    class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4"
                  >
                    <div>
                      <a
                        :href="`${URL.Document.SHOW}/${doc.fileId}`"
                        target="blank"
                        class="truncate text-sm font-medium text-gray-900"
                      >
                        {{ doc.name }}
                      </a>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          class="mr-1 h-5 w-5 flex-shrink-0 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        <span class="truncate">
                          {{ doc.type }} -
                          <a
                            class="text-gray-500 underline"
                            :href="`${URL.Document.DOWNLOAD}/${doc.fileId}`"
                            >Download</a
                          >
                        </span>
                      </p>
                    </div>
                    <div class="hidden md:block">
                      <div>
                        <p class="mt-4 flex items-center text-sm text-gray-500">
                          <svg
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          Updated on
                          <time class="ml-1.5" :datetime="doc.date">
                            {{ doc.date }}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                    id="menu-0-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    @click="toggleForm(doc.type, true, doc.id)"
                  >
                    <span class="sr-only">Edit</span>
                    <!-- Heroicon name: solid/dots-horizontal -->
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                    id="menu-0-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    @click="toggleDeleteConfirmation(doc.id)"
                  >
                    <span class="sr-only">Delete</span>
                    <!-- Heroicon name: solid/dots-horizontal -->
                    <svg
                      class="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
