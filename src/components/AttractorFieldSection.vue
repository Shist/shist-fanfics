<template>
  <div class="attractor-field-section" :class="sectionFieldClass">
    <h2 class="attractor-field-section__headline">{{ fieldLabel }}</h2>
    <div class="attractor-field-section__fanfics-cards-wrapper">
      <div
        class="attractor-field-section__fanfic-card"
        :class="cardFieldClass"
        v-for="fanfic in fanfics"
        :key="fanfic.id"
      >
        {{ formatDate(fanfic.date) }} - {{ fanfic.title }}
      </div>
      <span
        v-if="!fanfics.length"
        class="attractor-field-section__nothing-yet-label"
      >
        Пока неизвестно ни одной истории...
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import getFieldLabel from "@/utils/getFieldLabel";
import { type IFanfic } from "@/types";

const props = defineProps<{
  field: "alpha" | "beta" | "gamma" | "delta" | "epsilon";
  fanfics: IFanfic[];
}>();

const fieldLabel = computed(() => getFieldLabel(props.field));
const sectionFieldClass = computed(
  () => `attractor-field-section_${props.field}`
);
const cardFieldClass = computed(
  () => `attractor-field-section__fanfic-card_${props.field}`
);

const formatDate = (date: Date) => date.toLocaleDateString("ru");
</script>

<style lang="scss" scoped>
.attractor-field-section {
  padding: 15px;
  border-radius: 5px;
  @media (max-width: $phone-l) {
    padding: 10px;
  }
  &_alpha {
    background-color: rgba(var(--color-alpha-rgb), 85%);
  }
  &_beta {
    background-color: rgba(var(--color-beta-rgb), 85%);
  }
  &_gamma {
    background-color: rgba(var(--color-gamma-rgb), 85%);
  }
  &_delta {
    background-color: rgba(var(--color-delta-rgb), 85%);
  }
  &_epsilon {
    background-color: rgba(var(--color-epsilon-rgb), 85%);
  }
  &__headline {
    @include default-headline(36px, 36px, var(--color-text-dark));
    margin-bottom: 15px;
    @media (max-width: $phone-l) {
      margin-bottom: 10px;
      font-size: 24px;
      line-height: 24px;
    }
  }
  &__fanfics-cards-wrapper {
    padding: 7px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
    @media (max-width: $phone-l) {
      padding: 5px;
    }
    .attractor-field-section__nothing-yet-label {
      @include default-text(24px, 24px, var(--color-text-dark));
      @media (max-width: $phone-l) {
        font-size: 14px;
        line-height: 14px;
      }
    }
    .attractor-field-section__fanfic-card {
      position: relative;
      @include default-text(28px, 28px, var(--color-text-dark));
      padding: 15px;
      border-radius: 10px;
      border: 3px var(--color-text-dark) solid;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.2);
      }
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: linear-gradient(
          175deg,
          rgba(255, 255, 255, 0.4) 0,
          rgba(255, 255, 255, 0) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      &:hover::before {
        opacity: 1;
      }
      @media (max-width: $phone-l) {
        padding: 10px;
        font-size: 16px;
        line-height: 16px;
      }
      &_alpha {
        background-color: var(--color-alpha);
      }
      &_beta {
        background-color: var(--color-beta);
      }
      &_gamma {
        background-color: var(--color-gamma);
      }
      &_delta {
        background-color: var(--color-delta);
      }
      &_epsilon {
        background-color: var(--color-epsilon);
      }
    }
  }
}
</style>
