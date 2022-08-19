<script>
import DropdownData from "~/store/DropDown.json";
import { useCommonDropDownStore } from "~~/store/commonDropDowns";

export default {
  props: ["state", "v","editID"],
  setup(props) {
    const store = useCommonDropDownStore();

    const JobLevel = ref([
      {
        id: "1",
        name: "Management",
      },
      {
        id: "2",
        name: "Manager",
      },
      {
        id: "3",
        name: "Staff",
      },
      {
        id: "4",
        name: "Worker",
      },
    ]);
    const DepartmentArray = ref([
      {
        id: "1",
        name: "3PL - Sales",
      },
      {
        id: "2",
        name: "Air Freight - Operations",
      },
      {
        id: "3",
        name: "CHR Networks - Sales",
      },
      {
        id: "4",
        name: "Documentation - Operations",
      },
      {
        id: "5",
        name: "eLogix - Operations",
      },
      {
        id: "6",
        name: "Finance",
      },
      {
        id: "7",
        name: "Finance - Accounting",
      },
      {
        id: "8",
        name: "Finance - Credit",
      },
      {
        id: "9",
        name: "Finance - Treasury",
      },
      {
        id: "10",
        name: "HR & Administration",
      },
      {
        id: "11",
        name: "HR & Administration - Front Desk",
      },
      {
        id: "12",
        name: "HR & Administration - Health & Safety",
      },
      {
        id: "13",
        name: "HR & Administration - Security",
      },
      {
        id: "14",
        name: "IT",
      },
      {
        id: "15",
        name: "Management",
      },
      {
        id: "16",
        name: "Pricing - Air & Sea - Operations",
      },
      {
        id: "17",
        name: "Projects - Oil & Energy",
      },
      {
        id: "18",
        name: "SCM - Operations",
      },
      {
        id: "19",
        name: "Transport",
      },
      {
        id: "20",
        name: "Warehouse - Operations",
      },
    ]);
    const DesignationArray = ref([
      {
        id: "1",
        name: "NVOCC - Sales",
      },
      {
        id: "2",
        name: "Ocean Freight - Sales",
      },
      {
        id: "3",
        name: "Pricing - Air & Sea - Operations",
      },
      {
        id: "4",
        name: "Projects - Oil & Energy",
      },
      {
        id: "5",
        name: "SCM - Operations",
      },
      {
        id: "6",
        name: "Transport",
      },
      {
        id: "7",
        name: "Warehouse - Operations",
      },
      {
        id: "1",
        name: "Vice President",
      },
      {
        id: "2",
        name: "Director",
      },
      {
        id: "3",
        name: "Senior General Manager",
      },
      {
        id: "4",
        name: "General Manager",
      },
      {
        id: "5",
        name: "Assistant General Manager",
      },
      {
        id: "6",
        name: "Senior Manager",
      },
      {
        id: "7",
        name: "Manager",
      },
      {
        id: "8",
        name: "Assistant Manager",
      },
      {
        id: "9",
        name: "Senior Business Development Manager",
      },
      {
        id: "10",
        name: "Business Development Manager",
      },
      {
        id: "11",
        name: "Senior Business Development Executive",
      },
      {
        id: "12",
        name: "Business Development Executive",
      },
      {
        id: "13",
        name: "Senior Sales Executive",
      },
      {
        id: "14",
        name: "Sales Executive",
      },
      {
        id: "15",
        name: "Junior Sales Executive",
      },
      {
        id: "16",
        name: "Tele Sales Executive",
      },
      {
        id: "17",
        name: "Senior Executive",
      },
      {
        id: "18",
        name: "Executive",
      },
      {
        id: "19",
        name: "Senior Coordinator",
      },
      {
        id: "20",
        name: "Coordinator",
      },
      {
        id: "21",
        name: "Team Leader",
      },
      {
        id: "22",
        name: "Clerk",
      },
      {
        id: "23",
        name: "Messenger",
      },
      {
        id: "24",
        name: "Packer",
      },
      {
        id: "25",
        name: "Helper",
      },
      {
        id: "26",
        name: "Chief Financial Officer",
      },
      {
        id: "27",
        name: "Financial Director",
      },
      {
        id: "28",
        name: "Finance Controller",
      },
      {
        id: "29",
        name: "Financial Manager",
      },
      {
        id: "30",
        name: "Senior Accountant",
      },
      {
        id: "31",
        name: "Accountant",
      },
      {
        id: "32",
        name: "Accounting Assistant",
      },
      {
        id: "33",
        name: "Credit Manager",
      },
      {
        id: "34",
        name: "Senior Credit Controller",
      },
      {
        id: "35",
        name: "Credit Controller",
      },
      {
        id: "36",
        name: "Treasury Accountant",
      },
      {
        id: "37",
        name: "Chief Human Resource Officer",
      },
      {
        id: "38",
        name: "Human Resources Director",
      },
      {
        id: "39",
        name: "Human Resources Manager",
      },
      {
        id: "40",
        name: "Human Resources Senior Officer",
      },
      {
        id: "41",
        name: "Human Resources Officer",
      },
      {
        id: "42",
        name: "Human Resources Coordinator",
      },
      {
        id: "43",
        name: "Human Resources Assistant",
      },
      {
        id: "44",
        name: "Administration Manager",
      },
      {
        id: "45",
        name: "Administration Senior Officer",
      },
      {
        id: "46",
        name: "Administration Officer",
      },
      {
        id: "47",
        name: "Administration Coordinator",
      },
      {
        id: "48",
        name: "Administration Assistant",
      },
      {
        id: "49",
        name: "Receptionist",
      },
      {
        id: "50",
        name: "HSE Officer",
      },
      {
        id: "51",
        name: "Office Assistant",
      },
      {
        id: "52",
        name: "Cleaner",
      },
      {
        id: "53",
        name: "Chief Security",
      },
      {
        id: "54",
        name: "Senior Security",
      },
      {
        id: "55",
        name: "Security",
      },
      {
        id: "56",
        name: "Supervisor (Team Leader - IT & Network Engineer)",
      },
      {
        id: "57",
        name: "Engineer (IT & Network Engineer)",
      },
      {
        id: "58",
        name: "Junior Engineer (Jr. IT & Network Engineer)",
      },
      {
        id: "59",
        name: "Chairman",
      },
      {
        id: "60",
        name: "Chief Executive Officer",
      },
      {
        id: "61",
        name: "Chief Operating Officer",
      },
      {
        id: "62",
        name: "Senior Vice President",
      },
      {
        id: "63",
        name: "Executive Assistant to the Chairman",
      },
      {
        id: "64",
        name: "Analyst",
      },
      {
        id: "65",
        name: "Senior  Executive",
      },
      {
        id: "66",
        name: "Senior Operations Executive",
      },
      {
        id: "67",
        name: "Operations Executive",
      },
      {
        id: "68",
        name: "Senior Operations Coordinator",
      },
      {
        id: "69",
        name: "Operations Coordinator",
      },
      {
        id: "70",
        name: "Heavy Duty Driver",
      },
      {
        id: "71",
        name: "Light Vehicle Driver",
      },
      {
        id: "72",
        name: "Warehouse Manager",
      },
      {
        id: "73",
        name: "Warehouse Incharge",
      },
      {
        id: "74",
        name: "Warehouse Team Leader",
      },
      {
        id: "75",
        name: "Warehouse Supervisor",
      },
      {
        id: "76",
        name: "Warehouse Coordinator",
      },
      {
        id: "77",
        name: "Carpenter",
      },
      {
        id: "78",
        name: "Senior Forklift Operator",
      },
      {
        id: "79",
        name: "Forklift Operator",
      },
      {
        id: "80",
        name: "Senior Tally Clerk",
      },
      {
        id: "81",
        name: "Tally Clerk",
      },
      {
        id: "82",
        name: "Labour",
      },
    ]);
    const BranchArray = ref([
      "CONSOLIDATED SHIPPING SERVICES L.L.C.",
      "CONSOLIDATED SHIPPING LOGISTICS CENTRE 1 - CFS",
      "CONSOLIDATED SHIPPING LOGISTICS CENTRE 2 - SCM",
      "CSS DELIVERY ORDER COUNTER",
      "CONSOLIDATED SHIPPING SERVICES L.L.C. ABU DHABI",
      "CONSOLE SHIPPING SERVICES W.L.L. BAHRAIN",
      "CONSOLIDATED SHIPPING SERVICES. DAMMAM",
      "CONSOLIDATED SHIPPING SERVICES. RIYADH",
      "CONSOLIDATED SHIPPING SERVICES. JEDDAH",
      "CONSOLE SHIPPING SERVICES W.L.L. QATAR",
      "COMPREHENSIVE CONSOLIDATED TRADE & SHIPPING L.L.C. OMAN",
      "CONSOLIDATED SHIPPING SERVICES - AIRPORT OFFICE",
      "AIR FREIGHT DIVISION WAREHOUSE",
      "CSS HOMEWARD BOUND",
      "CSS KINGSTON Logistics FZC  – SAIF ZONE",
      "CSS KINGSTON Logistics FZC – HAMRIYAH FREE ZONE",
      "CSS KINGSTON Logistics L.L.C",
      "CSS KINGSTON Logistics - RAK",
      "CSS eLogix",
    ]);

    const designationData = ref([]);
    const dependentData = ref([]);
    const BRANCHHHH = ref([]);

    const organization = ref([]);
    const division = ref([]);
    const department = ref([]);
    const organizationId = ref("");
    const divisionId = ref("");
    onMounted(() => {
      if (props.editID) {
        getDataWhenEdit();
      }
      fetchOrganizationData();
    });
    async function getDataWhenEdit() {
      division.value = await store.getAllDivisions();
      department.value = await store.getAllDepartments()
     
    }
    async function fetchOrganizationData() {
      organization.value = await store.getOrganizationDropDownData();
      organizationId.value = null;
      divisionId.value = null;
    }
    async function organizationValueChange(event) {
      organizationId.value = 1;
      division.value = await store.getDivisionDropDownData(
        organizationId.value
      );
      props.state.division = await "";
      props.state.department = await "";
    }
    async function divisionValueChange(event) {
      divisionId.value = event.target.value;
      department.value = await store.getDepartmentDropDownData(
        1,
        divisionId.value
      );
      props.state.department = await "";
    }

    async function jobLevelOnchange(event) {
      const dependentData = ref([]);
      const designationData = ref([]);
    }
    async function departmentOnchange(event) {
      const designationData = ref([]);
      designationData.value = [];
    }

    return {
      dependentData,
      JobLevel,
      jobLevelOnchange,
      departmentOnchange,
      BranchArray,
      DepartmentArray,
      DesignationArray,

      organization,
      organizationValueChange,
      division,
      divisionValueChange,
      department,
    };
  },
};
</script>

<style lang="scss" scoped></style>
<template>
  <div class="col-span-6 sm:col-span-3">
    <label for="designation" class="block text-sm font-medium text-gray-700"
      >Job Level</label
    >
    <select
      v-model="state.jobLevel"
      id="jobLevel"
      name="jobLevel"
      autocomplete="jobLevel"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option v-for="data in JobLevel" :key="data.id">
        {{data.name}}
      </option>
    </select>

    <span v-if="v.jobLevel.$error" class="font-small text-xs text-red-600">
      {{ v.jobLevel.$errors[0].$message }}
    </span>
  </div>
  <div class="col-span-6 sm:col-span-3">
    <label for="branch" class="block text-sm font-medium text-gray-700"
      >Organization/Branch</label
    >
    <select
      @change="organizationValueChange"
      v-model="state.branch"
      id="branch"
      name="Branch"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option disabled value="">Select</option>
      <option
        v-for="option in organization.value"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
    <span v-if="v.branch.$error" class="font-small text-xs text-red-600">
      {{ v.branch.$errors[0].$message }}
    </span>
  </div>
  <div class="col-span-6 sm:col-span-3">
    <label for="division" class="block text-sm font-medium text-gray-700"
      >Division</label
    >
    <select
      @change="divisionValueChange"
      v-model="state.division"
      id="division"
      name="division"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option disabled value="">Select</option>
      <option
        v-for="option in division.value"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
    <span v-if="v.division.$error" class="font-small text-xs text-red-600">
      {{ v.division.$errors[0].$message }}
    </span>
  </div>
  <div class="col-span-6 sm:col-span-3">
    <label for="department" class="block text-sm font-medium text-gray-700"
      >Department</label
    >
    <select
      v-model="state.department"
      id="department"
      name="Department"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option disabled value="">Select</option>
      <option
        v-for="option in department.value"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
    <span v-if="v.department.$error" class="font-small text-xs text-red-600">
      {{ v.department.$errors[0].$message }}
    </span>
  </div>
  <div class="col-span-6 sm:col-span-3">
    <label for="designation" class="block text-sm font-medium text-gray-700"
      >Designation</label
    >
    <select
      v-model="state.designation"
      id="designation"
      name="designation"
      autocomplete="country-name"
      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option v-for="data in DesignationArray" :key="data.id">
        {{ data.name }}
      </option>
    </select>
    <span v-if="v.designation.$error" class="font-small text-xs text-red-600">
      {{ v.designation.$errors[0].$message }}
    </span>
  </div>
</template>
