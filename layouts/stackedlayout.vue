<script>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/vue/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "/app/hcm" },
  { name: "Employees", href: "/app/hcm/employees" },
  { name: "Applications", href: "#" },
  { name: "Listing", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Frontend Developer", href: "#", current: false },
  { name: "Applications", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  // { name: "Sign out", href: "#" },
];

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverOverlay,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
    ArrowNarrowLeftIcon,
    BellIcon,
    HomeIcon,
    MenuIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    XIcon,
  },
  computed: {
    crumbs: function () {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: this.$route.matched[idx]?.meta.breadCrumb || path,
        });
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    },
  },
  setup() {
    return {
      user,
      navigation,
      breadcrumbs,
      userNavigation,
      eventTypes,
    };
  },
  methods: {
    async SignOut() {
      await this.$msal
        .logoutPopup({})
        .then(() => {
          this.$emitter.emit("logout", "logging out");
        })
        .then(() => {
          this.$router.push({ name: "auth" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:px-8">
        <Popover class="flex h-16 justify-between" v-slot="{ open }">
          <div class="flex px-2 lg:px-0">
            <div class="flex flex-shrink-0 items-center">
              <a href="#">
                <img
                  class="h-8 w-auto"
                  src="https://avatars.githubusercontent.com/u/103851215"
                  alt="LogistiX"
                />
              </a>
            </div>
            <nav
              aria-label="Global"
              class="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4"
            >
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="px-3 py-2 text-sm font-medium text-gray-900"
              >
                {{ item.name }}
              </NuxtLink>
            </nav>
          </div>
          <div
            class="
              flex flex-1
              items-center
              justify-center
              px-2
              lg:ml-6 lg:justify-end
            "
          >
            <div class="w-full max-w-lg lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
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
                  <SearchIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  class="
                    block
                    w-full
                    rounded-md
                    border border-gray-300
                    bg-white
                    py-2
                    pl-10
                    pr-3
                    leading-5
                    placeholder-gray-500
                    shadow-sm
                    focus:border-blue-600
                    focus:placeholder-gray-400
                    focus:outline-none
                    focus:ring-1
                    focus:ring-blue-600
                    sm:text-sm
                  "
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center lg:hidden">
            <!-- Mobile menu button -->
            <PopoverButton
              class="
                inline-flex
                items-center
                justify-center
                rounded-md
                p-2
                text-gray-400
                hover:bg-gray-100 hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-blue-500
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon class="block h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <TransitionRoot as="template" :show="open">
            <div class="lg:hidden">
              <TransitionChild
                as="template"
                enter="duration-150 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-150 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <PopoverOverlay
                  class="fixed inset-0 z-20 bg-black bg-opacity-25"
                  aria-hidden="true"
                />
              </TransitionChild>

              <TransitionChild
                as="template"
                enter="duration-150 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <PopoverPanel
                  focus
                  class="
                    absolute
                    top-0
                    right-0
                    z-30
                    w-full
                    max-w-none
                    origin-top
                    transform
                    p-2
                    transition
                  "
                >
                  <div
                    class="
                      divide-y divide-gray-200
                      rounded-lg
                      bg-white
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                    "
                  >
                    <div class="pt-3 pb-2">
                      <div class="flex items-center justify-between px-4">
                        <div>
                          <img
                            class="h-8 w-auto"
                            src="https://avatars.githubusercontent.com/u/103851215"
                            alt="LogistiX"
                          />
                        </div>
                        <div class="-mr-2">
                          <PopoverButton
                            class="
                              inline-flex
                              items-center
                              justify-center
                              rounded-md
                              bg-white
                              p-2
                              text-gray-400
                              hover:bg-gray-100 hover:text-gray-500
                              focus:outline-none
                              focus:ring-2
                              focus:ring-inset
                              focus:ring-blue-500
                            "
                          >
                            <span class="sr-only">Close menu</span>
                            <XIcon class="h-6 w-6" aria-hidden="true" />
                          </PopoverButton>
                        </div>
                      </div>
                      <div class="mt-3 space-y-1 px-2">
                        <NuxtLink
                          v-for="item in navigation"
                          :key="item.name"
                          :to="item.href"
                          class="
                            block
                            rounded-md
                            px-3
                            py-2
                            text-base
                            font-medium
                            text-gray-900
                            hover:bg-gray-100 hover:text-gray-800
                          "
                          >{{ item.name }}</NuxtLink
                        >
                      </div>
                    </div>
                    <div class="pt-4 pb-2">
                      <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full"
                            :src="user.imageUrl"
                            alt=""
                          />
                        </div>
                        <div class="ml-3">
                          <div class="text-base font-medium text-gray-800">
                            {{ user.name }}
                          </div>
                          <div class="text-sm font-medium text-gray-500">
                            {{ user.email }}
                          </div>
                        </div>
                        <button
                          type="button"
                          class="
                            ml-auto
                            flex-shrink-0
                            rounded-full
                            bg-white
                            p-1
                            text-gray-400
                            hover:text-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2
                          "
                        >
                          <span class="sr-only">View notifications</span>
                          <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div class="mt-3 space-y-1 px-2">
                        <a
                          v-for="item in userNavigation"
                          :key="item.name"
                          :href="item.href"
                          class="
                            block
                            rounded-md
                            px-3
                            py-2
                            text-base
                            font-medium
                            text-gray-900
                            hover:bg-gray-100 hover:text-gray-800
                          "
                        >
                          {{ item.name }}
                        </a>
                        <a
                          @click="SignOut"
                          class="
                            block
                            rounded-md
                            px-3
                            py-2
                            text-base
                            font-medium
                            text-gray-900
                            hover:bg-gray-100 hover:text-gray-800
                          "
                        >
                          Signout
                        </a>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </TransitionChild>
            </div>
          </TransitionRoot>
          <div class="hidden lg:ml-4 lg:flex lg:items-center">
            <button
              type="button"
              class="
                flex-shrink-0
                rounded-full
                bg-white
                p-1
                text-gray-400
                hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
              "
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-4 flex-shrink-0">
              <div>
                <MenuButton
                  class="
                    flex
                    rounded-full
                    bg-white
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                  "
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="user.imageUrl"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="
                    absolute
                    right-0
                    mt-2
                    w-48
                    origin-top-right
                    rounded-md
                    bg-white
                    py-1
                    shadow-lg
                    ring-1 ring-black ring-opacity-5
                    focus:outline-none
                  "
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                  <MenuItem>
                    <a
                      @click="SignOut"
                      class="
                        block
                        cursor-pointer
                        px-4
                        py-2
                        text-sm text-gray-700
                      "
                    >
                      Signout
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </Popover>
      </div>

      <div
        class="mx-auto max-w-screen-2xl px-4 sm:px-6"
        v-if="crumbs[0].text !== 'home' && crumbs.length > 1"
      >
        <div class="border-gray-200 pb-2">
          <nav class="flex" aria-label="Breadcrumb">
            <div class="flex sm:hidden">
              <a
                href="#"
                class="
                  group
                  inline-flex
                  space-x-3
                  text-sm
                  font-medium
                  text-gray-500
                  hover:text-gray-700
                "
              >
                <ArrowNarrowLeftIcon
                  class="
                    h-5
                    w-5
                    flex-shrink-0
                    text-gray-400
                    group-hover:text-gray-600
                  "
                  aria-hidden="true"
                />
                <span>Back to Applicants</span>
              </a>
            </div>
            <div class="hidden px-6 sm:block">
              <ol role="list" class="flex items-center space-x-4">
                <li>
                  <div>
                    <NuxtLink
                      to="/home"
                      class="text-gray-400 hover:text-gray-500"
                    >
                      <HomeIcon
                        class="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span class="sr-only">Home</span>
                    </NuxtLink>
                  </div>
                </li>
                <li v-for="item in crumbs" :key="item.name">
                  <div class="flex items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <NuxtLink
                      :to="item.to"
                      class="
                        ml-4
                        text-sm
                        font-medium
                        capitalize
                        text-gray-500
                        hover:text-gray-700
                      "
                    >
                      {{ item.text }}
                    </NuxtLink>
                  </div>
                </li>
              </ol>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <main class="py-10">
      <div class="mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div class="px-4">
          <!-- Page header -->
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
