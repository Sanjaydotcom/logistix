import { defineStore } from "pinia";
const state = () => ({
  accessToken: "",
  homeAccountId: "",
});

const getters = {
  getHomeAccountId: (state) => {
    return state.homeAccountId;
  },
};

export const useAuthStore = defineStore("auth", {
  state,
  getters,
  actions: {
    async setHomeAccountId(id) {
      this.homeAccountId = id;
    },
    async setAccessToken(token) {
      this.accessToken = token;
    },
  },
});

export default useAuthStore;
