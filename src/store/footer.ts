import { ref } from "vue";
import { defineStore } from "pinia";

export const useFooterStore = defineStore("footer", () => {
  const footerHeight = ref(0);

  return { footerHeight };
});
