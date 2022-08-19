<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useCustomerStore } from "@/store/crm/customers";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ContainerForm",
  props: ["id", "tooggleFormAction", "toggleNotification", "editData", "state"],
  setup(props) {
    const store = useCustomerStore();
    const containerForm = reactive({
      ttl: "",
      containertype: "",
      weight: "",
      volume: "",
    });

    watchEffect(() => {
      if (props.editData) {
        containerForm.ttl = props.editData.ttl;
        containerForm.containertype = props.editData.containertype;
        containerForm.weight = props.editData.weight;
        containerForm.volume = props.editData.volume;
      }
    });
    const rules = computed(() => {
      return {
        ttl: { required },
        containertype: { required },
        weight: { required },
        volume: { required },
      };
    });
    const v$ = useValidate(rules, containerForm);
    return { containerForm, v$, store };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.editData) {
          const updatedArr = await this.state.container.map((item) =>
            item.id == this.editData.id
              ? { id: this.editData.id, ...this.containerForm }
              : item
          );

          this.state.container = [...updatedArr];
        } else {
          let newId = uuidv4();
          console.log(newId);
          let newCommmodity = { ...this.containerForm, id: newId };
          this.state.container = [...this.state.container, newCommmodity];
        }
        this.toggleNotification();
        this.tooggleFormAction();
      }
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-6 gap-6">
    <div class="col-span-6 sm:col-span-2">
      <label for="ttl" class="block text-sm font-medium text-gray-700"
        >TTL Container</label
      >
      <input
        type="text"
        v-model="containerForm.ttl"
        name="ttl"
        id="ttl"
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
      <span v-if="v$.ttl.$error" class="font-small text-xs text-red-600">
        {{ v$.ttl.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="containertype" class="block text-sm font-medium text-gray-700"
        >Container Type</label
      >
      <InputCodesDropDown
        :state="state"
        inputName="containertype"
        kind="ContainerType"
        :v="this.v$"
        v-model="containerForm.containertype"
        name="containertype"
        id="containertype"
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
        v-if="v$.containertype.$error"
        class="font-small text-xs text-red-600"
      >
        {{ v$.containertype.$errors[0].$message }}
      </span>
    </div>

    <div class="col-span-6 sm:col-span-2">
      <label for="weight" class="block text-sm font-medium text-gray-700">
        Weight</label
      >
      <input
        type="number"
        v-model="containerForm.weight"
        name="weight"
        id="weight"
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
      <span v-if="v$.weight.$error" class="font-small text-xs text-red-600">
        {{ v$.weight.$errors[0].$message }}
      </span>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="volume" class="block text-sm font-medium text-gray-700"
        >Volume</label
      >
      <input
        type="number"
        v-model="containerForm.volume"
        name="volume"
        id="volume"
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
      <span v-if="v$.volume.$error" class="font-small text-xs text-red-600">
        {{ v$.volume.$errors[0].$message }}
      </span>
    </div>
  </div>

  <div class="flex flex-shrink-0 justify-end bg-gray-50 px-4 py-2">
    <button
      type="button"
      @click="tooggleFormAction"
      class="
        mr-3
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
    >
      Cancel
    </button>
    <button
      type="submit"
      class="
        justify-center
        rounded-md
        border border-gray-300
        bg-white
        px-4
        py-1
        text-sm
        font-medium
        text-gray-700
        shadow-sm
        hover:bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
      "
      @click="submitForm"
    >
      {{ editData && editData.id ? "Edit Container" : "Add Container" }}
    </button>
  </div>
</template>
