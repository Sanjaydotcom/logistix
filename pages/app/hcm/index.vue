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
import Dashboard from "./-components/Dashboard.vue";
import Welcome from "./-components/Welcome.vue";
import { useEmployeesStore } from "~~/store/employees";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae.",
  },
];

definePageMeta({
  layout: "empdashboard",
});
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
    Dashboard,
    Welcome,
  },
  setup() {
    return {
      user,
      navigation,
      breadcrumbs,
      userNavigation,
      attachments,
      eventTypes,
      timeline,
      comments,
      announcements,
    };
  },
};
</script>
<template>
  <div class="overflow-y-auto border-t border-gray-200">
    <Head>
      <Title>Employee / Home</Title>
      <link rel="icon" type="image/svg" href="/favicon.svg" />
    </Head>
    <div
      class="
        mx-auto
        mt-6
        grid
        max-w-3xl
        grid-cols-1
        gap-6
        sm:px-6
        lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3
      "
    >
      <div class="space-y-6 lg:col-span-2 lg:col-start-1">
        <!-- Description list-->

        <Welcome />
        <Dashboard />
      </div>

      <section aria-labelledby="announcements-title">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="p-6">
            <h2
              class="text-base font-medium text-gray-900"
              id="announcements-title"
            >
              Announcements
            </h2>
            <div class="mt-6 flow-root">
              <ul role="list" class="-my-5 divide-y divide-gray-200">
                <li
                  v-for="announcement in announcements"
                  :key="announcement.id"
                  class="py-5"
                >
                  <div
                    class="
                      relative
                      focus-within:ring-2 focus-within:ring-cyan-500
                    "
                  >
                    <h3 class="text-sm font-semibold text-gray-800">
                      <a
                        :href="announcement.href"
                        class="hover:underline focus:outline-none"
                      >
                        <!-- Extend touch target to entire panel -->
                        <span class="absolute inset-0" aria-hidden="true" />
                        {{ announcement.title }}
                      </a>
                    </h3>
                    <p class="line-clamp-2 mt-1 text-sm text-gray-600">
                      {{ announcement.preview }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-6">
              <a
                href="#"
                class="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-md
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  shadow-sm
                  hover:bg-gray-50
                "
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
