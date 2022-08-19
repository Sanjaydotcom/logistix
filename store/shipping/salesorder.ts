import { General } from "../../types/employee";
import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { MenuItems } from "@headlessui/vue";

interface SalesOrderState {
  SalesOrderList: any;
  pageNum: number;
  pageSize: number;
  sortBy: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  priceUpdatedStatus: boolean;
  currentSalesOrderAttachments: any;
}
const state = () => ({
  SalesOrderList: [],
  pageNum: 0,
  pageSize: 10,
  sortBy: "id",
  isLoding: true,
  listFetchStatus: false,
  priceUpdatedStatus: false,
});
const getters = {
  getSalesOrderListsFromState: (state: SalesOrderState) => {
    return () => state.SalesOrderList;
  },
};
export const useSalesOrderStore = defineStore("customers", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.priceUpdatedStatus = status;
    },
    async fetchSalesOrderList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.SalesOrder.SalesOrder}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}`
      )
        .get()
        .json();
      this.SalesOrderList = data;
      this.isLoding = false;
      this.listFetchStatus = true;
    },
    async nextList() {
      this.pageNum = (await this.pageNum) + 1;
      this.fetchSalesOrderList();
    },
    async prevList() {

      if (this.pageNum > 0) {
        this.pageNum = (await this.pageNum) - 1;
        this.fetchSalesOrderList();
      }
    },
    async sortList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchSalesOrderList();
    },
    async addNew(items: any) {
      try {
        const custID = uuidv4();
        const structuredData = {
         
          details: {
            ...items
          },
          salesOrderNumber: 0,
          serviceTypeId: items.serviceType,
          quoteId: 1,
          name: "string",
          notes: "string",
          code: String(custID),
          customer: "string",
          origin: "string",
          destination: "string",
          salesman: items.salesman,
        };
        const { data, error } = await useFetch(URL.SalesOrder.SalesOrder)
          .post(structuredData)
          .json(); 
        this.fetchSalesOrderList();
        this.listFetchStatus = true;
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async update(items: any, id: number) {
      try {
        const { data, error } = await useFetch(
          URL.SalesOrder.SalesOrder + `/${id}`
        )
          .put(items)
          .json();
        this.fetchSalesOrderList();
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
        const { data, error } = await useFetch(
          URL.SalesOrder.SalesOrder + `/${id}`
        )
          .delete()
          .json();
        this.fetchSalesOrderList();
        this.listFetchStatus = true;
        return data;
      } catch (err) {
        alert(err);
      }
    },
    async getById(id: number) {
      try {
        const { data, error } = await useFetch(
          URL.SalesOrder.SalesOrder + `/${id}`
        )
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
          `${URL.SalesOrder.SalesOrder_SERVICE_TYPE_FILTER}?serviceType=${id}`
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
          `${URL.SalesOrder.SalesOrder_SERVICE_MODE_FILTER}?serviceMode=${id}`
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
      const serviceType = `serviceType=${param.serviceType}&`;

      param.serviceType != "" ? parameter.push(serviceType) : "";
      param.originCountry != "" ? parameter.push(originCountry) : "";
      param.destinationCountry != "" ? parameter.push(destinationCountry) : "";
      param.carrier != "" ? parameter.push(carrier) : "";
      try {
        const { data, error } = await useFetch(
          `${URL.SalesOrder.SalesOrder_LIST_BY_FILTER}?${parameter.join("")}`
        )
          .get()
          .json();
        this.SalesOrderList = data;
        this.isLoding = false;
        this.listFetchStatus = true;
        return data;
      } catch (err) {
        alert(err);
      }
    },
  },
});
export default useSalesOrderStore;
