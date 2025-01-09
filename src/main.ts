import { createApp, type App as IApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { useAuthStore } from "@/store/auth";
import { type User as IUser } from "firebase/auth";
import { onFirebaseAuthStateChanged } from "@/services/firebase";
import Vue3Toasity from "vue3-toastify";
import toastifyConfig from "@/plugins/toastify-config";
import "vue3-toastify/dist/index.css";

let app: IApp | null = null;

onFirebaseAuthStateChanged((user: IUser | null) => {
  if (!app) {
    app = createApp(App);

    app
      .use(router)
      .use(createPinia())
      .use(Vue3Toasity, toastifyConfig)
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
