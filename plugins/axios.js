import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const process = useRuntimeConfig();
  const defaultUrl = `${process.public.baseUrl}`;

  let api = axios.create({
    baseUrl: defaultUrl,
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      api: api,
    },
  };
});
