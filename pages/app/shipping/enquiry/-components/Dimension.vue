<script>
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { useEnquiryStore } from "~~/store/crm/enquiry";
import { reactive, computed, watchEffect } from "vue";
import { storeToRefs } from "pinia";
export default {
  props: ["showDimension", "toggleDimension", "state", "setDimension"],
  setup(props) {
    const store = useEnquiryStore();

    const showDimension = ref(props.showDimension);
    const toggleDimension = ref(props.toggleDimension);
    const setDimension = ref(props.setDimension);
    const parentState = ref(props.state);

    const showAdd = ref(true);
    const toggleAdd = () => {
      showAdd.value = !showAdd.value;
    };
    const calculate = () => {
      totalVolume.value = 0;
      totalWeight.value = 0;
      totalPkg.value = 0;
      table.value.map(cal);
    };
    const cal = (item) => {
      totalVolume.value = totalVolume.value + item.totalVolume;
      totalWeight.value = totalWeight.value + item.weight;
      totalPkg.value = totalPkg.value + item.pkg;
    };

    const del = (id) => {
      const afterDel = table.value.filter((dim) => dim.id != id);

      table.value = afterDel;
    };

    const addNew = () => {
      toggleAdd();
      state.id = "";
      state.lUnit = "";
      state.lengthOf = "";
      state.width = "";
      state.height = "";
      state.volume = "";
      state.uom = "";
      state.pkg = "";
      state.totalVolume = "";
      state.weight = "";
      state.stackable = "";
      state.tiltable = "";
      setTimeout(() => {
        v$.value.$reset();
      }, 0);
    };
    const edit = (id) => {
      const editDimension = table.value.find((dim) => dim.id == id);
      toggleAdd();
      state.id = editDimension.id;
      state.lUnit = editDimension.lUnit;
      state.lengthOf = editDimension.lengthOf;
      state.width = editDimension.width;
      state.height = editDimension.height;
      state.volume = editDimension.volume;
      state.uom = editDimension.uom;
      state.pkg = editDimension.pkg;
      state.totalVolume = editDimension.totalVolume;
      state.weight = editDimension.weight;
      state.stackable = editDimension.stackable;
      state.tiltable = editDimension.tiltable;
    };

    const table = ref([]);
    const totalVolume = ref(0);
    const totalWeight = ref(0);
    const totalPkg = ref(0);
    const state = reactive({
      id: "",
      lUnit: "",
      lengthOf: "",
      width: "",
      height: "",
      volume: "",
      uom: "",
      pkg: "",
      totalVolume: "",
      weight: "",
      stackable: "",
      tiltable: "",
    });
    const rules = computed(() => {
      return {
        lUnit: { required },
        lengthOf: { required, numeric },
        width: { required, numeric },
        height: { required, numeric },
        volume: { required, numeric },
        uom: { required },
        pkg: { required },
        totalVolume: { required },
        weight: { required },
        stackable: { required },
        tiltable: { required },
      };
    });

    const v$ = useValidate(rules, state);
    watchEffect(() => {
      state.volume = state.height * state.width * state.lengthOf;
      state.totalVolume = state.volume * state.pkg;
    });
    onMounted(() => {
      if (parentState.value.dimension.length > 0) {
        table.value = parentState.value.dimension;
        showAdd.value = false;
        calculate();
      }
    });

    return {
      state,
      v$,
      showDimension,
      toggleDimension,
      showAdd,
      toggleAdd,
      table,
      setDimension,
      cal,
      totalVolume,
      totalPkg,
      totalWeight,
      calculate,
      del,
      addNew,
      edit,
    };
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.toggleAdd();
        if (this.state.id) {
          const edited = this.table.map((dim) =>
            dim.id == this.state.id ? this.state : dim
          );
          this.table = edited;
        } else {
          if (this.table.length != 0) {
            const prev = this.table[this.table.length - 1];
            this.state.id = prev.id + 1;
          } else {
            this.state.id = 1;
          }

          this.table.push({ ...this.state });
        }

        this.calculate();
      }
    },
    async submitSave() {
      if (this.table.length > 0) {
        this.toggleDimension();
        this.setDimension(
          this.table,
          this.totalVolume,
          this.totalPkg,
          this.totalWeight
        );
      }
    },
  },
};
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6"
        >
          <div>
            <div class="px-4">
              <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                  <h1 class="text-xl font-medium text-gray-900">Dimension</h1>
                  <p class="mt-2 text-sm text-gray-700">
                    Dimension details of enquiry.
                  </p>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    @click="toggleDimension"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md bg-gray-200 text-sm text-gray-400 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                  >
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
            <!-- Parent tabs -->

            <div>
              <div class="mt-4 text-right sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  v-if="!showAdd"
                  @click="addNew"
                  type="button"
                  class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add More
                </button>
              </div>
              <!-- table -->
              <div v-if="table.length > 0" class="px-4">
                <div class="my-2 mt-4 flex flex-col">
                  <div class="-my-2 px-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                      class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                    >
                      <div
                        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                      >
                        <table class="min-w-full divide-y divide-gray-300">
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                              >
                                Unit
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Length
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Width
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Height
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Volume
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                UOM
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Packages
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Total volume
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Weight
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Stackable
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Tiltable
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            v-for="item in table"
                            :key="item.id"
                            class="divide-y divide-gray-200 bg-white"
                          >
                            <tr>
                              <td
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                {{ item.lUnit }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.lengthOf }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.width }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.height }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.volume }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.uom }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.pkg }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.totalVolume }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.weight }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.stackable }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                {{ item.tiltable }}
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                <svg
                                  @click="edit(item.id)"
                                  class="h-4 w-4 cursor-pointer"
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
                              </td>
                              <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              >
                                <svg
                                  @click="del(item.id)"
                                  class="h-4 w-4 cursor-pointer"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  ></path>
                                </svg>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            Total Volume: {{ totalVolume }}
                          </td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            Total Weight: {{ totalWeight }}
                          </td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            Total Packages: {{ totalPkg }}
                          </td>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--table end-->
              <div
                v-if="showAdd"
                class="relative transform overflow-hidden rounded-lg bg-white px-2 text-left transition-all sm:w-full sm:max-w-6xl sm:p-6"
              >
                <div class="mb-4 grid grid-cols-12 gap-y-4 gap-x-4 p-3 border">
                  <div
                    class="col-span-12 text-sm font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Per Package
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Unit</label
                    >
                    <select
                      v-model="state.lUnit"
                      id="lUnit"
                      name="lUnit"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="m">meter (m)</option>
                      <option value="cm">centimeter (cm)</option>
                    </select>
                    <span
                      v-if="v$.lUnit.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.lUnit.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Length</label
                    >
                    <input
                      type="number"
                      name="length"
                      id="length"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.lengthOf"
                    /><span
                      v-if="v$.lengthOf.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.lengthOf.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Width</label
                    ><input
                      type="number"
                      name="width"
                      id="width"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.width"
                    /><span
                      v-if="v$.width.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.width.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Height</label
                    ><input
                      type="number"
                      name="height"
                      id="height"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.height"
                    /><span
                      v-if="v$.height.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.height.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Volume</label
                    >
                    <input
                      type="number"
                      name="volume"
                      id="volume"
                      readonly
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.volume"
                    />
                    <span
                      v-if="v$.volume.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.volume.$errors[0].$message }}
                    </span>
                  </div>
                  </div>
                      <div class=" grid grid-cols-12 gap-y-4 gap-x-4 p-3 border">
                  <div
                    class="col-span-12 text-sm font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Total
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >UOM</label
                    >
                    <select
                      v-model="state.uom"
                      id="uom"
                      name="uom"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="kg">kilogram (Kg)</option>
                      <option value="t">tonne (t)</option>
                    </select>
                    <span
                      v-if="v$.uom.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.uom.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Packages</label
                    >
                    <input
                      type="number"
                      name="pkg"
                      id="pkg"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.pkg"
                    />
                    <span
                      v-if="v$.pkg.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.pkg.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Total volume</label
                    >
                    <input
                      type="number"
                      name="totalVolume"
                      id="totalVolume"
                      readonly
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.totalVolume"
                    />
                    <span
                      v-if="v$.totalVolume.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.totalVolume.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Weight</label
                    >
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      v-model="state.weight"
                    />
                    <span
                      v-if="v$.weight.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.weight.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Stackable</label
                    ><select
                      v-model="state.stackable"
                      id="stackable"
                      name="stalable"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <span
                      v-if="v$.stackable.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.stackable.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Tiltable</label
                    >

                    <select
                      v-model="state.tiltable"
                      id="tiltable"
                      name="tiltable"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <span
                      v-if="v$.tiltable.$error"
                      class="font-small text-xs text-red-600"
                    >
                      {{ v$.tiltable.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="sm:flex sm:items-center">
                  <div class="sm:flex-auto"></div>
                  <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
                </div>
                <div class="mt-5 text-right sm:mt-6">
                  <button
                    v-if="table.length > 0"
                    @click="toggleAdd"
                    type="button"
                    class="mt-3 mr-4 inline-flex w-max justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    @click="submitForm"
                    type="button"
                    class="mr-1 inline-flex w-max justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  >
                    {{ state.id ? "Edit" : "Add" }}
                  </button>
                </div>
              </div>
              <div v-if="!showAdd" class="mt-5 text-right sm:mt-6">
                <button
                  @click="toggleDimension"
                  type="button"
                  class="mt-3 mr-4 inline-flex w-max justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                >
                  Exit
                </button>
                <button
                  @click="submitSave"
                  type="button"
                  class="mr-1 inline-flex w-max justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
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
</template>
