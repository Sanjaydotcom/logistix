export function useClickOutSide(ref, callback_fn) {
  if (!ref) return;
  let listener = (e) => {
    if (e.target == ref.value || e.composedPath().includes(ref.value)) {
      return;
    }
    if (typeof callback_fn === "function") {
      callback_fn();
    }
  };
  onMounted(() => {
    window.addEventListener("click", listener);
  });
  onBeforeMount(() => {
    window.removeEventListener("click", listener);
  });
  return{
    listener
  }
}
