<script>
definePageMeta({
  layout: "app",
});
export default {
  name: "Settings",
};
</script>

<template>
  <main
    class="relative z-20 max-h-screen flex-1 overflow-y-auto focus:outline-none"
  >
    <div class="max-w-3xl md:px-8 xl:px-8">
      <div class="pt-10 pb-16">
        <div class="px-4 sm:px-6 md:px-0">
          <h1 class="text-3xl font-extrabold text-gray-900">Settings</h1>
        </div>
        <div class="px-4 sm:px-6 md:px-0">
          <div class="py-6">
            <!-- Tabs -->
            <div class="lg:hidden">
              <label for="selected-tab" class="sr-only">Select a tab</label>
              <select
                id="selected-tab"
                name="selected-tab"
                class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              >
                <option selected>General</option>

                <option>Password</option>

                <option>Notifications</option>

                <option>Plan</option>

                <option>Billing</option>

                <option>Team Members</option>
              </select>
            </div>
            <div class="hidden lg:block">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8">
                  <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                  <a
                    href="#"
                    class="whitespace-nowrap border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600"
                  >
                    General
                  </a>

                  <a
                    href="#"
                    class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Password
                  </a>

                  <a
                    href="#"
                    class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Notifications
                  </a>

                  <a
                    href="#"
                    class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Plan
                  </a>

                  <a
                    href="#"
                    class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Billing
                  </a>

                  <a
                    href="#"
                    class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Team Members
                  </a>
                </nav>
              </div>
            </div>

            <!-- Description list with inline editing -->
            <div class="mt-10 divide-y divide-gray-200">
              <div class="space-y-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p class="max-w-2xl text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <div class="mt-6">
                <dl class="divide-y divide-gray-200">
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <span class="flex-grow">Chelsea Hagon</span>
                      <span class="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                  >
                    <dt class="text-sm font-medium text-gray-500">Photo</dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <span class="flex-grow">
                        <img
                          class="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </span>
                      <span
                        class="ml-4 flex flex-shrink-0 items-start space-x-4"
                      >
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                        <span class="text-gray-300" aria-hidden="true">|</span>
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                  >
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <span class="flex-grow">chelsea.hagon@example.com</span>
                      <span class="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
                  >
                    <dt class="text-sm font-medium text-gray-500">Job title</dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <span class="flex-grow">Human Resources Manager</span>
                      <span class="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div class="mt-10 divide-y divide-gray-200">
              <div class="space-y-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Account
                </h3>
                <p class="max-w-2xl text-sm text-gray-500">
                  Manage how information is displayed on your account.
                </p>
              </div>
              <div class="mt-6">
                <dl class="divide-y divide-gray-200">
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt class="text-sm font-medium text-gray-500">Language</dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <span class="flex-grow">English</span>
                      <span class="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                  >
                    <dt class="text-sm font-medium text-gray-500">
                      Date format
                    </dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <span class="flex-grow">DD-MM-YYYY</span>
                      <span
                        class="ml-4 flex flex-shrink-0 items-start space-x-4"
                      >
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Update
                        </button>
                        <span class="text-gray-300" aria-hidden="true">|</span>
                        <button
                          type="button"
                          class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                  >
                    <dt
                      class="text-sm font-medium text-gray-500"
                      id="timezone-option-label"
                    >
                      Automatic timezone
                    </dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <!-- Enabled: "bg-purple-600", Not Enabled: "bg-gray-200" -->
                      <button
                        type="button"
                        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto"
                        role="switch"
                        aria-checked="true"
                        aria-labelledby="timezone-option-label"
                      >
                        <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                        <span
                          aria-hidden="true"
                          class="inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
                  >
                    <dt
                      class="text-sm font-medium text-gray-500"
                      id="auto-update-option-label"
                    >
                      Auto-update applicant data
                    </dt>
                    <dd
                      class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <!-- Enabled: "bg-purple-600", Not Enabled: "bg-gray-200" -->
                      <button
                        type="button"
                        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto"
                        role="switch"
                        aria-checked="false"
                        aria-labelledby="auto-update-option-label"
                      >
                        <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                        <span
                          aria-hidden="true"
                          class="inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
