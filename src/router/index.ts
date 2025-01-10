import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import FanficPage from "@/pages/FanficPage.vue";
import SignInPage from "@/pages/SignInPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { useAuthStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/fanfics/:id",
      name: "fanfic",
      component: FanficPage,
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignInPage,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpPage,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  const { user } = useAuthStore();

  if (to.name === "sign-in" || to.name === "sign-up") {
    if (user) {
      next({ name: "main" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
