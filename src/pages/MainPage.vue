<template>
  <main class="main-page">
    <FanficsListSamples v-if="isLoadingSectionVisible" />
    <div
      v-else-if="isErrorSectionVisible"
      class="main-page__fanfics-load-error"
    >
      An error occurred while loading fanfics!<br />Please try again later...
    </div>
    <div v-else-if="isFanficsSectionVisible" class="main-page__fanfics-list">
      <AttractorFieldSection field="alpha" :fanfics="fanfics.alpha" />
      <AttractorFieldSection field="beta" :fanfics="fanfics.beta" />
      <AttractorFieldSection field="gamma" :fanfics="fanfics.gamma" />
      <AttractorFieldSection field="delta" :fanfics="fanfics.delta" />
      <AttractorFieldSection field="epsilon" :fanfics="fanfics.epsilon" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useFanficsStore } from "@/store/fanfics";
import FanficsListSamples from "@/components/FanficsListSamples.vue";
import AttractorFieldSection from "@/components/AttractorFieldSection.vue";
import { LoadingState } from "@/types";

const router = useRouter();

const fanficsStore = storeToRefs(useFanficsStore());

const fanficsLoadingState = fanficsStore.fanficsLoadingState;
const fanfics = fanficsStore.fanfics;

const isLoadingSectionVisible = computed(
  () => fanficsLoadingState.value === LoadingState.LOADING
);

const isErrorSectionVisible = computed(
  () => fanficsLoadingState.value === LoadingState.ERROR
);

const isFanficsSectionVisible = computed(
  () => fanficsLoadingState.value === LoadingState.LOADED
);

// function onFanficCardClicked(fanficId: string) {
//   router.push(`fanfics/${fanficId}`);
// }
</script>

<style lang="scss" scoped>
.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  &__fanfics-load-error {
    @include default-text(28px, 28px, var(--color-text));
    @media (max-width: $tablet-l) {
      font-size: 24px;
      line-height: 24px;
    }
    @media (max-width: $phone-l) {
      font-size: 16px;
      line-height: 16px;
    }
  }
  &__fanfics-list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
