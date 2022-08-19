<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="bg-themeBackground hidden h-full w-56 overflow-y-auto border-r border-t border-gray-200 pt-5 pb-4 md:flex md:flex-grow md:flex-col"
  >
    <div class="mt-5 flex flex-grow flex-col">
      <nav class="flex-1 space-y-8 px-2" aria-label="Sidebar">
        <div class="space-y-1">
          <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
          <a
            href="/app/hcm"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            :class="[
              $route.path == '/app/hcm'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
              ,
            ]"
          >
            <!--
            Heroicon name: outline/home

            Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500"
          -->
            <svg
              class="mr-3 h-6 w-6 flex-shrink-0"
              :class="[
                $route.path == '/app/hcm'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </a>

          <a
            href="/app/hcm/employees"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            :class="[
              $route.path.includes('/employees')
                ? 'bg-gray-100 text-gray-800'
                : 'bg-white text-gray-600',
            ]"
          >
            <!-- Heroicon name: outline/users -->
            <svg
              class="mr-3 h-6 w-6 flex-shrink-0 group-hover:text-gray-500"
              :class="[
                $route.path.includes('/employees')
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600',
              ]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Employees
          </a>
        </div>
        <div class="space-y-1"></div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
