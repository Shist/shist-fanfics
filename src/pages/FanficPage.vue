<template>
  <main class="fanfic-page">
    <FanficHeaderSamples v-if="areFanficsLoading" />
    <h2
      v-else-if="isFanficsLoadingError"
      class="fanfic-page__fanfics-load-error"
    >
      Произошла ошибка при загрузке общей информации о фанфиках!<br />Пожалуйста,
      попробуйте еще раз позже...
    </h2>
    <h2 v-else-if="!targetFanfic" class="fanfic-page__no-fanfic-found-label">
      Фанфика с id=`{{ fanficId }}` не найдено...
    </h2>
    <div v-else-if="areFanficsLoaded" class="fanfic-page__main-content-wrapper">
      <h2 class="fanfic-page__headline">
        Поле Аттракторов: {{ fanficHeadline }}
      </h2>
      <h2 class="fanfic-page__headline">Дата: {{ fanficDate }}</h2>
      <h2 class="fanfic-page__headline fanfic-page__headline_title">
        {{ fanficTitle }}
      </h2>
      <div class="fanfic-page__paragraphs-wrapper">
        <!-- <template v-for="(fanficPart, index) in fanficMap.body" :key="index">
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
      </template> -->
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useFanficsStore } from "@/store/fanfics";
import useFanficsLoadingState from "@/composables/useFanficsLoadingState";
import FanficHeaderSamples from "@/components/FanficHeaderSamples.vue";
import { formatDate, getFieldLabel } from "@/utils";
import { isAttractorField, type IFanfic } from "@/types";

const props = defineProps<{
  fanficId: string;
}>();

const fanficsStore = useFanficsStore();

const attractorField = props.fanficId.split("-")[0];

const { areFanficsLoading, isFanficsLoadingError, areFanficsLoaded } =
  useFanficsLoadingState();

const targetFanfic = computed<IFanfic | null>(() => {
  if (isAttractorField(attractorField)) {
    const attractorFieldFanfics = fanficsStore.fanfics[attractorField];

    const targetFanfic = attractorFieldFanfics.find(
      (fanfic) => fanfic.id === props.fanficId
    );

    return targetFanfic ?? null;
  } else {
    return null;
  }
});

const fanficHeadline = computed(() => getFieldLabel(attractorField));

const fanficDate = computed(() =>
  targetFanfic.value ? formatDate(targetFanfic.value.date) : "(no fanfic found)"
);

const fanficTitle = computed(() =>
  targetFanfic.value ? targetFanfic.value.title : "(no fanfic found)"
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
  //animation: fadeIn 3s ease-in-out 0s 1 normal;
  &__fanfics-load-error,
  &__no-fanfic-found-label {
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
  &__main-content-wrapper {
    .fanfic-page__headline {
      @include default-headline(28px, 28px, var(--color-text));
      margin-bottom: 10px;
      &_title {
        margin-bottom: 20px;
        text-align: center;
        font-size: 36px;
        line-height: 36px;
      }
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
        &_title {
          font-size: 22px;
          line-height: 22px;
        }
      }
    }
    .fanfic-page__paragraphs-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      .fanfic-page__paragraph {
        @include default-text(24px, 32px, var(--color-text));
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
}
</style>
