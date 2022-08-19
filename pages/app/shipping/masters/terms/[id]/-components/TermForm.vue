<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import useTermsStore from "~~/store/masters/terms";

export default {
  props: [
    "id",
    "editData",
    "toggleForm",
    "addTerms",
    "updateTerms",
    "deleteTerms",
  ],
  setup(props) {
    const store = useTermsStore();
    const state = reactive({
      id: "",
      isHeading: false,
      description: "",
    });
    watchEffect(() => {
      if (props.editData) {
        state.description = props.editData.description;
        state.isHeading = props.editData.isHeading;
        state.id = props.editData.id;
      }
    });
    const toggleForm = ref(props.toggleForm);
    const addTerms = ref(props.addTerms);
    const updateTerms = ref(props.updateTerms);
    const DeleteTerms = ref(props.deleteTerms);
    const id = ref(props.id);
    const editData = ref(props.editData);
    const rules = computed(() => {
      return {
        description: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      v$,
      toggleForm,
      state,
      addTerms,
      updateTerms,
      DeleteTerms,
      id,
      store,
      editData,
    };
  },
  methods: {
    async saveTerm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.editData) {
          this.store.editTerm(this.state, this.state.id, this.id);
          this.toggleForm();
        } else {
          this.store.addTerm(this.state, this.id);
          this.toggleForm();
        }
      }
    },
  },
};
</script>

<template>
  <div class="p-4">
    <h3 class="my-2 text-sm font-medium text-gray-900">
      {{ editData ? "Edit Term" : "Add New Term" }}
    </h3>

    <div class="flex flex-1 flex-col justify-between">
      <div class="divide-y divide-gray-200">
        <div class="space-y-6 pt-2">
          <div>
            <div class="mt-2">
              <textarea
                v-model="state.description"
                type="text"
                placeholder="Term description"
                rows="3"
                name="project-name"
                id="project-name"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              ></textarea>
            </div>
            <span
              v-if="v$.description.$error"
              class="font-small text-xs text-red-600"
            >
              Enter term description to save
            </span>
          </div>
          <div class="flex justify-between">
            <div class="flex flex-col sm:flex-row">
              <div>
                <div class="mx-2 flex items-center">
                  <input
                    v-model="state.isHeading"
                    id="heading"
                    name="heading"
                    type="checkbox"
                    class="h-4 w-4 border-gray-300 text-indigo-600 outline-none"
                  />
                  <label
                    for="heading"
                    class="font-regular ml-2 block text-sm text-gray-700"
                  >
                    Heading
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                @click="toggleForm"
                class="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>

              <button
                @click="saveTerm"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
