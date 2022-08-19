import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface TerritoryState {
  directorylist: any;
  pageNum: number;
  pageCount: number;
  pageSize: number;
  filterType: string;
  searchKeyword: string;
  sortBy: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  territoryUpdated: boolean;
}
const state = () => ({
  directorylist: [],
  pageNum: 0,
  pageSize: 10,
  pageCount: 10,
  filterType: "Filter",
  sortBy: "id",
  searchKeyword: " ",
  isLoding: true,
  listFetchStatus: false,
  territoryUpdated: false,
});

const getters = {
  getDirectoryLists: (state: TerritoryState) => {
    return () => state.directorylist;
  },
  getFilterType: (state: TerritoryState) => {
    return () => state.filterType;
  },
};

export const useTerritoryStore = defineStore("territory", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.territoryUpdated = status;
    },
    async fetchList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Masters._TERRITORY}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
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
    },
    async getById(id: number) {
      this.profileUpdated = false;
      this.isLoding = true;
      const { data } = await useFetch(`${URL.Masters._TERRITORY}/${id}`)
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
        const { data, error } = await useFetch(URL.Masters._TERRITORY)
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
          URL.Masters._TERRITORY + `/${id}`
        )
          .put(updateData)
          .json();

        if (error.value) {
          return data;
        } else {
          return data;
          this.territoryUpdated = true;
        }
      } catch (err) {
        alert(err);
      }
    },
    async delete(id: number) {
      try {
        const { data, error } = await useFetch(
          URL.Masters._TERRITORY + `/${id}`
        )
          .delete()
          .json();
        this.fetchList();
        this.territoryUpdated = true;
      } catch (err) {
        alert(err);
      }
    },
  },
});

export default useTerritoryStore;
