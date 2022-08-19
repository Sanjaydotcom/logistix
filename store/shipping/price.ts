import { General } from "../../types/employee";
import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

interface PriceState {
  PriceList: any;
  pageNum: number;
  pageSize: number;
  sortBy: string;
  searchKeyword: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  priceUpdatedStatus: boolean;
  currentPriceAttachments: any;
  filters: string;
}
const state = () => ({
  PriceList: [],
  pageNum: 0,
  pageSize: 10,
  sortBy: 'id',
  searchKeyword: " ",
  isLoding: true,
  listFetchStatus: false,
  priceUpdatedStatus: false,
  filters: "",
});
const getters = {
  getPriceListsFromState: (state: PriceState) => {
    return () => state.PriceList;
  },
};
export const usePriceStore = defineStore("customers", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.priceUpdatedStatus = status;
    },
    async fetchPriceList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Pricing.PRICE}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
      )
        .get()
        .json();
      this.PriceList = data;
      this.isLoding = false;
      this.listFetchStatus = true;
    },
    async nextList() {
      this.pageNum = (await this.pageNum) + 1;
      this.fetchPriceList();
    },
    async prevList() {

      if (this.pageNum > 0) {
        this.pageNum = (await this.pageNum) - 1;
        this.fetchPriceList();
      }
    },
    async sortList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchPriceList();
    },
    async searchList(search: string) {
      this.searchKeyword = search;
      this.fetchPriceList();
    },
    async addNew(items: any) {
      try {
        const { data, error } = await useFetch(URL.Pricing.PRICE)
          .post(items)
          .json();
        this.fetchPriceList();
        this.listFetchStatus = true;
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async update(items: any, id: number) {
      try {
        const { data, error } = await useFetch(URL.Pricing.PRICE + `/${id}`)
          .put(items)
          .json();
        this.fetchPriceList();
        this.listFetchStatus = true;
        if (error.value) {
          return data;
        } else {
          this.priceUpdatedStatus = true;
          return data;
        }
      } catch (err) {
        alert(err);
      }
    },
    async delete(id: number) {
      try {
        const { data, error } = await useFetch(URL.Pricing.PRICE + `/${id}`)
          .delete()
          .json();
        this.fetchPriceList();
        this.listFetchStatus = true;
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async getById(id: number) {
      try {
        const { data, error } = await useFetch(URL.Pricing.PRICE + `/${id}`)
          .get()
          .json();
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async getDataByServiceTypeFilter(id: number) {
      try {
        const { data, error } = await useFetch(
          `${URL.Pricing.PRICE_SERVICE_TYPE_FILTER}?serviceType=${id}`
        )
          .get()
          .json();
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async getDataByServiceModeFilter(id: number) {
      try {
        const { data, error } = await useFetch(
          `${URL.Pricing.PRICE_SERVICE_MODE_FILTER}?serviceMode=${id}`
        )
          .get()
          .json();
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async listDataByFilter(param: any) {
      let parameter = [];
      const carrier = `carrier=${param.carrier}&`;
      const destinationCountry = `destination=${param.destinationCountry}&`;
      const originCountry = `origin=${param.originCountry}&`;
      const serviceType = `serviceType=${param.serviceType.id}&`;
      const serviceMode = `serviceMode=${param.serviceMode.id}&`;

      param.serviceType != "" ? parameter.push(serviceType) : "";
      param.serviceMode != "" ? parameter.push(serviceMode) : "";
      param.originCountry != "" ? parameter.push(originCountry) : "";
      param.destinationCountry != "" ? parameter.push(destinationCountry) : "";
      param.carrier != "" ? parameter.push(carrier) : "";
      try {
        const { data, error } = await useFetch(
          `${URL.Pricing.PRICE_LIST_BY_FILTER}?${parameter.join("")}`
        )
          .get()
          .json();
        this.PriceList = data;
         this.listFetchStatus = true;
        if (param.originCountry)
          this.filters = "Filter By " + param.originCountry;
        return data;
      } catch (err) {
        alert(err);
      }
    },
  },
});
export default usePriceStore;
