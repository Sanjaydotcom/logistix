<script>
import myUpload from "vue-image-crop-upload";
export default {
  props: ["ChangeProfileOnClick"],
  data() {
    return {
      isDragging: false,
      imageSources: [],
      show: true,
      imgDataUrl: "",
    };
  },
  components: {
    "my-upload": myUpload,
  },
  setup(props) {
    const dropDownView = ref(false);

    async function callBack(callBackData) {
    }

    async function iconClick() {
      dropDownView.value = await !dropDownView.value;
    }
    return { iconClick, dropDownView, callBack };
  },
  methods: {
    async removeLatest() {
      this.imageSources.splice(this.imageSources.length - 1, 1);
    },

    toggleShow() {
      this.ChangeProfileOnClick(null);
      this.show = !this.show;
    },

    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl;
      this.ChangeProfileOnClick(imgDataUrl);
    },
  },
};
</script>
<template>
  <div id="app">
    <a class="btn" @click="toggleShow"></a>
    <my-upload
      field="img"
      @crop-success="cropSuccess"
      v-model="show"
      :width="250"
      :height="250"
      img-format="png"
      lang-type="en"
      noSquare="true"
    ></my-upload>
    <!-- <img :src="imgDataUrl" /> -->
  </div>
</template>
<style>
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container {
  background-color: #e5e5e0;
  display: block;
  height: 230px;
  overflow: hidden;
  position: relative;
  width: 340px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade.vicp-img-shade-1 {
  height: 230px !important;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade.vicp-img-shade-2 {
  height: 230px !important;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate a {
  background-color: #eeeee0;
}
</style>
