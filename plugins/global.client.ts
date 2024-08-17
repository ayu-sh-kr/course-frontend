import { defineNuxtPlugin } from '#app';
import { FetchService } from '~/services/fetch.service';
import {ToastService} from "~/services/toast.service";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const fetchService = new FetchService(config.public.BACKEND_URL);
    nuxtApp.provide('fetcher', fetchService);
    const toast = new ToastService(useToast())
    nuxtApp.provide('toast', toast);
});

declare module '#app' {
    interface NuxtApp {
        $fetcher: FetchService;
        $toast: ToastService;
    }
}