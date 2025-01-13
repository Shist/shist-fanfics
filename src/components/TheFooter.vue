<template>
  <footer class="app-footer" ref="footerRef">
    <div class="app-footer__container">
      <span class="app-footer__version">Версия 2.0.1</span>
      <div class="app-footer__git-link-wrapper">
        <a
          href="https://github.com/Shist/shist-fanfics"
          target="_blank"
          class="app-footer__git-link"
        >
          <img
            src="@/assets/images/github.png"
            alt="GitHub"
            class="app-footer__git-img"
          />
          <p class="app-footer__git-text">Этот проект на GitHub</p>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useElementBounding } from "@vueuse/core";
import { useFooterStore } from "@/store/footer";

const footerStore = useFooterStore();

const footerRef = ref<HTMLElement | null>(null);

const { height } = useElementBounding(footerRef);

watch(height, (newHeight) => {
  footerStore.footerHeight = newHeight;
});
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: var(--color-footer);
  &__container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
    @media (max-width: $laptop-l) {
      padding-inline: 20px;
    }
    .app-footer__version {
      @include default-text(16px, 16px, var(--color-text));
    }
    .app-footer__git-link-wrapper {
      max-width: 280px;
      margin: 0 auto;
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
      &:hover > .app-footer__git-link > .app-footer__git-text {
        color: var(--color-link-active);
      }
      .app-footer__git-link {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
        text-decoration: none;
        .app-footer__git-img {
          width: 30px;
          height: 30px;
        }
        .app-footer__git-text {
          transition: 0.3s;
          @include default-text(20px, 20px, var(--color-text));
          @media (max-width: $laptop-s) {
            font-size: 16px;
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>
