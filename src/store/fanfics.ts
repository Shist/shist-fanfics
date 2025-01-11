import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { FirebaseError } from "firebase/app";
import {
  loadFanficBodyFromFirebase,
  loadFanficsOfFieldFromFirebase,
} from "@/services/firebase";
import {
  LoadingState,
  BodyLoadingState,
  type IFanficsMap,
  isAttractorField,
} from "@/types";

export const useFanficsStore = defineStore("fanfics", () => {
  const fanficsLoadingState = ref<LoadingState>(LoadingState.LOADING);

  const fanfics = reactive<IFanficsMap>({
    alpha: [],
    beta: [],
    gamma: [],
    delta: [],
    epsilon: [],
  });

  const loadFanficsInfo = async () => {
    try {
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

  const loadFanficBody = async (fanficId: string) => {
    const attractorField = fanficId.split("-")[0];

    if (!isAttractorField(attractorField)) {
      return;
    }

    const targetFanfic = fanfics[attractorField].find(
      (fanfic) => fanfic.id === fanficId
    );

    if (!targetFanfic) {
      return;
    }

    try {
      targetFanfic.body.loadingState = BodyLoadingState.LOADING;

      const fanficParagraphs = await loadFanficBodyFromFirebase(fanficId);

      targetFanfic.body.paragraphs = fanficParagraphs;
      targetFanfic.body.loadingState = BodyLoadingState.LOADED;
    } catch (error) {
      targetFanfic.body.loadingState = BodyLoadingState.ERROR;

      if (error instanceof FirebaseError) {
        if (error.code === "permission-denied") {
          targetFanfic.body.loadingState = BodyLoadingState.ACCESS_ERROR;
        }
      }
    }
  };

  return {
    fanfics,
    fanficsLoadingState,
    loadFanficsInfo,
    loadFanficBody,
  };
});
