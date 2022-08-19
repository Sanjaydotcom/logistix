export interface Employee {
  id: number
  organization: string
  details: any
  code: string
  name: string
  shortName: string
  designation: string
  notes: string
  status: any
  createdBy: string
  updatedBy: string
  createdAt: any
  updatedAt: any
}
export interface General {
  // id:number
  firstName: string
  lastName: string
  nationality: string
  dob: string
  bloodGroup: string
  martialStatus: string
}

export interface WorkExperience {
  companyName: string
  designation: string
  experience: string
  salary: number
}

export interface Employment {
  designation: string
  department: string
  branch: string
  division: string
  joiningDate: string
  experience: string
  yearOfService: number
  grossSalary: number
  allowance: number
}

export interface ContactDetails {
  primaryContact: number
  secondaryContact: number
  companyMail: string
  personalMail: string
}

export interface Education {
  university: string
  qualification: string
  passingYear: string
}

export interface References {
  name: string
  referenceType: string
  contactNumber: number
  email: string
}
export interface Assets {
  code: any
  type: any
  issueDate: any
  email: any
  status: any
}
