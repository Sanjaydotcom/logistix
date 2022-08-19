import { General } from "./../../types/employee";
import { defineStore } from "pinia";
import { URL } from "~~/composables/api";
import { useFetch } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

interface CustomerState {
  directorylist: any;
  customerProfile: any;
  pageNum: number;
  pageSize: number;
  sortBy: string;
  searchKeyword: string;
  isLoding: boolean;
  listFetchStatus: boolean;
  customerUpdated: boolean;
  currentProfileAttachments: any;
}
const state = () => ({
  directorylist: [],
  customerProfile: [],
  currentProfileAttachments: [],
  pageNum: 0,
  pageSize: 10,
  sortBy: "id",
  searchKeyword: " ",
  isLoding: true,
  listFetchStatus: false,
  customerUpdated: false,
});

const getters = {
  getDirectoryLists: (state: CustomerState) => {
    return () => state.directorylist;
  },
  getProfileGeneralDetails: (state: CustomerState) => {
    return () => state.customerProfile.details.general;
  },
  getProfileKycDetails: (state: CustomerState) => {
    return () => state.customerProfile.details.kyc;
  },
  getAttachmentsDetails: (state: CustomerState) => {
    return (empId: any) => state.currentProfileAttachments;
  },
  getProfilePicId: (state: CustomerState) => {
    return (empId: any) =>
      state.customerProfile.details?.general.profilePicFileId;
  },
  getAttachmentsById: (state: CustomerState) => {
    return (empId: any, attachmentId: any) =>
      state.customerProfile.details.attachments.find(
        (attachments: any) => attachments.id === attachmentId
      );
  },
};

export const useCustomerStore = defineStore("customers", {
  state,
  getters,
  actions: {
    async setFetchStatus(status: boolean) {
      this.listFetchStatus = status;
    },
    async setUpdatedStatus(status: boolean) {
      this.customerUpdated = status;
    },
    async fetchList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Crm.Customers}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}&searchData=${this.searchKeyword}`
      )
        .get()
        .json();
      this.directorylist = data;
      this.isLoding = false;
      this.listFetchStatus = true;
    },
    async fetchListWithFilter(items: any) {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Crm.Customers}/filter?kind=${items.customerType}`
      )
        .get()
        .json();
      this.directorylist = data;
      this.isLoding = false;
      this.listFetchStatus = true;
    },
    async fetchAllDropdownList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Crm.Customers}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}`
      )
        .get()
        .json();
      this.isLoding = false;

      return data.value;
    },
    async nextList() {
      this.pageNum = this.pageNum + 1;
      this.fetchList();
    },
    async prevList() {
      this.pageNum = this.pageNum - 1;
      this.fetchList();
    },
    async sortList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchList();
    },
    async searchList(search: string) {
      this.searchKeyword = search;
      this.fetchList();
    },
    async getById(id: number) {
      this.customerUpdated = false;
      const { data } = await useFetch(`${URL.Crm.Customers}/${id}`)
        .get()
        .json();
      this.customerProfile = await data;
      return data;
    },
    async addNew(items: any, id: number) {
      try {
        const { data, error } = await useFetch(URL.Crm.Customers)
          .post(items)
          .json();
        if (error.value) {
          return data;
        } else {
          this.directorylist = [...this.directorylist, data.value];
          this.fetchList();
          return data;
        }
      } catch (err) {
        alert(err);
      }
    },
    async updateCustomer(items: any, id: number) {
      try {
        const { data, error } = await useFetch(URL.Crm.Customers + `/${id}`)
          .put(items)
          .json();
        this.customerProfile = data;
        this.customerUpdated = true;
        this.fetchList();
      } catch (err) {
        alert(err);
      }
    },
    async addNewFromModal(items: any) {
      const addNew = {
        details: {
          general: {
            ...items,
          },
          contacts: [],
        },
        code: "",
        name: items.name,
        kind: items.kind,
        notes: "",
      };
      try {
        const { data, error } = await useFetch(URL.Crm.Customers)
          .post(addNew)
          .json();
        if (error.value) {
          return data;
        } else {
          this.directorylist = [...this.directorylist, data.value];
          this.fetchList();
          return data;
        }
      } catch (err) {
        alert(err);
      }
    },
    async migrateToCreditCust(customerId: number) {
      const customerData = await this.customerProfile;
      const updatedData = {
        ...customerData,

        details: {
          ...customerData.details,
          general: {
            ...customerData.details.general,
            customerType: "CREDIT",
          },
          attachments: [],
          kyc: {},
        },
      };
      await this.updateCustomer(updatedData, customerId);
      this.fetchList();
    },
    async updateProfileImage(imageId: number, id: number) {
      const customerData = await this.customerProfile;
      const data = {
        ...customerData,
        details: {
          ...customerData.details,
          general: {
            ...customerData.details.general,
            profilePicFileId: imageId,
          },
        },
      };
      await this.updateCustomer(data, id);
      this.fetchList();
    },
    async addContacts(items: any, id: number) {
      const customerData = await this.customerProfile;
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const contactsArray = [...customerData.details?.contacts, dataToPush];
      const data = {
        ...customerData,
        details: {
          ...this.customerProfile.details,
          contacts: contactsArray,
        },
      };
      this.updateCustomer(data, id);
    },
    async updateContacts(items: any, customerId: any, editID: number) {
      const customerData = this.customerProfile;
      const updatedArray = await customerData.details.contacts.map((t: any) =>
        t.id === editID ? items : t
      );
      const data = {
        ...customerData,
        details: {
          ...this.customerProfile.details,
          contacts: updatedArray,
        },
      };
      this.updateCustomer(data, customerId);
    },
    async deleteContacts(customerId: any, deleteId: any) {
      let customerData = this.customerProfile;
      let contactsIndex;

      contactsIndex = this.customerProfile.details.contacts.findIndex(
        (contact: any) => contact.id === deleteId
      );

      customerData.details.contacts.splice(contactsIndex, 1);
      this.updateCustomer(customerData, customerId);
    },
    async updateGeneralDetails(items: any, id: number) {
      try {
        let customerData = this.customerProfile;

        const updatedData = {
          ...customerData,
          details: {
            ...customerData.details,
            general: {
              ...items,
            },
          },
        };

        this.updateCustomer(updatedData, id);
      } catch (err) {
        alert(err);
      }
    },
    async updateKycDetails(items: any, id: number) {
      try {
        let customerData = this.customerProfile;
        const updatedData = {
          ...customerData,
          details: {
            ...customerData.details,
            kyc: {
              ...items,
            },
          },
        };

        this.updateCustomer(updatedData, id);
      } catch (err) {
        alert(err);
      }
    },
    async addAttachments(items: any, id: number) {
      let customerData = this.customerProfile;
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const data = {
        ...customerData,
        details: {
          ...customerData.details,
          attachments: [...customerData.details.attachments, dataToPush],
        },
      };
      this.updateCustomer(data, id);
    },
    async updateAttachments(items: any, customerId: any, editID: number) {
      const customerData = this.currentProfile;
      const updatedArray = await customerData.details.attachments.map(
        (t: any) => (t.id === editID ? items : t)
      );
      const data = {
        ...customerData,
        details: {
          ...customerData.details,
          attachments: updatedArray,
        },
      };
      this.updateCustomer(data, customerId);
    },
    async deleteAttachments(customerId: any, deleteId: any) {
      let customerData = this.currentProfile;
      let attachmentIndex;
      attachmentIndex = customerData.details.attachments.findIndex(
        (attachments: any) => attachments.id === deleteId
      );
      customerData.details.attachments.splice(attachmentIndex, 1);
      this.updateCustomer(customerData, customerId);
    },
    async delete(id: number) {
      try {
        const { data, error } = await useFetch(URL.Crm.Customers + `/${id}`)
          .delete()
          .json();
        this.fetchList();
        this.customerUpdated = true;
      } catch (err) {
        alert(err);
      }
    },
  },
});

export default useCustomerStore;
