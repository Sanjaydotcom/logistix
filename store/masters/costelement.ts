import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface CostelementState {
  directorylist: any;
  pageNum: number;
  pageSize: number;
  pageCount: number;
  filterType: string;
  searchKeyword: string;
  sortBy: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  costelementUpdated: boolean;
}
const state = () => ({
  directorylist: [],
  pageNum: 0,
  pageSize: 10,
  pageCount: 10,
  sortBy: "id",
  filterType: "Filter",
  searchKeyword: " ",
  isLoding: true,
  listFetchStatus: false,
  costelementUpdated: false,
});

const getters = {
  getDirectoryLists: (state: CostelementState) => {
    return () => state.directorylist;
  },
  getFilterType: (state: CostelementState) => {
    return () => state.filterType;
  },
};

export const useCostelementStore = defineStore("costelement", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.costelementUpdated = status;
    },
    async fetchList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Masters._COSTELEMENT}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
      )
        .get()
        .json();
      this.directorylist = data;
      this.pageCount = this.directorylist.length;
      this.isLoding = false;
      this.listFetchStatus = true;
    },
    async nextList() {
      this.pageNum = this.pageNum + 1;
      this.fetchList();
    },
    async prevList() {
      this.pageNum = this.pageNum - 1;
      this.fetchList();
    },
    async searchList(search: string) {
      this.searchKeyword = search;
      this.fetchList();
    },
    async sortList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchList();
      this.filterType = "Sorted by " + sortBy;
    },
    async getById(id: number) {
      this.profileUpdated = false;
      this.isLoding = true;
      const { data } = await useFetch(`${URL.Masters._COSTELEMENT}/${id}`)
        .get()
        .json();
      this.isLoding = false;
      return data;
    },
    async addNew(items: any, id: number) {
      const addNew = {
        ...items,
      };
      try {
        const { data, error } = await useFetch(URL.Masters._COSTELEMENT)
          .post(addNew)
          .json();
        if (error.value) {
          return data;
        } else {
          this.directorylist = [...this.directorylist, data.value];
          this.listFetchStatus = true;
          return data;
        }
      } catch (err) {
        alert(err);
      }
    },
    async update(items: any, id: number) {
      try {
        const updateData = {
          ...items,
        };
        const { data, error } = await useFetch(
          URL.Masters._COSTELEMENT + `/${id}`
        )
          .put(updateData)
          .json();
        if (error.value) {
          return data;
        } else {
          return data;
          this.costelementUpdated = true;
        }
      } catch (err) {
        alert(err);
      }
    },
    async delete(id: number) {
      try {
        const { data, error } = await useFetch(
          URL.Masters._COSTELEMENT + `/${id}`
        )
          .delete()
          .json();
        this.fetchList();
        this.listFetchStatus = true;
      } catch (err) {
        alert(err);
      }
    },
  },
});

export default useCostelementStore;
