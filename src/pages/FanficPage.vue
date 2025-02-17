<template>
  <div class="fanfic-page">
    <EffectPsychopathic v-if="isPsychopathicEffectNeeded" />
    <div class="fanfic-page__header-content-wrapper">
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
      <div
        v-else-if="areFanficsLoaded"
        class="fanfic-page__header-content-loaded"
      >
        <h2 class="fanfic-page__headline">
          Поле Аттракторов: {{ fanficHeadline }}
        </h2>
        <h2 class="fanfic-page__headline">Дата: {{ fanficDate }}</h2>
        <h2 class="fanfic-page__headline fanfic-page__headline_title">
          {{ fanficTitle }}
        </h2>
      </div>
    </div>
    <div class="fanfic-page__body-content-wrapper">
      <h2
        v-if="areFanficsLoaded && !targetFanfic"
        class="fanfic-page__no-fanfic-found-label"
      >
        Фанфик не найден, поэтому его контент не может быть загружен...
      </h2>
      <h2
        v-else-if="isFanficsLoadingError"
        class="fanfic-page__fanfics-load-error"
      >
        Произошла ошибка во время загрузки общей информации о фанфиках, поэтому
        контент этого фанфика не может быть загружен...
      </h2>
      <FanficBodySamples v-else-if="!targetFanfic || isFanficBodyLoading" />
      <h2
        v-else-if="isFanficBodyLoadingError"
        class="fanfic-page__fanfics-load-error"
      >
        Произошла ошибка во время загрузки контента этого фанфика...
      </h2>
      <div
        v-else-if="isFanficBodyLoadingAccessError"
        class="fanfic-page__access-error-wrapper"
      >
        <h2 class="fanfic-page__fanfics-load-error">
          Похоже, что вы попытались загрузить контент для фанфика, относящегося
          к запретной секции! Чтобы получить доступ к контенту фанфика с
          подобным уровнем секретности, пожалуйста, зарегистрируйте аккаунт, а
          затем свяжитесь с Шистом, чтобы он лично открыл вашему аккаунту доступ
          к таким фанфикам:
        </h2>
        <div class="fanfic-page__shist-socials">
          <div class="fanfic-page__social-wrapper">
            <a
              class="fanfic-page__social-link"
              href="https://discord.com/channels/@me/301721632106610688"
              target="_blank"
            >
              <img src="@/assets/icons/discord.svg" alt="Дискорд" />
              <span class="fanfic-page__social-label">shist</span>
            </a>
          </div>
          <div class="fanfic-page__social-wrapper">
            <a
              class="fanfic-page__social-link"
              href="https://t.me/Shist041"
              target="_blank"
            >
              <img src="@/assets/icons/telegram.svg" alt="Телеграм" />
              <span class="fanfic-page__social-label">@Shist041</span>
            </a>
          </div>
          <div class="fanfic-page__social-wrapper">
            <a
              class="fanfic-page__social-link"
              href="https://x.com/Shist041"
              target="_blank"
            >
              <img src="@/assets/icons/x-twitter.svg" alt="Икс (Твиттер)" />
              <span class="fanfic-page__social-label">Shist</span>
            </a>
          </div>
          <div class="fanfic-page__social-wrapper">
            <a
              class="fanfic-page__social-link"
              href="https://vk.com/shist_degurechaff"
              target="_blank"
            >
              <img src="@/assets/icons/vk.svg" alt="В контакте" />
              <span class="fanfic-page__social-label">Паша Жуковский</span>
            </a>
          </div>
        </div>
        <AppImage
          class="fanfic-page__access-error-img"
          :imgPath="ForbiddenSectionImagePath"
          imgAlt="Запретная секция"
        />
      </div>
      <div
        v-else-if="isFanficBodyLoaded"
        class="fanfic-page__paragraphs-wrapper"
      >
        <template
          v-for="(fanficPart, index) in targetFanfic.body.paragraphs"
          :key="index"
        >
          <p
            v-if="typeof fanficPart === 'string'"
            class="fanfic-page__paragraph"
          >
            {{ fanficPart }}
          </p>
          <AppImage
            v-else-if="isImageData(fanficPart)"
            :imgPath="fanficPart.url"
            :imgAlt="fanficPart.description"
          />
          <p
            v-else
            class="fanfic-page__paragraph fanfic-page__paragraph_replic"
          >
            <span
              class="fanfic-page__hero-name"
              :style="{ color: fanficPart.color }"
            >
              {{ fanficPart.hero }}:
            </span>
            {{ fanficPart.replic }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { useFanficsStore } from "@/store/fanfics";
import { useEffectsStore } from "@/store/effects";
import useFanficsLoadingState from "@/composables/useFanficsLoadingState";
import FanficHeaderSamples from "@/components/FanficHeaderSamples.vue";
import FanficBodySamples from "@/components/FanficBodySamples.vue";
import EffectPsychopathic from "@/components/effects/EffectPsychopathic.vue";
import { formatDate, getFieldLabel } from "@/utils";
import {
  isAttractorField,
  BodyLoadingState,
  type IFanfic,
  isImageData,
} from "@/types";
import ForbiddenSectionImage from "@/assets/images/forbidden-section.png";

const props = defineProps<{
  fanficId: string;
}>();

const fanficsStore = useFanficsStore();
const effectsStore = useEffectsStore();

const attractorField = props.fanficId.split("-")[0];

const ForbiddenSectionImagePath = ref(ForbiddenSectionImage);

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
  targetFanfic.value
    ? formatDate(targetFanfic.value.date)
    : "(фанфик не найден)"
);

const fanficTitle = computed(() =>
  targetFanfic.value ? targetFanfic.value.title : "(фанфик не найден)"
);

const isFanficBodyLoading = computed(
  () => targetFanfic.value?.body.loadingState === BodyLoadingState.LOADING
);

const isFanficBodyLoadingError = computed(
  () => targetFanfic.value?.body.loadingState === BodyLoadingState.ERROR
);

const isFanficBodyLoadingAccessError = computed(
  () => targetFanfic.value?.body.loadingState === BodyLoadingState.ACCESS_ERROR
);

const isFanficBodyLoaded = computed(
  () => targetFanfic.value?.body.loadingState === BodyLoadingState.LOADED
);

const isPsychopathicEffectNeeded = computed(() => {
  return (
    targetFanfic.value?.isPsychopathic &&
    isFanficBodyLoaded.value &&
    effectsStore.areEffectsEnabled
  );
});

watch(
  targetFanfic,
  (targetFanfic: IFanfic | null) => {
    if (
      !targetFanfic ||
      targetFanfic.body.loadingState !== BodyLoadingState.NOT_LOADED
    ) {
      return;
    }

    fanficsStore.loadFanficBody(targetFanfic.id);
  },
  { immediate: true }
);

onUnmounted(() => {
  if (targetFanfic.value) {
    targetFanfic.value.body.loadingState = BodyLoadingState.NOT_LOADED;
  }
});
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
  display: flex;
  flex-direction: column;
  &__header-content-wrapper {
    margin-bottom: 20px;
    .fanfic-page__fanfics-load-error,
    .fanfic-page__no-fanfic-found-label {
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
    .fanfic-page__header-content-loaded {
      .fanfic-page__headline {
        @include default-headline(28px, 28px, var(--color-text));
        margin-bottom: 10px;
        &_title {
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
    }
  }
  &__body-content-wrapper {
    .fanfic-page__no-fanfic-found-label,
    .fanfic-page__fanfics-load-error {
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
    .fanfic-page__access-error-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      animation: fadeIn 3s ease-in-out 0s 1 normal;
      .fanfic-page__shist-socials {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr;
        gap: 10px;
        @media (max-width: $laptop-s) {
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
        }
        @media (max-width: $phone-l) {
          align-self: flex-start;
          grid-template-columns: 1fr;
          grid-template-rows: repeat(4, 1fr);
        }
        .fanfic-page__social-wrapper {
          display: flex;
          .fanfic-page__social-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: 0.3s;
            &:hover {
              transform: scale(1.05);
            }
            &:hover > .fanfic-page__social-label {
              color: var(--color-link-active);
            }
            .fanfic-page__social-label {
              @include default-text(18px, 18px, var(--color-text));
              transition: 0.3s;
            }
          }
        }
      }
      .fanfic-page__access-error-img {
        max-width: 100%;
      }
    }
    .fanfic-page__paragraphs-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      animation: fadeIn 3s ease-in-out 0s 1 normal;
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
            text-shadow:
              -1px -1px 0 #000,
              1px -1px 0 #000,
              -1px 1px 0 #000,
              1px 1px 0 #000;
          }
        }
      }
    }
  }
}
</style>
