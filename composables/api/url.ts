const endPointUrl = "https://api.logistix.dev/";
const documentEndPoint = "https://api.logistix.dev/document/document/documents";
export const URL = {
  Employee: {
    FETCH_EMPLOYEE_LIST: `${endPointUrl}hcm/employees`,
    SAVE_EMPLOYEE_: `${endPointUrl}hcm/employees`,
    GET_ASSETS_BY_EMPID: `${endPointUrl}hcm/assets/employee`,
    LIST_ASSET_BY_ASSETID: `${endPointUrl}hcm/assets`,
    SAVE_ASSETS: `${endPointUrl}hcm/assets`,
    SAVE_LIFECYCLE: `${endPointUrl}hcm/employee-lifecycles`,
    GET_LIFECYCLE_BY_EMPID: `${endPointUrl}hcm/employee-lifecycles/employee`,
  },
  Masters: {
    _COMMODITY: `${endPointUrl}shipping/commodities`,
    _PORT: `${endPointUrl}shipping/ports`,
    _VESSEL: `${endPointUrl}shipping/vessels`,
    _TERMS: `${endPointUrl}shipping/termsandconditions`,
    _COSTELEMENT: `${endPointUrl}shipping/costelements`,
    _UOM: `${endPointUrl}shipping/uom`,
    _LINER: `${endPointUrl}shipping/liners`,
    _ORGANIZATION_BY_ORGID: `${endPointUrl}shipping/organizations`,
    _DIVISION_BY_DIVID: `${endPointUrl}shipping/divisions`,
    _DEPARTMENT_BY_DEPID: `${endPointUrl}shipping/departments`,
    _JOBTYPE: `${endPointUrl}shipping/jobtypes`,
    _CODES: `${endPointUrl}shipping/codes`,
    _QUOTATION: `${endPointUrl}shipping/quotes`,
    _TERRITORY: `${endPointUrl}shipping/territories`
  },
  Crm: {
    Customers: `${endPointUrl}crm/customers`,
    Enquiries: `${endPointUrl}crm/enquiries`,
    Enquiries_LIST_BY_FILTER: `${endPointUrl}crm/enquiries/filter`,
  },
  CommonDropDown: {
    CodesUrl: `${endPointUrl}shipping/codes/by-kind`,
    ServiceType: `${endPointUrl}shipping/servicetypes`,
    LinerListing: `${endPointUrl}shipping/liners`,
    TerritoryList: `${endPointUrl}shipping/territories`,
    OrganizationList: `${endPointUrl}shipping/organizations`,
    DivisionByOrganization: `${endPointUrl}shipping/divisions/organization`,
    DepartmentByOrg_div: `${endPointUrl}shipping/departments/organization/:organizationId/division/:divisionId`,
    GetAllDivisions: `${endPointUrl}shipping/divisions`,
    GetAllDepartments: `${endPointUrl}shipping/departments`,
    ServiceMode: `${endPointUrl}shipping/servicemodes/all`,
    ServiceTypeWithModeId: `${endPointUrl}shipping/servicetypes/service-mode`,
    PortListing: `${endPointUrl}shipping/ports/all`,
    CommodityListing: `${endPointUrl}shipping/commodities/all`,
    TerritoryListing: `${endPointUrl}shipping/territories/all`,
    ServiceTypeWithModeIdKind: `${endPointUrl}shipping/servicetypes/service-mode`,
  },
  Document: {
    UPLOAD: documentEndPoint,
    DOWNLOAD: `${documentEndPoint}/download`,
    SHOW: `${documentEndPoint}/show`,
  },
  Pricing:{
    PRICE:`${endPointUrl}crm/prices`,
    PRICE_SERVICE_TYPE_FILTER:`${endPointUrl}crm/prices/filter/service-type`,
    PRICE_SERVICE_MODE_FILTER:`${endPointUrl}crm/prices/filter/service-mode`,
    PRICE_LIST_BY_FILTER:`${endPointUrl}crm/prices/filter`,
  },
 
    SalesOrder:{
      SalesOrder:`${endPointUrl}shipping/salesorders`,
      SalesOrder_SERVICE_TYPE_FILTER:`${endPointUrl}shipping/salesorders/filter/service-type`,
      SalesOrder_SERVICE_MODE_FILTER:`${endPointUrl}shipping/salesorders/filter/service-mode`,
      SalesOrder_LIST_BY_FILTER:`${endPointUrl}shipping/salesorders/filter`,
    }
 

};
