import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface QuotationState {
  quotationList: any;
  quotationDetails: any;
  pageNum: number;
  pageSize: number;
  sortBy: string;
  filterBy: string;
  isLoading: boolean;
  quotationFetchStatus: boolean;
  quotationUpdated: boolean;
}
const state = () => ({
  quotationList: [],
  quotationDetails: [],
  pageNum: 0,
  pageSize: 10,
  sortBy: "id",
  filterBy: "",
  isLoading: true,
  quotationFetchStatus: false,
  quotationUpdated: false,
});

const getters = {
  getQuotationList: (state: QuotationState) => {
    return () => state.quotationList;
  },
  getQuotationDetails: (state: QuotationState) => {
    return () => state.quotationDetails;
  },
};

export const useQuotationStore = defineStore("quotation", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.quotationFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.quotationUpdated = status;
    },
    async fetchQuotation() {
      this.isLoading = true;
      const { data } = await useFetch(
        `${URL.Masters._QUOTATION}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}`
      )
        .get()
        .json();
      this.quotationList = data;
      this.isLoading = false;
      this.quotationFetchStatus = true;
    },

    async newQuotation(items: any) {
      const item = {
        organizationId: 1,
        enquiryId: items.enquiryId,
        serviceType: items.serviceType.id,
        customer: items.customer,
        salesman: items.salesman,
        name: items.agent,
        details: {
          general: {
            ...items,
          },
        },
      };
      try {
        const { data, error } = await useFetch(URL.Masters._QUOTATION)
          .post(item)
          .json();
        if (error.value) {
          return data;
        } else {
          this.quotationList = [...this.quotationList, data.value];
          this.fetchQuotation();
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateQuotation(items: any, id: number) {
      const item = {
        organizationId: 1,
        enquiryId: items.enquiryId,
        serviceType: items.serviceType.id,
        customer: items.customer,
        salesman: items.salesman,
        name: items.agent,
        details: {
          general: {
            ...items,
          },
        },
      };
      try {
        const { data, error } = await useFetch(URL.Masters._QUOTATION + `/${id}`)
          .put(item)
          .json();
        this.quotationList = data;
        this.quotationUpdated = true;
      } catch (err) {
        alert(err);
      }
    },

    async deleteQuotation(id: number) {
      try {
        const { data, error } = await useFetch(URL.Masters._QUOTATION + `/${id}`)
          .delete()
          .json();
        this.fetchQuotation();
        this.quotationUpdated = true;
      } catch (err) {
        console.log(err);
      }
    },
    async getQuotationById(id: number) {
      try {
        const { data, error } = await useFetch(URL.Masters._QUOTATION + `/${id}`)
          .get()
          .json();
        return data;
      } catch (err) {
        alert(err);
      }
    },

    async nextList() {
      this.pageNum = this.pageNum + 1;
      this.fetchQuotation();
    },
    async prevList() {
      this.pageNum = this.pageNum - 1;
      this.fetchQuotation();
    },
    async sortList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchQuotation();
    },
    async filterList(filterBy: string) {
      this.filterBy = filterBy;
      this.fetchQuotation();
    },
  },
});

export default useQuotationStore;
