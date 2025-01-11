import { createApp, type App as IApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import { type User as IUser } from "firebase/auth";
import { onFirebaseAuthStateChanged } from "@/services/firebase";
import appComponents from "@/components/ui";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let app: IApp | null = null;

onFirebaseAuthStateChanged((user: IUser | null) => {
  if (!app) {
    app = createApp(App);

    Object.keys(appComponents).forEach((name) => {
      app!.component(name, appComponents[name]);
    });

    app
      .use(router)
      .use(createPinia())
      .use(Vue3Toasity, {
        clearOnUrlChange: false,
        theme: useThemeStore().currTheme,
      })
      .mount("#app");
  }

  if (user) {
    const { setUserCredentials } = useAuthStore();

    setUserCredentials({
      uid: user.uid,
      email: user.email ?? "",
    });
  }
});
