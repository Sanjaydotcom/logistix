import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface LinerState {
  directorylist: any;
  pageNum: number;
  pageSize: number;
  pageCount: number;
  filterType: string;
  searchKeyword: string;
  sortBy: string;
  filterBy: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  linerUpdated: boolean;
}
const state = () => ({
  directorylist: [],
  pageNum: 0,
  pageSize: 10,
  pageCount: 10,
  filterType: "Filter",
  sortBy: "id",
  filterBy: "",
  searchKeyword: " ",
  isLoding: true,
  listFetchStatus: false,
  linerUpdated: false,
});

const getters = {
  getDirectoryLists: (state: LinerState) => {
    return () => state.directorylist;
  },
  getFilterType: (state: LinerState) => {
    return () => state.filterType;
  },
};

export const useLinerStore = defineStore("commodity", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.linerUpdated = status;
    },
    async fetchList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Masters._LINER}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
      )
        .get()
        .json();
      this.directorylist = data;
      this.pageCount = this.directorylist.length;
      this.isLoding = false;
      this.listFetchStatus = true;
    },
    async fetchFilteredList() {
      this.Loading = true;
      const { data } = await useFetch(
        `${URL.Masters._LINER}/filter/?kind=${this.filterBy}`
      )
        .get()
        .json();
      this.directorylist = data;
      this.isLoading = false;
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
    async filterList(filterBy: string) {
      this.filterBy = filterBy;
      this.fetchFilteredList();
      this.filterType = "Filtered by " + filterBy;
    },
    async getById(id: number) {
      this.profileUpdated = false;
      this.isLoding = true;
      const { data } = await useFetch(`${URL.Masters._LINER}/${id}`)
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
        const { data, error } = await useFetch(URL.Masters._LINER)
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
        const { data, error } = await useFetch(URL.Masters._LINER + `/${id}`)
          .put(updateData)
          .json();
        if (error.value) {
          return data;
        } else {
          return data;
          this.linerUpdated = true;
        }
      } catch (err) {
        alert(err);
      }
    },
    async delete(id: number) {
      try {
        const { data, error } = await useFetch(URL.Masters._LINER + `/${id}`)
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

export default useLinerStore;
