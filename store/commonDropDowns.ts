import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";

interface DropDownState {
  EmployeeType: {
    isLoding: boolean;
    data: any;
  };
}
const state = () => ({
  EmployeeType: {
    isLoding: false,
    data: {},
  },
});
export const useCommonDropDownStore = defineStore("codes", {
  state,
  actions: {
    async getDropDownData(kind: string) {
      const { data } = await useFetch(`${URL.CommonDropDown.CodesUrl}/${kind}`)
        .get()
        .json();
      return data;
    },

    async getOrganizationDropDownData() {
      const { data } = await useFetch(`${URL.CommonDropDown.OrganizationList}`)
        .get()
        .json();
      return data;
    },
    async getDivisionDropDownData(OrgId: number) {
      const { data } = await useFetch(
        `${URL.CommonDropDown.DivisionByOrganization}/${OrgId}`
      )
        .get()
        .json();
      return data;
    },
    async getDepartmentDropDownData(orgId: any, divId: any) {
      const url = `${URL.CommonDropDown.DepartmentByOrg_div}`;
      const urlWithParams = url
        .replace(":organizationId", orgId)
        .replace(":divisionId", divId);
      const { data } = await useFetch(urlWithParams).get().json();
      return data;
    },

    async getAllDivisions() {
      const { data } = await useFetch(`${URL.CommonDropDown.GetAllDivisions}`)
        .get()
        .json();
      return data;
    },
    async getAllDepartments() {
      const { data } = await useFetch(`${URL.CommonDropDown.GetAllDepartments}`)
        .get()
        .json();
      return data;
    },

    async getDesignationDropDownData(id: number) {
      const { data } = await useFetch(`${URL.CommonDropDown.CodesUrl}/${id}`)
        .get()
        .json();
      return data;
    },
    async getServiceTypeData(id: any) {
      const { data } = await useFetch(`${URL.CommonDropDown.ServiceType}`)
        .get()
        .json();
      return data;
    },
    async getServiceModeList() {
      const { data } = await useFetch(`${URL.CommonDropDown.ServiceMode}`)
        .get()
        .json();
      return data;
    },
    async getServiceTypeListByMode(id: any) {
      const { data } = await useFetch(
        `${URL.CommonDropDown.ServiceTypeWithModeId}/${id}`
      )
        .get()
        .json();
      return data;
    },
    async getServiceTypeListByModeKind(id: any, kind: String) {
       const { data } = await useFetch(
        `${URL.CommonDropDown.ServiceTypeWithModeIdKind}/${id}/kind/${kind}`
      )
        .get()
        .json();
      return data;
    },
    async getLinerList() {
      const { data } = await useFetch(`${URL.CommonDropDown.LinerListing}`)
        .get()
        .json();
      return data;
    },
    async getTerritoryList() {
      const { data } = await useFetch(`${URL.CommonDropDown.TerritoryList}`)
        .get()
        .json();
      return data;
    },
    async getAllPortList() {
      const { data } = await useFetch(`${URL.CommonDropDown.PortListing}`).get().json();
      return data;
    },

    async getAllCommodityList() {
      const { data } = await useFetch(`${URL.CommonDropDown.CommodityListing}`)
        .get()
        .json();
      return data;
    },
    async getLinerNameById(id: number) {
      const { data } = await useFetch(
        `${URL.CommonDropDown.LinerListing}/${id}`
      )
        .get()
        .json();
      return String(data.value.name);
    },
  },
});
export default useCommonDropDownStore;
