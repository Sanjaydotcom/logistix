<script>
import Dashboard from "./-components/Dashboard.vue";
import Welcome from "./-components/Welcome.vue";
import { useEmployeesStore } from "~~/store/employees";

definePageMeta({
  layout: "freigtdashboard",
});
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
export default {
  components: {
    Dashboard,
    Welcome,
  },
  setup() {
    return {
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
        lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 overflow-scroll
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
<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
