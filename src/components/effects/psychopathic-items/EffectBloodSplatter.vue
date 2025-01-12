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

const generateRandomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateRandomIntNumber = (min: number, max: number) =>
  Math.floor(generateRandomNumber(min, max + 1));

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
  const bottomOffset =
    footerStore.footerHeight + generateRandomIntNumber(0, 20);

  const animationDelay = generateRandomNumber(50, 54);
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
  const bottomOffset =
    footerStore.footerHeight + generateRandomIntNumber(0, 20);

  const animationDelay = generateRandomNumber(56, 60);
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
  z-index: 2;
  width: 50%;
  height: 50%;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  opacity: 0;
  &_left {
    left: 0;
  }

  &_right {
    right: 0;
  }
}
</style>
