<template>
  <div class="global-container">
    <header class="app-header" ref="headerRef">
      <div class="app-header__container">
        <h1 class="app-header__headline">
          <router-link to="/" class="app-header__headline-link">
            Shist fanfics
          </router-link>
        </h1>
      </div>
    </header>
    <router-view />
    <footer class="app-footer">
      <div class="app-footer__container">
        <span class="app-footer__version">Version 2.0.0</span>
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
            <p class="app-footer__git-text">This project on GitHub</p>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const headerRef = ref<HTMLElement | null>(null);

const handleHeaderScroll = () => {
  if (!headerRef.value) {
    return;
  }

  if (window.scrollY > 0) {
    headerRef.value.classList.add("app-header_scrolled");
  } else {
    headerRef.value.classList.remove("app-header_scrolled");
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleHeaderScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleHeaderScroll);
});
</script>

<style lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
  --header-opacity: 1;
  opacity: var(--header-opacity);
  background-color: var(--color-header);
  &_scrolled {
    --header-opacity: 0.9;
  }
  &__container {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: $laptop-l) {
      padding-inline: 20px;
    }
    .app-header__headline {
      padding: 5px;
      .app-header__headline-link {
        @include default-headline(45px, 45px, var(--color-text));
        text-decoration: none;
        @media (max-width: $tablet-l) {
          font-size: 30px;
          line-height: 30px;
        }
        @media (max-width: $phone-l) {
          font-size: 18px;
          line-height: 18px;
        }
      }
    }
  }
}

.app-footer {
  background-color: var(--color-footer);
  &__container {
    padding: 40px 20px;
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
