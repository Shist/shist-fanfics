import { reactive } from "vue";
import { defineStore } from "pinia";
import { loadFanficsInfoFromFirebase } from "@/services/firebase";
import { type IFanfic } from "@/types";

export const useFanficsStore = defineStore("fanfics", () => {
  const fanfics = reactive<IFanfic[]>([]);

  const loadFanficsInfo = async () => {
    const result = await loadFanficsInfoFromFirebase();

    fanfics.splice(0, fanfics.length, ...result);
  };

  return { fanfics, loadFanficsInfo };
});
