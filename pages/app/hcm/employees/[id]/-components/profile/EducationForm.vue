<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "~~/store/employees";
export default {
  name: "EducationForm",
  props: ["id", "tooggleFormAction", "toggleNotification", "editData"],
  setup(props) {
    const employeesStore = useEmployeesStore();
    const state = reactive({
      university: "",
      qualification: "",
      passingYear: "",
    });

    watchEffect(() => {
      if (props.editData) {
        state.university = props.editData.university;
        state.qualification = props.editData.qualification;
        state.passingYear = props.editData.passingYear;
      }
    });
    const rules = computed(() => {
      return {
        university: { required },
        qualification: { required },
        passingYear: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$, employeesStore };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.editData) {
          await this.employeesStore.updateEducation(
            { ...this.state, id: this.editData.id },
            this.id,
            this.editData.id
          );
        } else {
          await this.employeesStore.addEducation(this.state, this.id);
        }
        this.toggleNotification();
        this.tooggleFormAction();
      }
    },
  },
};
</script>

<template>
  <div class="space-y-6 py-2">
    <div class="bg-white px-4 py-2 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-sm font-medium leading-6 text-gray-900">
            Add Educational Qualifications
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            
          </p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-4 gap-6">
            <div class="col-span-6">
              <label
                for="university"
                class="block text-sm font-medium text-gray-700"
                >School/University</label
              >
              <input
                type="text"
                v-model="state.university"
                name="university"
                id="university"
                autocomplete="address-level2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <span
                v-if="v$.university.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.university.$errors[0].$message }}
              </span>
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                for="nationality"
                class="block text-sm font-medium text-gray-700"
                >Qualification</label
              >
              <input
                type="text"
                v-model="state.qualification"
                name="qualification"
                id="qualification"
                autocomplete="address-level2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <span
                v-if="v$.qualification.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.qualification.$errors[0].$message }}
              </span>
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                for="passingYear"
                class="block text-sm font-medium text-gray-700"
                >Year of Passing</label
              >
              <input
                type="month"
                v-model="state.passingYear"
                name="passingYear"
                id="passingYear"
                autocomplete="address-level2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <span
                v-if="v$.passingYear.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.passingYear.$errors[0].$message }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="my-2 pt-6 sm:flex sm:items-center sm:justify-between">
        <a
          @click="this.tooggleFormAction"
          class="mt-4 cursor-pointer text-center text-sm text-indigo-500 sm:mt-0 sm:text-left"
        >
          Back to card view
        </a>
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          @click="submitForm"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
