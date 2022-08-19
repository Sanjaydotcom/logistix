import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: "static",
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: "",
  },
  head: {
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  },
  css: ["@/assets/theme.css"],
  build: {
    transpile: ["@headlessui/vue"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  publicRuntimeConfig: {
    MSAL_AUTHORITY:
      "https://login.microsoftonline.com/6dda9bce-9faa-43a3-b3c1-6195b1580fba",
    MSAL_CLIENT_ID: "7f7cc1e9-7d9f-43ca-8c3b-ecf939f45ca6",
    MSAL_REDIRECT_URI: "https://logistix.netlify.app/",
    MSAL_POST_LOGOUT_REDIRECT_URI: "https://logistix.netlify.app/",
    //MSAL_REDIRECT_URI: 'http://localhost:8080/',
    //MSAL_POST_LOGOUT_REDIRECT_URI: 'http://localhost:8080/',
  },
});
