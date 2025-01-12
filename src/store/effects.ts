import { ref } from "vue";
import { defineStore } from "pinia";

export const useEffectsStore = defineStore("effects", () => {
  const areEffectsEnabled = ref(!localStorage.getItem("areEffectsDisabled"));

  const setEffectsEnability = (newValue: boolean) => {
    areEffectsEnabled.value = newValue;

    if (newValue) {
      localStorage.removeItem("areEffectsDisabled");
    } else {
      localStorage.setItem("areEffectsDisabled", "true");
    }
  };

  return { areEffectsEnabled, setEffectsEnability };
});
