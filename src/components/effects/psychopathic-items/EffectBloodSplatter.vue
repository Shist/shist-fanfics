<template>
  <div class="blood-splatter blood-splatter_left" :style="leftSplatterStyles" />
  <div
    class="blood-splatter blood-splatter_right"
    :style="rightSplatterStyles"
  />
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import { useFooterStore } from "@/store/footer";

const footerStore = useFooterStore();

const imageUrl = ref(
  new URL("@/assets/images/psychopathic/blood.png", import.meta.url).href
);

const generateKeyframes = (animationName: string, isReversed: boolean) => {
  const keyframes = `
        @keyframes ${animationName} {
            0% {
                opacity: 0;
                transform: ${isReversed ? "scaleX(-1) scale(0.5)" : "scale(0.5)"};
              }
            1% {
                 opacity: 0.7;
                  transform: ${isReversed ? "scaleX(-1) scale(1)" : "scale(1)"};
              }
            50% {
                  opacity: 0;
                     transform: ${isReversed ? "scaleX(-1) scale(1)" : "scale(1)"};
              }
            100% {
                  opacity: 0;
                     transform: ${isReversed ? "scaleX(-1) scale(1)" : "scale(1)"};
              }
            }
        `;
  const styleElement = document.createElement("style");
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);
  return styleElement;
};

let leftSplatterStyleElement: HTMLStyleElement | null;
let rightSplatterStyleElement: HTMLStyleElement | null;

const leftSplatterStyles = computed(() => {
  const bottomOffset = footerStore.footerHeight;

  const animationDelay = 50.5;
  const animationName = `blood-splatter-fade-${Math.random().toString(36).substring(2, 15)}`;

  if (leftSplatterStyleElement) {
    document.head.removeChild(leftSplatterStyleElement);
  }

  leftSplatterStyleElement = generateKeyframes(animationName, false);

  return {
    bottom: `${bottomOffset}px`,
    backgroundImage: `url(${imageUrl.value})`,
    animation: `${animationName} 15s ease-in-out infinite`,
    animationDelay: `${animationDelay}s`,
  };
});

const rightSplatterStyles = computed(() => {
  const bottomOffset = footerStore.footerHeight;

  const animationDelay = 58;
  const animationName = `blood-splatter-fade-reverse-${Math.random().toString(36).substring(2, 15)}`;

  if (rightSplatterStyleElement) {
    document.head.removeChild(rightSplatterStyleElement);
  }

  rightSplatterStyleElement = generateKeyframes(animationName, true);

  return {
    bottom: `${bottomOffset}px`,
    backgroundImage: `url(${imageUrl.value})`,
    animation: `${animationName} 15s ease-in-out infinite`,
    animationDelay: `${animationDelay}s`,
    transform: "scaleX(-1)",
  };
});

onUnmounted(() => {
  if (leftSplatterStyleElement) {
    document.head.removeChild(leftSplatterStyleElement);
  }
  if (rightSplatterStyleElement) {
    document.head.removeChild(rightSplatterStyleElement);
  }
});
</script>

<style lang="scss" scoped>
.blood-splatter {
  position: fixed;
  z-index: 1;
  width: 70%;
  height: 70%;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0;
  &_left {
    left: 0;
  }
  &_right {
    right: 0;
  }
  @media (max-width: $tablet-l) {
    width: 100%;
  }
}
</style>
