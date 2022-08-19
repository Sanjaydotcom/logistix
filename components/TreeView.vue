<script>
import { ref, reactive, computed } from "vue";
import TreeViewAddItemModal from "./TreeViewAddItemModal";
import DeleteConfirmationMessage from "./ui/DeleteConfirmationMessage";
import useJobTypeStore from "@/store/masters/jobType";

export default {
  name: "TreeItem",
  props: [
    "model",
    "index",
    "saveAndEditCallbackFunction",
    "deleteData",
    "viewCallBackData",
  ],
  components: { DeleteConfirmationMessage, TreeViewAddItemModal },

  setup(props) {
    const store = useJobTypeStore();

    const isOpen = ref(false);
    const editData = ref({});
    const currentNodeData = ref({});
    const AddModalOpen = ref(false);
    const isGroupLevel = ref(false);
    const isJobTypeLevel = ref(false);
    const levelId = ref(0);
    const actionButtonVisible = ref(false);
    const DeleteConfirmationMessageStatus = ref(false);
    const isFolder = computed(() => {
      return props.model.children?.length;
    });
    function toggle(data) {
      levelId.value = data.level;
      if (data.level == 0) {
        isGroupLevel.value = false;
        isJobTypeLevel.value = false;
        actionButtonVisible.value = !actionButtonVisible.value;
      } else if (data.level == 1) {
        isGroupLevel.value = true;
        isJobTypeLevel.value = false;
        actionButtonVisible.value = !actionButtonVisible.value;
      } else {
        isGroupLevel.value = false;
        actionButtonVisible.value = !actionButtonVisible.value;
        isJobTypeLevel.value = true;
      }
      if (actionButtonVisible.value) {
        setTimeout(function () {
          actionButtonVisible.value = false;
        }, 3000);
      }
    }
    function DeleteConfirmationMessageToggle(model) {
      DeleteConfirmationMessageStatus.value =
        !DeleteConfirmationMessageStatus.value;
    }
    async function ExpandedToggle() {
      if (isFolder.value) {
        this.isOpen = !this.isOpen;
      }
    }
    async function toggleModal(data) {
      props.viewCallBackData(null);

      if (data) {
        currentNodeData.value = await data;
      }
      AddModalOpen.value = await !AddModalOpen.value;
    }
    function changeType(data) {
      if (!isFolder.value) {
        props.model.children = [];
        addChildTest(data);
        isOpen.value = true;
      }
    }

    const editItem = async (data) => {
      const callBackData = {
        IsEdit: true,
        ...data,
        currentNodeData: currentNodeData.value,
      };
      //call back function
      await props.saveAndEditCallbackFunction(callBackData);

      isOpen.value = true;
      editData.value = {};
    };
    const addChildTest = async () => {
      AddModalOpen.value = !AddModalOpen.value;
    };
    const createEditData = (item) => {
      props.viewCallBackData(null);
      if (item.children) {
        editData.value = {
          name: item.name,
          jobName: item.name,
          jobDescription: item.jobDescription,
          groupLevel: item.details.groupLevel,
          miscellaneousCharges: item.details.miscellaneousCharges,
          miscellaneousChargesCode: item.details.miscellaneousChargesCode,
          IsGroup: true,
          IsEdit: true,
        };
      } else {
        editData.value = {
          name: item.name,
          jobName: item.name,
          jobDescription: item.jobDescription,

          groupLevel: item.details.groupLevel,
          miscellaneousCharges: item.details.miscellaneousCharges,
          miscellaneousChargesCode: item.details.miscellaneousChargesCode,
          IsGroup: false,
          IsEdit: true,
        };
      }
      toggleModal(item);
    };
    async function addItem(data) {
      const callBackData = {
        IsEdit: false,
        ...data,
        currentNodeData: currentNodeData.value,
      };
      //call back function
      await props.saveAndEditCallbackFunction(callBackData);
      isOpen.value = true;
      currentNodeData.value = {};
    }
    const deleteItem = async (data) => {
      props.viewCallBackData(null);
      DeleteConfirmationMessageToggle();
      props.deleteData(props.model.id);
    };
    const viewDetails = async (data) => {
      props.viewCallBackData(data);
    };

    return {
      isOpen,
      isFolder,
      toggle,
      changeType,
      actionButtonVisible,
      AddModalOpen,
      toggleModal,
      ExpandedToggle,
      addItem,
      editData,
      createEditData,
      editItem,
      deleteItem,
      DeleteConfirmationMessageToggle,
      DeleteConfirmationMessageStatus,
      currentNodeData,
      isGroupLevel,
      isJobTypeLevel,
      levelId,
      viewDetails,
    };
  },
};
</script>
<template>
  <div class="mt-2">
    <div class="pl-2.5">
      <ul>
        <li>
          <div class="flex px-5">
            <div
              class="text-base font-medium text-gray-700"
              style="display: flex"
              @dblclick="viewDetails(model)"
            >
              <span @click="ExpandedToggle" v-if="isFolder">
                <!-- [{{ isOpen ? "-" : "+" }}] -->
                <svg
                  v-if="!isOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  />
                </svg>
                <svg
                  v-if="isOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
              </span>
              <span
                v-if="!isFolder && model.name"
                style="display: flex; align-items: center"
                ><svg
                  class="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                  ></path></svg
              ></span>
              <span @click="toggle(model)" class="pl-2">
                {{ model.name }}
              </span>
            </div>
            <div class="flex pl-2.5" v-if="actionButtonVisible">
              <button
                v-if="!isJobTypeLevel"
                @click="toggleModal(model)"
                class="min-w-min rounded-md rounded-r-none border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200"
              >
                {{ !isGroupLevel ? "Add GroupLevels" : "Add JobTypes" }}
              </button>
              <button
                @click="createEditData(model)"
                class="w-20 rounded-md rounded-l-none rounded-r-none border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200"
              >
                Edit
              </button>
              <button
                @click="DeleteConfirmationMessageToggle(model)"
                class="w-20 rounded-md rounded-l-none border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200"
              >
                Delete
              </button>
            </div>
          </div>
          <ul class="pl-2.5" v-show="isOpen">
            <TreeItem
              class="item"
              v-for="(childModel, key) in model.children"
              :key="key"
              :model="childModel"
              :saveAndEditCallbackFunction="saveAndEditCallbackFunction"
              :deleteData="deleteData"
              :viewCallBackData="viewCallBackData"
            >
            </TreeItem>
          </ul>
        </li>
      </ul>
    </div>
    <!--add Modal -->
    <TreeViewAddItemModal
      v-if="AddModalOpen"
      :toggleModal="toggleModal"
      :addItem="addItem"
      :editData="editData"
      :editItem="editItem"
      :levelId="levelId"
    />
    <DeleteConfirmationMessage
      v-if="DeleteConfirmationMessageStatus"
      :deleteFunction="deleteItem"
      :toggleDeleteConfirmation="DeleteConfirmationMessageToggle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
