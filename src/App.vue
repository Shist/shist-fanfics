<template>
  <div class="global-container">
    <header class="app-header">
      <div class="app-header__container">
        <h1 class="app-header__headline">Shist fanfics</h1>
      </div>
    </header>
    <router-view />
    <footer class="app-footer">
      <div class="app-footer__container">
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

<script setup lang="ts"></script>

<style lang="scss">
.app-header {
  background-color: var(--color-header);
  &__container {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: $laptop-l) {
      padding-inline: 20px;
    }
    .app-header__headline {
      @include default-headline(45px, 45px, var(--color-text));
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

.app-footer {
  background-color: var(--color-footer);
  &__container {
    padding: 40px 20px;
    @media (max-width: $laptop-l) {
      padding-inline: 20px;
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
