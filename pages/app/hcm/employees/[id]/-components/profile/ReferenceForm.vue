<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useEmployeesStore } from "@/store/employees";

export default {
  name: "ReferenceForm",
  props: ["id", "tooggleFormAction", "toggleNotification", "editData"],
  setup(props) {
    const employeesStore = useEmployeesStore();

    const state = reactive({
      name: "",
      referenceType: "",
      contactNumber: "",
      email: "",
    });

    watchEffect(() => {
      if (props.editData) {
        state.name = props.editData.name;
        state.referenceType = props.editData.referenceType;
        state.contactNumber = props.editData.contactNumber;
        state.email = props.editData.email;
      }
    });
    const rules = computed(() => {
      return {
        name: { required },
        referenceType: { required },
        contactNumber: { required },
        email: { required, email },
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
          await this.employeesStore.updateReferences(
            { ...this.state, id: this.editData.id },
            this.id,
            this.editData.id
          );
        } else {
          await this.employeesStore.addReferences(this.state, this.id);
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
    <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-sm font-medium leading-6 text-gray-900">
            References
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            
          </p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-4 lg:col-span-3">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <input
                  type="text"
                  v-model="state.name"
                  name="name"
                  id="name"
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
                  v-if="v$.name.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.name.$errors[0].$message }}
                </span>
              </div>
              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <InputCodesDropDown
                  :state="state"
                  inputName="referenceType"
                  label="Reference Type"
                  kind="ReferenceType"
                  :v="this.v$"
                />
                <span
                  v-if="v$.referenceType.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.referenceType.$errors[0].$message }}
                </span>
              </div>
              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  for="contactNumber"
                  class="block text-sm font-medium text-gray-700"
                  >Contact Number</label
                >
                <input
                  type="number"
                  v-model="state.contactNumber"
                  name="contactNumber"
                  id="contactNumber"
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
                  v-if="v$.contactNumber.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.contactNumber.$errors[0].$message }}
                </span>
              </div>
              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="state.email"
                  name="email"
                  id="email"
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
                  v-if="v$.email.$error"
                  class="font-small text-xs text-red-600"
                >
                  {{ v$.email.$errors[0].$message }}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="my-2 pt-6 sm:flex sm:items-center sm:justify-between">
        <a
          @click="this.tooggleFormAction"
          class="
            mt-4
            cursor-pointer
            text-center text-sm text-indigo-500
            sm:mt-0 sm:text-left
          "
        >
          Back to card view
        </a>
        <button
          type="submit"
          class="
            inline-flex
            justify-center
            rounded-md
            border border-gray-300
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-pink-500
            focus:ring-offset-2
          "
          @click="submitForm"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
