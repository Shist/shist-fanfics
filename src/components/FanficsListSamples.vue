<template>
  <div class="fanfics-list-sample">
    <div
      class="fanfics-list-sample__field-card fanfics-list-sample__field-card_big"
    />
    <div
      class="fanfics-list-sample__field-card fanfics-list-sample__field-card_small"
    />
    <div
      class="fanfics-list-sample__field-card fanfics-list-sample__field-card_medium"
    />
    <div
      class="fanfics-list-sample__field-card fanfics-list-sample__field-card_medium"
    />
    <div
      class="fanfics-list-sample__field-card fanfics-list-sample__field-card_small"
    />
  </div>
</template>

<style lang="scss" scoped>
.fanfics-list-sample {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  &__field-card {
    @include sample(none, auto, 5px);
    &_big {
      height: 230px;
    }
    &_medium {
      height: 160px;
    }
    &_small {
      height: 120px;
    }
  }
}
</style>
