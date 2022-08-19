<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useEmployeesStore } from "~~/store/employees";
import { URL } from "@/composables/api/index";
import { ref, reactive, watchEffect, watch, computed } from "vue";
import { format } from "date-fns";
import DeleteConfirmationMessage from "~~/components/ui/DeleteConfirmationMessage";

export default {
  props: ["id"],
  components: {
    DeleteConfirmationMessage,
  },
  setup(props) {
    const AssetsType = ref([
      "Laptop",
      "Desktop",
      "Monitor",
      "Docking Station",
      "Tablets",
      "Mobile Phones",
      "SIM Cards",
      "Deskphone",
      "TV",
      "Accessories",
    ]);
    const IsEdit = ref(false);
    const IsSliderClicked = ref(false);
    const AddButtonText = ref("Add Asset");
    const AssetEditData = ref({});
    const AssetEditId = ref("");
    const deleteMessageStatus = ref(false);
    const selectedAssetsId = ref(null);
    const assets = reactive({
      data: [],
    });
    const AssetStatus = ref([]);

    const state = reactive({
      id: "",
      type: "",
      issueDate: "",
      status: "",
      description: "",
      code: "",
    });
    const rules = computed(() => {
      return {
        type: { required },
        issueDate: { required },
        status: { required },
        code: { required },
        description: { required },
      };
    });

    const store = useEmployeesStore();
    const router = useRouter();
    async function toggleDeleteConfirmation(id) {
      selectedAssetsId.value = await id;
      deleteMessageStatus.value = !deleteMessageStatus.value;
    }

    const fetchAssets = async () => {
      assets.data = await store.getAssetsDataByID(props.id);
    };
    onMounted(() => {
      fetchAssets();
    });
    const v$ = useValidate(rules, state);
    const clearState = async () => {
      state.code = "";
      state.type = "";
      state.issueDate = "";
      state.status = "";
      state.description = "";
    };
    const EditButtonClick = async (assetCode, Edit) => {
      clearState();
      IsEdit.value = false;
      if (Edit) {
        IsEdit.value = Edit;
        updateState(assetCode);
      }
      IsSliderClicked.value = !IsSliderClicked.value;
    };
    const DeleteButtonClick = async () => {
      toggleDeleteConfirmation();
      await store.deleteAsset(selectedAssetsId.value);
      fetchAssets();
    };
    const updateState = async (assetCode) => {
      if (IsEdit.value) {
        const AssetGetById = await store.getAssetsDataByAssetId(assetCode); //getters
        state.id = AssetEditData ? AssetGetById.value.id : "";
        state.code = AssetEditData ? AssetGetById.value.code : "";
        state.type = AssetEditData ? AssetGetById.value.name : "";
        state.issueDate = AssetEditData
          ? format(new Date(AssetGetById.value.issueDate), "yyyy-MM-dd")
          : "";
        state.status = AssetEditData ? AssetGetById.value.status : "";
        state.description = AssetEditData ? AssetGetById.value.description : "";
        AssetEditId.value = AssetGetById.value.id;
      }
    };
    return {
      updateState,
      EditButtonClick,
      clearState,
      v$,
      assets,
      store,
      fetchAssets,
      state,
      IsEdit,
      IsSliderClicked,
      AssetEditId,
      format,
      AssetsType,
      AssetStatus,
      URL,
      DeleteButtonClick,
      toggleDeleteConfirmation,
      deleteMessageStatus,
    };
  },
  methods: {
    async submit() {
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        const saveData = {
          code: this.state.code,
          name: this.state.type,
          organization: "StrebenTechnuk",
          employeeId: this.id,
          status: this.state.status,
          description: this.state.description,
          issueDate: this.state.issueDate,
        };
        this.IsEdit
          ? await this.store.editAsset(saveData, this.state.id)
          : await this.store.saveAsset(saveData, this.id);
        this.fetchAssets();
        this.IsSliderClicked = !this.IsSliderClicked;
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="mx-auto mt-3 max-w-5xl overflow-hidden px-4 sm:px-6 lg:px-8">
      <div style="display: flex; justify-content: flex-end">
        <button
          type="button"
          class="
            inline-flex
            items-center
            rounded-md
            border border-gray-300
            bg-white
            px-3
            py-2
            text-sm
            font-medium
            leading-4
            text-gray-700
            shadow-sm
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
          @click="EditButtonClick()"
        >
          <svg
            class="-ml-0.5 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Assets
        </button>
      </div>
      <div
        class="
          my-4
          divide-y divide-gray-100
          text-sm
          leading-6
          lg:col-span-7
          xl:col-span-8
        "
        v-for="(asset, index) in assets.data"
        :key="index"
      >
        <div class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex min-w-0 flex-1 items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-12 w-12 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/1037/1037308.png"
                  alt=""
                />
              </div>
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <div class="flex">
                    <p
                      target="blank"
                      class="mr-2 truncate text-sm font-medium text-gray-900"
                    >
                      {{ asset.name }}
                    </p>
                    <span
                      class="
                        inline-block
                        flex-shrink-0
                        rounded-full
                        bg-green-100
                        px-2
                        py-0.5
                        text-xs
                        font-medium
                        text-green-800
                      "
                      >{{ asset.status }}</span
                    >
                  </div>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    <span class="truncate">
                      {{ asset.description }}
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
                      Issued on
                      <time class="ml-1.5">
                        {{ format(new Date(asset.issueDate), "yyyy-MM-dd") }}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <DeleteConfirmationMessage
                v-if="deleteMessageStatus"
                :deleteFunction="DeleteButtonClick"
                :toggleDeleteConfirmation="toggleDeleteConfirmation"
              />

              <button
                @click="EditButtonClick(asset.id, true)"
                type="button"
                class="
                  -m-2
                  flex
                  items-center
                  rounded-full
                  p-2
                  text-gray-400
                  hover:text-gray-600
                "
                id="menu-0-button"
                aria-expanded="false"
                aria-haspopup="true"
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
                @click="toggleDeleteConfirmation(asset.id)"
                type="button"
                class="
                  -m-2
                  flex
                  items-center
                  rounded-full
                  p-2
                  text-gray-400
                  hover:text-gray-600
                "
                id="menu-0-button"
                aria-expanded="false"
                aria-haspopup="true"
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
      </div>
    </div>
    <div v-if="IsSliderClicked">
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        status="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
        ></div>
        <div class="fixed inset-0"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="
                pointer-events-none
                fixed
                inset-y-0
                right-0
                flex
                max-w-full
              "
            >
              <div class="pointer-events-auto w-screen sm:max-w-md">
                <div
                  class="
                    flex
                    h-full
                    flex-col
                    divide-y divide-gray-200
                    bg-white
                    shadow-xl
                  "
                >
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="py-6 px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <h2
                          class="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Assets
                        </h2>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="
                              rounded-md
                              text-gray-700
                              hover:text-gray-300
                              focus:outline-none focus:ring-2 focus:ring-white
                            "
                            @click="EditButtonClick"
                          >
                            <span class="sr-only">Close panel</span>
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
                      <div class="mt-1">
                        <p class="text-sm text-gray-500"></p>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              for="code"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Asset Code
                            </label>
                            <div class="mt-1">
                              <input
                                type="text"
                                name="code"
                                id="code"
                                class="
                                  block
                                  w-full
                                  rounded-md
                                  border-gray-300
                                  shadow-sm
                                  focus:border-indigo-500 focus:ring-indigo-500
                                  sm:text-sm
                                "
                                v-model="state.code"
                              />
                              <span
                                v-if="v$.code.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.code.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="mt-1">
                              <InputCodesDropDown
                                :state="state"
                                inputName="type"
                                label="Asset Type"
                                kind="AssetType"
                                :v="this.v$"
                              />
                              <span
                                v-if="v$.type.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.type.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="project-name"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Issue Date
                            </label>
                            <div class="mt-1">
                              <input
                                max="2022-06-08"
                                :onfocus="
                                  (this.max = new Date()
                                    .toISOString()
                                    .split('T')[0])
                                "
                                type="date"
                                name="issueDate"
                                id="project-name"
                                class="
                                  block
                                  w-full
                                  rounded-md
                                  border-gray-300
                                  shadow-sm
                                  focus:border-indigo-500 focus:ring-indigo-500
                                  sm:text-sm
                                "
                                v-model="state.issueDate"
                              />
                              <span
                                v-if="v$.issueDate.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.issueDate.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="mt-1">
                              <InputCodesDropDown
                                :state="state"
                                inputName="status"
                                label="Status"
                                kind="AssetStatus"
                                :v="this.v$"
                              />
                              <span
                                v-if="v$.status.$error"
                                class="font-small text-xs text-red-600"
                              >
                                {{ v$.status.$errors[0].$message }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <label
                              for="description"
                              class="block text-sm font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <div class="mt-1">
                              <textarea
                                v-model="state.description"
                                class="
                                  block
                                  w-full
                                  rounded-md
                                  border-gray-300
                                  shadow-sm
                                  focus:border-indigo-500 focus:ring-indigo-500
                                  sm:text-sm
                                "
                                placeholder="Details"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex flex-shrink-0 justify-end bg-gray-100 px-4 py-2"
                  >
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
                      @click="EditButtonClick"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="
                        ml-4
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
                      @click="submit"
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
  </div>
</template>
