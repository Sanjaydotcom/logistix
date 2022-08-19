<script>
export default {
  props: ["state","label","inputName"],
  setup(props) {
    const label = ref(props.label);
    const hsCodeState = reactive({
      inputHsCode: "",
    });
    const addHsCode = (item) => {
      if(item != null && item != "") {
        props.state[props.inputName] = [...props.state[props.inputName],item];
      }
      hsCodeState.inputHsCode = "";
    };
    const removeHsCode = (item) => {
      if(item) {
        props.state[props.inputName] = props.state[props.inputName].filter((i) => i != item);
      }
    };
    return {
      label,
      hsCodeState,
      addHsCode,
      removeHsCode,
    };
  }
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">
      {{label}}
    </label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <input 
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300" 
          type="text" 
          placeholder="Type HS Code"
          name="hscode" 
          v-model="hsCodeState.inputHsCode"
        >
      </div>
      <button 
        @click="addHsCode(hsCodeState.inputHsCode)"
        type="button" 
        class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <!-- Heroicon name: solid/sort-ascending -->
        <svg 
          class="h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fill-rule="evenodd" 
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
            clip-rule="evenodd" 
          />
        </svg>
        <span>Add</span>
      </button>
    </div>
    <div class="flex flex-wrap">
      <div v-for="item in state[inputName]" :key="item">
        <span
          class="align-center ease  mt-2 ml-1 flex w-max cursor-pointer rounded-full bg-gray-200 px-4 py-0.5 text-xs font-semibold text-gray-500 transition duration-300 active:bg-gray-300"
        >
          {{ item}}
          <button
            @click="removeHsCode(item)"
            class="hover bg-transparent focus:outline-none"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              class="ml-3 w-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>