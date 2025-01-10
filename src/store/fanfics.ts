import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { loadFanficsOfFieldFromFirebase } from "@/services/firebase";
import { LoadingState, type IFanficsMap } from "@/types";

export const useFanficsStore = defineStore("fanfics", () => {
  const fanficsLoadingState = ref<LoadingState>(LoadingState.NOT_LOADED);

  const fanfics = reactive<IFanficsMap>({
    alpha: [],
    beta: [],
    gamma: [],
    delta: [],
    epsilon: [],
  });

  const loadFanficsInfo = async () => {
    try {
      fanficsLoadingState.value = LoadingState.LOADING;

      const loadedFanfics = await Promise.all([
        loadFanficsOfFieldFromFirebase("alpha"),
        loadFanficsOfFieldFromFirebase("beta"),
        loadFanficsOfFieldFromFirebase("gamma"),
        loadFanficsOfFieldFromFirebase("delta"),
        loadFanficsOfFieldFromFirebase("epsilon"),
      ]);

      fanfics.alpha = loadedFanfics[0];
      fanfics.beta = loadedFanfics[1];
      fanfics.gamma = loadedFanfics[2];
      fanfics.delta = loadedFanfics[3];
      fanfics.epsilon = loadedFanfics[4];

      fanficsLoadingState.value = LoadingState.LOADED;
    } catch (error) {
      fanficsLoadingState.value = LoadingState.ERROR;
    }
  };

  return { fanfics, fanficsLoadingState, loadFanficsInfo };
});
