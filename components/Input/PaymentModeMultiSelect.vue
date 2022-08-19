<style src="@vueform/multiselect/themes/default.css"></style>
<script>
import Multiselect from "@vueform/multiselect";
export default {
  props: ["state", "inputName"],
  components: { Multiselect },
  data() {
    return {
      options: ["Cash", "Credit", "Card", "Cheque", "PDC", "Transfer"],
    };
  },
};
</script>
<template>
  <div>
    <label for="lastName" class="mb-1 block text-sm font-medium text-gray-700"
      >Payment modes
    </label>
    <Multiselect
      v-model="state[inputName]"
      :options="options"
      mode="tags"
      :searchable="true"
      :close-on-select="false"
      :classes="{
        tag: 'bg-gray-200 text-gray-700 text-sm py-0.5 pl-2 rounded-sm mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
        containerActive: 'border-none outline-none ring-opacity-10',
        tagsSearch:
          'absolute inset-0 border-0 font-sm outline-none focus:ring-0 appearance-none p-0 text-base border-none box-border w-full ',
      }"
    />
  </div>
</template>
