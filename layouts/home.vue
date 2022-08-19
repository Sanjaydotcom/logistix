<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    home() {
      this.$router.push({ name: "auth" });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<template>
  <div class="bg-white">
    <div class="relative overflow-hidden">
      <div class="relative pt-4 pb-16 sm:pb-24">
        <div>
          <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6">
            <nav
              class="relative flex items-center justify-between sm:h-10 md:justify-center"
              aria-label="Global"
            >
              <div
                class="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0"
              >
                <div class="flex w-full items-center justify-between md:w-auto">
                  <NuxtLink to="/">
                    <span class="sr-only">Workflow</span>
                    <img
                      class="h-8 w-auto sm:h-10"
                      src="/img/streben.svg"
                      alt="LogistiX"
                    />
                  </NuxtLink>
                  <div class="-mr-2 flex items-center md:hidden">
                    <button
                      type="button"
                      @click="toggleMenu"
                      class="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      aria-expanded="false"
                    >
                      <span class="sr-only">Open main menu</span>
                      <!-- Heroicon name: outline/menu -->
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="hidden md:flex md:space-x-10">
                <a
                  href="/"
                  :class="[
                    $route.path == '/'
                      ? 'font-medium text-gray-900'
                      : 'font-medium text-gray-500',
                  ]"
                  >Home</a
                >

                <a
                  href="/features"
                  :class="[
                    $route.path == '/features'
                      ? 'font-medium text-gray-900'
                      : 'font-medium text-gray-500',
                  ]"
                  >Features</a
                >

                <a
                  href="/pricing"
                  :class="[
                    $route.path == '/pricing'
                      ? 'font-medium text-gray-900'
                      : 'font-medium text-gray-500',
                  ]"
                  >Pricing</a
                >

                <!-- <NuxtLink
                  @click="switchPage(0)"
                  href="/"
                  :class="[
                    activePage == 3
                      ? 'font-medium text-gray-900'
                      : 'font-medium text-gray-500',
                  ]"
                  >Company</NuxtLink
                > -->
              </div>
              <div
                class="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end"
              >
                <span class="inline-flex rounded-md shadow">
                  <a
                    href="/auth"
                    class="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-500"
                  >
                    Log in
                  </a>
                </span>
              </div>
            </nav>
          </div>

          <!--
          Mobile menu, show/hide based on menu open state.

          Entering: "duration-150 ease-out"
            From: "opacity-0 scale-95"
            To: "opacity-100 scale-100"
          Leaving: "duration-100 ease-in"
            From: "opacity-100 scale-100"
            To: "opacity-0 scale-95"
        -->
          <div
            v-if="showMenu"
            class="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div
              class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5"
            >
              <div class="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    class="h-8 w-auto"
                    src="https://avatars.githubusercontent.com/u/103851215"
                    alt="LogistiX"
                  />
                </div>
                <div class="-mr-2">
                  <button
                    type="button"
                    @click="toggleMenu"
                    class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    <span class="sr-only">Close main menu</span>
                    <!-- Heroicon name: outline/x -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="space-y-1 px-2 pt-2 pb-3">
                <a
                  href="/"
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >Home</a
                >

                <a
                  href="/features"
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >Features</a
                >

                <a
                  href="/pricing"
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >Pricing</a
                >
              </div>
              <a
                href="/auth"
                class="block w-full cursor-pointer bg-gray-50 px-5 py-3 text-center font-medium text-blue-600 hover:bg-gray-100 hover:text-blue-700"
              >
                Log in
              </a>
            </div>
          </div>
          <main>
            <slot />
          </main>
        </div>
      </div>

      <!-- footer section -->

      <!-- This example requires Tailwind CSS v2.0+ -->
      <footer class="bg-white">
        <div
          class="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
        >
          <p class="mt-8 text-center text-base text-gray-400">
            &copy; 2022 LogistiX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
