import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface CommodityState {
  directorylist: any;
  pageNum: number;
  pageCount: number;
  pageSize: number;
  filterType: string;
  searchKeyword: string;
  sortBy: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  commodityUpdated: boolean;
}
const state = () => ({
  directorylist: [],
  pageNum: 0,
  pageSize: 10,
  pageCount: 10,
  filterType: "Filter",
  searchKeyword: " ",
  sortBy: "id",
  isLoding: true,
  listFetchStatus: false,
  commodityUpdated: false,
});

const getters = {
  getDirectoryLists: (state: CommodityState) => {
    return () => state.directorylist;
  },
  getFilterType: (state: CommodityState) => {
    return () => state.filterType;
  },
};

export const useCommodityStore = defineStore("commodity", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.commodityUpdated = status;
    },
    async fetchList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Masters._COMMODITY}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
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
      const { data } = await useFetch(`${URL.Masters._COMMODITY}/${id}`)
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
        const { data, error } = await useFetch(URL.Masters._COMMODITY)
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
          URL.Masters._COMMODITY + `/${id}`
        )
          .put(updateData)
          .json();

        if (error.value) {
          return data;
        } else {
          return data;
          this.commodityUpdated = true;
        }
      } catch (err) {
        alert(err);
      }
    },
    async delete(id: number) {
      try {
        const { data, error } = await useFetch(
          URL.Masters._COMMODITY + `/${id}`
        )
          .delete()
          .json();
        this.fetchList();
        this.commodityUpdated = true;
      } catch (err) {
        alert(err);
      }
    },
  },
});

export default useCommodityStore;
