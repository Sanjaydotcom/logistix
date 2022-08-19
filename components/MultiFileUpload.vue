<script>
export default {
  props: ["callBack", "labelText"],
  data() {
    return {
      isDragging: false,
      imageSources: [],
    };
  },
  computed: {
    getClasses() {
      return { isDragging: this.isDragging };
    },
  },
  methods: {
    dragOver() {
      this.isDragging = true;
    },
    dragLeave() {
      this.isDragging = false;
    },
    async drop(e) {
      let files = [...e.dataTransfer.files];
      let images = files.filter((file) => file.type.indexOf("image/") >= 0);
      let promises = [];
      images.forEach((file) => {
        promises.push(this.getBase64(file));
      });
      let sources = await Promise.all(promises);
      this.imageSources = this.imageSources.concat(sources);
      this.callBack(imageSources);
      this.isDragging = false;
    },
    requestUploadFile() {
      var src = this.$el.querySelector("#uploadmyfile");
      this.drop({ dataTransfer: src });
    },
    getBase64(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    async removeLatest() {
      this.imageSources.splice(this.imageSources.length - 1, 1);
    },
  },
  setup(props) {
    const dropDownView = ref(false);

    async function iconClick() {
      dropDownView.value = await !dropDownView.value;
    }

    return { iconClick, dropDownView };
  },
};
</script>
<template>
  <div>
    <div
      class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-2 text-center hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1"
      style="background-color: #ffffff"
    >
      <div
        style="display: flex; flex-direction: row-reverse"
        v-if="imageSources.length != 0"
      >
        <button @click="removeLatest">
          <svg
            class="h-4 w-4"
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
      <div
        class="drop"
        :class="getClasses"
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)"
      >
        <div class="img" v-for="img in imageSources">
          <img :src="img" />
        </div>

        <h1 v-if="imageSources.length == 0 && !isDragging">Drop some images</h1>

        <div class="manual">
          <label for="uploadmyfile" style="cursor: pointer">
            <p>or pick from device</p>
          </label>
          <input
            type="file"
            id="uploadmyfile"
            :accept="'image/*'"
            multiple
            @change="requestUploadFile"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.drop {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 10px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-top: 0rem;
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
}
.isDragging {
  background-color: #999;
  border-color: #fff;
}
.img {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.manual {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  text-decoration: underline;
}
#uploadmyfile {
  display: none;
}
</style>
