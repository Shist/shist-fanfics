import { type Component } from "vue";
import AppSpinner from "@/components/ui/AppSpinner.vue";
import AppStatusIcon from "@/components/ui/AppStatusIcon.vue";
import AppSwitcher from "@/components/ui/AppSwitcher.vue";

export default {
  AppSpinner,
  AppStatusIcon,
  AppSwitcher,
} as {
  [key: string]: Component;
};
