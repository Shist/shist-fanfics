<template>
  <div class="main-page">
    <FanficsListSamples v-if="areFanficsLoading" />
    <h2 v-else-if="isFanficsLoadingError" class="main-page__fanfics-load-error">
      Произошла ошибка при загрузке фанфиков!<br />Пожалуйста, попробуйте еще
      раз позже...
    </h2>
    <div v-else-if="areFanficsLoaded" class="main-page__fanfics-list">
      <AttractorFieldSection field="alpha" :fanfics="fanfics.alpha" />
      <AttractorFieldSection field="beta" :fanfics="fanfics.beta" />
      <AttractorFieldSection field="gamma" :fanfics="fanfics.gamma" />
      <AttractorFieldSection field="delta" :fanfics="fanfics.delta" />
      <AttractorFieldSection field="epsilon" :fanfics="fanfics.epsilon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFanficsStore } from "@/store/fanfics";
import useFanficsLoadingState from "@/composables/useFanficsLoadingState";
import FanficsListSamples from "@/components/FanficsListSamples.vue";
import AttractorFieldSection from "@/components/AttractorFieldSection.vue";

const fanficsStore = storeToRefs(useFanficsStore());

const fanfics = fanficsStore.fanfics;

const { areFanficsLoading, isFanficsLoadingError, areFanficsLoaded } =
  useFanficsLoadingState();
</script>

<style lang="scss" scoped>
.main-page {
  &__fanfics-load-error {
    @include default-headline(36px, 36px, var(--color-text));
    @media (max-width: $tablet-l) {
      font-size: 28px;
      line-height: 28px;
    }
    @media (max-width: $phone-l) {
      font-size: 20px;
      line-height: 20px;
    }
  }
  &__fanfics-list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
