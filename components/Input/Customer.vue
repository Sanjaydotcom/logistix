<script>
import { useCustomerStore } from "~~/store/crm/customers";
import useValidate from "@vuelidate/core";
import { required, email, maxValue } from "@vuelidate/validators";
import { useFetch } from "@vueuse/core";

import { computed, ref, reactive } from "vue";
export default {
  props: ["state", "inputName", "name", "inputId"],
  setup(props) {
    const isLoading = ref(false);
    const inner_ref = ref(null);
    const showOptions = ref(false);
    const showCustomerAddModal = ref(false);
    const customerList = ref(null);
    const custState = reactive({
      name: "",
      kind: "",
      id: "",
      primaryContact: "",
    });
    const rules = computed(() => {
      return {
        name: {},
        kind: {},
      };
    });
    const v$ = useValidate(rules, custState);
    useClickOutSide(inner_ref, () => {
      showOptions.value = false;
    });
    const store = useCustomerStore();
    // const { listFetchStatus, directorylist } = storeToRefs(store);
    const fetchData = async () => {
      if (customerList.value === null) {
        const { data } = await useFetch(
        `${URL.Crm.Customers}/all`
      ) 
        .get()
        .json();
        customerList.value = data.value;
      }
    }; 

    onMounted(() => {
      fetchData();
    });
    const updateOptions = (option) => {
      customerList.value.push(option);
      showOptions.value = true;
    };

    const openCustModal = () => {
      showCustomerAddModal.value = !showCustomerAddModal.value;
    };
    const setValue = (option) => {
      props.state[String(props.inputName)] = option.name;
      props.state[String(props.inputId)] = option.id;

      showOptions.value = false;
    };

    const filteredOptions = computed(() =>
      props.state[props.inputName].value === ""
        ? customerList?.value
        : customerList?.value?.filter((option) => {
            return option.name
              .toLowerCase()
              .includes(props.state[props.inputName].toLowerCase());
          })
    );
    return {
      filteredOptions,

      setValue,
      showOptions,
      store,
      updateOptions,
      customerList,
      fetchData,
      showCustomerAddModal,
      openCustModal,
      custState,
      isLoading,
      inner_ref,
      v$,
    };
  },

  methods: {
    async submitForm() {
      this.v$.$validate();
      const saveData = {
        details: {
          general: {
            firstName: this.custState.name,
            primaryContact: this.state.primaryContact,
            customerType: "NON_CREDIT",
          },
        },
        name: this.custState.name,
        kind: "NON_CREDIT",
      };
      if (!this.v$.$error) {
        this.isLoading = true;
        await this.store.addNew(saveData);
        this.updateOptions(this.custState);
        this.isLoading = false;
        this.openCustModal();
      }
    },
  },
};
</script>

<template>
  <div ref="inner_ref">
    <label :for="inputName" class="block text-sm font-medium text-gray-700">{{
      name
    }}</label>
    <div class="relative mt-1">
      <input
        :name="inputName"
        :id="inputName"
        v-model="state[inputName]"
        type="text"
        class="
          w-full
          rounded-md
          border border-gray-300
          bg-white
          py-2
          pl-3
          pr-12
          shadow-sm
          focus:border-indigo-500
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          sm:text-sm
        "
        @focus="showOptions = true"
        role="combobox"
        aria-controls="options"
        aria-expanded="false"
      />
      <button
        type="button"
        @click="showOptions = true"
        class="
          absolute
          inset-y-0
          right-0
          flex
          items-center
          rounded-r-md
          px-2
          focus:outline-none
        "
      >
        <!-- Heroicon name: solid/selector -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <ul
        v-if="showOptions"
        class="
          absolute
          z-10
          mt-1
          max-h-60
          w-full
          overflow-auto
          rounded-md
          bg-white
          py-1
          text-base
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          sm:text-sm
        "
      >
        <!--
        Combobox option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Active: "text-white bg-indigo-600", Not Active: "text-gray-900"
      -->
        <li
          class="
            relative
            cursor-pointer
            select-none
            py-2
            pl-3
            pr-9
            text-gray-900
          "
          v-for="option in filteredOptions"
          :key="option.id"
          :id="option.id"
          role="option"
          @click="setValue(option)"
        >
          <!-- Selected: "font-semibold" -->
          <span class="block truncate">{{ option.name }}</span>

          <!--
          Checkmark, only display for selected option.

          Active: "text-white", Not Active: "text-indigo-600"
        -->
          <span
            v-if="state[inputName] == option.name"
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-4
              text-indigo-600
            "
          >
            <!-- Heroicon name: solid/check -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </li>
        <li class="relative cursor-pointer select-none py-2 px-3 text-gray-900">
          <button
            type="button"
            class="
              w-full
              rounded
              border border-gray-300
              bg-white
              px-2.5
              py-1.5
              text-xs
              font-medium
              text-gray-700
              shadow-sm
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
            "
            @click="openCustModal"
          >
            Add Customer
          </button>
        </li>

        <!-- More items... -->
      </ul>
    </div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="showCustomerAddModal"
    >
      <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            p-4
            text-center
            sm:items-center sm:p-0
          "
        >
          <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
          <div
            class="
              relative
              transform
              overflow-hidden
              rounded-lg
              bg-white
              px-4
              pt-5
              pb-4
              text-left
              shadow-xl
              transition-all
              sm:my-8 sm:w-full sm:max-w-lg sm:p-6
            "
          >
            <h3
              class="mb-3 text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Add Customer
            </h3>
            <div class="mt-2">
              <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-12">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Entity / Customer Name
                  </label>
                  <input
                    type="text"
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
                    v-model="custState.name"
                  />
                  <span
                    v-if="v$.name.$error"
                    class="font-small text-xs text-red-600"
                  >
                    {{ v$.name.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>

            <div
              class="bg-gray-50 px-4 pt-4 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <LoadingButton
                text="Add Customer"
                :onPress="submitForm"
                :isLoading="isLoading"
              />
              <button
                type="button"
                @click="openCustModal"
                class="
                  mt-3
                  inline-flex
                  w-full
                  justify-center
                  rounded-md
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-base
                  font-medium
                  text-gray-700
                  shadow-sm
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                "
              >
                Cancel
              </button>
              <button
                type="button"
                class="
                  justify-left
                  mt-3
                  inline-flex
                  w-full
                  rounded-md
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-base
                  font-medium
                  text-gray-700
                  shadow-sm
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                "
              >
                <NuxtLink :to="`/app/crm/customer`">
                  Edit In Full Scrren
                </NuxtLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- This example requires Tailwind CSS v2.0+ -->
</template>
