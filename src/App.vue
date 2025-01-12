<template>
  <div class="global-container" :class="{ 'light-theme': isLightTheme }">
    <TheHeader />
    <main class="main-wrapper">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useThemeStore } from "@/store/theme";
import { useFanficsStore } from "@/store/fanfics";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

const themeStore = useThemeStore();

const isLightTheme = computed(() => themeStore.currTheme === "light");

const fanficsStore = useFanficsStore();

onMounted(() => {
  fanficsStore.loadFanficsInfo();
});
</script>

<style lang="scss">
.global-container {
  position: relative;
  min-height: 100vh;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--color-global-bg);
}
.global-container * {
  transition: all 0.3s ease;
}

.main-wrapper {
  flex-grow: 1;
  @extend %default-wrapper;
}

.Toastify__toast-container .Toastify__toast {
  cursor: default;
}
.Toastify__toast-body > div {
  cursor: text;
  font-family: $font-roboto;
  text-align: center;
  word-break: break-word;
}
</style>
