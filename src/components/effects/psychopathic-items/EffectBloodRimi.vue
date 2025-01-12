<template>
  <div class="blood-rimi" :style="rimiStyles"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const imageUrlRimiOpenedEyes = ref(
  new URL(
    "@/assets/images/psychopathic/blood-rimi-opened-eyes.png",
    import.meta.url
  ).href
);
const imageUrlRimiSemiClosedEyes = ref(
  new URL(
    "@/assets/images/psychopathic/blood-rimi-semi-closed-eyes.png",
    import.meta.url
  ).href
);
const imageUrlRimiClosedEyes = ref(
  new URL(
    "@/assets/images/psychopathic/blood-rimi-closed-eyes.png",
    import.meta.url
  ).href
);

const imageArray = [
  imageUrlRimiOpenedEyes,
  imageUrlRimiSemiClosedEyes,
  imageUrlRimiClosedEyes,
  imageUrlRimiSemiClosedEyes,
  imageUrlRimiOpenedEyes,
];
const currentImageIndex = ref(0);
const isTransitioning = ref(false);
const isVisible = ref(false);
let animationSequenceTimeoutId: number | null = null;
let animationIntervalId: number | null = null;
let blinkingTimeoutId: number | null = null;

let leftOffset = 0;

const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
const generateRandomIntNumber = (min: number, max: number) => {
  return Math.floor(generateRandomNumber(min, max + 1));
};

const rimiStyles = computed(() => {
  return {
    left: `${leftOffset}%`,
    opacity: isVisible.value ? 0.8 : 0,
    backgroundImage: `url(${imageArray[currentImageIndex.value].value})`,
    transition: isTransitioning.value
      ? "opacity 0.2s ease, left 0s ease"
      : "none",
  };
});

const blink = () => {
  isTransitioning.value = true;

  const timeBeforeNextBlink = generateRandomNumber(200, 4000);

  const areEyesOpened =
    currentImageIndex.value === 0 ||
    currentImageIndex.value === imageArray.length - 1;

  blinkingTimeoutId = setTimeout(
    () => {
      currentImageIndex.value =
        (currentImageIndex.value + 1) % imageArray.length;

      isTransitioning.value = false;
      blink();
    },
    areEyesOpened ? timeBeforeNextBlink : 100
  );
};

const initAnimationSequence = () => {
  animationIntervalId = setInterval(
    () => {
      isVisible.value = true;

      leftOffset = generateRandomIntNumber(0, 30); // calculate constant left offset for next blinks
      blink();

      setTimeout(
        () => {
          if (blinkingTimeoutId) {
            clearTimeout(blinkingTimeoutId);
          }

          isVisible.value = false;
        },
        generateRandomNumber(8000, 15000) // duration of time where Rimi is visible and blinking
      );
    },
    generateRandomNumber(20000, 50000) // time before Rimi appears next time
  );
};

onMounted(() => {
  animationSequenceTimeoutId = setTimeout(
    initAnimationSequence,
    generateRandomNumber(60000, 80000) // time before we start Rimi's cycled appearings
  );
});

onUnmounted(() => {
  if (animationSequenceTimeoutId) {
    clearTimeout(animationSequenceTimeoutId);
  }
  if (animationIntervalId) {
    clearInterval(animationIntervalId);
  }
  if (blinkingTimeoutId) {
    clearTimeout(blinkingTimeoutId);
  }
});
</script>

<style lang="scss" scoped>
.blood-rimi {
  position: fixed;
  z-index: 1;
  bottom: 0;
  width: 70%;
  height: 70%;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: 50% 100%;
  background-size: auto;
}
</style>
