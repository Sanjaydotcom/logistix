<script>
import { useAuthStore } from "../../store/auth";
import { onMounted, watch } from "vue";
import { loginRequest } from "@/msal.config";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    const loginPopup = () => {
      instance.loginPopup(loginRequest);
    };
    const performRedirect = () => {
      if (route.query.redirect) {
        router.push(route.query.redirect);
      } else {
        router.push("/app/hcm");
      }
    };

    onMounted(() => {
      if (isAuthenticated.value) {
        performRedirect();
      }
    });

    watch(isAuthenticated, () => {
      if (isAuthenticated.value) {
        performRedirect();
      }
    });
    return {
      loginPopup,
    };
  },
  data() {
    return {
      account: undefined,
    };
  },
};
</script>
<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <Head>
      <Title>LogistiX / Login</Title>
      <link rel="icon" type="image/svg" href="/favicon.svg" />
    </Head>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex items-center justify-center">
        <img class="h-12 w-auto" src="/img/streben.svg" alt="LogistiX" />
        <p class="ml-2 text-3xl font-medium text-gray-500">LogistiX</p>
      </div>
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <button
          @click="loginPopup"
          class="
            flex
            w-full
            justify-center
            rounded-md
            border border-transparent
            bg-blue-600
            py-2
            px-4
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          Signin with Microsoft
        </button>
      </div>
    </div>
    <p class="mt-4 text-center text-sm font-light text-gray-500">
      Powered by LogistiX
    </p>
  </div>
</template>
