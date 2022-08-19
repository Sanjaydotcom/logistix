import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface EnquiryState {
  enquiryList: any;
  enquiryDetails: any;
  dimension: any;
  pageNum: number;
  pageSize: number;
  sortBy: string;
  searchKeyword: string;
  filterBy: string;
  isLoading: boolean;
  enquiryFetchStatus: boolean;
  enquiryUpdated: boolean;
  filters: string;
  filterList: any;
}
const state = () => ({
  enquiryList: [],
  enquiryDetails: [],
  dimension: [],
  pageNum: 0,
  pageSize: 10,
  sortBy: "id",
  filterBy: "",
  searchKeyword: " ",
  isLoading: true,
  enquiryFetchStatus: false,
  enquiryUpdated: false,
  filters: "",
  filterList: [],
});

const getters = {
  getEnquiryList: (state: EnquiryState) => {
    return () => state.enquiryList;
  },
  getEnquiryDetails: (state: EnquiryState) => {
    return () => state.enquiryDetails;
  },
};

export const useEnquiryStore = defineStore("enquiry", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.enquiryFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.enquiryUpdated = status;
    },
    async fetchEnquiry() {
      this.isLoading = true;
      const { data } = await useFetch(
        `${URL.Crm.Enquiries}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
      )
        .get()
        .json();
      this.enquiryList = data;
      this.isLoading = false;
      this.enquiryFetchStatus = true;
    },

    async newEnquiry(items: any) {
      const item = {
        organizationId: 0,
        name: items.customer,
        customerId: items.customerId,
        origin: items.origin,
        destination: items.destination,
        serviceMode: items.serviceMode.id,
        serviceType: items.serviceType.id,
        details: {
          general: {
            ...items,
          },
        },
      };
      try {
        const { data, error } = await useFetch(URL.Crm.Enquiries)
          .post(item)
          .json();
          this.fetchEnquiry();
          this.enquiryFetchStatus = true
        if (error.value) {
          return data;
        } else {
          this.enquiryList = [...this.enquiryList, data.value];
          this.fetchEnquiry();
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateEnquiry(items: any, id: number) {
      const item = {
        organizationId: 0,
        name: items.customer,
        customerId: items.customerId,
        origin: items.origin,
        destination: items.destination,
        serviceMode: items.serviceMode.id,
        serviceType: items.serviceType.id,
        details: {
          general: {
            ...items,
          },
        },
      };
      try {
        const { data, error } = await useFetch(URL.Crm.Enquiries + `/${id}`)
          .put(item)
          .json();
          this.fetchEnquiry();
          this.enquiryFetchStatus = true
        this.enquiryDetails = data;
        this.enquiryUpdated = true;
      } catch (err) {
        alert(err);
      }
    },

    async deleteEnquiry(id: number) {
      try {
        const { data, error } = await useFetch(URL.Crm.Enquiries + `/${id}`)
          .delete()
          .json();
        this.fetchEnquiry();
        this.enquiryFetchStatus = true;
      } catch (err) {
        console.log(err);
      }
    },
    async getEById(id: number) {
      try {
        const { data, error } = await useFetch(URL.Crm.Enquiries + `/${id}`)
          .get()
          .json();
        return data;
      } catch (err) {
        alert(err);
      }
    },

    async nextList() {
      this.pageNum = this.pageNum + 1;
      this.fetchEnquiry();
    },
    async prevList() {
      if (this.pageNum > 0) {
        this.pageNum = (await this.pageNum) - 1;

        this.fetchEnquiry();
      }
    },
    async sortList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchEnquiry();
    },
    async searchList(search: string) {
      this.searchKeyword = search;
      this.fetchEnquiry();
    },
    async filterList(filterBy: string) {
      this.filterBy = filterBy;
      this.fetchEnquiry();
    },
    async listDataByFilter(param: any) {
      let parameter = [];
      const name = `name=${param.name}&`;
      const destination = `destination=${param.destination}&`;
      const origin = `origin=${param.origin}&`;
      const serviceType = `serviceType=${param.serviceType.id}&`;
      const customerId = `customerId=${param.customerId}&`;
      const serviceMode = `serviceMode=${param.serviceMode.id}&`;

      param.serviceType != "" ? parameter.push(serviceType) : "";
      param.origin != "" ? parameter.push(origin) : "";
      param.destination != "" ? parameter.push(destination) : "";
      param.name != "" ? parameter.push(name) : "";
      param.customerId != "" ? parameter.push(customerId) : "";
      param.serviceMode != "" ? parameter.push(serviceMode) : "";
      try {
        const { data, error } = await useFetch(
          `${URL.Crm.Enquiries_LIST_BY_FILTER}?${parameter.join("")}`
        )
          .get()
          .json();
        this.enquiryList = data;

        this.isLoding = false;
        this.listFetchStatus = true;

        return data;
      } catch (err) {
        alert(err);
      }
    },
  },
});

export default useEnquiryStore;
