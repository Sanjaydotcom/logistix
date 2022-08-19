import { defineStore } from "pinia";
import { restAPI, URL } from "../composables/api/index";
import employeesList from "./employees.json";
import { useFetch } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

interface EmployeeState {
  employeesList: any;
  employeeData: any;
  currentProfile: any;
  currentProfileCredentials: any;
  currentProfileAttachments: any;
  pageNum: number;
  pageCount: number;
  pageSize: number;
  sortBy: string;
  isLoding: boolean;
  employeesFetchStatus: boolean;
  assetData: any;
  lifecycle: any;
  profileUpdated: boolean;
}
const state = (): EmployeeState => ({
  employeesList: employeesList,
  employeeData: [],
  currentProfile: [],
  currentProfileCredentials: [],
  currentProfileAttachments: [],
  pageNum: 0,
  pageCount: 10,
  pageSize: 10,
  sortBy: "id",
  assetData: [],
  lifecycle: [],
  isLoding: true,
  employeesFetchStatus: false,
  profileUpdated: false,
});

const getters = {
  getEmployeesState: (state: EmployeeState) => {
    return () => state.employeeData;
  },
  getEmployees: (state: EmployeeState) => {
    return (id: number) => state.employeesList;
  },
  getCurrentEmployeeSalary: (state: EmployeeState) => {
    return (r) => state.currentProfile.details.salary;
  },
  getCurrentEmployeeSalaryHistory: (state: EmployeeState) => {
    return () => state.currentProfile.details.SalaryHistory;
  },
  getCurrentEmployeeSalaryVarAllowance: (state: EmployeeState) => {
    return () => state.currentProfile.details.varAllowance;
  },
  getAssetsById: (state: EmployeeState) => {
    return (empId: any) =>
      state.employeeData.find((user: any) => user.id === empId).details.assets;
  },
  getAttachmentsById: (state: EmployeeState) => {
    return (empId: any) => state.currentProfileAttachments;
  },
  getCredentialById: (state: EmployeeState) => {
    return (empId: any) => state.currentProfileCredentials;
  },
  getGeneralDetailsById: (state: EmployeeState) => {
    return (empId: any) => state.currentProfile.details.general;
  },
  getAssets: (state: EmployeeState) => {
    return () => state.assetData;
  },
  getLifecycle: (state: EmployeeState) => {
    return () => state.lifecycle;
  },
  getLifecycleById: (state: EmployeeState) => {},
  getAppraisalByAppraisalId: (state: EmployeeState) => {
    return (empId: any, appraisalCode: any) =>
      state.employeeData
        .find((user: any) => user.id === empId)
        .details.appraisal.find(
          (appraisal: any) => appraisal.id === appraisalCode
        );
  },
  getCredentialsByCredentialId: (state: EmployeeState) => {
    return (empId: any, credentialId: any) =>
      state.currentProfile.details.credentials.find(
        (credentials: any) => credentials.id === credentialId
      );
  },
  getAttachmentsByAttachmentsId: (state: EmployeeState) => {
    return (empId: any, attachmentId: any) =>
      state.currentProfile.details.attachments.find(
        (attachments: any) => attachments.id === attachmentId
      );
  },

  getAppraisalById: (state: EmployeeState) => {
    return (empId: any) =>
      state.employeeData.find((user: any) => user.id === empId).details
        .appraisal;
  },

  getContactDetailsById: (state: EmployeeState) => {
    return (userId: any) =>
      state.employeeData.find((user: any) => user.id === userId).details
        .contact;
  },
  getLoading: (state: EmployeeState) => {
    return () => state.isLoding;
  },
  getStaffExitDetailsById: (state: EmployeeState) => {
    return (userId: any) =>
      state.employeeData.find((user: any) => user.id === userId).details
        .staffExit;
  },
  getAllEmployees: (state: EmployeeState) => state.employeesList,
};

export const useEmployeesStore = defineStore("employeeStore", {
  state,
  getters,
  actions: {
    async setEmployeeFetchStatus(status: boolean) {
      this.employeesFetchStatus = status;
    },
    async setProfileUpdatedStatus(status: boolean) {
      this.profileUpdated = status;
    },
    async fetchEmployeeList() {
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Employee.FETCH_EMPLOYEE_LIST}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}`
      )
        .get()
        .json();
      this.employeeData = data;
      this.pageCount = this.employeeData.length;
      this.isLoding = false;
      this.employeesFetchStatus = true;
    },
    async nextEmployeesList() {
      this.pageNum = this.pageNum + 1;
      this.fetchEmployeeList();
    },
    async prevEmployeesList() {
      this.pageNum = this.pageNum - 1;
      this.fetchEmployeeList();
    },
    async sortEmployeesList(sortBy: string) {
      this.sortBy = sortBy;
      this.fetchEmployeeList();
    },
    async getEmployeeById(id: number) {
      this.profileUpdated = false;
      this.isLoding = true;
      const { data } = await useFetch(
        `${URL.Employee.FETCH_EMPLOYEE_LIST}/${id}`
      )
        .get()
        .json();
      this.currentProfile = await data;
      this.isLoding = false;
      return this.currentProfile;
    },
    async saveAsset(assetData: any, id: number) {
      try {
        const { data, error } = await useFetch(URL.Employee.SAVE_ASSETS)
          .post(assetData)
          .json();
        this.getAssetsDataByID(id);
      } catch (err) {
        alert(err);
      }
    },
    async editAsset(assetData: any, id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Employee.SAVE_ASSETS + `/${id}`
        )
          .put(assetData)
          .json();
      } catch (err) {
        alert(err);
      }
    },
    async deleteAsset(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Employee.SAVE_ASSETS + `/${id}`
        )
          .delete()
          .json();
      } catch (err) {
        alert(err);
      }
    },

    async getAssetsDataByID(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Employee.GET_ASSETS_BY_EMPID + `/${id}`
        )
          .get()
          .json();
        this.assetData = data;

        return data;
      } catch (err) {
        return err;

        alert(err);
      }
    },
    async getAssetsDataByAssetId(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Employee.LIST_ASSET_BY_ASSETID + `/${id}`
        )
          .get()
          .json();
        this.assetData = data;

        return data;
      } catch (err) {
        return err;

        alert(err);
      }
    },

    async getLifecycleByEmpID(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Employee.GET_LIFECYCLE_BY_EMPID + `/${id}`
        )
          .get()
          .json();
        this.lifecycle = data;
        return data;
      } catch (err) {
        return err;
        alert(err);
      }
    },
    async saveLifecycle(item: any, id: number) {
      const payload = {
        organization: item.department,
        employeeId: id,
        branch: item.position,
        appraisalType: item.type,
        appraisalDate: item.date,
        amount: 1,
        status: "Active",
      };
      try {
        const { data, error } = await useFetch(URL.Employee.SAVE_LIFECYCLE)
          .post(payload)
          .json();
        this.getLifecycleByEmpID(id);
      } catch (err) {
        alert(err);
      }
    },
    async addNewEmployee(items: any, id: number) {
      const empId = this.employeesList.length + 1;

      const addnew = {
        organization: "StrebenTechnik",
        status: "Active",
        code: items.code,
        name: items.firstName + " " + items.lastName,
        shortName: items.lastName,
        notes: items.notes,
        designation: items.designation,
        details: {
          general: {
            ...items,
          },
          contact: [],
          assets: [],
          appraisal: [],
          employment: {},
          staffExit: {},
          salary: {},
          education: [],
          attachments: [],
          WorkExperience: [],
          reference: [],
          credentials: [],
          SalaryHistory: [],
        },
      };
      try {
        const { data, error } = await useFetch(URL.Employee.SAVE_EMPLOYEE_)
          .post(addnew)
          .json();

        this.employeeData = [...this.employeeData, data.value];
      } catch (err) {
        alert(err);
      }
    },
    async updateEmployee(items: any, id: number) {
      try {
        const { data, error } = await useFetch(
          URL.Employee.SAVE_EMPLOYEE_ + `/${id}`
        )
          .put(items)
          .json();
        this.currentProfile = data;
        this.profileUpdated = true;
      } catch (err) {
        alert(err);
      }
    },
    async updateProfileImage(imageId: number, id: number) {
      const employeeDetails = await this.currentProfile;
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          profilePicFileId: imageId,
        },
      };
      await this.updateEmployee(data, id);
      this.fetchEmployeeList();
    },
    async updateGeneralDetails(items: any, id: number) {
      const employeeDetails = this.employeeData.find(
        (user: any) => user.id === id
      );
      const updated = {
        ...employeeDetails,
        code: items.code,
        name: items.firstName + " " + items.lastName,
        shortName: items.lastName,
        notes: items.notes,
        designation: items.designation,
        details: {
          ...this.currentProfile.details,
          general: {
            ...items,
          },
        },
      };
      this.updateEmployee(updated, id);
    },
    async updateEmployeeDetails(items: any, type: string, id: number) {
      const employeeDetails = this.employeeData.find(
        (user: any) => user.id === id
      );
      const data = this.getDestructuredJson(employeeDetails, items, type);
      this.updateEmployee(data, id);
    },

    async updateContactDetails(items: any, id: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === id
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          contact: {
            ...items,
          },
        },
      };
      this.updateEmployee(data, id);
    },

    async addSalaryHistory(items: any, id: number) {
      const employeeDetails = this.currentProfile;
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      let salaryDetails = this.currentProfile.details.SalaryHistory;
      salaryDetails.push(dataToPush);
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          SalaryHistory: salaryDetails,
        },
      };
      this.updateEmployee(data, id);
    },

    async updateSalaryHistory(items: any, id: number, historyId: number) {
      const employeeDetails = this.currentProfile;
      let salaryHistory = this.currentProfile.details.SalaryHistory;
      const updatedHistory = await salaryHistory.map((item: any) =>
        item.id === historyId ? items : item
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          SalaryHistory: updatedHistory,
        },
      };
      this.updateEmployee(data, id);
    },

    async updateSalaryDetails(items: any, id: number) {
      const employeeDetails = await this.currentProfile;

      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          salary: {
            ...items,
          },
        },
      };
      this.updateEmployee(data, id);
    },
    async SalaryIncrement(items: any, id: number, state: any) {
      const employeeDetails = await this.currentProfile;
      let salaryDetails = this.currentProfile.details.SalaryHistory;
      salaryDetails.push(items);

      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          SalaryHistory: salaryDetails,
          salary: {
            ...state,
          },
        },
      };
      this.updateEmployee(data, id);
    },

    async updateVarAllowance(items: any, id: number) {
      const employeeDetails = await this.currentProfile;
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          varAllowance: {
            ...items,
          },
        },
      };
      this.updateEmployee(data, id);
    },

    async updateExperience(items: any, empID: any, editID: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === empID
      );
      const updatedExperience =
        await employeeDetails.details.WorkExperience.map((t: any) =>
          t.id === editID ? items : t
        );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          WorkExperience: updatedExperience,
        },
      };
      this.updateEmployee(data, empID);
    },
    async addExperience(items: any, id: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === id
      );
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          WorkExperience: [
            ...this.currentProfile.details.WorkExperience,
            dataToPush,
          ],
        },
      };
      this.updateEmployee(data, id);
    },
    async deleteExperience(empID: any, deleteId: any) {
      let data = this.employeeData;
      const empIndex = data.findIndex((user: any) => user.id === empID);
      let WorkExperienceIndex;
      if (empIndex >= 0) {
        WorkExperienceIndex = data[empIndex].details.WorkExperience.findIndex(
          (WorkExperience: any) => WorkExperience.id === deleteId
        );
      }
      data[empIndex].details.WorkExperience.splice(WorkExperienceIndex, 1);
      this.updateEmployee(data[empIndex], empID);
    },
    async addEducation(items: any, id: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === id
      );
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          education: [...this.currentProfile.details.education, dataToPush],
        },
      };
      this.updateEmployee(data, id);
    },
    async updateEducation(items: any, empID: any, editID: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === empID
      );
      const updatedArray = await employeeDetails.details.education.map(
        (t: any) => (t.id === editID ? items : t)
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          education: updatedArray,
        },
      };
      this.updateEmployee(data, empID);
    },
    async deleteEducation(empID: any, deleteId: any) {
      let data = this.employeeData;
      const empIndex = data.findIndex((user: any) => user.id === empID);
      let educationIndex;
      if (empIndex >= 0) {
        educationIndex = data[empIndex].details.education.findIndex(
          (education: any) => education.id === deleteId
        );
      }
      data[empIndex].details.education.splice(educationIndex, 1);
      this.updateEmployee(data[empIndex], empID);
    },
    async addReferences(items: any, id: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === id
      );
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          reference: [...this.currentProfile.details.reference, dataToPush],
        },
      };
      this.updateEmployee(data, id);
    },

    async updateReferences(items: any, empID: any, editID: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === empID
      );
      const updatedArray = await employeeDetails.details.reference.map(
        (t: any) => (t.id === editID ? items : t)
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          reference: updatedArray,
        },
      };
      this.updateEmployee(data, empID);
    },

    async updateStaffExitDetails(items: any, id: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === id
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          staffExit: {
            ...items,
          },
        },
      };
      this.updateEmployee(data, id);
    },
    async addCredentials(items: any, id: number) {
      const employeeDetails = this.currentProfile;
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          credentials: [...this.currentProfile.details.credentials, dataToPush],
        },
      };
      this.updateEmployee(data, id);
    },
    async updateCredentials(items: any, empID: any, editID: number) {
      const employeeDetails = this.currentProfile;
      const updatedArray = await employeeDetails.details.credentials.map(
        (t: any) => (t.id === editID ? items : t)
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          credentials: updatedArray,
        },
      };
      this.updateEmployee(data, empID);
    },
    async deleteCredential(empID: any, deleteId: any) {
      let data = this.currentProfile;
      let credentialIndex;

      credentialIndex = this.currentProfile.details.credentials.findIndex(
        (credentials: any) => credentials.id === deleteId
      );

      data.details.credentials.splice(credentialIndex, 1);
      this.updateEmployee(data, empID);
    },

    async addAttachments(items: any, id: number) {
      const employeeDetails = await this.employeeData.find(
        (user: any) => user.id === id
      );
      const custID = uuidv4();
      const dataToPush = {
        ...items,
        id: custID,
      };
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          attachments: [...this.currentProfile.details.attachments, dataToPush],
        },
      };
      this.updateEmployee(data, id);
    },
    async updateAttachments(items: any, empID: any, editID: number) {
      const employeeDetails = this.currentProfile;
      const updatedArray = await employeeDetails.details.attachments.map(
        (t: any) => (t.id === editID ? items : t)
      );
      const data = {
        ...employeeDetails,
        details: {
          ...this.currentProfile.details,
          attachments: updatedArray,
        },
      };
      this.updateEmployee(data, empID);
    },
    async deleteAttachments(empID: any, deleteId: any) {
      let CurrentData = this.currentProfile;
      let attachmentsIndex;
      attachmentsIndex = CurrentData.details.attachments.findIndex(
        (attachments: any) => attachments.id === deleteId
      );
      CurrentData.details.attachments.splice(attachmentsIndex, 1);
      this.updateEmployee(CurrentData, empID);
    },

    ///////////////////////////////////////////////////////////////////////////////////
    //Chnage the actions below [API]

    async updateAppraisal(data: any, empID: any, editId: any) {
      const empIndex = this.employeesList.findIndex(
        (user: any) => user.id === empID
      );
      let appraisalIndex;
      if (empIndex >= 0) {
        appraisalIndex = this.employeesList[
          empIndex
        ].details.appraisal.findIndex(
          (appraisal: any) => appraisal.id === editId
        );
      }
      this.employeesList[empIndex].details.appraisal[appraisalIndex] = data;
    },

    async addAppraisal(items: any, id: number) {
      const updatedUser = (t: any) => {
        const custID = uuidv4();

        const dataToPush = {
          ...items,
          id: custID,
        };
        const data = {
          ...t,
          details: {
            ...t.details,
            appraisal: [...t.details.appraisal, dataToPush],
          },
        };
        return data;
      };
      const updated = await this.employeesList.map((t: any) =>
        t.id === id ? updatedUser(t) : t
      );
      this.employeesList = updated;
    },
    async addAttachment(items: any, id: number) {
      const updatedUser = (t: any) => {
        const data = {
          ...t,
          details: {
            ...t.details,
            attachments: [...t.details.attachments, items],
          },
        };
        return data;
      };
      const updated = await this.employeesList.map((t: any) =>
        t.id === id ? updatedUser(t) : t
      );

      this.employeesList = updated;
    },
    async addCredential(items: any, id: number) {
      const updatedUser = (t: any) => {
        const custID = uuidv4();
        const dataToPush = {
          ...items,
          id: custID,
        };
        const data = {
          ...t,
          details: {
            ...t.details,
            credentials: [...t.details.credentials, dataToPush],
          },
        };
        return data;
      };
      const updated = await this.employeesList.map((t: any) =>
        t.id === id ? updatedUser(t) : t
      );

      this.employeesList = updated;
    },
    //
    async getOrganizationByOrgIdID(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Masters._ORGANIZATION_BY_ORGID + `/${id}`
        )
          .get()
          .json();
        return data;
      } catch (err) {
        return err;

        alert(err);
      }
    },
    async getDivisionByDivId(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Masters._DIVISION_BY_DIVID + `/${id}`
        )
          .get()
          .json();
        return data;
      } catch (err) {
        return err;

        alert(err);
      }
    },
    async getDepartmentByDepId(id: any) {
      try {
        const { data, error } = await useFetch(
          URL.Masters._DEPARTMENT_BY_DEPID + `/${id}`
        )
          .get()
          .json();
        return data;
      } catch (err) {
        return err;

        alert(err);
      }
    },
  },
});
