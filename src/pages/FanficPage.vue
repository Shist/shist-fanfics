<template>
  <main class="fanfic-page">
    <h2 class="fanfic-page__headline">
      Поле Аттракторов: {{ fanficMap.attractorField }}
    </h2>
    <h2 class="fanfic-page__headline">Дата: {{ fanficMap.date }}</h2>
    <h2 class="fanfic-page__headline fanfic-page__headline_title">
      «{{ fanficMap.title }}»
    </h2>
    <div class="fanfic-page__paragraphs-wrapper">
      <template v-for="(fanficPart, index) in fanficMap.body" :key="index">
        <p v-if="typeof fanficPart === 'string'" class="fanfic-page__paragraph">
          {{ fanficPart }}
        </p>
        <p v-else class="fanfic-page__paragraph fanfic-page__paragraph_replic">
          <span
            class="fanfic-page__hero-name"
            :style="{ color: fanficPart[0] }"
          >
            {{ fanficPart[1] }}:
          </span>
          {{ fanficPart[2] }}
        </p>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { IFanfic } from "@/types/fanfic";
import fanficMapAlpha1 from "@/data/fanfic-alpha-1.json";
import fanficMapDelta1 from "@/data/fanfic-delta-1.json";

const route = useRoute();

const fanficsDB: { [key: string]: IFanfic } = {
  "alpha-1": fanficMapAlpha1,
  "delta-1": fanficMapDelta1,
};

const fanficMap = computed(
  () => fanficsDB[route.params.id as keyof typeof fanficsDB]
);
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fanfic-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  animation: fadeIn 3s ease-in-out 0s 1 normal;
  &__headline {
    @include default-headline(28px, 28px, var(--color-text-light));
    margin-bottom: 10px;
    &_title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 36px;
      line-height: 36px;
    }
    @media (max-width: $phone-l) {
      font-size: 24px;
      line-height: 24px;
      &_title {
        font-size: 28px;
        line-height: 28px;
      }
    }
  }
  &__paragraphs-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    .fanfic-page__paragraph {
      @include default-text(24px, 32px, var(--color-text-light));
      text-indent: 60px;
      @media (max-width: $phone-l) {
        font-size: 16px;
        line-height: 24px;
        text-indent: 30px;
      }
      &_replic {
        font-style: italic;
        text-indent: 20px;
        color: var(--color-hero-replic);
        @media (max-width: $phone-l) {
          text-indent: 10px;
        }
        .fanfic-page__hero-name {
          font-style: normal;
        }
      }
    }
  }
}
</style>
