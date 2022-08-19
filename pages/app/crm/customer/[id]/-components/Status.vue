<script>
export default {
  props: ["status"],
  setup(props) {
    const status = props.status;
    return {
      status,
    };
  },
};
</script>

<template>
  <span
    class="inline-flex justify-center rounded-md px-4 py-1 text-sm font-medium"
    :class="[
      status === 'Active'
        ? 'bg-green-100 text-green-800'
        : 'bg-blue-100 text-blue-800',
    ]"
  >
    {{ status }}
  </span>
</template>
