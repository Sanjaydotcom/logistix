<script>
import ActionButton from "~/components/ui/ActionButton";
export default {
  data() {
    return {
      // data,
    };
  },
  components: {
    ActionButton,
  },
  props: ["data"],
};
</script>

<template>
  <div
    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
    style="box-shadow: 0px 0px 6px 0px #c9c9cd"
  >
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="title in data.title"
            :key="title.id"
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            {{ title.name }}
          </th>
          <th>
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(person, personIdx) in data.content"
          :key="person.id"
          :class="personIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td
            v-for="content in person"
            :key="content.id"
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
          >
            {{ content }}
          </td>
          <td>
            <ActionButton />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
