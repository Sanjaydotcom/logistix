<script>
import useValidate from "@vuelidate/core";
import { required, email, maxValue } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import ErrorNotification from "@/components/ui/ErrorNotification.vue";
import { useCodesStore } from "~~/store/masters/codes";
import { ref, onMounted, watch } from "vue";
export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
    ErrorNotification,
  },
  props: ["id", "editData", "closeSlider"],
  setup(props) {
    const errorNotificationStatus = ref(false);
    const router = useRouter();
    const store = useCodesStore();
    const state = reactive({
      name: "",
      kind: "",
      code: "",
    });
    onMounted(() => {
      if (props.id && props.editData) {
        state.name = props.editData.name;
        state.code = props.editData.code;
        state.kind = props.editData.kind;
      }
    });
    const rules = computed(() => {
      return {
        name: { required },
        code: { required },
        kind: { required },
      };
    });
    const toggleNotification = () => {
      errorNotificationStatus.value = !errorNotificationStatus.value;
    };
    const v$ = useValidate(rules, state);
    const goback = () => {
      props.closeSlider();
    };

    return {
      state,
      v$,
      store,
      toggleNotification,
      goback,
      rules,
      errorNotificationStatus,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();

      if (!this.v$.$error) {
        let saveData = { ...this.state, details: {} };
        if (this.id) {
          const EditStatus = await this.store.update(saveData, this.id);
          if (EditStatus.value.error) {
            this.toggleNotification();
          }
          this.goback();
        } else {
          const SaveStatus = await this.store.addNew(saveData);
          if (SaveStatus.value.error) {
            this.toggleNotification();
          } else {
            this.goback();
          }
        }
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
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="px-4 sm:px-6">
                <div class="mt-5 flex items-start justify-between">
                  <div class="md:col-span-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Add Codes
                    </h3>
                  </div>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      @click="goback()"
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
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                      >
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.name"
                      />
                      <span
                        v-if="v$.name.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.name.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="code"
                        class="block text-sm font-medium text-gray-700"
                        >Code</label
                      >
                      <input
                        type="text"
                        name="code"
                        id="code"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.code"
                      />
                      <span
                        v-if="v$.name.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.code.$errors[0].$message }}
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="kind"
                        class="block text-sm font-medium text-gray-700"
                        >Kind</label
                      >
                      <input
                        type="text"
                        name="kind"
                        id="kind"
                        autocomplete="address-level2"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="state.kind"
                      />
                      <span
                        v-if="v$.kind.$error"
                        class="font-small text-xs text-red-600"
                      >
                        {{ v$.kind.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
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
                <button
                  type="submit"
                  class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="submitForm"
                >
                  {{ id ? "Update" : "Save" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
