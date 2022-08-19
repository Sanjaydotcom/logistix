<script>
import { ref } from "vue";

import Education from "./Education.vue";
import Experience from "./Experience.vue";
import General from "./General.vue";
import StaffExit from "./StaffExit.vue";
import Contact from "./Contact.vue";
import Reference from "./Reference.vue";
import { useEmployeesStore } from "@/store/employees";

export default {
  components: {
    Reference,
    Reference,
    Contact,
    StaffExit,
    General,
    Experience,
    Education,
  },

  props: ["employeesState"],
};
</script>

<template>
  <div v-if="employeeState">
    <div class="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
      <General
        :general="employeeState.profile?.details?.general"
        :id="employeeState.profile?.id"
      />
    </div>
    <Contact
      :contact="employeeState.profile?.details?.contact"
      :id="employeeState.profile.id"
    />

    <Education
      :educations="employeeState.profile?.details?.education"
      :id="employeeState.profile?.id"
    />
    <Experience
      :experience="employeeState.profile?.details?.WorkExperience"
      :id="employeeState.profile?.id"
    />
    <Reference
      :id="employeeState.profile?.id"
      :reference="employeeState.profile?.details?.reference"
    />
    <StaffExit
      :id="employeeState.profile?.id"
      :staffExit="employeeState.profile?.details?.staffExit"
    />
  </div>
</template>
