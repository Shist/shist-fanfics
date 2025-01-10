import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFanficsStore } from "@/store/fanfics";
import { LoadingState } from "@/types";

export default function useFanficsLoadingState() {
  const fanficsStore = storeToRefs(useFanficsStore());

  const areFanficsLoading = computed(
    () => fanficsStore.fanficsLoadingState.value === LoadingState.LOADING
  );

  const isFanficsLoadingError = computed(
    () => fanficsStore.fanficsLoadingState.value === LoadingState.ERROR
  );

  const areFanficsLoaded = computed(
    () => fanficsStore.fanficsLoadingState.value === LoadingState.LOADED
  );

  return { areFanficsLoading, isFanficsLoadingError, areFanficsLoaded };
}
