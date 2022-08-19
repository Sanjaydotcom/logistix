import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

interface TermsState {
  directorylist: any;
  pageNum: number;
  pageSize: number;
  pageCount: number;
  filterType: string;
  sortBy: string;
  searchKeyword: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  termsUpdated: boolean;
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
  termsUpdated: false,
});

const getters = {
  getDirectoryLists: (state: TermsState) => {
    return () => state.directorylist;
  },
  getFilterType: (state: TermsState) => {
    return () => state.filterType;
  },
};

export const useTermsStore = defineStore("terms", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.termsUpdated = status;
    },
    async fetchList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Masters._TERMS}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
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
      const { data } = await useFetch(`${URL.Masters._TERMS}/${id}`)
        .get()
        .json();
      this.isLoding = false;
      return data;
    },

    async addNew(items: any) {
      const addNew = {
        details: {
          terms: [],
          countryTerms: [],
        },
        ...items,
      };
      try {
        const { data, error } = await useFetch(URL.Masters._TERMS)
          .post(addNew)
          .json();

        this.directorylist = [...this.directorylist, data.value];
        this.listFetchStatus = true;
      } catch (err) {
        alert(err);
      }
    },

    async update(items: any, id: number) {
      try {
        const updateData = {
          ...items,
        };
        const { data, error } = await useFetch(URL.Masters._TERMS + `/${id}`)
          .put(updateData)
          .json();

        this.termsUpdated = true;
        this.fetchList();
      } catch (err) {
        alert(err);
      }
    },

    async editTermItem(items: any, id: number) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const data = {
        ...items,
        details: {
          terms: [...serviceType.details.terms],
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },

    async delete(id: number) {
      try {
        const { data, error } = await useFetch(URL.Masters._TERMS + `/${id}`)
          .delete()
          .json();
        this.fetchList();
        this.listFetchStatus = true;
      } catch (err) {
        alert(err);
      }
    },

    async addTerm(item: any, id: string) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const termId = serviceType.details.terms.length + 1;
      const term = {
        ...item,
        id: termId,
      };
      const data = {
        ...serviceType,
        details: {
          terms: [...serviceType.details.terms, term],
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },

    async addCountry(item: any, id: string) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const countryId = serviceType.details.countryTerms.length + 1;
      const country = {
        ...item,
        id: countryId,
        terms: [],
      };
      const data = {
        ...serviceType,
        details: {
          terms: [...serviceType.details.terms],
          countryTerms: [...serviceType.details.countryTerms, country],
        },
      };
      this.update(data, id);
    },

    async addCountryTerm(item: any, id: string, countryId: string) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const country = await serviceType.details.countryTerms.find(
        (item: any) => item.id == countryId
      );
      const countryTermId = country.terms.length + 1;
      const countryTerm = {
        ...item,
        id: countryTermId,
      };
      country["terms"] = [...country.terms, countryTerm];
      const data = {
        ...serviceType,
        details: {
          terms: [...serviceType.details.terms],
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },

    async deleteCountryTerm(termId: string, countryId: string, id: string) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const country = await serviceType.details.countryTerms.find(
        (item: any) => item.id == countryId
      );
      const updatedTerms = await country.terms.filter(
        (term: any) => term.id != termId
      );
      country["terms"] = updatedTerms;
      const data = {
        ...serviceType,
        details: {
          terms: [...serviceType.details.terms],
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },

    async editCountryTerm(
      item: any,
      termId: string,
      countryId: string,
      id: string
    ) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const country = await serviceType.details.countryTerms.find(
        (item: any) => item.id == countryId
      );
      const updatedTerms = await country.terms.map((term: any) =>
        term.id === termId ? item : term
      );
      country["terms"] = updatedTerms;
      const data = {
        ...serviceType,
        details: {
          terms: [...serviceType.details.terms],
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },

    async editTerm(item: any, termId: string, id: string) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const updatedTerms = await serviceType.details.terms.map((term: any) =>
        term.id === termId ? item : term
      );
      const data = {
        ...serviceType,
        details: {
          terms: updatedTerms,
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },

    async deleteTerm(termId: string, id: string) {
      const serviceType = await this.directorylist.find(
        (term: any) => term.id == id
      );
      const updatedTerms = await serviceType.details.terms.filter(
        (term: any) => term.id != termId
      );
      const data = {
        ...serviceType,
        details: {
          terms: updatedTerms,
          countryTerms: [...serviceType.details.countryTerms],
        },
      };
      this.update(data, id);
    },
  },
});

export default useTermsStore;
