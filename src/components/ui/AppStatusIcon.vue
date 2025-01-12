<template>
  <div>
    <img
      v-if="isCheck"
      src="@/assets/images/check.png"
      alt="Да"
      class="status-image"
    />
    <img
      v-else
      src="@/assets/images/cross.png"
      alt="Нет"
      class="status-image"
    />
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
