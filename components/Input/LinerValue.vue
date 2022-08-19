<script>
import { useCommonDropDownStore } from "~~/store/commonDropDowns";
import LinerDropDownVue from "./LinerDropDown.vue";

export default {
  name: "LinerValue",
  props: ["id"],
  setup(props) {
    const store = useCommonDropDownStore();
    const linerName = ref("");
    onMounted(() => {
      Fetchliner();
    });
    async function Fetchliner() {
      linerName.value = await store.getLinerNameById(props.id);
    }

    return { name: computed(() => String(linerName.value)) };
  },
};
</script>

<template>
  <div>
    {{ name }}
  </div>
</template>
