<template>
  <span class="badge-top-secret">TOP SECRET</span>
</template>

<style lang="scss" scoped>
.badge-top-secret {
  @extend %default-badge;
  background: linear-gradient(
    var(--color-badge-top-secret-top),
    var(--color-badge-top-secret-bottom)
  );
}
</style>
