<template>
  <div>
    <img
      v-if="isCheck"
      src="@/assets/images/check.png"
      alt="Yes"
      class="status-image"
    />
    <img v-else src="@/assets/images/cross.png" alt="No" class="status-image" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCheck: boolean;
}>();
</script>

<style lang="scss" scoped>
.status-image {
  max-width: 100%;
}
</style>
