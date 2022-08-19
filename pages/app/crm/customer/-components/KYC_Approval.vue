<script>
export default {
  props: ["state"],
  setup(props) {
    onMounted(() => {
      checkApprovalStatus();
    });
    const checkApprovalStatus = () => {
      if (
        props.state.creditApproval.request &&
        props.state.creditApproval.depManager &&
        props.state.creditApproval.financeHead
      ) {
        props.state.creditApproval.approvalStatus = true;
        props.state.creditApproval.ApprovalStatusDescription = "Approved";
      } else {
        props.state.creditApproval.approvalStatus = false;
        props.state.creditApproval.ApprovalStatusDescription =
          "Approval Pending";
      }
    };
    return { checkApprovalStatus };
  },
};
</script>
<template>
  <div class="p-4 pl-10">
    <fieldset class="space-y-4">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-3 flex h-5 items-center sm:col-span-2">
          <div>
            <input
              v-model="state.creditApproval.request"
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              :checked="true"
              @change="checkApprovalStatus"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-gray-700"
              >Approval Requested</label
            >
            <p id="comments-description" class="text-gray-500"></p>
          </div>
        </div>
        <div class="col-span-6 ml-2 sm:col-span-4">
          <label
            for="perAddress"
            class="block text-sm font-medium text-gray-700"
            >Remarks</label
          >
          <textarea
            v-model="state.creditApproval.approvalRequestDescription"
            id="perAddress"
            name="perAddress"
            rows="3"
            class="block h-10 w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
      </div>

      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-3 flex h-5 items-center sm:col-span-2">
          <div>
            <input
              v-model="state.creditApproval.depManager"
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              @change="checkApprovalStatus"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="candidates" class="font-medium text-gray-700"
              >Department Manager Approved</label
            >
          </div>
        </div>
         <div class="col-span-6 ml-2 sm:col-span-4">
          <label
            for="perAddress"
            class="block text-sm font-medium text-gray-700"
            >Remarks</label
          >
          <textarea
            v-model="state.creditApproval.depManagerDescription"
            id="perAddress"
            name="perAddress"
            rows="3"
            class="block h-10 w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-3 flex h-5 items-center sm:col-span-2">
          <div class="">
            <input
              v-model="state.creditApproval.financeHead"
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              @change="checkApprovalStatus"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="candidates" class="font-medium text-gray-700"
              >Finance Head Approved</label
            >
          </div>
        </div>
         <div class="col-span-6 ml-2 sm:col-span-4">
          <label
            for="perAddress"
            class="block text-sm font-medium text-gray-700"
            >Remarks</label
          >
          <textarea
            v-model="state.creditApproval.financeHeadDescription"
            id="perAddress"
            name="perAddress"
            rows="3"
            class="block h-10 w-full max-w-2xl rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
      <div class="relative flex items-start">
        <div class="flex h-5 items-center">
          <input
            v-model="state.creditApproval.approvalStatus"
            id="offers"
            aria-describedby="offers-description"
            name="offers"
            type="checkbox"
            @change="checkApprovalStatus"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="offers" class="font-medium text-gray-700"
            >Approval Success</label
          >
          <p id="offers-description" class="text-gray-500"></p>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped></style>
