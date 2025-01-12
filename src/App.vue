<template>
  <AppModal
    :isOpened="isNewPatchModalOpened"
    title="🥳 Встречайте новую версию 🥳"
    closeBtnText="Обязательно взгляну!"
    :isClosableByClickOutside="false"
    @closeModal="closeNewPatchModal"
  >
    <p class="new-patch-label">
      Вышла новая версия веб-приложения для фанфиков - 2.0.0! Вы можете
      взглянуть на полный список изменений по кнопке `Последние обновления`,
      находящейся в бургер-меню. Это окно больше не будет показываться, пока не
      выйдет новый патч или пока вы не почистите кэш браузера.
    </p>
    <img
      class="new-patch-modal-img"
      src="@/assets/images/new-patch-modal-img.png"
      alt="Новый патч"
    />
  </AppModal>
  <div class="global-container" :class="{ 'light-theme': isLightTheme }">
    <TheHeader :style="{ paddingRight: scrollbarWidth }" />
    <main class="main-wrapper" :style="{ paddingRight: scrollbarWidth }">
      <div class="main-wrapper__container">
        <router-view />
      </div>
    </main>
    <TheFooter :style="{ paddingRight: scrollbarWidth }" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useThemeStore } from "@/store/theme";
import { useScrollbarPaddingStore } from "@/store/scrollbarPadding";
import { useFanficsStore } from "@/store/fanfics";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

const APP_VERSION = "2.0.0";

const scrollbarPaddingStore = useScrollbarPaddingStore();

const scrollbarWidth = computed(() =>
  scrollbarPaddingStore.isPaddingNeeded
    ? scrollbarPaddingStore.scrollbarWidth
    : "0px"
);

const themeStore = useThemeStore();

const isLightTheme = computed(() => themeStore.currTheme === "light");

const fanficsStore = useFanficsStore();

const isNewPatchModalOpened = ref(false);

const closeNewPatchModal = () => {
  isNewPatchModalOpened.value = false;

  localStorage.setItem("wasPatchNotesShown", "true");

  localStorage.setItem("appVersion", APP_VERSION);
};

onMounted(() => {
  if (
    !localStorage.getItem("wasPatchNotesShown") ||
    localStorage.getItem("appVersion") !== APP_VERSION
  ) {
    nextTick(() => {
      isNewPatchModalOpened.value = true;
    });
  }

  fanficsStore.loadFanficsInfo();
});
</script>

<style lang="scss">
.new-patch-label {
  @include default-text(16px, 16px, var(--color-burger-menu-text));
  margin-bottom: 5px;
  @media (max-width: $tablet-l) {
    font-size: 12px;
    line-height: 12px;
  }
}
.new-patch-modal-img {
  width: 100%;
}

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
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    background 0.3s ease;
}

.main-wrapper {
  flex-grow: 1;
  &__container {
    @extend %default-wrapper;
  }
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

.scrollbar-measure {
  width: 100px;
  height: 100px;
  overflow: scroll;
  position: absolute;
  top: -9999px;
}
</style>
