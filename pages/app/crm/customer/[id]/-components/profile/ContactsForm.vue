<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useCustomerStore } from "@/store/crm/customers";
export default {
  name: "EducationForm",
  props: ["id", "tooggleFormAction", "toggleNotification", "editData"],
  setup(props) {
    const store = useCustomerStore();
    const state = reactive({
      name: "",
      designation: "",
      department: "",
      contactNo: "",
      emailId: "",
      countryCode: "+91",
    });

    watchEffect(() => {
      if (props.editData) {
        state.name = props.editData.name;
        state.designation = props.editData.designation;
        state.department = props.editData.department;
        state.contactNo = props.editData.contactNo;
        state.emailId = props.editData.emailId;
      }
    });
    const rules = computed(() => {
      return {
        name: { required },
        designation: { required },
        department: { required },
        contactNo: { required },
        emailId: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$, store };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.editData) {
          await this.store.updateContacts(
            { ...this.state, id: this.editData.id },
            this.id,
            this.editData.id
          );
        } else {

          await this.store.addContacts(this.state, this.id);
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
            Add Contact Details
          </h3>
          <p class="mt-1 text-sm text-gray-500"></p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-4 gap-6">
            <div class="col-span-6 sm:col-span-2">
              <label
                for="university"
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

            <div class="col-span-6 sm:col-span-2">
              <label
                for="nationality"
                class="block text-sm font-medium text-gray-700"
                >Designation</label
              >
              <input
                type="text"
                v-model="state.designation"
                name="designation"
                id="designation"
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
                v-if="v$.designation.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.designation.$errors[0].$message }}
              </span>
            </div>

            <div class="col-span-6 sm:col-span-2">
              <label
                for="department"
                class="block text-sm font-medium text-gray-700"
                >Department</label
              >
              <input
                type="text"
                v-model="state.department"
                name="department"
                id="department"
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
                v-if="v$.department.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.department.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <InputContactWithCountryCode
                label="Mobile Number"
                :state="state"
                textFieldStateName="contactNo"
                countryCodeStateName="countryCode"
              />
              <span
                v-if="v$.contactNo.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.contactNo.$errors[0].$message }}
              </span>
            </div>

            <div class="col-span-6 sm:col-span-2">
              <label
                for="emailId"
                class="block text-sm font-medium text-gray-700"
                >Email Id</label
              >
              <div class="relative mt-1 rounded-md shadow-sm">
                <div
                  class="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pl-3
                  "
                >
                  <!-- Heroicon name: solid/mail -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  v-model="state.emailId"
                  name="emailId"
                  id="emailId"
                  class="
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    pl-10
                    focus:border-indigo-500 focus:ring-indigo-500
                    sm:text-sm
                  "
                  placeholder="you@example.com"
                />
              </div>
              <span
                v-if="v$.emailId.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v$.emailId.$errors[0].$message }}
              </span>
            </div>
          </div>
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
