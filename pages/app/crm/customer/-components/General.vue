<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  maxValue,
  numeric,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Notification from "@/components/ui/Notification.vue";
import BloodGroup from "@/components/BloodGroup.vue";
import { useCustomerStore } from "@/store/crm/customers";
import { ref, onMounted, watch } from "vue";

export default {
  data() {
    return {
      showNotification: false,
    };
  },
  components: {
    Notification,
    BloodGroup,
  },
  props: ["id", "contactList", "state", "v"],
  setup(props) {
    const router = useRouter();
    const isLoading = ref(false);
    const store = useCustomerStore();
    const isActiveTab = ref(false);
    const contactListAddButtonText = ref("Add Contact");
    const toggleNotification = () => {
      this.toggleNotification = !this.toggleNotification;
    };
    const generalState = reactive({
      contactDetails: [],
    });
    onMounted(() => {
      if (props.state.contactList[0].name == "") {
        props.state.contactList.splice(0, 1);
      }
    });
    function clearContactDetail() {
      props.state.contact_Name = "";
      props.state.contact_Designation = "";
      props.state.contact_Number = "";
      props.state.contact_Email = "";
      props.state.contact_Department = "";
    }
    function removeDataFromContactList(index) {
      props.state.contactList.splice(index, 1);
    }
    function AddContactOnClick() {
      let contactData = {
        name: props.state.contact_Name,
        designation: props.state.contact_Designation,
        number: props.state.contact_Number,
        email: props.state.contact_Email,
        department: props.state.contact_Department,
        countryCode: props.state.contact_NumberCode,
      };
      props.state.contactList.push(contactData);
      clearContactDetail();
      contactButtonTextChanger(false);
    }
    const contactButtonTextChanger = (IsEdit) => {
      IsEdit
        ? (contactListAddButtonText.value = "Update Contact")
        : "Add Contact";
    };
    function contactDetailEditClick(index) {
      props.state.contact_Name = props.state.contactList[index].name;
      props.state.contact_Designation =
        props.state.contactList[index].designation;
      props.state.contact_Number = props.state.contactList[index].number;
      props.state.contact_Email = props.state.contactList[index].email;
      props.state.contact_Department =
        props.state.contactList[index].department;
      props.state.contact_NumberCode =
        props.state.contactList[index].countryCode;
      contactButtonTextChanger(true);
      removeDataFromContactList(index);
    }

    return {
      store,
      toggleNotification,
      isLoading,
      generalState,
      removeDataFromContactList,
      AddContactOnClick,
      contactDetailEditClick,
      isActiveTab,
      contactListAddButtonText,
    };
  },
};
</script>
<template>
  <div class="space-y-6 px-3">
    <div class="bg-white px-4 py-2">
      <div class="md:grid md:grid-cols-2 md:gap-6">
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-4">
            <div class="col-span-6 sm:col-span-2">
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700"
                >Customer Name
              </label>
              <input
                type="text"
                name="FirstName"
                id="firstName"
                autocomplete="address-level2"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm
                "
                v-model="state.firstName"
              />
              <span
                v-if="v.firstName.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.firstName.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
                >Customer category</label
              >
              <select
                v-model="state.customerCategory"
                id="customerType"
                name="Customer Type"
                autocomplete="country-name"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border border-gray-300
                  bg-white
                  py-2
                  px-3
                  shadow-sm
                  focus:border-indigo-500
                  focus:outline-none
                  focus:ring-indigo-500
                  sm:text-sm
                "
              >
                <option>TRANSPORTER</option>
                <option>SHIPPER</option>
                <option>CONSIGNEE</option>
                <option>VENDOR</option>
                <option>CO-LOADER</option>
              </select>

              <span
                v-if="v.customerCategory.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.customerCategory.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
                >Customer Type</label
              >
              <select
                v-model="state.customerType"
                id="customerType"
                name="Customer Type"
                autocomplete="country-name"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border border-gray-300
                  bg-white
                  py-2
                  px-3
                  shadow-sm
                  focus:border-indigo-500
                  focus:outline-none
                  focus:ring-indigo-500
                  sm:text-sm
                "
              >
                <option>NON_CREDIT</option>
                <option>TEMPORARY_CREDIT</option>
                <option>CREDIT_CUSTOMERS</option>
              </select>

              <span
                v-if="v.customerType.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.customerType.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email Id</label
              >
              <div class="relative mt-1 rounded-md shadow-sm">
                <div
                  class="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pl-3
                  "
                >
                  <!-- Heroicon name: solid/mail -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  v-model="state.mailID"
                  name="mailID"
                  id="mailID"
                  class="
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    pl-10
                    focus:border-indigo-500 focus:ring-indigo-500
                    sm:text-sm
                  "
                  placeholder="you@example.com"
                />
              </div>
              <span
                v-if="v.mailID.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.mailID.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <InputContactWithCountryCode
                label="Mobile Number"
                :state="state"
                textFieldStateName="primaryContact"
                countryCodeStateName="countryCode"
              />
              <span
                v-if="v.primaryContact.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.primaryContact.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <InputSearchableSelect
                inputName="nationality"
                :state="state"
                name="Country"
              />
              <span
                v-if="v.nationality.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.nationality.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="code" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <input
                v-model="state.city"
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm
                "
              />
              <span
                v-if="v.city.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.city.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="code" class="block text-sm font-medium text-gray-700"
                >Street</label
              >
              <input
                v-model="state.street"
                type="text"
                name="street"
                id="street"
                autocomplete="address-level2"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm
                "
              />
              <span
                v-if="v.street.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.street.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="code" class="block text-sm font-medium text-gray-700"
                >Zip Code</label
              >
              <input
                v-model="state.zipCode"
                type="text"
                name="zipCode"
                id="zipCode"
                autocomplete="address-level2"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm
                "
              />
              <span
                v-if="v.zipCode.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.zipCode.$errors[0].$message }}
              </span>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <label
                for="perAddress"
                class="block text-sm font-medium text-gray-700"
                >Company Address</label
              >
              <textarea
                id="perAddress"
                name="perAddress"
                rows="3"
                class="
                  block
                  h-24
                  w-full
                  max-w-7xl
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm
                "
                v-model="state.perAddress"
              ></textarea>
            </div>

            <!-- Contact Details -->
            <div class="accordion-item col-span-6 bg-white sm:col-span-6">
              <h2 class="accordion-header mb-0" id="headingTwo">
                <button
                  class="
                    accordion-button
                    collapsed
                    relative
                    flex
                    w-full
                    items-center
                    rounded-none
                    border-0
                    bg-white
                    py-4
                    px-5
                    text-left text-base
                    font-medium
                    text-gray-700
                    transition
                    focus:outline-none
                  "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  @click="isActiveTab = !isActiveTab"
                >
                  <svg
                    v-if="!isActiveTab"
                    class="h-5 w-5 pr-1 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-if="isActiveTab"
                    class="h-5 w-5 pr-1 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                  Contact Details
                </button>
              </h2>

              <div
                v-if="isActiveTab"
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              ></div>
            </div>

            <div
              v-if="isActiveTab"
              class="
                col-span-6
                block
                pb-4
                text-sm
                font-medium
                text-gray-700
                sm:col-span-6
              "
            >
              <div class="mt-5 grid grid-cols-6 gap-4">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="code"
                    class="block text-sm font-medium text-gray-700"
                    >Name</label
                  >
                  <input
                    v-model="state.contact_Name"
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-500 focus:ring-indigo-500
                      sm:text-sm
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="code"
                    class="block text-sm font-medium text-gray-700"
                    >Designation</label
                  >
                  <input
                    v-model="state.contact_Designation"
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-500 focus:ring-indigo-500
                      sm:text-sm
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <InputContactWithCountryCode
                    label="Contact Number"
                    :state="state"
                    textFieldStateName="contact_Number"
                    countryCodeStateName="contact_NumberCode"
                  />
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <label
                    for="code"
                    class="block text-sm font-medium text-gray-700"
                    >Email Id</label
                  >
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div
                      class="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-0
                        flex
                        items-center
                        pl-3
                      "
                    >
                      <!-- Heroicon name: solid/mail -->
                      <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        />
                        <path
                          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="state.contact_Email"
                      type="text"
                      name="city"
                      id="city"
                      autocomplete="address-level2"
                      placeholder="you@example.com"
                      class="
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        pl-10
                        focus:border-indigo-500 focus:ring-indigo-500
                        sm:text-sm
                      "
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-2">
                  <label
                    for="code"
                    class="block text-sm font-medium text-gray-700"
                    >Department</label
                  >
                  <input
                    v-model="state.contact_Department"
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-500 focus:ring-indigo-500
                      sm:text-sm
                    "
                  />
                </div>
                <div class="col-span-6 flex justify-end sm:col-span-6">
                  <button
                    class="
                      ml-2
                      cursor-pointer
                      items-center
                      rounded-md
                      bg-gray-500
                      px-2
                      py-2
                      text-sm
                      font-normal
                      leading-6
                      text-white
                      shadow
                      hover:bg-indigo-400
                    "
                    @click="AddContactOnClick"
                  >
                    {{ contactListAddButtonText }}
                  </button>
                </div>
              </div>
              <div v-if="state.contactList.length > 0">
                <h2
                  class="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-gray-500
                  "
                >
                  Contacts List
                </h2>
                <ul
                  role="list"
                  class="
                    mt-3
                    grid grid-cols-1
                    gap-1
                    divide-y divide-gray-200
                    sm:grid-cols-1 sm:gap-3
                    lg:grid-cols-1
                  "
                >
                  <li v-for="(data, index) in state.contactList" :key="index">
                    <a href="#" class="block hover:bg-gray-50">
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <p
                            class="truncate text-sm font-medium text-indigo-600"
                          >
                            {{ data?.name }}
                          </p>
                          <div class="ml-2 flex flex-shrink-0">
                            <p
                              class="
                                inline-flex
                                rounded-full
                               
                                px-2
                                text-xs
                                font-semibold
                                leading-5
                                text-green-800
                              "
                            >
                              {{ data?.department }}
                            </p>
                            <!-- edit -->
                            <button
                              class="
                                inline-flex
                                pl-5
                                pr-2
                                text-xs
                                font-semibold
                                leading-5
                              "
                              @click="contactDetailEditClick(index)"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="
                                  mr-1.5
                                  h-5
                                  w-5
                                  flex-shrink-0
                                  text-gray-400
                                "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                          <div class="sm:flex">
                            <p class="flex items-center text-sm text-gray-500">
                              <!-- Heroicon name: solid/users -->
                              <svg
                                class="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path
                                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                ></path>
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                ></path>
                              </svg>
                              {{ data?.designation }}
                            </p>
                            <p
                              class="
                                mt-2
                                flex
                                items-center
                                text-sm text-gray-500
                                sm:mt-0 sm:ml-6
                              "
                            >
                              <!-- Heroicon name: solid/call-marker -->
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="
                                  mr-1.5
                                  h-5
                                  w-5
                                  flex-shrink-0
                                  text-gray-400
                                "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                                />
                              </svg>
                              {{ data?.number }}
                            </p>
                          </div>
                          <div
                            class="
                              mt-2
                              flex
                              items-center
                              text-sm text-gray-500
                              sm:mt-0
                            "
                          >
                            <!-- Heroicon name: solid/email -->
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                              />
                              <path
                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                              />
                            </svg>
                            <p>
                              {{ data?.email }}
                            </p>
                            <!-- remove -->
                            <button
                              class="
                                inline-flex
                                pl-5
                                pr-2
                                text-xs
                                font-semibold
                                leading-5
                              "
                              @click="removeDataFromContactList(index)"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="
                                  mr-1.5
                                  h-5
                                  w-5
                                  flex-shrink-0
                                  text-gray-400
                                "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <label
                for="joiningDate"
                class="block text-sm font-medium text-gray-700"
                >About</label
              >
              <textarea
                id="about"
                name="about"
                rows="3"
                class="
                  block
                  h-24
                  w-full
                  max-w-4xl
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm
                "
                v-model="state.about"
              ></textarea>

              <span
                v-if="v.about.$error"
                class="font-small text-xs text-red-600"
              >
                {{ v.about.$errors[0].$message }}
              </span>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <LoadingButton
    :text="id ? 'Save' : 'Create'"
    :onPress="submitForm"
    :isLoading="isLoading"
  /> -->
  <Notification
    message=" General Save Successfully"
    :toggleNotification="toggleNotification"
    v-if="showNotification"
  />
</template>

<style lang="scss" scoped></style>
