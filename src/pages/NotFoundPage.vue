<template>
  <div class="not-found-page">
    <h1 class="not-found-page__headline">This page does not exist</h1>
    <router-link to="/" class="not-found-page__link-to-main">
      Back to the main page
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.not-found-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  &__headline {
    @include default-headline(48px, 48px, var(--color-text));
  }
  &__link-to-main {
    @include default-text(36px, 36px, var(--color-text));
    transition: 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
