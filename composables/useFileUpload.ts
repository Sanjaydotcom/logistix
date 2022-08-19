import { useFetch } from "@vueuse/core";
import { URL } from "@/composables/api/index";

export default async function useFileUpload(uploadData) {
  try {
    const fileUpload = await useFetch(`${URL.Document.UPLOAD}`)
      .post(uploadData)
      .json();
    return fileUpload.data.value;
  } catch (err) {
    console.log(err);
  }
}
