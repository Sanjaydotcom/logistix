<script>
definePageMeta({
  layout: "home",
});
export default {
  name: "LandingPage",
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
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-white">
    <Head>
      <Title>LogistiX - An intelligent solution for logistics businesses</Title>
      <link rel="icon" type="image/svg" href="/favicon.svg" />
    </Head>
    <div class="relative overflow-hidden">
      <div class="absolute inset-y-0 h-full w-full" aria-hidden="true">
        <div class="relative h-full">
          <svg
            class="absolute right-full translate-y-1/3 translate-x-1/4 transform sm:translate-x-1/2 md:translate-y-1/2 lg:translate-x-full"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
            />
          </svg>
          <svg
            class="absolute left-full -translate-y-3/4 -translate-x-1/4 transform sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
            />
          </svg>
        </div>
      </div>

      <div class="relative pt-6 pb-16 sm:pb-24">
        <div class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6">
          <div class="text-center">
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block">An intelligent solution for</span>
              <span class="mt-2 block">logistics businesses</span>
            </h1>
            <p
              class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            >
              LogistiX provides you a complete package of curated tools and
              solutions to help you manage your shipping business without aay
              hassle.
            </p>
            <div
              class="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8"
            >
              <div class="rounded-md shadow">
                <a
                  href="/auth"
                  class="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="absolute inset-0 flex flex-col" aria-hidden="true">
          <div class="flex-1"></div>
          <div class="w-full flex-1 bg-white"></div>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6">
          <img
            class="relative rounded-lg shadow-md drop-shadow-xl"
            src="/img/demo.webp"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2
          class="text-center text-sm font-semibold uppercase tracking-wide text-gray-400"
        >
          Trusted by leading shipping companies
        </h2>
        <div class="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
              alt="Tuple"
            />
          </div>
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
              alt="Mirage"
            />
          </div>
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
              alt="StaticKit"
            />
          </div>
          <div
            class="col-span-1 flex justify-center md:col-span-3 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
              alt="Transistor"
            />
          </div>
          <div
            class="col-span-2 flex justify-center md:col-span-3 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
              alt="Workcation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
