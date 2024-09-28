<template>
  <main class="main-page">
    <div class="attractor-field-section attractor-field-section_alpha">
      <h2 class="attractor-field-section__headline">Alpha (α)</h2>
      <div class="attractor-field-section__fanfics-cards-wrapper">
        <div
          class="attractor-field-section__fanfic-card attractor-field-section__fanfic-card_alpha"
          @click="onFanficCardClicked('alpha-1')"
        >
          30.10.2022 - «Точка отсчёта»
        </div>
      </div>
    </div>
    <div class="attractor-field-section attractor-field-section_beta">
      <h2 class="attractor-field-section__headline">Beta (β)</h2>
      <div class="attractor-field-section__fanfics-cards-wrapper">
        <span class="attractor-field-section__nothing-yet-label">
          Пока неизвестно ни одной истории...
        </span>
      </div>
    </div>
    <div class="attractor-field-section attractor-field-section_gamma">
      <h2 class="attractor-field-section__headline">Gamma (γ)</h2>
      <div class="attractor-field-section__fanfics-cards-wrapper">
        <span class="attractor-field-section__nothing-yet-label">
          Пока неизвестно ни одной истории...
        </span>
      </div>
    </div>
    <div class="attractor-field-section attractor-field-section_delta">
      <h2 class="attractor-field-section__headline">Delta (δ)</h2>
      <div class="attractor-field-section__fanfics-cards-wrapper">
        <div
          class="attractor-field-section__fanfic-card attractor-field-section__fanfic-card_delta"
          @click="onFanficCardClicked('delta-1')"
        >
          02.04.2042 - «Те, кого я не cмог сохранить»
        </div>
      </div>
    </div>
    <div class="attractor-field-section attractor-field-section_epsilon">
      <h2 class="attractor-field-section__headline">Epsilon (ε)</h2>
      <div class="attractor-field-section__fanfics-cards-wrapper">
        <span class="attractor-field-section__nothing-yet-label">
          Пока неизвестно ни одной истории...
        </span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function onFanficCardClicked(fanficId: string) {
  router.push(`fanfics/${fanficId}`);
}
</script>

<style lang="scss" scoped>
.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.attractor-field-section {
  padding: 20px;
  border-radius: 5px;
  @media (max-width: $phone-l) {
    padding: 10px;
  }
  &_alpha {
    background-color: rgba(var(--color-alpha-rgb), 90%);
  }
  &_beta {
    background-color: rgba(var(--color-beta-rgb), 90%);
  }
  &_gamma {
    background-color: rgba(var(--color-gamma-rgb), 90%);
  }
  &_delta {
    background-color: rgba(var(--color-delta-rgb), 90%);
  }
  &_epsilon {
    background-color: rgba(var(--color-epsilon-rgb), 90%);
  }
  &__headline {
    @include default-headline(36px, 36px, var(--color-text-dark));
    margin-bottom: 20px;
    @media (max-width: $phone-l) {
      font-size: 24px;
      line-height: 24px;
    }
  }
  &__fanfics-cards-wrapper {
    padding: 10px;
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
      @include default-text(28px, 28px, var(--color-text-dark));
      padding: 10px;
      border-radius: 10px;
      border: 3px var(--color-text-dark) solid;
      cursor: pointer;
      transition: 0.3s;
      @media (max-width: $phone-l) {
        font-size: 16px;
        line-height: 16px;
      }
      &:hover {
        transform: scale(1.05);
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
